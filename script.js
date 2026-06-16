/**
 * Agro Forte, Futuro Sustentável - Script Principal
 * Controle de interatividade, validação e dinamismo da página.
 */

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initFormValidation();
    initQuiz();
    initScrollAnimation();
});

/**
 * 1. Navegação Suave (Smooth Scroll)
 * Melhora a experiência do usuário ao clicar nos links do menu.
 */
function initSmoothScroll() {
    const menuLinks = document.querySelectorAll('header nav a');

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Verifica se o link é uma âncora interna
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/**
 * 2. Validação e Envio do Formulário de Contato
 * Processa o envio e dá feedback visual ao usuário.
 */
function initFormValidation() {
    const form = document.querySelector('#contato form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();

        // Validação básica de segurança
        if (nome === '' || email === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Simulação de envio (Ideal para páginas estáticas do GitHub Pages)
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerText = 'Enviando...';

        setTimeout(() => {
            alert(`Obrigado pelo contato, ${nome}! Sua mensagem foi enviada com sucesso.`);
            form.reset();
            submitButton.disabled = false;
            submitButton.innerText = 'Enviar';
        }, 1500);
    });
}

/**
 * 3. Quiz de Sustentabilidade Interativo
 * Substitui o texto estático por um mini-quiz funcional.
 */
function initQuiz() {
    const quizSection = document.querySelector('section:has(h2:contains("Quiz"))') || 
                        document.querySelectorAll('main > section')[4]; // Seletor fallback baseado na estrutura
    
    if (!quizSection) return;

    // Dados das perguntas do Quiz
    const quizData = [
        {
            pergunta: "Qual técnica abaixo ajuda a recuperar o solo e rotacionar culturas?",
            opcoes: ["Desmatamento", "Plantio Direto", "Monocultura intensiva"],
            correta: 1
        },
        {
            pergunta: "Qual tecnologia reduz drasticamente o desperdício de água no campo?",
            opcoes: ["Irrigação Automatizada", "Queima de biomassa", "Tratores convencionais"],
            correta: 0
        }
    ];

    // Limpa o texto temporário do HTML e injeta a estrutura do Quiz
    quizSection.innerHTML = `
        <h2>Quiz de Sustentabilidade</h2>
        <div id="quiz-container">
            <p id="quiz-pergunta" style="font-weight: bold; margin-bottom: 15px;"></p>
            <div id="quiz-opcoes" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px;"></div>
            <button id="quiz-next-btn" style="display: none;">Próxima Pergunta</button>
            <p id="quiz-resultado" style="margin-top: 15px; font-weight: bold;"></p>
        </div>
    `;

    let currentQuestionIndex = 0;
    let score = 0;

    const perguntaEl = document.getElementById('quiz-pergunta');
    const opcoesContainer = document.getElementById('quiz-opcoes');
    const nextBtn = document.getElementById('quiz-next-btn');
    const resultadoEl = document.getElementById('quiz-resultado');

    function loadQuestion() {
        resetState();
        let currentQuestion = quizData[currentQuestionIndex];
        perguntaEl.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.pergunta}`;

        currentQuestion.opcoes.forEach((opcao, index) => {
            const button = document.createElement('button');
            button.innerText = opcao;
            button.style.textAlign = 'left';
            button.style.padding = '8px 12px';
            button.addEventListener('click', () => selectAnswer(index, currentQuestion.correta));
            opcoesContainer.appendChild(button);
        });
    }

    function resetState() {
        nextBtn.style.display = 'none';
        resultadoEl.innerText = '';
        while (opcoesContainer.firstChild) {
            opcoesContainer.removeChild(opcoesContainer.firstChild);
        }
    }

    function selectAnswer(selectedIndex, correctIndex) {
        const botoes = opcoesContainer.querySelectorAll('button');
        botoes.forEach((btn, idx) => {
            btn.disabled = true; // Desabilita todos após a escolha
            if (idx === correctIndex) {
                btn.style.backgroundColor = '#2ecc71'; // Verde para correto
                btn.style.color = 'white';
            } else if (idx === selectedIndex) {
                btn.style.backgroundColor = '#e74c3c'; // Vermelho para errado
                btn.style.color = 'white';
            }
        });

        if (selectedIndex === correctIndex) {
            score++;
            resultadoEl.innerText = "Resposta Correta! 🎉";
            resultadoEl.style.color = "#2ecc71";
        } else {
            resultadoEl.innerText = "Resposta Incorreta. ❌";
            resultadoEl.style.color = "#e74c3c";
        }

        nextBtn.style.display = 'block';
    }

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showFinalScore();
        }
    });

    function showFinalScore() {
        resetState();
        perguntaEl.innerText = "Quiz Concluído!";
        resultadoEl.innerText = `Você acertou ${score} de ${quizData.length} perguntas.`;
        resultadoEl.style.color = "inherit";
        nextBtn.innerText = "Reiniciar Quiz";
        nextBtn.style.display = 'block';
        nextBtn.onclick = () => {
            currentQuestionIndex = 0;
            score = 0;
            nextBtn.innerText = "Próxima Pergunta";
            nextBtn.onclick = null; 
            loadQuestion();
        };
    }

    // Inicializa o quiz na página
    loadQuestion();
}

/**
 * 4. Animação de Surgimento (Fade-In ao Scroll)
 * Ativa uma transição suave quando as seções aparecem na tela.
 */
function initScrollAnimation() {
    const sections = document.querySelectorAll('main > section');
    
    // Configura estilos iniciais via JS caso não existam no CSS
    sections.forEach(sec => {
        sec.style.opacity = '0';
        sec.style.transform = 'translateY(20px)';
        sec.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const observerOptions = {
        root: null,
        threshold: 0.15 // Dispara quando 15% da seção está visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Roda a animação apenas uma vez
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}
