/* ============================
   MENU MOBILE
============================ */
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// Fecha o menu ao clicar em um link (mobile)
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

/* ============================
   GRÁFICO (Chart.js)
============================ */
const ctx = document.getElementById('meuGrafico').getContext('2d');

const meuGrafico = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['2010', '2013', '2016', '2019', '2022', '2025'],
        datasets: [{
            label: 'Agricultura de Baixo Carbono (milhões de ha)',
            data: [22, 27, 33, 41, 47, 52],
            borderColor: '#4a7c2e',
            backgroundColor: 'rgba(139, 195, 74, 0.2)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#f9a825',
            pointBorderColor: '#2d5016',
            pointRadius: 6,
            pointHoverRadius: 9
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: { family: 'Poppins', size: 14, weight: '600' },
                    color: '#2d5016'
                }
            },
            title: {
                display: true,
                text: 'Crescimento da Agricultura Sustentável no Brasil',
                font: { family: 'Poppins', size: 16, weight: '700' },
                color: '#2d5016',
                padding: { bottom: 20 }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: { family: 'Poppins' },
                    color: '#555'
                },
                grid: { color: 'rgba(0,0,0,0.05)' }
            },
            x: {
                ticks: {
                    font: { family: 'Poppins' },
                    color: '#555'
                },
                grid: { display: false }
            }
        }
    }
});

/* ============================
   CONTADORES ANIMADOS
============================ */
const stats = document.querySelectorAll('.stat-number');

const animarContador = (el) => {
    const alvo = +el.getAttribute('data-target');
    let atual = 0;
    const incremento = alvo / 60;

    const atualizar = () => {
        atual += incremento;
        if (atual < alvo) {
            el.textContent = Math.ceil(atual);
            requestAnimationFrame(atualizar);
        } else {
            el.textContent = alvo;
        }
    };
    atualizar();
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animarContador(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => observer.observe(stat));

/* ============================
   FLASHCARDS
============================ */
document.querySelectorAll('.flashcard').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    // Acessibilidade: permite virar com Enter/Espaço
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.classList.toggle('flipped');
        }
    });
});

/* ============================
   FORMULÁRIO DE CONTATO
============================ */
const form = document.getElementById('formContato');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Limpa erros anteriores
    document.getElementById('erroNome').textContent = '';
    document.getElementById('erroEmail').textContent = '';
    document.getElementById('erroMensagem').textContent = '';
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    let valido = true;

    // Validação do nome
    if (nome.length < 3) {
        document.getElementById('erroNome').textContent = 'Digite seu nome completo (mínimo 3 caracteres).';
        valido = false;
    }

    // Validação do email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        document.getElementById('erroEmail').textContent = 'Digite um e-mail válido.';
        valido = false;
    }

    // Validação da mensagem
    if (mensagem.length < 10) {
        document.getElementById('erroMensagem').textContent = 'A mensagem deve ter pelo menos 10 caracteres.';
        valido = false;
    }

    if (!valido) {
        feedback.classList.add('error');
        feedback.textContent = '❌ Por favor, corrija os campos destacados.';
        return;
    }

    // Simulação de envio
    feedback.classList.add('success');
    feedback.innerHTML = `✅ Obrigado, <strong>${nome}</strong>! Sua mensagem sobre sustentabilidade foi recebida com sucesso 🌱`;

    form.reset();

    // Oculta a mensagem após 6 segundos
    setTimeout(() => {
        feedback.className = 'form-feedback';
        feedback.textContent = '';
    }, 6000);
});

/* ============================
   EFEITO DE SCROLL NO HEADER
============================ */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    }
});
