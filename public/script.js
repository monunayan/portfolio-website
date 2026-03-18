/* script.js - Complete file
   - Navbar toggle + scroll logic (your original)
   - Robust contact form submit handler
   - Safe response parsing, error handling, UI feedback
*/

/* ---------------- NAVBAR / SCROLL / STICKY (unchanged logic) ---------------- */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  };
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      // active navbar links
      navLinks.forEach(links => links.classList.remove('active'));
      const activeLink = document.querySelector('header nav a[href*=' + id + ']');
      if (activeLink) activeLink.classList.add('active');

      // active sections for animation on scroll
      sec.classList.add('show-animate');
    } else {
      sec.classList.remove('show-animate');
    }
  });

  // sticky navbar
  let header = document.querySelector('header');
  if (header) header.classList.toggle('sticky', window.scrollY > 100);

  // remove toggle icon and navbar when click navbar links (scroll)
  if (menuIcon) menuIcon.classList.remove('bx-x');
  if (navbar) navbar.classList.remove('active');

  // animation footer on scroll
  let footer = document.querySelector('footer');
  if (footer) footer.classList.toggle('show-animate', window.innerHeight + window.scrollY >= document.scrollingElement.scrollHeight);
};


/* ---------------- UTILITY: find input value by id OR placeholder fallback ---------------- */
function getFieldValue(id, placeholder) {
  // Try by id first
  let el = document.getElementById(id);
  if (el) return el.value.trim();

  // then try input/textarea with placeholder text
  if (placeholder) {
    el = document.querySelector(`input[placeholder="${placeholder}"], textarea[placeholder="${placeholder}"]`);
    if (el) return el.value.trim();
  }

  // try by name attribute as last resort
  el = document.querySelector(`[name="${id}"]`);
  if (el) return el.value.trim();

  return '';
}

/* ---------------- UTILITY: create or get message element ---------------- */
function getMessageElement() {
  // prefer element with id formMessage
  let msgEl = document.getElementById('formMessage');
  if (msgEl) return msgEl;

  // fallback: look for .form-message
  msgEl = document.querySelector('.form-message');
  if (msgEl) return msgEl;

  // else create a small element under the form
  const form = document.getElementById('contactForm') || document.querySelector('form');
  if (!form) {
    // as ultimate fallback create at body bottom
    const fallback = document.createElement('div');
    fallback.id = 'formMessage';
    fallback.style.margin = '1rem';
    document.body.appendChild(fallback);
    return fallback;
  }

  const node = document.createElement('div');
  node.id = 'formMessage';
  node.style.marginTop = '1.2rem';
  form.parentNode.insertBefore(node, form.nextSibling);
  return node;
}

/* ---------------- FORM SUBMIT HANDLER ---------------- */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm') || document.querySelector('form');
  if (!form) return; // no form found

  const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
  const msgEl = getMessageElement();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Prepare payload using smart fallback
    const payload = {
      name: getFieldValue('name', 'Full Name'),
      email: getFieldValue('email', 'Email'),
      phone: getFieldValue('phone', 'Mobile Number'),
      subject: getFieldValue('subject', 'Email Subject'),
      message: getFieldValue('message', 'Your Message')
    };

    // Basic client-side validation
    if (!payload.name || !payload.email || !payload.message) {
      msgEl.style.color = 'tomato';
      msgEl.textContent = 'Please enter your name, email and message.';
      setTimeout(() => msgEl.textContent = '', 4000);
      return;
    }

    // UI: sending state
    const originalBtnText = submitBtn ? submitBtn.innerText : null;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
    }
    msgEl.style.color = '#fff';
    msgEl.textContent = 'Sending...';

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Robust parse: server might send empty body or plain text
      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (err) {
        // not JSON, but maybe plain message
        data = { message: text || '' };
      }

      if (res.ok) {
        msgEl.style.color = 'lightgreen';
        msgEl.textContent = data.message || 'Message sent! Thank you.';
        form.reset();
      } else {
        // show server side message if provided, else status code
        msgEl.style.color = 'tomato';
        msgEl.textContent = data.message || data.error || (`Server error ${res.status}`);
        console.error('Server responded with error:', res.status, data);
      }
    } catch (err) {
      console.error('Network or fetch error:', err);
      msgEl.style.color = 'tomato';
      msgEl.textContent = 'Network error. Please try again later.';
    } finally {
      // restore button
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
      // clear message after a few seconds
      setTimeout(() => { msgEl.textContent = ''; }, 6000);
    }
  });
});
