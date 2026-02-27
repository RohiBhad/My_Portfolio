document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const customCursor = document.querySelector('.custom-cursor');

    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

    // Add cursor hover effect to clickable elements
    const clickables = document.querySelectorAll('a, button, .theme-toggle, .hamburger');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');
    const hamburgerIcon = document.querySelector('.hamburger i');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-times');
        } else {
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
        });
    });

    // Smooth Scrolling for anchor links (fallback for Safari)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.section-title, .about-text, .skills-container, .experience-card, .project-card, .contact-info');

    // Add reveal class to elements
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Initial check
    revealOnScroll();

    // Theme Toggle (Dark/Light Mode)
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'dark');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('portfolio-theme', 'light');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            }
        });
    }
});
