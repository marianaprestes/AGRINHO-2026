document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM carregado — iniciando scripts');

    /* MENU MOBILE */
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });

        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
            });
        });
    }

    /* GRÁFICO - DADOS REAIS EMBRAPA */
    const canvas = document.getElementById('meuGrafico');

    if (canvas) {
        if (typeof Chart === 'undefined') {
            console.error('❌ Chart.js não carregou!');
            canvas.parentElement.innerHTML = '<p style="text-align:center;color:#d32f2f;padding:20px;">⚠ Não foi possível carregar o gráfico. Verifique sua conexão.</p>';
        } else {
            console.log('✅ Chart.js carregado — renderizando gráfico');
            const ctx = canvas.getContext('2d');

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [
                        'Plantio Direto',
                        'ILPF',
                        'Florestas Plantadas',
                        'Fixação Biológica de N',
                        'Biodigestores'
                    ],
                    datasets: [{
                        label: 'Área em milhões de hectares (2023)',
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
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { display: false },
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
                                text: 'Milhões de hectares',
                                font: { family: 'Poppins', weight: '600' },
                                color: '#555'
                            },
                            ticks: { font: { family: 'Poppins' }, color: '#555' },
                            grid: { color: 'rgba(0,0,0,0.05)' }
                        },
                        x: {
                            ticks: { font: { family: 'Poppins', weight: '500' }, color: '#333' },
                            grid: { display: false }
                        }
                    }
                }
            });
        }
    }

    /* CONTADORES */
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

    if (stats.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animarContador(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    /* FLASHCARDS */
    const flashcards = document.querySelectorAll('.flashcard');
    console.log(`🔎 Encontrados ${flashcards.length} flashcards`);

    flashcards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('flipped');
            console.log(`Flashcard ${index + 1} virado`);
        });

        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });
    });

    /* FORMULÁRIO */
    const form = document.getElementById('formContato');
    const feedback = document.getElementById('formFeedback');

    if (form) {
        const nomeInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const mensagemInput = document.getElementById('mensagem');

        const erroNome = document.getElementById('erroNome');
        const erroEmail = document.getElementById('erroEmail');
        const erroMensagem = document.getElementById('erroMensagem');

        function mostrarErro(input, spanErro, msg) {
            input.classList.add('invalido');
            input.classList.remove('valido');
            spanErro.textContent = '⚠ ' + msg;
            spanErro.classList.add('ativo');
            spanErro.classList.remove('sucesso');
        }

        function mostrarSucesso(input, spanErro) {
            input.classList.remove('invalido');
            input.classList.add('valido');
            spanErro.textContent = '✓ Campo válido';
            spanErro.classList.remove('ativo');
            spanErro.classList.add('sucesso');
        }

        function validarNome() {
            const valor = nomeInput.value.trim();
            if (valor.length === 0) { mostrarErro(nomeInput, erroNome, 'O nome é obrigatório.'); return false; }
            if (valor.length < 3) { mostrarErro(nomeInput, erroNome, 'O nome deve ter pelo menos 3 caracteres.'); return false; }
            if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(valor)) { mostrarErro(nomeInput, erroNome, 'O nome não pode conter números ou símbolos.'); return false; }
            mostrarSucesso(nomeInput, erroNome);
            return true;
        }

        function validarEmail() {
            const valor = emailInput.value.trim();
            if (valor.length === 0) { mostrarErro(emailInput, erroEmail, 'O e-mail é obrigatório.'); return false; }
            if (!valor.includes('@')) { mostrarErro(emailInput, erroEmail, 'O e-mail deve conter o símbolo "@".'); return false; }
            const partes = valor.split('@');
            if (partes.length !== 2 || partes[0].length === 0 || partes[1].length === 0) {
                mostrarErro(emailInput, erroEmail, 'Formato inválido. Ex: nome@exemplo.com');
                return false;
            }
            if (!partes[1].includes('.')) {
                mostrarErro(emailInput, erroEmail, 'O domínio deve conter um ponto (ex: @gmail.com).');
                return false;
            }
            mostrarSucesso(emailInput, erroEmail);
            return true;
        }

        function validarMensagem() {
            const valor = mensagemInput.value.trim();
            if (valor.length === 0) { mostrarErro(mensagemInput, erroMensagem, 'A mensagem é obrigatória.'); return false; }
            if (valor.length < 10) { mostrarErro(mensagemInput, erroMensagem, `Escreva pelo menos 10 caracteres (atual: ${valor.length}).`); return false; }
            mostrarSucesso(mensagemInput, erroMensagem);
            return true;
        }

        nomeInput.addEventListener('input', validarNome);
        emailInput.addEventListener('input', validarEmail);
        mensagemInput.addEventListener('input', validarMensagem);

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
                feedback.innerHTML = `✅ Obrigado, <strong>${nome}</strong>! Sua mensagem foi recebida 🌱`;
                form.reset();
                [nomeInput, emailInput, mensagemInput].forEach(i => i.classList.remove('valido', 'invalido'));
                [erroNome, erroEmail, erroMensagem].forEach(s => { s.textContent = ''; s.classList.remove('ativo', 'sucesso'); });
                setTimeout(() => { feedback.className = 'form-feedback'; feedback.textContent = ''; }, 6000);
            } else {
                feedback.classList.add('error');
                feedback.textContent = '❌ Corrija os campos destacados antes de enviar.';
            }
        });
    }

    /* SCROLL HEADER */
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            header.style.boxShadow = window.scrollY > 50
                ? '0 4px 20px rgba(0,0,0,0.15)'
                : '0 4px 20px rgba(0,0,0,0.08)';
        }
    });
});
