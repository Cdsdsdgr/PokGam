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

    particlesContainer.innerHTML = '';

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100; 
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;

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
            transform: translate(0, 0);
        `;

        particlesContainer.appendChild(particle);
    }

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
  
const pokemonList=['Treecko','Grovyle','Sceptile','Torchic','Combusken','Blaziken','Mudkip','Marshtomp','Swampert','Poochyena','Mightyena','Zigzagoon','Linoone','Wurmple','Silcoon','Beautifly','Cascoon','Dustox','Lotad','Lombre','Ludicolo','Swablu','Altaria','Horsea','Seadra','Kingdra','Volbeat','Illumise','Pikachu','Zangoose','Seviper','Rhyhorn','Rhydon','Rhyperior','Kecleon','Vulpix','Ninetales','Psyduck','Golduck','Heracross','Meditite','Medicham','Natu','Xatu','Shuppet','Banette','Beldum','Metang','Metagross','Dragonite','Onix','Cresselia','Ralts','Kirlia','Gardevoir','Lucario','Shaymin','Bellossom'];

const typesByPokemon={Treecko:['grass'],Grovyle:['grass'],Sceptile:['grass'],Torchic:['fire'],Combusken:['fire','fighting'],Blaziken:['fire','fighting'],Mudkip:['water'],Marshtomp:['water','ground'],Swampert:['water','ground'],Poochyena:['dark'],Mightyena:['dark'],Zigzagoon:['normal'],Linoone:['normal'],Wurmple:['bug'],Silcoon:['bug'],Beautifly:['bug','flying'],Cascoon:['bug'],Dustox:['bug','poison'],Lotad:['water','grass'],Lombre:['water','grass'],Ludicolo:['water','grass'],Swablu:['normal','flying'],Altaria:['dragon','flying'],Horsea:['water'],Seadra:['water'],Kingdra:['water','dragon'],Volbeat:['bug'],Illumise:['bug'],Pikachu:['electric'],Zangoose:['normal'],Seviper:['poison'],Rhyhorn:['ground','rock'],Rhydon:['ground','rock'],Rhyperior:['ground','rock'],Kecleon:['normal'],Vulpix:['fire'],Ninetales:['fire'],Psyduck:['water'],Golduck:['water'],Heracross:['bug','fighting'],Meditite:['fighting','psychic'],Medicham:['fighting','psychic'],Natu:['psychic','flying'],Xatu:['psychic','flying'],Shuppet:['ghost'],Banette:['ghost'],Beldum:['steel','psychic'],Metang:['steel','psychic'],Metagross:['steel','psychic'],Dragonite:['dragon','flying'],Onix:['rock','ground'],Cresselia:['psychic'],Ralts:['psychic','fairy'],Kirlia:['psychic','fairy'],Gardevoir:['psychic','fairy'],Lucario:['fighting','steel'],Shaymin:['grass'],Bellossom:['grass']};

function makeStats(seed){const base=(seed%80)+40;return{HP:base,ATK:Math.min(255,base+Math.floor(seed/3)),DEF:Math.max(30,base-10),SPD:Math.max(30,90-(seed%40))}};
function spriteFor(name){const n=name.toLowerCase().replace(/[^a-z0-9]/g,'');return`https://img.pokemondb.net/sprites/black-white/anim/normal/${n}.gif`;}

const pokedexEl=document.getElementById('pokedex');
const filterBtns=[...document.querySelectorAll('[data-filter]')];
const qInput=document.getElementById('q');

const pokedex=pokemonList.map((name,i)=>{const stats=makeStats(i+Math.floor(Math.random()*20));const types=typesByPokemon[name]||['normal'];return{id:i+1,name,types,sprite:spriteFor(name),stats}});

function render(list){pokedexEl.innerHTML='';list.forEach(p=>{const card=document.createElement('button');card.className='card';card.innerHTML=`<div class="sprite"><img loading="lazy" src="${p.sprite}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/96x96?text=?'"/></div><div class="title"><div class='id-number'>#${String(p.id).padStart(3,'0')}</div><h3>${p.name}</h3><div class='type-row'>${p.types.map(t=>`<div class='type-badge ${t}'>${t}</div>`).join('')}</div></div>`;card.addEventListener('click',()=>openModal(p));pokedexEl.appendChild(card)})}

function openModal(p){const modal=document.getElementById('modal');document.getElementById('modal-img').src=p.sprite;document.getElementById('modal-title').textContent=`#${String(p.id).padStart(3,'0')} ${p.name}`;const typesEl=document.getElementById('modal-types');typesEl.innerHTML='';p.types.forEach(t=>{const b=document.createElement('div');b.className='type-badge '+t;b.textContent=t;typesEl.appendChild(b)});const statsEl=document.getElementById('modal-stats');statsEl.innerHTML='';for(const[k,v]of Object.entries(p.stats)){const row=document.createElement('div');row.className='stat-row';row.innerHTML=`<div style='width:64px;font-size:12px;color:rgba(255,255,255,0.6);font-family:"Press Start 2P",cursive'>${k}</div><div class='bar'><div class='bar-fill' style='width:${Math.min(100,(v/300)*100)}%'></div></div><div style='width:40px;text-align:right;font-size:12px;color:#cfe9cf'>${v}</div>`;statsEl.appendChild(row)}modal.classList.add('show')}

document.getElementById('close').addEventListener('click',()=>document.getElementById('modal').classList.remove('show'));
window.addEventListener('click',e=>{if(e.target.id==='modal')document.getElementById('modal').classList.remove('show')});

filterBtns.forEach(b=>b.addEventListener('click',()=>{
  if(b.dataset.filter==='all'){
    filterBtns.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
  } else {
    b.classList.toggle('active');
    filterBtns.find(x=>x.dataset.filter==='all').classList.remove('active');
  }
  applyFilters();
}));

function applyFilters(){
  const q=qInput.value.trim().toLowerCase();
  const activeTypes=filterBtns.filter(b=>b.classList.contains('active')&&b.dataset.filter!=='all').map(b=>b.dataset.filter);
  const filtered=pokedex.filter(p=>{
    const matchesQ=!q||p.name.toLowerCase().includes(q)||String(p.id)===q;
    const matchesType=activeTypes.length===0||activeTypes.every(t=>p.types.includes(t));
    return matchesQ&&matchesType;
  });
  render(filtered);
}

qInput.addEventListener('input',applyFilters);
filterBtns[0].classList.add('active');
render(pokedex);
