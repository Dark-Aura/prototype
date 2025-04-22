document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Get DOM elements
    const searchInput = document.getElementById('incubator-search');
    const locationFilter = document.getElementById('location-filter');
    const industryFilter = document.getElementById('industry-filter');
    const incubatorCards = document.querySelectorAll('.incubator-card');

    // Search functionality
    searchInput.addEventListener('input', filterIncubators);
    locationFilter.addEventListener('change', filterIncubators);
    industryFilter.addEventListener('change', filterIncubators);

    function filterIncubators() {
        const searchTerm = searchInput.value.toLowerCase();
        const locationValue = locationFilter.value.toLowerCase();
        const industryValue = industryFilter.value.toLowerCase();

        incubatorCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const location = card.querySelector('.location').textContent.toLowerCase();
            const description = card.querySelector('.description').textContent.toLowerCase();
            
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesLocation = !locationValue || location.includes(locationValue);
            const matchesIndustry = !industryValue || description.includes(industryValue);

            if (matchesSearch && matchesLocation && matchesIndustry) {
                card.style.display = 'block';
                card.setAttribute('data-aos', 'fade-up');
            } else {
                card.style.display = 'none';
            }
        });
    }

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
}); 