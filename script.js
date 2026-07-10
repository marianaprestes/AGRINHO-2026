// Menu Mobile Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Back to top
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Flashcards Flip
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Gráfico com Chart.js
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('agroChart').getContext('2d');
    
    const agroChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Soja', 'Milho', 'Trigo', 'Café', 'Cana-de-Açúcar', 'Algodão'],
            datasets: [{
                label: 'Produção 2024 (milhões de toneladas)',
                data: [155.5, 129.8, 9.2, 3.8, 763.5, 3.1],
                backgroundColor: [
                    'rgba(45, 106, 79, 0.8)',
                    'rgba(64, 145, 108, 0.8)',
                    'rgba(116, 198, 157, 0.8)',
                    'rgba(212, 163, 115, 0.8)',
                    'rgba(107, 79, 59, 0.8)',
                    'rgba(27, 67, 50, 0.8)'
                ],
                borderColor: [
                    'rgba(45, 106, 79, 1)',
                    'rgba(64, 145, 108, 1)',
                    'rgba(116, 198, 157, 1)',
                    'rgba(212, 163, 115, 1)',
                    'rgba(107, 79, 59, 1)',
                    'rgba(27, 67, 50, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            family: "'Nunito', sans-serif",
                            size: 14
                        },
                        color: '#1b4332'
                    }
                },
                title: {
                    display: true,
                    text: 'Principais Culturas Agrícolas do Brasil - 2024',
                    font: {
                        family: "'Nunito', sans-serif",
                        size: 18,
                        weight: 'bold'
                    },
                    color: '#1b4332',
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(45, 106, 79, 0.9)',
                    titleFont: {
                        family: "'Nunito', sans-serif",
                        size: 14
                    },
                    bodyFont: {
                        family: "'Open Sans', sans-serif",
                        size: 13
                    },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Milhões de Toneladas',
                        font: {
                            family: "'Open Sans', sans-serif",
                            size: 12,
                            weight: 'bold'
                        },
                        color: '#1b4332'
                    },
                    ticks: {
                        font: {
                            family: "'Open Sans', sans-serif",
                            size: 11
                        },
                        color: '#1b4332'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Culturas',
                        font: {
                            family: "'Open Sans', sans-serif",
                            size: 12,
                            weight: 'bold'
                        },
                        color: '#1b4332'
                    },
                    ticks: {
                        font: {
                            family: "'Open Sans', sans-serif",
                            size: 11
                        },
                        color: '#1b4332'
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });

    // Formulário de Contato
    const contatoForm = document.getElementById('contatoForm');
    
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;
        
        // Validação simples
        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }
        
        // Simulação de envio
        const btnSubmit = contatoForm.querySelector('.btn-submit');
        const originalText = btnSubmit.innerHTML;
        
        btnSubmit.innerHTML = '<span>Enviando...</span>';
        btnSubmit.disabled = true;
        
        setTimeout(() => {
            alert(`Mensagem enviada com sucesso!\n\nObrigado, ${nome}! Entraremos em contato em breve pelo e-mail ${email}.`);
            contatoForm.reset();
            btnSubmit.innerHTML = originalText;
            btnSubmit.disabled = false;
        }, 1500);
    });

    // Animação de entrada dos elementos ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    document.querySelectorAll('.pilar-card, .caso-card, .info-card, .flashcard').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito de digitação no hero (opcional)
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Iniciar após 1 segundo
        setTimeout(typeWriter, 1000);
    }
});

// Adicionar classe active no menu conforme scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Prevenir clique direito nas imagens (proteção básica)
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', e => e.preventDefault());
});

// Lazy loading para imagens
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback para browsers que não suportam lazy loading nativo
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}
