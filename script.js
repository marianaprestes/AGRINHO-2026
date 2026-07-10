// ========================================
// NAVEGAÇÃO E MENU MOBILE
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Efeito de scroll na navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Botão voltar ao topo
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Botão voltar ao topo
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// FLASHCARDS INTERATIVOS
// ========================================
function flipCard(card) {
    card.classList.toggle('flipped');
}

// ========================================
// GRÁFICO COM CHART.JS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('agricultureChart').getContext('2d');
    
    // Dados reais sobre o agronegócio brasileiro
    const agricultureChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Soja', 'Milho', 'Cana-de-Açúcar', 'Café', 'Trigo', 'Algodão'],
            datasets: [{
                label: 'Produção (Milhões de Toneladas)',
                data: [135.2, 115.8, 638.5, 3.8, 8.2, 2.9],
                backgroundColor: [
                    'rgba(45, 106, 79, 0.8)',
                    'rgba(82, 183, 136, 0.8)',
                    'rgba(116, 198, 157, 0.8)',
                    'rgba(149, 213, 178, 0.8)',
                    'rgba(182, 228, 199, 0.8)',
                    'rgba(210, 240, 220, 0.8)'
                ],
                borderColor: [
                    'rgba(45, 106, 79, 1)',
                    'rgba(82, 183, 136, 1)',
                    'rgba(116, 198, 157, 1)',
                    'rgba(149, 213, 178, 1)',
                    'rgba(182, 228, 199, 1)',
                    'rgba(210, 240, 220, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            family: "'Nunito', sans-serif",
                            size: 12
                        },
                        color: '#2b2d42'
                    }
                },
                title: {
                    display: true,
                    text: 'Principais Culturas Brasileiras - Safra 2023/2024',
                    font: {
                        family: "'Nunito', sans-serif",
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#1b4332',
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(27, 67, 50, 0.9)',
                    titleFont: {
                        family: "'Nunito', sans-serif",
                        size: 14
                    },
                    bodyFont: {
                        family: "'Open Sans', sans-serif",
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' milhões de toneladas';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        font: {
                            family: "'Open Sans', sans-serif"
                        },
                        color: '#666',
                        callback: function(value) {
                            return value + ' Mi t';
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: "'Open Sans', sans-serif"
                        },
                        color: '#666'
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
});

// ========================================
// ANIMAÇÃO DOS NÚMEROS (CONTAGEM)
// ========================================
const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Observador para animar números quando visíveis
const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                animateValue(num, 0, target, 2000);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-info');
if (statsSection) {
    observer.observe(statsSection);
}

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================
const contatoForm = document.getElementById('contatoForm');
const formMessage = document.getElementById('formMessage');

contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = new FormData(contatoForm);
    const nome = formData.get('nome');
    const email = formData.get('email');
    const assunto = formData.get('assunto');
    const mensagem = formData.get('mensagem');
    
    // Validação simples
    if (!nome || !email || !mensagem) {
        formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios.';
        formMessage.className = 'form-message error';
        return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.textContent = 'Por favor, insira um email válido.';
        formMessage.className = 'form-message error';
        return;
    }
    
    // Simular envio (em um caso real, você enviaria para um backend)
    const submitButton = contatoForm.querySelector('.btn-submit');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Simular delay de envio
    setTimeout(() => {
        formMessage.innerHTML = `
            <i class="fas fa-check-circle"></i> 
            <strong>Mensagem enviada com sucesso!</strong><br>
            Obrigado, ${nome}! Entraremos em contato em breve.
        `;
        formMessage.className = 'form-message success';
        contatoForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Esconder mensagem após 5 segundos
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }, 1500);
});

// ========================================
// ANIMAÇÃO AO SCROLL (INTERSECTION OBSERVER)
// ========================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.pilar-card, .caso-card, .galeria-item');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });
};

// Inicializar animações
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ========================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Considerar navbar fixa
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// LAZY LOADING DE IMAGENS
// ========================================
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

// ========================================
// EFEITO PARALLAX SUAVE
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// NEWSLETTER FORM (FOOTER)
// ========================================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            alert(`Obrigado por se inscrever! Em breve você receberá novidades do Agrinho no email: ${email}`);
            newsletterForm.reset();
        }
    });
}

// ========================================
// ACESSIBILIDADE - NAVEGAÇÃO POR TECLADO
// ========================================
document.addEventListener('keydown', (e) => {
    // Fechar menu mobile com ESC
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
});

// ========================================
// CONSOLE MESSAGE (BÔNUS)
// ========================================
console.log('%c🌱 Agrinho - Agro Forte, Futuro Sustentável', 'color: #2d6a4f; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️ para educação ambiental', 'color: #52b788; font-size: 12px;');
