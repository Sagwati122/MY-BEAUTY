// =============================================
// MY BEAUTY, YOUR BEAUTY - Main JavaScript File
// =============================================

// ---------- DOM ELEMENTS ----------
const navLinks = document.querySelectorAll('nav a');
const logo = document.querySelector('.logo');
const mainImage = document.querySelector('main img');
const header = document.querySelector('header');

// ---------- NAVIGATION ACTIVE STATE ----------
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
    });
});

// ---------- HIGHLIGHT CURRENT PAGE IN NAV ----------
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}

highlightCurrentPage();

// ---------- NAVBAR SCROLL EFFECT ----------
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ---------- MOBILE HAMBURGER MENU ----------
function createMobileMenu() {
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = '&#9776;'; // ☰ icon
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');

    const nav = document.querySelector('nav');
    nav.parentNode.insertBefore(hamburger, nav);

    // Toggle menu on click
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
        hamburger.classList.toggle('open');

        // Animate hamburger icon
        if (hamburger.classList.contains('open')) {
            hamburger.innerHTML = '&#10005;'; // ✕ icon
        } else {
            hamburger.innerHTML = '&#9776;'; // ☰ icon
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('mobile-open');
            hamburger.classList.remove('open');
            hamburger.innerHTML = '&#9776;';
        });
    });
}

createMobileMenu();

// ---------- MAIN IMAGE HOVER EFFECT ----------
if (mainImage) {
    mainImage.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.5s ease';
        this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
    });

    mainImage.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
}

// ---------- TYPEWRITER EFFECT FOR HEADING ----------
function typeWriter(element, text, speed = 80) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Apply typewriter to h1
const heading = document.querySelector('h1');
if (heading) {
    const headingText = heading.textContent;
    typeWriter(heading, headingText, 100);
}

// ---------- LOGO CLICK - GO HOME ----------
if (logo) {
    logo.style.cursor = 'pointer';
    logo.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// ---------- WELCOME POPUP (First Visit) ----------
function showWelcomeMessage() {
    if (!sessionStorage.getItem('welcomed')) {
        setTimeout(() => {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.classList.add('welcome-popup');
            welcomeMsg.innerHTML = `
                <div class="welcome-content">
                    <h3>✨ Welcome to My Beauty! ✨</h3>
                    <p>Discover your true beauty with us.</p>
                    <button onclick="this.parentElement.parentElement.remove()">
                        Let's Explore!
                    </button>
                </div>
            `;
            document.body.appendChild(welcomeMsg);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (welcomeMsg.parentElement) {
                    welcomeMsg.style.opacity = '0';
                    setTimeout(() => welcomeMsg.remove(), 500);
                }
            }, 5000);

            sessionStorage.setItem('welcomed', 'true');
        }, 2000);
    }
}

showWelcomeMessage();

// ---------- SCROLL TO TOP BUTTON ----------
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.classList.add('scroll-to-top');
    scrollBtn.innerHTML = '&#8679;'; // ↑ arrow
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createScrollToTop();

// ---------- IMAGE LAZY LOADING EFFECT ----------
function addFadeInEffect() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 1s ease';

        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
        }
    });
}

addFadeInEffect();

// ---------- PARALLAX EFFECT ON MAIN IMAGE ----------
window.addEventListener('scroll', () => {
    if (mainImage) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        mainImage.style.transform = `translateY(${rate}px)`;
    }
});

// ---------- CURRENT DATE/TIME DISPLAY ----------
function displayDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const dateStr = now.toLocaleDateString('en-US', options);

    const dateDisplay = document.createElement('p');
    dateDisplay.classList.add('date-display');
    dateDisplay.textContent = dateStr;

    const nav = document.querySelector('nav');
    if (nav) {
        nav.parentNode.insertBefore(dateDisplay, nav.nextSibling);
    }
}

displayDateTime();

// ---------- CONSOLE BRANDING ----------
console.log('%c✨ MY BEAUTY, YOUR BEAUTY ✨', 
    'color: #e91e63; font-size: 24px; font-weight: bold;');
console.log('%cWe Care For You Coz You Care For Us', 
    'color: #9c27b0; font-size: 14px;');
    // =============================================
// ABOUT US PAGE - JavaScript File
// MY BEAUTY, YOUR BEAUTY
// =============================================

// ---------- WAIT FOR DOM TO LOAD ----------
document.addEventListener('DOMContentLoaded', () => {

    // ---------- ELEMENTS ----------
    const headings = document.querySelectorAll('main h1');
    const paragraphs = document.querySelectorAll('main p');
    const images = document.querySelectorAll('main ~ img');
    const mainSection = document.querySelector('main');

    // ---------- 1. TYPEWRITER EFFECT FOR HEADING ----------
    headings.forEach(heading => {
        const text = heading.textContent;
        heading.textContent = '';
        heading.style.borderRight = '3px solid #e91e63';

        let i = 0;
        function type() {
            if (i < text.length) {
                heading.textContent += text.charAt(i);
                i++;
                setTimeout(type, 120);
            } else {
                // Blink cursor then remove it
                setTimeout(() => {
                    heading.style.borderRight = 'none';
                }, 1500);
            }
        }
        type();
    });

    // ---------- 2. SCROLL-TRIGGERED FADE-IN FOR PARAGRAPHS ----------
    paragraphs.forEach(p => {
        p.classList.add('fade-element');
    });

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    paragraphs.forEach(p => fadeObserver.observe(p));

    // ---------- 3. IMAGE HOVER & CLICK EFFECTS ----------
    images.forEach((img, index) => {
        // Add class for styling
        img.classList.add('about-image');

        // Staggered entrance animation
        img.style.opacity = '0';
        img.style.transform = 'translateY(30px)';
        img.style.transition = `all 0.8s ease ${index * 0.3}s`;

        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'translateY(0)';
        }, 500);

        // Hover effect
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.08) rotate(2deg)';
            img.style.boxShadow = '0 15px 35px rgba(233, 30, 99, 0.4)';
            img.style.zIndex = '10';
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1) rotate(0)';
            img.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            img.style.zIndex = '1';
        });

        // Click to enlarge (lightbox effect)
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });

    // ---------- 4. LIGHTBOX FOR IMAGES ----------
    function openLightbox(src, alt) {
        // Remove existing lightbox if any
        const existing = document.querySelector('.lightbox');
        if (existing) existing.remove();

        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${src}" alt="${alt}">
                <p>${alt || 'Beauty Image'}</p>
            </div>
        `;
        document.body.appendChild(lightbox);

        // Fade in
        setTimeout(() => lightbox.classList.add('active'), 10);

        // Close handlers
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => closeLightbox(lightbox));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox(lightbox);
        });

        // Close on ESC key
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox(lightbox);
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    function closeLightbox(lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.remove(), 300);
    }

    // ---------- 5. ANIMATED STATISTICS COUNTER ----------
    function addStatsSection() {
        const statsHTML = `
            <section class="stats-section">
                <div class="stat-item">
                    <span class="stat-number" data-target="5000">0</span>
                    <span class="stat-label">Happy Customers</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" data-target="50">0</span>
                    <span class="stat-label">Products</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" data-target="10">0</span>
                    <span class="stat-label">Years Experience</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" data-target="100">0</span>
                    <span class="stat-label">% Certified</span>
                </div>
            </section>
        `;

        mainSection.insertAdjacentHTML('afterend', statsHTML);

        // Animate counters when visible
        const statNumbers = document.querySelectorAll('.stat-number');

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(document.querySelector('.stats-section'));

        function animateCounters() {
            statNumbers.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString() + (target === 100 ? '' : '+');
                    }
                };
                updateCounter();
            });
        }
    }

    addStatsSection();

    // ---------- 6. READING PROGRESS BAR ----------
    function createProgressBar() {
        const bar = document.createElement('div');
        bar.classList.add('reading-progress');
        document.body.appendChild(bar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            bar.style.width = progress + '%';
        });
    }

    createProgressBar();

    // ---------- 7. HIGHLIGHT KEYWORDS IN PARAGRAPHS ----------
    const keywords = ['skincare', 'love', 'legit', 'certificate', 'community'];

    paragraphs.forEach(p => {
        let html = p.innerHTML;
        keywords.forEach(word => {
            const regex = new RegExp(`(${word})`, 'gi');
            html = html.replace(regex, '<span class="highlight">$1</span>');
        });
        p.innerHTML = html;
    });

    // ---------- 8. PARALLAX ON IMAGES ----------
    window.addEventListener('scroll', () => {
        images.forEach((img, i) => {
            const speed = (i + 1) * 0.15;
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (rect.top - window.innerHeight) * speed;
                img.style.objectPosition = `center ${offset}px`;
            }
        });
    });

    // ---------- 9. CONSOLE BRANDING ----------
    console.log('%c💖 About Us - MY BEAUTY, YOUR BEAUTY 💖',
        'color: #e91e63; font-size: 20px; font-weight: bold;');
    console.log('%cHelping people love their skin since day one!',
        'color: #9c27b0; font-size: 14px; font-style: italic;');

}); // End DOMContentLoaded
// =============================================
// ENQUIRY / APPOINTMENT FORM - JavaScript
// MY BEAUTY, YOUR BEAUTY
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ---------- 1. FIX HTML BUGS & ENHANCE INPUTS ----------
    const appointmentType = document.getElementById('typeofbusiness');
    const eventDate = document.getElementById('eventdate');
    
    // Fix invalid input type for appointment
    if (appointmentType) appointmentType.type = 'text'; 
    
    // Change event date to a proper date picker and set min date to today
    if (eventDate) {
        eventDate.type = 'date';
        eventDate.min = new Date().toISOString().split('T')[0]; 
    }

    // Fix duplicate 'for' attributes on checkbox labels
    const checkboxes = document.querySelectorAll('input[name="Contact time"]');
    const checkboxLabels = document.querySelectorAll('.checkbox-group label');
    checkboxes.forEach((cb, index) => {
        const uniqueId = `contact_${cb.value.toLowerCase()}`;
        cb.id = uniqueId;
        if (checkboxLabels[index]) {
            checkboxLabels[index].setAttribute('for', uniqueId);
        }
    });

    // Update footer year dynamically
    const footerText = document.querySelector('footer p');
    if (footerText && footerText.textContent.includes('2024')) {
        footerText.innerHTML = footerText.innerHTML.replace('2024', new Date().getFullYear());
    }

    // ---------- 2. GRAB FORM ELEMENTS ----------
    const form = document.querySelector('form');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phoneNumber = document.getElementById('phonenumber');

    // ---------- 3. HELPER FUNCTIONS FOR ERRORS ----------
    function showError(input, message) {
        clearError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Insert error message right after the input
        if (input.type === 'checkbox') {
            document.querySelector('fieldset').appendChild(errorDiv);
        } else {
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
        input.classList.add('input-error');
    }

    function clearError(input) {
        let errorDiv;
        if (input.type === 'checkbox') {
            errorDiv = document.querySelector('fieldset .error-message');
        } else {
            errorDiv = input.parentNode.querySelector('.error-message');
        }
        if (errorDiv) errorDiv.remove();
        input.classList.remove('input-error');
    }

    // ---------- 4. VALIDATION FUNCTIONS ----------
    function validateName(input, fieldName) {
        const value = input.value.trim();
        if (!value) { showError(input, `${fieldName} is required.`); return false; }
        if (!/^[a-zA-Z\s'-]+$/.test(value)) { showError(input, `${fieldName} should only contain letters.`); return false; }
        if (value.length < 2) { showError(input, `${fieldName} must be at least 2 characters.`); return false; }
        clearError(input); return true;
    }

    function validateEmail(input) {
        const value = input.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) { showError(input, 'Email is required.'); return false; }
        if (!regex.test(value)) { showError(input, 'Please enter a valid email address.'); return false; }
        clearError(input); return true;
    }

    function validatePhone(input) {
        const value = input.value.trim();
        const digitsOnly = value.replace(/\D/g, '');
        if (!value) { showError(input, 'Phone number is required.'); return false; }
        if (digitsOnly.length < 10 || digitsOnly.length > 15) { showError(input, 'Enter a valid phone number (10-15 digits).'); return false; }
        clearError(input); return true;
    }

    function validateAppointment(input) {
        const value = input.value.trim();
        if (!value) { showError(input, 'Appointment type is required.'); return false; }
        clearError(input); return true;
    }

    function validateDate(input) {
        const value = input.value;
        if (!value) { showError(input, 'Event date is required.'); return false; }
        clearError(input); return true;
    }

    function validateContactTime() {
        const isChecked = Array.from(checkboxes).some(cb => cb.checked);
        const fieldset = document.querySelector('fieldset');
        const existingError = fieldset.querySelector('.error-message');
        if (existingError) existingError.remove();

        if (!isChecked) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = 'Please select at least one preferred contact time.';
            fieldset.appendChild(errorDiv);
            return false;
        }
        return true;
    }

    // ---------- 5. REAL-TIME INPUT FORMATTING ----------
    // Only allow letters in name fields
    [firstName, lastName].forEach(input => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^a-zA-Z\s'-]/g, '');
        });
    });

    // Real-time validation on blur (when user clicks out of input)
    firstName.addEventListener('blur', () => validateName(firstName, 'First Name'));
    lastName.addEventListener('blur', () => validateName(lastName, 'Last Name'));
    email.addEventListener('blur', () => validateEmail(email));
    phoneNumber.addEventListener('blur', () => validatePhone(phoneNumber));
    appointmentType.addEventListener('blur', () => validateAppointment(appointmentType));
    eventDate.addEventListener('blur', () => validateDate(eventDate));

    // ---------- 6. FORM SUBMISSION ----------
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop actual form submission

        // Run all validations
        const validations = [
            validateName(firstName, 'First Name'),
            validateName(lastName, 'Last Name'),
            validateEmail(email),
            validatePhone(phoneNumber),
            validateAppointment(appointmentType),
            validateDate(eventDate),
            validateContactTime()
        ];

        // If ALL validations pass
        if (validations.every(v => v === true)) {
            showSuccessModal();
            form.reset(); // Clear the form
            
            // Clear any lingering error styles
            document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
        } else {
            // Scroll to the first error
            const firstError = document.querySelector('.input-error, fieldset .error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // ---------- 7. SUCCESS MODAL ----------
    function showSuccessModal() {
        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="success-icon">✓</div>
                <h2>Appointment Booked!</h2>
                <p>Thank you for choosing <strong>My Beauty, Your Beauty</strong>.</p>
                <p>We will contact you shortly to confirm your appointment details.</p>
                <button id="closeModal">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Trigger fade-in animation
        setTimeout(() => modal.classList.add('active'), 10);

        // Close modal events
        document.getElementById('closeModal').addEventListener('click', () => closeModal(modal));
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }

});
// =============================================
// CONTACT US PAGE - JavaScript File
// MY BEAUTY, YOUR BEAUTY
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---------- 1. TYPEWRITER EFFECT FOR HEADING ----------
    const heading = document.querySelector('h1');
    if (heading) {
        const text = heading.textContent;
        heading.textContent = '';
        heading.style.borderRight = '3px solid #e91e63';
        heading.style.display = 'inline-block';

        let i = 0;
        function type() {
            if (i < text.length) {
                heading.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(() => { heading.style.borderRight = 'none'; }, 1500);
            }
        }
        type();
    }

    // ---------- 2. TRANSFORM PLAIN TEXT INTO INTERACTIVE LINKS ----------
    const paragraphs = document.querySelectorAll('p');

    paragraphs.forEach(p => {
        const text = p.textContent.trim();

        // --- A. EMAIL ENHANCEMENT ---
        if (text.toUpperCase().includes('EMAIL')) {
            const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
            if (emailMatch) {
                const email = emailMatch[0];
                p.innerHTML = `
                    <span class="contact-label">📧 EMAIL:</span> 
                    <a href="mailto:${email}" class="contact-link">${email}</a>
                    <button class="copy-btn" data-copy="${email}" title="Copy Email">📋 Copy</button>
                `;
            }
        }

        // --- B. PHONE NUMBER ENHANCEMENT ---
        else if (text.toUpperCase().includes('CALL')) {
            // Extract numbers (handling spaces, dashes, and slashes)
            const numbers = text.match(/[\d\s-]+/g) || [];
            let linksHTML = '';
            
            numbers.forEach(num => {
                const cleanNum = num.replace(/\s|-/g, '');
                if (cleanNum.length >= 10) {
                    linksHTML += `<a href="tel:+27${cleanNum.substring(1)}" class="contact-link phone-link">📞 ${num.trim()}</a> `;
                }
            });

            p.innerHTML = `
                <span class="contact-label">📱 CALL US:</span> 
                ${linksHTML}
                <button class="copy-btn" data-copy="${numbers.join(' / ')}" title="Copy Numbers">📋 Copy</button>
            `;
        }

        // --- C. FACEBOOK ENHANCEMENT ---
        else if (text.toUpperCase().includes('FACEBOOK')) {
            const fbName = "MY BEAUTY,YOUR BEAUTY"; // Hardcoded for the link
            const fbUrl = `https://www.facebook.com/search/top?q=${encodeURIComponent(fbName)}`;
            
            p.innerHTML = `
                <span class="contact-label">👍 FACEBOOK:</span> 
                <a href="${fbUrl}" target="_blank" class="contact-link">${text.replace('FACEBOOK NAME:', '').trim()}</a>
                <button class="copy-btn" data-copy="${fbName}" title="Copy Page Name">📋 Copy</button>
            `;
        }

        // --- D. WALK-IN ENHANCEMENT ---
        else if (text.toLowerCase().includes('walk in')) {
            p.innerHTML = `
                <span class="walk-in-text">📍 <strong>${text}</strong></span>
                <button class="directions-btn" onclick="alert('Please add your physical address here to open Google Maps!')">🗺️ Get Directions</button>
            `;
            p.classList.add('walk-in-paragraph');
        }
    });

    // ---------- 3. COPY TO CLIPBOARD FUNCTIONALITY ----------
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Show success toast
                showToast(`Copied: ${textToCopy}`);
                
                // Button feedback
                const originalText = this.innerHTML;
                this.innerHTML = '✅ Copied!';
                this.style.background = '#4caf50';
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                showToast('Failed to copy. Please copy manually.');
            });
        });
    });

    // ---------- 4. TOAST NOTIFICATION SYSTEM ----------
    function showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }

    // ---------- 5. STAGGERED FADE-IN ANIMATION ----------
    const contactElements = document.querySelectorAll('h1, h2, p, .walk-in-paragraph');
    
    contactElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${index * 0.15}s`;

        // Trigger animation after a slight delay
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });

    // ---------- 6. PULSE EFFECT FOR WALK-IN TEXT ----------
    const walkInText = document.querySelector('.walk-in-text');
    if (walkInText) {
        setInterval(() => {
            walkInText.style.transform = 'scale(1.02)';
            setTimeout(() => {
                walkInText.style.transform = 'scale(1)';
            }, 500);
        }, 3000);
    }

    // ---------- 7. CONSOLE BRANDING ----------
    console.log('%c📞 Contact Us - MY BEAUTY, YOUR BEAUTY 📞', 
        'color: #e91e63; font-size: 20px; font-weight: bold;');
    console.log('%cReach out to us! We would love to hear from you.', 
        'color: #9c27b0; font-size: 14px;');

});
// =============================================
// PRODUCTS PAGE - JavaScript File
// MY BEAUTY, YOUR BEAUTY
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---------- 1. ENHANCE THE DISCLAIMER TEXT ----------
    // Find the paragraph containing the <h6> warning text
    const allParagraphs = document.querySelectorAll('p');
    allParagraphs.forEach(p => {
        if (p.querySelector('h6')) {
            const warningText = p.querySelector('h6').textContent;
            // Transform it into a styled warning box
            p.className = 'disclaimer-box';
            p.innerHTML = `
                <div class="disclaimer-icon">⚠️</div>
                <div class="disclaimer-text">
                    <strong>Important Return Policy:</strong>
                    <p>${warningText}</p>
                </div>
            `;
        }
    });

    // ---------- 2. SETUP IMAGE GALLERY & OVERLAYS ----------
    const productImages = document.querySelectorAll('main img');
    const imageSources = Array.from(productImages).map(img => img.src);
    let currentIndex = 0;

    productImages.forEach((img, index) => {
        // Create a wrapper for the image and overlay
        const wrapper = document.createElement('div');
        wrapper.classList.add('product-img-wrapper');
        
        // Add scroll animation classes
        wrapper.classList.add('scroll-reveal');
        wrapper.style.transitionDelay = `${index * 0.1}s`;

        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        // Create hover overlay
        const overlay = document.createElement('div');
        overlay.classList.add('img-overlay');
        overlay.innerHTML = '<span class="zoom-icon">🔍 View</span>';
        wrapper.appendChild(overlay);

        // Click to open lightbox
        wrapper.addEventListener('click', () => openLightbox(index));
    });

    // ---------- 3. LIGHTBOX FUNCTIONALITY ----------
    function openLightbox(index) {
        currentIndex = index;
        
        // Create lightbox structure
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-modal';
        lightbox.innerHTML = `
            <div class="lightbox-container">
                <span class="lightbox-close">&times;</span>
                <button class="lightbox-nav lightbox-prev">&#10094;</button>
                <div class="lightbox-content">
                    <img src="${imageSources[currentIndex]}" alt="Product Image" class="lightbox-img">
                    <div class="lightbox-counter">${currentIndex + 1} / ${imageSources.length}</div>
                </div>
                <button class="lightbox-nav lightbox-next">&#10095;</button>
            </div>
        `;
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Trigger fade-in
        setTimeout(() => lightbox.classList.add('active'), 10);

        // Event Listeners
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); changeImage(-1); });
        lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); changeImage(1); });
        
        // Close when clicking outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-container')) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
    }

    function closeLightbox() {
        const lightbox = document.querySelector('.lightbox-modal');
        if (lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.remove();
                document.body.style.overflow = ''; // Restore scrolling
            }, 300);
        }
        document.removeEventListener('keydown', handleKeyboard);
    }

    function changeImage(direction) {
        currentIndex += direction;
        if (currentIndex < 0) currentIndex = imageSources.length - 1;
        if (currentIndex >= imageSources.length) currentIndex = 0;
        
        const lightboxImg = document.querySelector('.lightbox-img');
        const counter = document.querySelector('.lightbox-counter');
        
        // Add a quick fade effect when changing images
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = imageSources[currentIndex];
            counter.textContent = `${currentIndex + 1} / ${imageSources.length}`;
            lightboxImg.style.opacity = '1';
        }, 200);
    }

    function handleKeyboard(e) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
    }

    // ---------- 4. SCROLL REVEAL ANIMATION ----------
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // ---------- 5. CONSOLE BRANDING ----------
    console.log('%c💄 Products - MY BEAUTY, YOUR BEAUTY 💄', 
        'color: #e91e63; font-size: 20px; font-weight: bold;');
    console.log('%cClick on any product image to view it in full size!', 
        'color: #9c27b0; font-size: 14px;');

});
// =============================================
// WORKING HOURS PAGE - JavaScript File
// MY BEAUTY, YOUR BEAUTY
// =============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---------- 1. TYPEWRITER EFFECT FOR MAIN HEADING ----------
    const heading = document.querySelector('h1');
    if (heading) {
        const text = heading.textContent;
        heading.textContent = '';
        heading.style.borderRight = '3px solid #e91e63';
        heading.style.display = 'inline-block';

        let i = 0;
        function type() {
            if (i < text.length) {
                heading.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            } else {
                setTimeout(() => { heading.style.borderRight = 'none'; }, 1500);
            }
        }
        type();
    }

    // ---------- 2. CREATE LIVE CLOCK & DATE DISPLAY ----------
    const clockContainer = document.createElement('div');
    clockContainer.id = 'live-clock';
    clockContainer.innerHTML = `
        <div class="clock-time">00:00:00</div>
        <div class="clock-date">Loading date...</div>
    `;
    
    // Insert clock right after the main heading or at the top of the section
    const firstP = document.querySelector('p');
    if (firstP) {
        firstP.parentNode.insertBefore(clockContainer, firstP);
    }

    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true 
        });
        const dateString = now.toLocaleDateString('en-US', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
        });
        
        const timeEl = clockContainer.querySelector('.clock-time');
        const dateEl = clockContainer.querySelector('.clock-date');
        if (timeEl) timeEl.textContent = timeString;
        if (dateEl) dateEl.textContent = dateString;
    }
    
    updateClock(); // Run immediately
    setInterval(updateClock, 1000); // Update every second

    // ---------- 3. CALCULATE & DISPLAY OPEN/CLOSED STATUS ----------
    function getStoreStatus() {
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const currentTime = now.getHours() * 60 + now.getMinutes();

        let openTime, closeTime;

        if (day >= 1 && day <= 4) { // Monday to Thursday
            openTime = 8 * 60;       // 08:00
            closeTime = 20 * 60 + 30; // 20:30
        } else if (day === 5) {      // Friday
            openTime = 9 * 60 + 30;  // 09:30
            closeTime = 17 * 60;     // 17:00
        } else {                     // Saturday & Sunday
            openTime = 9 * 60 + 30;  // 09:30
            closeTime = 15 * 60;     // 15:00
        }

        const isOpen = currentTime >= openTime && currentTime < closeTime;
        
        // Calculate time until next open or close
        let nextEventTime;
        if (isOpen) {
            nextEventTime = closeTime;
        } else {
            nextEventTime = currentTime < openTime ? openTime : (24 * 60) + openTime;
        }
        
        const diff = nextEventTime - currentTime;
        const hrs = Math.floor(diff / 60);
        const mins = diff % 60;

        return {
            isOpen,
            statusText: isOpen ? "OPEN" : "CLOSED",
            color: isOpen ? "#4caf50" : "#f44336",
            message: isOpen ? `Closes in ${hrs}h ${mins}m` : `Opens in ${hrs}h ${mins}m`
        };
    }

    // Create and insert the Status Badge
    const statusInfo = getStoreStatus();
    const statusBadge = document.createElement('div');
    statusBadge.className = 'store-status-badge';
    statusBadge.style.setProperty('--status-color', statusInfo.color);
    statusBadge.innerHTML = `
        <span class="status-dot"></span>
        <span class="status-text">${statusInfo.statusText}</span>
        <span class="status-message">${statusInfo.message}</span>
    `;
    
    // Insert badge at the very top of the section/main
    const mainSection = document.querySelector('main') || document.querySelector('section') || document.body;
    mainSection.prepend(statusBadge);

    // Update status every minute
    setInterval(() => {
        const newStatus = getStoreStatus();
        statusBadge.style.setProperty('--status-color', newStatus.color);
        statusBadge.querySelector('.status-text').textContent = newStatus.statusText;
        statusBadge.querySelector('.status-message').textContent = newStatus.message;
    }, 60000);

    // ---------- 4. HIGHLIGHT TODAY'S SCHEDULE ----------
    const today = new Date().getDay();
    const headings = document.querySelectorAll('h4');

    headings.forEach(h4 => {
        const text = h4.textContent.trim().toUpperCase();
        let isToday = false;

        if (today >= 1 && today <= 4 && text.includes('MONDAY')) isToday = true;
        if (today === 5 && text.includes('FRIDAY')) isToday = true;
        if ((today === 0 || today === 6) && text.includes('SATURDAY')) isToday = true;

        if (isToday) {
            // Highlight the heading
            h4.classList.add('today-heading');
            h4.innerHTML += ' <span class="today-tag">👈 TODAY</span>';

            // Highlight the corresponding time paragraph
            const timeP = h4.nextElementSibling;
            if (timeP && timeP.tagName === 'P') {
                timeP.classList.add('today-time');
            }
        }
        
        // Add animation class to all schedule blocks
        h4.classList.add('fade-in-up');
        if (h4.nextElementSibling && h4.nextElementSibling.tagName === 'P') {
            h4.nextElementSibling.classList.add('fade-in-up');
        }
    });

    // ---------- 5. ENHANCE PUBLIC HOLIDAYS TEXT ----------
    const allParagraphs = document.querySelectorAll('p');
    allParagraphs.forEach(p => {
        if (p.textContent.includes('NB:')) {
            p.classList.add('holiday-note');
            p.innerHTML = `💡 <strong>Note:</strong> ${p.textContent.replace('NB: ', '')}`;
        }
    });

    // ---------- 6. STAGGERED SCROLL ANIMATIONS ----------
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));

    // ---------- 7. CONSOLE BRANDING ----------
    console.log('%c⏰ Working Hours - MY BEAUTY, YOUR BEAUTY ⏰', 
        'color: #e91e63; font-size: 20px; font-weight: bold;');
    console.log(`%cStore is currently: ${statusInfo.statusText}`, 
        `color: ${statusInfo.color}; font-size: 16px; font-weight: bold;`);

});