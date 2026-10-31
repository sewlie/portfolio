
/* ==============================
   NYCL — NEW YORK CANNABIS LEAGUE
   ============================== */


/* FORMSPREE CONFIGURATION */

const FORMSPREE_URL = "https://formspree.io/f/xaeed1vz";


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

});


/* CLOSE MOBILE NAVIGATION AFTER CLICKING A LINK */

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


/* INTEREST CARDS */

const interestCards = document.querySelectorAll(".interest-card");

const interestSelect = document.getElementById("interest");

interestCards.forEach(function (card) {

    card.addEventListener("click", function () {

        const selectedInterest = card.dataset.interest;

        interestSelect.value = selectedInterest;

        document.getElementById("signup").scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* INTEREST FORM */

const interestForm = document.getElementById("interest-form");

const formMessage = document.getElementById("form-message");

const submitButton = interestForm.querySelector(
    'button[type="submit"]'
);


interestForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    if (!interestForm.reportValidity()) {
        return;
    }


    /* PREPARE FORM DATA */

    const formData = new FormData(interestForm);

    formData.append("_subject", "New NYCL Interest Submission");


    /* DISABLE BUTTON WHILE SUBMITTING */

    submitButton.disabled = true;

    submitButton.innerHTML = "SUBMITTING...";

    formMessage.textContent = "Sending your information...";

    formMessage.style.color = "#62665b";


    try {

        /* SEND TO FORMSPREE */

        const response = await fetch(FORMSPREE_URL, {

            method: "POST",

            body: formData,

            headers: {
                "Accept": "application/json"
            }

        });


        const result = await response.json();


        /* SUCCESS */

        if (response.ok) {

            formMessage.textContent =
                "Thanks for your interest! We'll be in touch.";

            formMessage.style.color = "#526d24";

            interestForm.reset();

        }


        /* FORMSPREE VALIDATION ERROR */

        else {

            if (result.errors) {

                formMessage.textContent = result.errors
                    .map(function (error) {
                        return error.message;
                    })
                    .join(" ");

            } else {

                formMessage.textContent =
                    "Something went wrong. Please try again.";

            }

            formMessage.style.color = "#b23b2c";

        }

    }


    /* CONNECTION ERROR */

    catch (error) {

        formMessage.textContent =
            "Unable to submit right now. Please try again later.";

        formMessage.style.color = "#b23b2c";

        console.error("NYCL Form Error:", error);

    }


    /* RESTORE BUTTON */

    finally {

        submitButton.disabled = false;

        submitButton.innerHTML = 'SUBMIT INTEREST <span>↗</span>';

    }

});
