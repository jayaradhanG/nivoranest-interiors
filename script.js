/* =========================================
   NIVORANEST INTERIORS
   JavaScript
   ========================================= */

/* =========================================
   GOOGLE SHEETS WEB APP URL
   ========================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycby1ciBjyxgWOmG2qHy2-D57v-Ga4fxlB3nHuBPOfhOeP2EjvDVTX3n3gXWrIVI6nqjp/exec";


/* =========================================
   1. MOBILE NAVIGATION
   ========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        const isOpen = navMenu.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });
}


/* =========================================
   2. CLOSE MOBILE MENU AFTER LINK CLICK
   ========================================= */

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            menuToggle.textContent = "☰";
        }
    });
});


/* =========================================
   3. CONTACT FORM
   ========================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const serviceInput = document.getElementById("service");
const messageInput = document.getElementById("message");


if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        /* Clear previous message */

        if (formMessage) {
            formMessage.textContent = "";
            formMessage.style.padding = "0";
        }


        /* Get form values */

        const nameValue = nameInput.value.trim();
        const phoneValue = phoneInput.value.trim();
        const emailValue = emailInput.value.trim();
        const serviceValue = serviceInput.value;
        const messageValue = messageInput.value.trim();


        /* =====================================
           NAME VALIDATION
           ===================================== */

        if (nameValue.length < 2) {

            showFormMessage(
                "Please enter your name.",
                "error"
            );

            nameInput.focus();
            return;
        }


        /* =====================================
           PHONE VALIDATION
           ===================================== */

        const phonePattern = /^[0-9]{10}$/;

        if (!phonePattern.test(phoneValue)) {

            showFormMessage(
                "Please enter a valid 10-digit phone number.",
                "error"
            );

            phoneInput.focus();
            return;
        }


        /* =====================================
           EMAIL VALIDATION
           ===================================== */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {

            showFormMessage(
                "Please enter a valid email address.",
                "error"
            );

            emailInput.focus();
            return;
        }


        /* =====================================
           SERVICE VALIDATION
           ===================================== */

        if (serviceValue === "") {

            showFormMessage(
                "Please select a service.",
                "error"
            );

            serviceInput.focus();
            return;
        }


        /* =====================================
           MESSAGE VALIDATION
           ===================================== */

        if (messageValue.length < 10) {

            showFormMessage(
                "Please provide more details about your project.",
                "error"
            );

            messageInput.focus();
            return;
        }


        /* =====================================
           SHOW SUBMITTING MESSAGE
           ===================================== */

        showFormMessage(
            "Submitting your enquiry...",
            "success"
        );


        /* Find submit button */

        const submitButton =
            contactForm.querySelector(
                'button[type="submit"], input[type="submit"]'
            );


        if (submitButton) {
            submitButton.disabled = true;
            submitButton.dataset.originalText =
                submitButton.textContent;

            if (submitButton.tagName === "BUTTON") {
                submitButton.textContent = "Submitting...";
            }
        }


        /* =====================================
           DATA TO GOOGLE SHEETS
           ===================================== */

        const leadData = {

            name: nameValue,

            phone: phoneValue,

            email: emailValue,

            service: serviceValue,

            message: messageValue
        };


        /* =====================================
           SEND DATA TO GOOGLE APPS SCRIPT
           ===================================== */

        try {

            await fetch(GOOGLE_SCRIPT_URL, {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify(leadData)

            });


            /* =================================
               SUCCESS
               ================================= */

            showFormMessage(
                "Thank you! Your consultation request has been submitted successfully.",
                "success"
            );


            /* Clear form */

            contactForm.reset();


        } catch (error) {

            console.error(
                "Google Sheets submission error:",
                error
            );


            showFormMessage(
                "Something went wrong. Please try again.",
                "error"
            );

        } finally {

            /* Enable button again */

            if (submitButton) {

                submitButton.disabled = false;

                if (submitButton.tagName === "BUTTON") {

                    submitButton.textContent =
                        submitButton.dataset.originalText ||
                        "Get Free Consultation";
                }
            }
        }

    });
}


/* =========================================
   4. FORM MESSAGE FUNCTION
   ========================================= */

function showFormMessage(message, type) {

    if (!formMessage) {
        return;
    }

    formMessage.textContent = message;

    formMessage.style.padding = "10px";

    if (type === "success") {

        formMessage.style.color = "#2e7d32";

        formMessage.style.backgroundColor =
            "#e8f5e9";

    } else {

        formMessage.style.color = "#c62828";

        formMessage.style.backgroundColor =
            "#ffebee";
    }
}


/* =========================================
   5. SMOOTH SCROLLING
   ========================================= */

const anchorLinks =
    document.querySelectorAll('a[href^="#"]');


anchorLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");


        if (
            targetId === "#" ||
            targetId.length === 0
        ) {
            return;
        }


        const targetElement =
            document.querySelector(targetId);


        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({

                behavior: "smooth",

                block: "start"
            });
        }

    });
});


/* =========================================
   6. BASIC PHONE INPUT CONTROL
   ========================================= */

if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(
                    /[^0-9]/g,
                    ""
                );


            if (this.value.length > 10) {

                this.value =
                    this.value.substring(
                        0,
                        10
                    );
            }

        }
    );
}