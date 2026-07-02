/* ============================
   MENU MOBILE
============================ */
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

/* ============================
   GRÁFICO — DADOS REAIS
   Fonte: Embrapa / Plano ABC+
   Área de Integração Lavoura-Pecuária-Floresta (ILPF) no Brasil
   (valores em milhões de hectares)
============================ */
const ctx = document.getElementById('meuGrafico').getContext('2d');

const meuGrafico = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [
            'Plantio Direto',
            'ILPF',
            'Florestas Plantadas',
            'FBN (Fixação Biológica de N)',
            'Tratamento de Dejetos'
        ],
        datasets: [{
            label: 'Área ou aplicação em 2023 (milhões de ha / bilhões de L)',
            data: [36.0, 17.9, 9.6, 15.5, 4.2],
            backgroundColor: [
                'rgba(74, 124, 46, 0.85)',
                'rgba(139, 195, 74, 0.85)',
                'rgba(139, 111, 71, 0.85)',
                'rgba(249, 168, 37, 0.85)',
                'rgba(45, 80, 22, 0.85)'
            ],
            borderColor: [
                '#2d5016',
                '#4a7c2e',
                '#6b5232',
                '#c77d10',
                '#1e3a0f'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Tecnologias do Plano ABC+ no Brasil (2023) — Fonte: Embrapa',
                font: { family: 'Poppins', size: 16, weight: '700' },
                color: '#2d5016',
                padding: { bottom: 20 }
            },
            tooltip: {
                backgroundColor: '#2d5016',
                titleFont: { family: 'Poppins', weight: '700' },
                bodyFont: { family: 'Poppins' },
                padding: 12,
                cornerRadius: 8
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Milhões de hectares (ou bilhões de litros equivalentes)',
                    font: { family: 'Poppins', weight: '600' },
                    color: '#555'
                },
                ticks: {
                    font: { family: 'Poppins' },
                    color: '#555'
                },
                grid: { color: 'rgba(0,0,0,0.05)' }
            },
            x: {
                ticks: {
                    font: { family: 'Poppins', weight: '500' },
                    color: '#333'
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
   FLASHCARDS (corrigido)
============================ */
document.querySelectorAll('.flashcard').forEach(card => {
    // Função única que faz o flip
    const virar = (evento) => {
        // Evita disparar duas vezes em telas touch
        if (evento) evento.preventDefault();
        card.classList.toggle('flipped');
    };

    // Clique normal (mouse)
    card.addEventListener('click', virar);

    // Acessibilidade: teclado (Enter ou Espaço)
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            virar(e);
        }
    });
});

/* ============================
   FORMULÁRIO PROFISSIONAL
   - Validação em tempo real
   - Verifica "@" no email
   - Verifica se a mensagem tem conteúdo real
============================ */
const form = document.getElementById('formContato');
const feedback = document.getElementById('formFeedback');

const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const mensagemInput = document.getElementById('mensagem');

const erroNome = document.getElementById('erroNome');
const erroEmail = document.getElementById('erroEmail');
const erroMensagem = document.getElementById('erroMensagem');

// Funções de validação individuais
function validarNome() {
    const valor = nomeInput.value.trim();
    if (valor.length === 0) {
        mostrarErro(nomeInput, erroNome, 'O nome é obrigatório.');
        return false;
    }
    if (valor.length < 3) {
        mostrarErro(nomeInput, erroNome, 'O nome deve ter pelo menos 3 caracteres.');
        return false;
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(valor)) {
        mostrarErro(nomeInput, erroNome, 'O nome não pode conter números ou símbolos.');
        return false;
    }
    mostrarSucesso(nomeInput, erroNome);
    return true;
}

function validarEmail() {
    const valor = emailInput.value.trim();
    if (valor.length === 0) {
        mostrarErro(emailInput, erroEmail, 'O e-mail é obrigatório.');
        return false;
    }
    // Verificação principal: precisa ter "@" e um domínio depois
    if (!valor.includes('@')) {
        mostrarErro(emailInput, erroEmail, 'O e-mail deve conter o símbolo "@".');
        return false;
    }
    const partes = valor.split('@');
    if (partes.length !== 2 || partes[0].length === 0 || partes[1].length === 0) {
        mostrarErro(emailInput, erroEmail, 'Formato de e-mail inválido. Ex: nome@exemplo.com');
        return false;
    }
    if (!partes[1].includes('.')) {
        mostrarErro(emailInput, erroEmail, 'O domínio do e-mail deve conter um ponto (ex: @gmail.com).');
        return false;
    }
    mostrarSucesso(emailInput, erroEmail);
    return true;
}

function validarMensagem() {
    const valor = mensagemInput.value.trim();
    if (valor.length === 0) {
        mostrarErro(mensagemInput, erroMensagem, 'A mensagem é obrigatória.');
        return false;
    }
    if (valor.length < 10) {
        mostrarErro(mensagemInput, erroMensagem, `Escreva pelo menos 10 caracteres (atual: ${valor.length}).`);
        return false;
    }
    mostrarSucesso(mensagemInput, erroMensagem);
    return true;
}

// Feedback visual nos campos
function mostrarErro(input, spanErro, msg) {
    input.classList.add('invalido');
    input.classList.remove('valido');
    spanErro.textContent = '⚠ ' + msg;
    spanErro.classList.add('ativo');
}

function mostrarSucesso(input, spanErro) {
    input.classList.remove('invalido');
    input.classList.add('valido');
    spanErro.textContent = '✓ Campo válido';
    spanErro.classList.remove('ativo');
    spanErro.classList.add('sucesso');
}

// Validação em tempo real (enquanto o usuário digita)
nomeInput.addEventListener('input', validarNome);
emailInput.addEventListener('input', validarEmail);
mensagemInput.addEventListener('input', validarMensagem);

// Envio do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nomeOk = validarNome();
    const emailOk = validarEmail();
    const msgOk = validarMensagem();

    feedback.className = 'form-feedback';
    feedback.textContent = '';

    if (nomeOk && emailOk && msgOk) {
        const nome = nomeInput.value.trim();
        feedback.classList.add('success');
        feedback.innerHTML = `✅ Obrigado, <strong>${nome}</strong>! Sua mensagem sobre sustentabilidade foi recebida com sucesso 🌱`;
        form.reset();

        // Remove classes visuais dos campos
        [nomeInput, emailInput, mensagemInput].forEach(i => {
            i.classList.remove('valido', 'invalido');
        });
        [erroNome, erroEmail, erroMensagem].forEach(s => {
            s.textContent = '';
            s.classList.remove('ativo', 'sucesso');
        });

        setTimeout(() => {
            feedback.className = 'form-feedback';
            feedback.textContent = '';
        }, 6000);
    } else {
        feedback.classList.add('error');
        feedback.textContent = '❌ Por favor, corrija os campos destacados antes de enviar.';
    }
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
