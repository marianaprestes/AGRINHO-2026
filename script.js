// Menu Mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
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
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Back to top
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Flashcards
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Gráfico com Chart.js
document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('agroChart').getContext('2d');
    
    // Dados reais do agronegócio brasileiro (fontes: IBGE, Embrapa 2024)
    const agroChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Soja', 'Milho', 'Cana-de-açúcar', 'Café', 'Trigo', 'Algodão'],
            datasets: [{
                label: 'Produção (milhões de toneladas)',
                data: [155.5, 125.2, 760.5, 3.8, 11.2, 3.1],
                backgroundColor: [
                    'rgba(46, 125, 50, 0.8)',
                    'rgba(102, 187, 106, 0.8)',
                    'rgba(255, 152, 0, 0.8)',
                    'rgba(27, 94, 32, 0.8)',
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(139, 195, 74, 0.8)'
                ],
                borderColor: [
                    'rgb(46, 125, 50)',
                    'rgb(102, 187, 106)',
                    'rgb(255, 152, 0)',
                    'rgb(27, 94, 32)',
                    'rgb(76, 175, 80)',
                    'rgb(139, 195, 74)'
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
                },
                title: {
                    display: true,
                    text: 'Principais Culturas do Agronegócio Brasileiro (2024)',
                    font: {
                        size: 16,
                        family: 'Poppins'
                    }
                },
                tooltip: {
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
                    title: {
                        display: true,
                        text: 'Milhões de toneladas'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
    
    // Animação dos números
    animateNumbers();
});

// Animação de contagem dos números
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                number.textContent = target;
                clearInterval(timer);
            } else {
                number.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Quiz Interativo
const questions = [
    {
        question: "Qual técnica de plantio ajuda a reduzir a erosão do solo mantendo a palhada na superfície?",
        options: ["Plantio Convencional", "Plantio Direto", "Plantio em Curvas de Nível", "Plantio Hidropônico"],
        correct: 1
    },
    {
        question: "O que significa ILPF?",
        options: [
            "Integração Lavoura-Pecuária-Floresta",
            "Irrigação Localizada Para Fazendas",
            "Instituto de Lavradores do País",
            "Indústria de Laticínios e Produtos Frescos"
        ],
        correct: 0
    },
    {
        question: "Qual porcentagem do PIB brasileiro representa o agronegócio?",
        options: ["10%", "15%", "25%", "35%"],
        correct: 2
    },
    {
        question: "Qual a importância das abelhas para a agricultura?",
        options: [
            "Produzem mel apenas",
            "Polinizam 75% das culturas alimentares",
            "Controlam pragas do solo",
            "Fertilizam naturalmente o solo"
        ],
        correct: 1
    },
    {
        question: "O que é agricultura de precisão?",
        options: [
            "Plantar apenas culturas orgânicas",
            "Uso de tecnologia para otimizar recursos e aumentar produtividade",
            "Cultivar em pequenas áreas",
            "Usar apenas sementes tradicionais"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function loadQuestion() {
    answered = false;
    const q = questions[currentQuestion];
    document.getElementById('questionText').textContent = q.question;
    document.getElementById('currentQuestion').textContent = currentQuestion + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    
    const optionsDiv = document.getElementById('quizOptions');
    optionsDiv.innerHTML = '';
    
    q.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option;
        btn.onclick = () => checkAnswer(index, btn);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    if (answered) return;
    answered = true;
    
    const correctIndex = questions[currentQuestion].correct;
    const options = document.querySelectorAll('.quiz-option');
    
    if (selectedIndex === correctIndex) {
        btnElement.classList.add('correct');
        score++;
    } else {
        btnElement.classList.add('incorrect');
        options[correctIndex].classList.add('correct');
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    document.getElementById('quizQuestion').style.display = 'none';
    document.querySelector('.quiz-progress').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';
    
    let message = '';
    if (score === questions.length) {
        message = 'Parabéns! Você acertou todas as questões! 🌟';
    } else if (score >= questions.length / 2) {
        message = `Muito bom! Você acertou ${score} de ${questions.length} questões! 👍`;
    } else {
        message = `Continue estudando! Você acertou ${score} de ${questions.length} questões. 📚`;
    }
    
    document.getElementById('resultText').textContent = message;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quizQuestion').style.display = 'block';
    document.querySelector('.quiz-progress').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    loadQuestion();
}

// Inicializar quiz
loadQuestion();

// Formulário de Contato
document.getElementById('contatoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    const formMessage = document.getElementById('formMessage');
    
    // Validação simples
    if (nome && email && mensagem) {
        // Simulação de envio
        formMessage.className = 'form-message success';
        formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
        formMessage.style.display = 'block';
        
        // Limpar formulário
        this.reset();
        
        // Esconder mensagem após 5 segundos
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    } else {
        formMessage.className = 'form-message error';
        formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Por favor, preencha todos os campos obrigatórios.';
        formMessage.style.display = 'block';
    }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading para imagens (melhoria de performance)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Animação de entrada dos elementos ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar cards e seções
document.querySelectorAll('.pilar-card, .flashcard, .galeria-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Acessibilidade - Trap focus em modais (se houver)
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="email"], select'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

console.log('Site Agrinho carregado com sucesso! 🌱');
