from PIL import Image, ImageOps
import re, pathlib, html

src = pathlib.Path("assets/photos")
out = pathlib.Path("assets/web"); out.mkdir(exist_ok=True)

def slug(s): return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

blocks = []
for f in sorted(src.iterdir()):
    if f.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        continue
    im = ImageOps.exif_transpose(Image.open(f))
    im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
    name = slug(f.stem)
    dims = {}
    for tag, w in (("thumb", 900), ("full", 3500)):
        r = min(1, w / im.width)
        size = (round(im.width * r), round(im.height * r))
        im.resize(size, Image.LANCZOS).save(
            out / f"{name}-{tag}.webp", "WEBP", quality=90, method=6)
        dims[tag] = size
    tw, th = dims["thumb"]
    blocks.append(f'''<div class="masonry-item">
  <img src="/assets/web/{name}-thumb.webp" data-full="/assets/web/{name}-full.webp"
       width="{tw}" height="{th}" loading="lazy" decoding="async" alt="{html.escape(f.stem)}">
  <div class="overlay"></div>
</div>''')

pathlib.Path("masonry-items.html").write_text("\n".join(blocks))