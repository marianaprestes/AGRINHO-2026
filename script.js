// Menu Mobile
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    // Botão voltar ao topo
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Voltar ao topo
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animação dos números
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                number.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target.toLocaleString() + '+';
            }
        };
        
        updateNumber();
    });
};

// Intersection Observer para animar elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            if (entry.target.classList.contains('stats-grid')) {
                animateNumbers();
            }
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.pilar-card, .info-box, .caso-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

document.querySelectorAll('.stats-grid').forEach(el => {
    observer.observe(el);
});

// Flashcards CORRIGIDOS
function flipCard(card) {
    // Previne múltiplos cliques durante a animação
    if (card.classList.contains('flipping')) return;
    
    card.classList.add('flipping');
    card.classList.toggle('flipped');
    
    // Remove a classe flipping após a animação
    setTimeout(() => {
        card.classList.remove('flipping');
    }, 600);
}

// Adiciona event listeners para todos os flashcards
document.addEventListener('DOMContentLoaded', () => {
    const flashcards = document.querySelectorAll('.flashcard');
    
    flashcards.forEach(card => {
        // Clique com mouse
        card.addEventListener('click', () => flipCard(card));
        
        // Teclado (Enter ou Espaço)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                flipCard(card);
            }
        });
    });
});

// Gráfico Chart.js
const ctx = document.getElementById('agroChart').getContext('2d');
const agroChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Soja', 'Milho', 'Café', 'Açúcar', 'Carne Bovina', 'Algodão'],
        datasets: [{
            label: 'Produção Brasileira (milhões de toneladas)',
            data: [152.5, 123.8, 3.7, 42.3, 10.2, 2.8],
            backgroundColor: [
                'rgba(45, 106, 79, 0.8)',
                'rgba(82, 183, 136, 0.8)',
                'rgba(64, 145, 108, 0.8)',
                'rgba(116, 198, 157, 0.8)',
                'rgba(183, 223, 201, 0.8)',
                'rgba(216, 243, 220, 0.8)'
            ],
            borderColor: [
                'rgba(45, 106, 79, 1)',
                'rgba(82, 183, 136, 1)',
                'rgba(64, 145, 108, 1)',
                'rgba(116, 198, 157, 1)',
                'rgba(183, 223, 201, 1)',
                'rgba(216, 243, 220, 1)'
            ],
            borderWidth: 2,
            borderRadius: 10
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
                        size: 12
                    },
                    color: '#1b4332'
                }
            },
            tooltip: {
                backgroundColor: 'rgba(45, 106, 79, 0.9)',
                titleFont: {
                    family: "'Nunito', sans-serif"
                },
                bodyFont: {
                    family: "'Open Sans', sans-serif"
                },
                padding: 12,
                cornerRadius: 8
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0,0,0,0.05)'
                },
                ticks: {
                    font: {
                        family: "'Open Sans', sans-serif"
                    },
                    color: '#1b4332'
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        family: "'Nunito', sans-serif"
                    },
                    color: '#1b4332'
                }
            }
        }
    }
});

// Calculadora de Pegada de Carbono
function calcularPegada() {
    const kmCarro = parseFloat(document.getElementById('kmCarro').value) || 0;
    const consumoCarne = parseFloat(document.getElementById('consumoCarne').value) || 0;
    const energia = parseFloat(document.getElementById('energia').value) || 0;
    
    // Cálculos aproximados (kg CO2)
    const carbonoCarro = (kmCarro * 52) * 0.12; // km/semana * semanas/ano * kg CO2/km
    const carbonoCarne = consumoCarne * 52 * 2.5; // refeições/semana * semanas * kg CO2/refeição
    const carbonoEnergia = energia * 12 * 0.1; // kWh/mês * meses * kg CO2/kWh
    
    const totalToneladas = ((carbonoCarro + carbonoCarne + carbonoEnergia) / 1000).toFixed(2);
    
    document.getElementById('valorPegada').textContent = totalToneladas;
    
    let mensagem = '';
    if (totalToneladas < 5) {
        mensagem = 'Parabéns! Sua pegada de carbono está abaixo da média nacional. Continue assim!';
    } else if (totalToneladas < 10) {
        mensagem = 'Sua pegada está na média. Que tal adotar mais práticas sustentáveis?';
    } else {
        mensagem = 'Sua pegada está acima da média. Vamos juntos reduzir seu impacto ambiental?';
    }
    
    document.getElementById('mensagemPegada').textContent = mensagem;
    document.getElementById('resultadoCalculadora').style.display = 'block';
    
    // Scroll suave até o resultado
    document.getElementById('resultadoCalculadora').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Quiz
const perguntas = [
    {
        pergunta: "O que significa ILPF?",
        opcoes: [
            "Integração Lavoura-Pecuária-Floresta",
            "Instituto de Lavradores e Produtores Florestais",
            "Indústria de Laticínios e Produtos Frescos",
            "Irrigação Localizada para Plantas Frutíferas"
        ],
        correta: 0
    },
    {
        pergunta: "Qual porcentagem do PIB brasileiro representa o agronegócio?",
        opcoes: [
            "10%",
            "25%",
            "40%",
            "60%"
        ],
        correta: 1
    },
    {
        pergunta: "O que é Plantio Direto?",
        opcoes: [
            "Plantar apenas em linha reta",
            "Técnica que não revolve o solo, mantendo palhada",
            "Plantar diretamente sem sementes",
            "Método de plantio em estufas"
        ],
        correta: 1
    },
    {
        pergunta: "Qual a principal função dos polinizadores na agricultura?",
        opcoes: [
            "Apenas produzir mel",
            "Controlar pragas naturalmente",
            "Permitir a reprodução de 75% das culturas alimentares",
            "Decorar as plantações"
        ],
        correta: 2
    },
    {
        pergunta: "O que produz 70% dos alimentos que chegam à mesa dos brasileiros?",
        opcoes: [
            "Grandes empresas multinacionais",
            "Agricultura familiar",
            "Importações",
            "Hortas urbanas"
        ],
        correta: 1
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let respondidas = new Set();

function carregarPergunta() {
    if (perguntaAtual >= perguntas.length) {
        mostrarResultado();
        return;
    }
    
    const pergunta = perguntas[perguntaAtual];
    document.getElementById('perguntaTexto').textContent = `${perguntaAtual + 1}. ${pergunta.pergunta}`;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    pergunta.opcoes.forEach((opcao, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = opcao;
        button.onclick = () => verificarResposta(index, button);
        optionsContainer.appendChild(button);
    });
    
    // Atualizar barra de progresso
    const progresso = ((perguntaAtual) / perguntas.length) * 100;
    document.getElementById('progressBar').style.width = `${progresso}%`;
}

function verificarResposta(index, button) {
    if (respondidas.has(perguntaAtual)) return;
    
    respondidas.add(perguntaAtual);
    const correta = perguntas[perguntaAtual].correta;
    const opcoes = document.querySelectorAll('.quiz-option');
    
    if (index === correta) {
        button.classList.add('correct');
        pontuacao++;
    } else {
        button.classList.add('incorrect');
        opcoes[correta].classList.add('correct');
    }
    
    // Desabilitar todas as opções
    opcoes.forEach(op => op.style.pointerEvents = 'none');
    
    // Próxima pergunta após 1.5s
    setTimeout(() => {
        perguntaAtual++;
        carregarPergunta();
    }, 1500);
}

function mostrarResultado() {
    document.getElementById('quizQuestion').style.display = 'none';
    document.querySelector('.quiz-progress').style.display = 'none';
    
    const resultDiv = document.getElementById('quizResult');
    resultDiv.style.display = 'block';
    document.getElementById('scoreValue').textContent = pontuacao;
    
    let mensagem = '';
    if (pontuacao === 5) {
        mensagem = 'Excelente! Você é um expert em sustentabilidade! 🌱';
    } else if (pontuacao >= 3) {
        mensagem = 'Muito bom! Você conhece bem o assunto! Continue aprendendo! ';
    } else {
        mensagem = 'Que tal revisar o conteúdo e tentar novamente? 📚';
    }
    
    document.getElementById('scoreMessage').textContent = mensagem;
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    respondidas.clear();
    
    document.getElementById('quizQuestion').style.display = 'block';
    document.querySelector('.quiz-progress').style.display = 'block';
    document.getElementById('quizResult').style.display = 'none';
    
    carregarPergunta();
}

// Inicializar quiz
carregarPergunta();

// Formulário de Contato
document.getElementById('contatoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Simulação de envio
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;
    
    setTimeout(() => {
        alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Entraremos em contato pelo email ${email} em breve!`);
        
        this.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 2000);
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

// Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Efeito de digitação no hero (opcional)
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Iniciar após 1 segundo
    setTimeout(typeWriter, 1000);
}
