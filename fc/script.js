
/* ==============================
   NYCL — NEW YORK CANNABIS LEAGUE
   ============================== */


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


/*
    IMPORTANT:

    This is the email address that receives interest submissions.

    Replace the example address below with your actual NYCL email.

    The form opens the visitor's email application with a
    pre-filled message. It does not automatically send or
    store submissions.
*/

const CONTACT_EMAIL = "nico@nicklzny.com";


interestForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!interestForm.reportValidity()) {
        return;
    }

    if (CONTACT_EMAIL.includes("replace-with")) {

        formMessage.textContent =
            "The interest form is not connected yet. Please configure the NYCL contact email in script.js.";

        formMessage.style.color = "#b23b2c";

        return;

    }


    const formData = new FormData(interestForm);

    const name = formData.get("name");
    const email = formData.get("email");
    const interest = formData.get("interest");
    const organization = formData.get("organization") || "Not provided";
    const borough = formData.get("borough") || "Not provided";
    const message = formData.get("message") || "No additional message";


    const subject = encodeURIComponent(
        "NYCL Interest Submission - " + interest
    );


    const body = encodeURIComponent(

        "NEW YORK CANNABIS LEAGUE - INTEREST SUBMISSION\n\n" +

        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Interest: " + interest + "\n" +
        "Organization: " + organization + "\n" +
        "Borough: " + borough + "\n\n" +

        "Additional Information:\n" +
        message

    );


    const mailtoLink =
        "mailto:" + CONTACT_EMAIL +
        "?subject=" + subject +
        "&body=" + body;


    window.location.href = mailtoLink;


    formMessage.textContent =
        "Your email application should open with your interest submission.";

    formMessage.style.color = "#526d24";

});
