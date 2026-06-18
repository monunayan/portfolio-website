// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    }
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        // Trigger the animation slightly earlier when the user scrolls down
        let offset = sec.offsetTop - (window.innerHeight / 1.2);
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            // active navbar links
            if (id) {
                navLinks.forEach(links => {
                    links.classList.remove('active');
                    const target = document.querySelector('header nav a[href*=' + id + ']');
                    if (target) target.classList.add('active');
                });
            }
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    if (menuIcon) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }

    // animation footer on scroll
    let footer = document.querySelector('footer');
    if (this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight) {
        footer.classList.add('show-animate');
    }
}

// Native form submission will now be handled directly by HTML FormSubmit action
// Auto-Redirect back to portfolio instead of stopping at FormSubmit's thank you page
document.addEventListener('DOMContentLoaded', () => {
    const nextUrlInputs = document.querySelectorAll('input[name="_next"]');
    nextUrlInputs.forEach(input => {
        // Use data-next attribute if specified, otherwise default to current page
        const customTarget = input.getAttribute('data-next');
        const currentUrl = window.location.href.split('?')[0];
        // Resolve relative paths (like "index.html") to full absolute URLs
        const baseUrl = customTarget ? new URL(customTarget, window.location.href).href : currentUrl;
        
        // Append a success parameter so we can show a popup later!
        input.value = baseUrl + (baseUrl.includes('?') ? '&' : '?') + "submitted=true"; 
    });

    // Check if we just came back from a successful form submission
    if (window.location.search.includes('submitted=true')) {
        showSuccessPopup();
        // Remove the parameter from the URL gracefully
        setTimeout(() => {
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 1000);
    }

    // 3D Parallax Tilt Effect for Cards
    const cards = document.querySelectorAll('.education-card, .project-card, .skill-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((centerY - y) / centerY) * 15;
            const rotateY = ((x - centerX) / centerX) * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
});

function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `<i class='bx bx-check-circle'></i> Message Sent Successfully!`;
    document.body.appendChild(popup);

    // Slide it up smoothly
    setTimeout(() => {
        popup.classList.add('show');
    }, 100);

    // Slide it back down and remove after 4.5 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 500); // clear from memory
    }, 4500);
}
