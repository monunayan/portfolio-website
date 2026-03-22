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
        let offset = sec.offsetTop - 100;
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
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const msgEl = document.getElementById('formMessage');

  if (form && msgEl) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msgEl.style.color = 'white';
      msgEl.textContent = 'Sending...';

      const payload = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone') ? document.getElementById('phone').value.trim() : '',
        subject: document.getElementById('subject') ? document.getElementById('subject').value.trim() : '',
        message: document.getElementById('message').value.trim()
      };

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.success || data.message === "Saved") {
          msgEl.style.color = 'lightgreen';
          msgEl.textContent = data.message || 'Message sent successfully!';
          form.reset();
        } else {
          msgEl.style.color = 'tomato';
          msgEl.textContent = data.error || 'Something went wrong.';
        }
      } catch (err) {
        console.error(err);
        msgEl.style.color = 'tomato';
        msgEl.textContent = 'Network error. Make sure your local backend is running, or check connection.';
      }

      setTimeout(() => { msgEl.textContent = ''; }, 6000);
    });
  }
});
