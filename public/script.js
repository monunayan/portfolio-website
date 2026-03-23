// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
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
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');

    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}

// Native form submission will now be handled directly by HTML FormSubmit action
// Auto-Redirect back to portfolio instead of stopping at FormSubmit's thank you page
document.addEventListener('DOMContentLoaded', () => {
    const nextUrlInputs = document.querySelectorAll('input[name="_next"]');
    nextUrlInputs.forEach(input => {
        // Append a success parameter to the URL so we can show a popup later!
        const currentUrl = window.location.href.split('?')[0];
        input.value = currentUrl + "?submitted=true"; 
    });

    // Check if we just came back from a successful form submission
    if (window.location.search.includes('submitted=true')) {
        showSuccessPopup();
        // Remove the parameter from the URL gracefully
        setTimeout(() => {
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 1000);
    }
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
