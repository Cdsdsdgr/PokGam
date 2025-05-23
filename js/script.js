document.addEventListener('DOMContentLoaded', function() {

    const loadingScreen = document.querySelector('.loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
    

    createParticles();
    

    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.textContent = mainNav.classList.contains('active') ? '✕' : '☰';
    });
    

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
         
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.textContent = '☰';
                }
            }
        });
    });
    

    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
 
    const revealTextElements = document.querySelectorAll('.reveal-text');
    
    setTimeout(() => {
        revealTextElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 500);
    

    const revealTitle = document.querySelector('.reveal-title');
    if (revealTitle) {
        setTimeout(() => {
            revealTitle.classList.add('visible');
        }, 300);
    }
    

    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const storyText = document.querySelector('.story-text');
    
    function checkScrollReveal() {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8;
            
            if (elementTop < triggerPoint) {
                element.classList.add('visible');
            }
        });
        
        if (storyText) {
            const storyTextTop = storyText.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8;
            
            if (storyTextTop < triggerPoint) {
                storyText.classList.add('visible');
            }
        }
    }
    
  
    window.addEventListener('scroll', checkScrollReveal);
    window.addEventListener('load', checkScrollReveal);
    
 
    const parallaxImg = document.querySelector('.parallax-img');
    
    if (parallaxImg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const storySection = document.querySelector('.story');
            const storySectionTop = storySection.offsetTop;
            const storySectionHeight = storySection.offsetHeight;
            
            if (scrollPosition > storySectionTop - window.innerHeight && 
                scrollPosition < storySectionTop + storySectionHeight) {
                const relativeScroll = (scrollPosition - (storySectionTop - window.innerHeight)) / (storySectionHeight + window.innerHeight);
                const translateY = relativeScroll * 50; 
                
                parallaxImg.style.transform = `translateY(-${translateY}px)`;
            }
        });
    }
    

    const pokemonCards = document.querySelectorAll('.pokemon-card');
    
    pokemonCards.forEach(card => {
        const cardInner = card.querySelector('.card-inner');
        
        card.addEventListener('click', function() {
            cardInner.classList.toggle('flipped');
        });
    });
    
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            setTimeout(() => {
                card.querySelector('.feature-shine').style.left = '150%';
            }, 0);
        });
        
        card.addEventListener('mouseleave', function() {
            card.querySelector('.feature-shine').style.left = '-150%';
        });
    });
});


function createParticles() {
    const particlesContainer = document.getElementById('particles-background');
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const animationDuration = Math.random() * 20 + 10;
        const animationDelay = Math.random() * 10;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(0, 255, 110, ${opacity});
            left: ${posX}%;
            top: ${posY}%;
            border-radius: 50%;
            box-shadow: 0 0 ${size * 2}px rgba(0, 255, 110, ${opacity});
            pointer-events: none;
            animation: floatParticle ${animationDuration}s linear infinite;
            animation-delay: -${animationDelay}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
   
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
            100% {
                transform: translate(0, 0);
            }
        }
    `;
    document.head.appendChild(style);
    
   
    document.addEventListener('mousemove', function(e) {
        const particles = document.querySelectorAll('.particle');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach(particle => {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            const particleLeft = parseFloat(particle.style.left);
            const particleTop = parseFloat(particle.style.top);
            
           
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}


function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}


function handleScrollAnimations() {
   
    const statBars = document.querySelectorAll('.stat-fill');
    
    statBars.forEach(bar => {
        const card = bar.closest('.pokemon-card');
        
        if (isInViewport(card) && !bar.classList.contains('animated')) {
            setTimeout(() => {
                bar.classList.add('animated');
            }, 300);
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);