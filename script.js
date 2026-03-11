document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. Sticky Header Logic
       ========================================= */
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    const scrollThreshold = 200; 

    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > scrollThreshold) {
            header.classList.add('sticky');
            if (currentScroll < lastScrollTop) {
                header.style.transform = 'translateY(-100%)'; 
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('sticky');
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
    });

    /* =========================================
       2. Mobile Menu Toggle
       ========================================= */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');

    mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    /* =========================================
       3. Image Carousel & Zoom Functionality
       ========================================= */
    const mainImg = document.getElementById('main-carousel-img');
    const zoomContainer = document.getElementById('zoom-container');
    const thumbnails = document.querySelectorAll('.thumb');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    // Convert NodeList to an Array of image sources
    let images = Array.from(thumbnails).map(t => t.src);
    let currentIndex = 0;

    // Function to update the main image and active thumbnail state
    function updateImage(index) {
        // Simple fade effect
        mainImg.style.opacity = 0.5;
        
        setTimeout(() => {
            mainImg.src = images[index];
            mainImg.style.opacity = 1;
            
            thumbnails.forEach(t => t.classList.remove('active'));
            thumbnails[index].classList.add('active');
            
            thumbnails[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }, 150);
    }

    // Attach click events to thumbnails
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentIndex = index;
            updateImage(currentIndex);
        });
    });

    // Attach click events to Carousel Arrows
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
        updateImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
        updateImage(currentIndex);
    });

    // Zoom on Hover Logic
    zoomContainer.addEventListener('mousemove', (e) => {
        const rect = zoomContainer.getBoundingClientRect();
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        mainImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        mainImg.style.transform = 'scale(2)'; // Increase for more zoom
    });

    // Reset zoom when mouse leaves
    zoomContainer.addEventListener('mouseleave', () => {
        mainImg.style.transform = 'scale(1)';
        mainImg.style.transformOrigin = 'center center';
    });
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Initialize the height for the default active item
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all currently open FAQs
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // If the clicked one wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    const appCarousel = document.getElementById('app-carousel');
    const appPrev = document.getElementById('app-prev');
    const appNext = document.getElementById('app-next');

    if (appCarousel && appPrev && appNext) {
        appNext.addEventListener('click', () => {
            // Get width of one card + the gap (24px)
            const cardWidth = appCarousel.querySelector('.app-card').offsetWidth;
            const gap = 24; 
            appCarousel.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        });

        appPrev.addEventListener('click', () => {
            const cardWidth = appCarousel.querySelector('.app-card').offsetWidth;
            const gap = 24;
            appCarousel.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        });
    }


    const processData = [
        {
            title: "High-Grade Raw Material Selection",
            desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
            bullets: ["PE100 grade material", "Optimal molecular weight distribution"],
            image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Precision Extrusion",
            desc: "Our state-of-the-art extruders melt and homogenize the HDPE material to ensure a consistent, flawless pipe structure.",
            bullets: ["Advanced thermal control", "Continuous flow monitoring"],
            image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Rapid Cooling Chambers",
            desc: "Pipes pass through temperature-controlled water baths to solidify the shape without compromising internal stress limits.",
            bullets: ["Multi-stage cooling", "Prevents structural deformation"],
            image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Automated Sizing",
            desc: "Advanced vacuum calibration ensures exact dimensional accuracy, bringing the pipe perfectly to the required SDR.",
            bullets: ["Laser-guided precision", "Micrometer-level adjustments"],
            image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Rigorous Quality Control",
            desc: "Inline ultrasonic testing constantly measures wall thickness and detects any micro-imperfections during production.",
            bullets: ["Real-time defect detection", "ISO compliant checks"],
            image: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Clear, Permanent Marking",
            desc: "Automated inkjet or hot-stamping systems apply clear traceability codes, specifications, and branding directly to the pipe.",
            bullets: ["Fade-resistant printing", "Complete batch traceability"],
            image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Precision Cutting",
            desc: "Planetary saws cleanly cut the continuous pipe into exact lengths without creating dust or burrs on the edges.",
            bullets: ["Smooth edge finish", "Custom length programming"],
            image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Secure Packaging & Coiling",
            desc: "Smaller diameters are spooled into tight coils, while larger pipes are strapped and bundled for safe transit.",
            bullets: ["Damage-proof strapping", "Optimized for freight"],
            image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80"
        }
    ];

    let currentProcessStep = 0;
    
    const tabs = document.querySelectorAll('.process-tab');
    const processTitle = document.getElementById('process-title');
    const processDesc = document.getElementById('process-desc');
    const processBullets = document.getElementById('process-bullets');
    const processImg = document.getElementById('process-img');
    const textArea = document.getElementById('process-text-area');
    const processPrev = document.getElementById('process-prev');
    const processNext = document.getElementById('process-next');

    // Reusable SVG for the bullets
    const checkmarkSVG = `<svg viewBox="0 0 24 24" fill="var(--primary-blue)" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="12"/><path d="M17 8L10 15L7 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    function updateProcessStep(index) {
        if (!tabs.length) return;

        // Fade out
        textArea.style.opacity = 0;
        processImg.style.opacity = 0;

        setTimeout(() => {
            // Update Active Tab UI
            tabs.forEach(t => t.classList.remove('active'));
            tabs[index].classList.add('active');
            
            // Scroll tab into view if on mobile
            tabs[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

            // Update Content
            const data = processData[index];
            processTitle.textContent = data.title;
            processDesc.textContent = data.desc;
            processImg.src = data.image;

            // Update Bullets
            processBullets.innerHTML = '';
            data.bullets.forEach(bulletText => {
                const li = document.createElement('li');
                li.innerHTML = `${checkmarkSVG} ${bulletText}`;
                processBullets.appendChild(li);
            });

            // Fade in
            textArea.style.opacity = 1;
            processImg.style.opacity = 1;
        }, 200);
    }

    // Attach Click Events to Tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            currentProcessStep = parseInt(e.target.getAttribute('data-step'));
            updateProcessStep(currentProcessStep);
        });
    });

    // Attach Click Events to Arrows
    if (processPrev && processNext) {
        processPrev.addEventListener('click', () => {
            currentProcessStep = (currentProcessStep === 0) ? processData.length - 1 : currentProcessStep - 1;
            updateProcessStep(currentProcessStep);
        });

        processNext.addEventListener('click', () => {
            currentProcessStep = (currentProcessStep === processData.length - 1) ? 0 : currentProcessStep + 1;
            updateProcessStep(currentProcessStep);
        });
    }

    const slider = document.querySelector('.testimonials-carousel');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (slider) {
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Set default cursor
        slider.style.cursor = 'grab';
    }
});