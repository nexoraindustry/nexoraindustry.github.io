/**
 * Nexora Global Website - Main JavaScript File
 * Version: 1.4.0
 * Updated: Formspree integration fixed
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Menu Toggle =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            // Check if it's an internal link
            if (href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Enhanced CTA Section Styling =====
    function enhanceCTASections() {
        const ctaSections = document.querySelectorAll('.cta-section');
        
        ctaSections.forEach(section => {
            // Add background pattern
            section.style.background = `
                linear-gradient(135deg, rgba(0, 212, 255, 0.9) 0%, rgba(108, 99, 255, 0.9) 100%),
                url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')
            `;
            section.style.backgroundSize = 'cover';
            section.style.backgroundPosition = 'center';
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            
            // Add floating particles effect
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'cta-particles';
            particlesContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                pointer-events: none;
            `;
            
            // Create particles
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    animation: floatParticle ${3 + Math.random() * 4}s infinite ease-in-out;
                    animation-delay: ${Math.random() * 2}s;
                `;
                
                const size = 10 + Math.random() * 20;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                particlesContainer.appendChild(particle);
            }
            
            section.appendChild(particlesContainer);
            
            // Enhance CTA content
            const ctaContent = section.querySelector('.cta-content');
            if (ctaContent) {
                ctaContent.style.position = 'relative';
                ctaContent.style.zIndex = '2';
                ctaContent.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
                
                // Enhance buttons
                const buttons = section.querySelectorAll('.btn');
                buttons.forEach(btn => {
                    if (btn.classList.contains('btn-primary')) {
                        btn.style.background = 'white';
                        btn.style.color = '#6c63ff';
                        btn.style.border = '2px solid white';
                        btn.style.fontWeight = '600';
                        btn.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
                    } else if (btn.classList.contains('btn-secondary')) {
                        btn.style.background = 'transparent';
                        btn.style.color = 'white';
                        btn.style.border = '2px solid rgba(255, 255, 255, 0.7)';
                        btn.style.backdropFilter = 'blur(10px)';
                    }
                    
                    // Add hover effects
                    btn.addEventListener('mouseenter', () => {
                        btn.style.transform = 'translateY(-3px) scale(1.05)';
                        btn.style.transition = 'all 0.3s ease';
                    });
                    
                    btn.addEventListener('mouseleave', () => {
                        btn.style.transform = 'translateY(0) scale(1)';
                    });
                });
            }
            
            // Add floating animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes floatParticle {
                    0%, 100% {
                        transform: translateY(0) translateX(0) rotate(0deg);
                    }
                    33% {
                        transform: translateY(-20px) translateX(10px) rotate(120deg);
                    }
                    66% {
                        transform: translateY(10px) translateX(-10px) rotate(240deg);
                    }
                }
            `;
            document.head.appendChild(style);
        });
    }
    
    // ===== Form Validation and Submission =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = {
                name: this.querySelector('[name="name"]').value.trim(),
                email: this.querySelector('[name="email"]').value.trim(),
                phone: this.querySelector('[name="phone"]').value.trim(),
                service: this.querySelector('[name="service"]').value,
                message: this.querySelector('[name="message"]').value.trim(),
                _subject: "New Contact Form Submission from Nexora Global",
                _replyto: this.querySelector('[name="email"]').value.trim()
            };
            
            // Simple validation
            let isValid = true;
            const requiredFields = ['name', 'email', 'message'];
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                const errorElement = this.querySelector(`.error-${field}`);
                const value = formData[field];
                
                if (!value || value === '') {
                    isValid = false;
                    input.style.borderColor = '#ff4757';
                    input.style.boxShadow = '0 0 0 2px rgba(255, 71, 87, 0.2)';
                    if (errorElement) {
                        errorElement.textContent = 'This field is required';
                        errorElement.style.display = 'block';
                        errorElement.style.animation = 'shake 0.5s ease';
                    }
                } else {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                    if (errorElement) {
                        errorElement.style.display = 'none';
                    }
                    
                    // Email validation
                    if (field === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            isValid = false;
                            input.style.borderColor = '#ff4757';
                            input.style.boxShadow = '0 0 0 2px rgba(255, 71, 87, 0.2)';
                            if (errorElement) {
                                errorElement.textContent = 'Please enter a valid email address';
                                errorElement.style.display = 'block';
                                errorElement.style.animation = 'shake 0.5s ease';
                            }
                        }
                    }
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                try {
                    // Convert to URLSearchParams (form-urlencoded)
                    const formDataEncoded = new URLSearchParams();
                    Object.keys(formData).forEach(key => {
                        if (formData[key]) {
                            formDataEncoded.append(key, formData[key]);
                        }
                    });
                    
                    // Send to Formspree
                    const response = await fetch('https://formspree.io/f/mvzbzpyo', {
                        method: 'POST',
                        body: formDataEncoded,
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                    
                    // Add shake animation style
                    const shakeStyle = document.createElement('style');
                    shakeStyle.textContent = `
                        @keyframes shake {
                            0%, 100% { transform: translateX(0); }
                            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                            20%, 40%, 60%, 80% { transform: translateX(5px); }
                        }
                    `;
                    document.head.appendChild(shakeStyle);
                    
                    if (response.ok) {
                        // Show success message with animation
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.style.cssText = `
                            animation: slideDown 0.6s ease forwards;
                            margin-top: 1.5rem;
                        `;
                        successMessage.innerHTML = `
                            <div style="
                                background: linear-gradient(135deg, rgba(46, 204, 113, 0.15) 0%, rgba(39, 174, 96, 0.15) 100%);
                                border: 2px solid #2ecc71;
                                border-radius: 12px;
                                padding: 1.5rem;
                                color: #2ecc71;
                                display: flex;
                                align-items: center;
                                gap: 1rem;
                                box-shadow: 0 10px 30px rgba(46, 204, 113, 0.2);
                            ">
                                <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
                                <div>
                                    <strong style="display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">
                                        Message Sent Successfully!
                                    </strong>
                                    <span style="color: #27ae60;">
                                        Thank you! Your message has been sent. We'll get back to you within 24 hours.
                                    </span>
                                </div>
                            </div>
                        `;
                        
                        // Remove any existing messages
                        const existingMessages = this.querySelectorAll('.success-message, .error-message');
                        existingMessages.forEach(msg => msg.remove());
                        
                        this.appendChild(successMessage);
                        
                        // Reset form
                        this.reset();
                        
                        // Add confetti effect
                        createConfetti();
                        
                        // Scroll to success message
                        setTimeout(() => {
                            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 300);
                        
                        // Reset button
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                        }, 1500);
                        
                        // Remove success message after 8 seconds
                        setTimeout(() => {
                            if (successMessage.parentNode) {
                                successMessage.style.animation = 'slideUp 0.6s ease forwards';
                                setTimeout(() => successMessage.remove(), 600);
                            }
                        }, 8000);
                    } else {
                        throw new Error(`Form submission failed: ${response.status}`);
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    
                    // Show error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.style.cssText = `
                        animation: slideDown 0.6s ease forwards;
                        margin-top: 1.5rem;
                    `;
                    errorMessage.innerHTML = `
                        <div style="
                            background: linear-gradient(135deg, rgba(255, 71, 87, 0.15) 0%, rgba(231, 76, 60, 0.15) 100%);
                            border: 2px solid #ff4757;
                            border-radius: 12px;
                            padding: 1.5rem;
                            color: #ff4757;
                            display: flex;
                            align-items: center;
                            gap: 1rem;
                            box-shadow: 0 10px 30px rgba(255, 71, 87, 0.2);
                        ">
                            <i class="fas fa-exclamation-circle" style="font-size: 1.5rem;"></i>
                            <div>
                                <strong style="display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">
                                    Submission Failed
                                </strong>
                                <span style="color: #e74c3c;">
                                    Oops! Something went wrong. Please try again or contact us directly at 
                                    <a href="mailto:nexoraindustries@gmail.com" style="color: #ff4757; text-decoration: underline;">
                                        nexoraindustries@gmail.com
                                    </a>
                                </span>
                            </div>
                        </div>
                    `;
                    
                    // Remove any existing messages
                    const existingMessages = this.querySelectorAll('.success-message, .error-message');
                    existingMessages.forEach(msg => msg.remove());
                    
                    this.appendChild(errorMessage);
                    
                    // Scroll to error message
                    setTimeout(() => {
                        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Remove error message after 10 seconds
                    setTimeout(() => {
                        if (errorMessage.parentNode) {
                            errorMessage.style.animation = 'slideUp 0.6s ease forwards';
                            setTimeout(() => errorMessage.remove(), 600);
                        }
                    }, 10000);
                }
                
                // Add animations
                const animStyle = document.createElement('style');
                animStyle.textContent = `
                    @keyframes slideDown {
                        from {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes slideUp {
                        from {
                            opacity: 1;
                            transform: translateY(0);
                        }
                        to {
                            opacity: 0;
                            transform: translateY(-20px);
                        }
                    }
                `;
                document.head.appendChild(animStyle);
            } else {
                // Add shake animation to invalid fields
                const invalidFields = this.querySelectorAll('.form-control[style*="border-color: #ff4757"]');
                invalidFields.forEach(field => {
                    field.style.animation = 'shake 0.5s ease';
                    setTimeout(() => {
                        field.style.animation = '';
                    }, 500);
                });
            }
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                const errorElement = contactForm.querySelector(`.error-${this.name}`);
                
                if (this.value.trim() === '') {
                    this.style.borderColor = '#ff4757';
                    if (errorElement) {
                        errorElement.textContent = 'This field is required';
                        errorElement.style.display = 'block';
                    }
                } else {
                    this.style.borderColor = '';
                    if (errorElement) {
                        errorElement.style.display = 'none';
                    }
                    
                    // Email validation on blur
                    if (this.type === 'email' && this.value.trim() !== '') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(this.value)) {
                            this.style.borderColor = '#ff4757';
                            if (errorElement) {
                                errorElement.textContent = 'Please enter a valid email address';
                                errorElement.style.display = 'block';
                            }
                        }
                    }
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.style.borderColor = '#00d4ff';
                    const errorElement = contactForm.querySelector(`.error-${this.name}`);
                    if (errorElement) {
                        errorElement.style.display = 'none';
                    }
                }
            });
        });
    }
    
    // ===== Confetti Effect =====
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(confettiContainer);
        
        const colors = ['#00d4ff', '#6c63ff', '#2ecc71', '#ff4757', '#ffdd59'];
        
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                top: -20px;
                left: ${Math.random() * 100}vw;
                opacity: ${Math.random() * 0.7 + 0.3};
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
                transform: rotate(${Math.random() * 360}deg);
            `;
            
            confettiContainer.appendChild(confetti);
            
            // Random horizontal movement
            confetti.style.setProperty('--tx', `${(Math.random() - 0.5) * 200}px`);
        }
        
        // Add confetti animation
        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--tx, 0), 100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(confettiStyle);
        
        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.remove();
            confettiStyle.remove();
        }, 3000);
    }
    
    // ===== Animate Elements on Scroll =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .reason-card, .tech-item, .project-card, .value-card, .service-card-detailed').forEach(el => {
        observer.observe(el);
    });
    
    // ===== Current Year in Footer =====
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ===== Active Navigation Link Based on Scroll =====
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ===== Lazy Loading Images =====
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ===== Back to Top Button =====
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 56px;
        height: 56px;
        background: linear-gradient(135deg, #00d4ff 0%, #6c63ff 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        z-index: 1000;
        opacity: 0;
        transform: scale(0.8);
    `;
    
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'scale(1) rotate(0)';
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'flex';
            setTimeout(() => {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.transform = 'scale(1)';
            }, 10);
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (window.pageYOffset <= 300) {
                    backToTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // ===== Sticky Header =====
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== Counter Animation =====
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    }
    
    // Animate counters when in view
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                if (!isNaN(target)) {
                    animateCounter(entry.target, target, 2000);
                }
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // ===== Initialize CTA Enhancement =====
    enhanceCTASections();
    
    // ===== Test Formspree Connection =====
    function testFormspreeConnection() {
        console.log('Testing Formspree connection...');
        
        const testData = new URLSearchParams();
        testData.append('name', 'Test User');
        testData.append('email', 'test@example.com');
        testData.append('message', 'Testing Formspree connection');
        testData.append('_subject', 'Formspree Connection Test');
        testData.append('_replyto', 'test@example.com');
        
        fetch('https://formspree.io/f/mvzbzpyo', {
            method: 'POST',
            body: testData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('✅ Formspree connection successful!');
            } else {
                console.log('❌ Formspree connection failed');
            }
        })
        .catch(error => {
            console.log('❌ Formspree connection error:', error);
        });
    }
    
    // Uncomment to test Formspree on page load
    // setTimeout(testFormspreeConnection, 5000);
    
    // ===== Page Load Animation =====
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        console.log('Formspree endpoint: https://formspree.io/f/mvzbzpyo');
    });
});

// Alternative: Traditional form submission (works without JavaScript)
function submitFormTraditional(form) {
    // This function can be used as a fallback
    const formData = new URLSearchParams(new FormData(form));
    
    // Add Formspree specific fields
    const email = form.querySelector('[name="email"]').value;
    if (email) {
        formData.append('_replyto', email);
    }
    formData.append('_subject', 'New Contact Form Submission from Nexora Global');
    
    // Create a hidden iframe for submission
    const iframe = document.createElement('iframe');
    iframe.name = 'formspree-submit-' + Date.now();
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Create a form for traditional submission
    const submitForm = document.createElement('form');
    submitForm.method = 'POST';
    submitForm.action = 'https://formspree.io/f/mvzbzpyo';
    submitForm.target = iframe.name;
    submitForm.style.display = 'none';
    
    // Add all form data as hidden inputs
    formData.forEach((value, key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        submitForm.appendChild(input);
    });
    
    document.body.appendChild(submitForm);
    submitForm.submit();
    
    // Clean up
    setTimeout(() => {
        iframe.remove();
        submitForm.remove();
    }, 5000);
    
    return false;
}