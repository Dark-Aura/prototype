// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
});

function initAnimations() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Hero section animation
    gsap.from(".section", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Create animations for each section
    gsap.utils.toArray('.scroll-section').forEach((section, i) => {
        const elements = section.querySelectorAll('.section');
        
        gsap.from(elements, {
            scrollTrigger: {
                trigger: section,
                start: "top center",
                end: "bottom center",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for anchor links
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

    // Path switching functionality
    const pathTabs = document.querySelectorAll('.path-tab');
    const pathContents = document.querySelectorAll('.path-content');

    pathTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            pathTabs.forEach(t => {
                t.classList.remove('active');
                t.classList.remove('bg-brand-blue');
                t.classList.add('bg-gray-400');
            });

            // Add active class to clicked tab
            tab.classList.add('active');
            tab.classList.add('bg-brand-blue');
            tab.classList.remove('bg-gray-400');

            // Hide all path contents
            pathContents.forEach(content => {
                content.classList.add('hidden');
            });

            // Show selected path content
            const pathId = tab.getAttribute('data-path');
            const selectedPath = document.getElementById(`${pathId}-path`);
            selectedPath.classList.remove('hidden');
        });
    });

    // Set initial active state
    const initialActiveTab = document.querySelector('.path-tab.active');
    if (initialActiveTab) {
        initialActiveTab.classList.add('bg-brand-blue');
    }
} 
