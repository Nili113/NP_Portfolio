document.addEventListener('DOMContentLoaded', () => {

    // Easter Egg for the Curious
    console.log(
        "%c ✨ Built & Designed with ❤️ by Firoj ✨ ",
        "background: linear-gradient(135deg, #DBA39A, #6a11cb); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;"
    );

    // Navbar Scroll Effect just for shadow overlap
    const navbar = document.querySelector('.navbar');

    // Intersection Observer for SLEEK Fade-in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.fade-in-on-scroll');
    scrollElements.forEach(el => {
        observer.observe(el);
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-links");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Close menu when link is clicked
        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    // Smooth Scroll & Active Link Highlighting (ScrollSpy)
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) { // Offset for navbar
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((li) => {
            li.classList.remove("active");
            // Only add active class if we have a current section
            if (current && li.getAttribute("href").includes(current)) {
                li.classList.add("active");
            }
        });

        // Click handler for smooth scroll
    });

    // Smooth scrolling already handled by CSS scroll-behavior: smooth, 
    // but just in case for some browsers or explicit control:
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Adjust for floating header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typewriter Effect
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }

        type() {
            // Current index of word
            const current = this.wordIndex % this.words.length;
            // Get full text of current word
            const fullTxt = this.words[current];

            // Check if deleting
            if (this.isDeleting) {
                // Remove char
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                // Add char
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            // Insert txt into element
            this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

            // Initial Type Speed
            let typeSpeed = 100;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            // If word is complete
            if (!this.isDeleting && this.txt === fullTxt) {
                // Make pause at end
                typeSpeed = this.wait;
                // Set delete to true
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                // Move to next word
                this.wordIndex++;
                // Pause before start typing
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // Init TypeWriter
    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }

});
