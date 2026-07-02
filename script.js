/* =====================================================
   SCRIPT PRINCIPAL - AGRINHO
   ===================================================== */

// ============ MENU MOBILE ============
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('ativo');
});

// Fecha o menu ao clicar em um link (mobile)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('ativo');
    });
});

// ============ FLASHCARDS ============
document.querySelectorAll('.flashcard').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('virado');
    });
    // Acessibilidade: virar com Enter ou Espaço
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.classList.toggle('virado');
        }
    });
});

// ============ FORMULÁRIO COM VALIDAÇÃO ============
const form = document.getElementById('formContato');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    const erroNome = document.getElementById('erroNome');
    const erroEmail = document.getElementById('erroEmail');
    const erroMensagem = document.getElementById('erroMensagem');

    // Limpa erros anteriores
    erroNome.textContent = '';
    erroEmail.textContent = '';
    erroMensagem.textContent = '';
    feedback.textContent = '';
    feedback.className = 'form-feedback';

    let valido = true;

    if (nome.length < 3) {
        erroNome.textContent = '⚠ Informe seu nome completo (mínimo 3 caracteres).';
        valido = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        erroEmail.textContent = '⚠ Informe um e-mail válido.';
        valido = false;
    }

    if (mensagem.length < 10) {
        erroMensagem.textContent = '⚠ Sua mensagem deve ter pelo menos 10 caracteres.';
        valido = false;
    }

    if (valido) {
        feedback.textContent = `✅ Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. 🌱`;
        feedback.classList.add('sucesso');
        form.reset();

        // Também salva no localStorage como "registro" local
        const registros = JSON.parse(localStorage.getItem('agrinho_contatos') || '[]');
        registros.push({ nome, email, mensagem, data: new Date().toISOString() });
        localStorage.setItem('agrinho_contatos', JSON.stringify(registros));
    } else {
        feedback.textContent = '❌ Corrija os erros acima e tente novamente.';
        feedback.classList.add('erro');
    }
});

// ============ GRÁFICOS COM CHART.JS ============
window.addEventListener('load', () => {
    // Gráfico 1: Evolução da agricultura orgânica no Brasil (milhões de hectares)
    // Fonte: MAPA / IFOAM (dados consolidados)
    const ctxLinha = document.getElementById('graficoLinha').getContext('2d');
    new Chart(ctxLinha, {
        type: 'line',
        data: {
            labels: ['2010', '2013', '2016', '2019', '2022', '2025'],
            datasets: [{
                label: 'Área orgânica (milhões de ha)',
                data: [0.8, 1.2, 1.6, 1.9, 2.3, 2.8],
                borderColor: '#4e9f3d',
                backgroundColor: 'rgba(78, 159, 61, 0.15)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#1e5128',
                pointRadius: 5,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e5128',
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: { color: '#5a6b5c' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#5a6b5c' }
                }
            }
        }
    });

    // Gráfico 2: Principais produtos do agro brasileiro
    // Fonte: CONAB / MAPA (safra 2024/25 - participação relativa)
    const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
    new Chart(ctxPizza, {
        type: 'doughnut',
        data: {
            labels: ['Soja', 'Milho', 'Cana-de-açúcar', 'Café', 'Outros'],
            datasets: [{
                data: [35, 22, 20, 8, 15],
                backgroundColor: [
                    '#1e5128',
                    '#4e9f3d',
                    '#76c893',
                    '#8b5e3c',
                    '#d4a373'
                ],
                borderWidth: 3,
                borderColor: '#f5f3e7'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 13 },
                        color: '#2d3a2e'
                    }
                },
                tooltip: {
                    backgroundColor: '#1e5128',
                    callbacks: {
                        label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%`
                    }
                }
            }
        }
    });
});

// ============ ANIMAÇÃO AO ROLAR (scroll reveal) ============
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.pilar-card, .flashcard, .curiosidade, .grafico-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
