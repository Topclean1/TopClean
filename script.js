document.addEventListener('DOMContentLoaded', function () {

    const navbarButton = document.querySelector('.navbar-button');
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');
    let slideIndex = 0;
    const interval = 5000;
    let slides = document.querySelectorAll('.slides img');
    const services = document.querySelectorAll('.service');
    const divstoobserve = document.querySelectorAll(".animate")
    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If element is in view, add animation class based on its index
                if (entry.target.classList.contains('service1')) {
                    entry.target.classList.add('slideInLeft');
                } else {
                    entry.target.classList.add('slideInRight');
                }
                
                
            } 
            
        });
    };
    const observer = new IntersectionObserver(callback, {threshold: 0.1});
    services.forEach(service => {
        observer.observe(service);  
    });
    divstoobserve.forEach(div => {
        observer.observe(div);  
    });
   

 navbarButton.addEventListener('click', function () {

        navbarButton.classList.toggle('active');

        if (navbar.classList.contains('hidden')) {
            // If navbar is hidden, show it
            navbar.style.height = `${navbar.scrollHeight}px`; // Set height to auto to get the actual height
            requestAnimationFrame(function() {
                navbar.classList.remove('hidden'); // Remove 'hidden' class after the height is set
            });
        } else {
            // If navbar is visible, hide it
            navbar.style.height = `${navbar.scrollHeight}px`; // Set height to actual height
            requestAnimationFrame(function() {
                navbar.classList.add('hidden'); // Add 'hidden' class
                navbar.style.height = '0'; // Set height to 0
                
            });
        }
        
    });

    links.forEach(link => {
        // Add click event listener to each link
        link.addEventListener('click', function (event) {
            // Prevent default behavior of anchor links
            event.preventDefault();
            navbar.classList.add('hidden');
            navbar.style.height = '0';
            navbarButton.classList.toggle('active')
            // Get the target section ID from the link's href attribute
            const targetId = link.getAttribute('href').substring(1); // Remove the '#' from the href

            // Scroll smoothly to the target section
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth' // Use smooth scrolling behavior
                
            });
            const targetElement = document.getElementById(targetId);
        const targetTop = targetElement.getBoundingClientRect().top;
        const navbarHeight = navbar.offsetHeight; // Adjust this if your navbar height changes
        const scrollY = window.scrollY;
        window.scrollTo({
            top: scrollY + targetTop - navbarHeight + 100, // Scroll 50 pixels more up than the target section
            behavior: 'smooth'
        });
            
        });
        
        
    });
    sections.forEach(section => {
        observer.observe(section);
    });
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        question.addEventListener('click', function () {
            question.classList.toggle('open');
        });
    });
    showSlide(slideIndex);
    
    let timer = setInterval(nextSlide, interval); // Start the automatic slideshow
       
});
