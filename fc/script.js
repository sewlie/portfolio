/* FOUNDING XI — front-end interactions and fictional sample data.
   The interest form opens an email draft only; it does not store or transmit data. */

"use strict";

const sampleTeams = [
  {
    number: "01 / CONCEPT",
    initials: "BX",
    name: "BOROUGH XI",
    description: "A fictional team identity inspired by borough pride and the city's local pitches.",
    status: "FICTIONAL SAMPLE",
    bg: "#293027",
    accent: "#d7ff3f",
    tag: "NYC"
  },
  {
    number: "02 / CONCEPT",
    initials: "NT",
    name: "NIGHT SHIFT",
    description: "A fictional late-kickoff club concept built around after-hours football energy.",
    status: "FICTIONAL SAMPLE",
    bg: "#282a38",
    accent: "#b8c6ff",
    tag: "AFTER DARK"
  },
  {
    number: "03 / CONCEPT",
    initials: "CT",
    name: "CONCRETE FC",
    description: "A fictional street-football identity with a stripped-back, hard-edged look.",
    status: "FICTIONAL SAMPLE",
    bg: "#392c25",
    accent: "#ffb37c",
    tag: "CITY BUILT"
  }
];

const teamGrid = document.querySelector("#team-grid");

if (teamGrid) {
  sampleTeams.forEach((team) => {
    const article = document.createElement("article");
    article.className = "team-card";
    article.innerHTML = `
      <div class="team-art" style="--team-bg:${team.bg};--team-accent:${team.accent}">
        <span class="team-index">${team.number}</span>
        <span class="team-crest" aria-hidden="true">${team.initials}</span>
        <span class="team-tag">${team.tag}</span>
      </div>
      <div class="team-info" style="--team-accent:${team.accent}">
        <h3>${team.name}</h3>
        <p>${team.description}</p>
        <div class="team-status"><span>${team.status}</span><span>PARTICIPANTS: TBD</span></div>
      </div>
    `;
    teamGrid.appendChild(article);
  });
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

function closeMenu() {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });
}

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

document.querySelectorAll("[data-interest-select]").forEach((link) => {
  link.addEventListener("click", () => {
    const select = document.querySelector("#interest-type");
    if (select) select.value = link.dataset.interestSelect;
  });
});

const interestForm = document.querySelector("#interest-form");
const formMessage = document.querySelector("#form-message");

/*
  IMPORTANT:
  Replace this placeholder with a real league inbox before publishing.
  The form is intentionally front-end only and opens an email draft.
*/
const CONTACT_EMAIL = "replace-with-your-league-email@example.com";

if (interestForm && formMessage) {
  interestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!interestForm.reportValidity()) return;

    const formData = new FormData(interestForm);
    const inquiryType = String(formData.get("interestType") || "").trim();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const organization = String(formData.get("organization") || "").trim();
    const borough = String(formData.get("borough") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = `FOUNDING XI interest — ${inquiryType}`;
    const body = [
      "FOUNDING XI — Expression of Interest",
      "",
      `Interest type: ${inquiryType}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Organization / team: ${organization || "Not provided"}`,
      `Preferred borough: ${borough || "No preference / not sure"}`,
      "",
      "Additional information:",
      message || "None provided",
      "",
      "This is an expression of interest, not a confirmed registration."
    ].join("\n");

    if (CONTACT_EMAIL === "replace-with-your-league-email@example.com") {
      formMessage.textContent = "The form is working as a prototype, but the league email has not been configured. Open script.js and replace CONTACT_EMAIL with your real contact email before testing email submission.";
      formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    formMessage.textContent = "Your email app should open with a draft inquiry. Nothing has been sent by this website.";
    window.location.href = mailtoUrl;
  });
}
