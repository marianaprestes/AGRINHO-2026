// ==========================================
// AGRO FORTE, FUTURO SUSTENTÁVEL
// script.js
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    iniciarNavegacaoSuave();
    iniciarBotaoSaibaMais();
    iniciarAnimacoes();
    iniciarFormulario();
    iniciarQuiz();

});

// ==========================================
// NAVEGAÇÃO SUAVE
// ==========================================

function iniciarNavegacaoSuave() {

    const links = document.querySelectorAll("nav a");

    links.forEach(link => {

        link.addEventListener("click", (evento) => {

            evento.preventDefault();

            const destino = document.querySelector(
                link.getAttribute("href")
            );

            if (destino) {

                destino.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

}

// ==========================================
// BOTÃO "SAIBA MAIS"
// ==========================================

function iniciarBotaoSaibaMais() {

    const botao = document.querySelector("#home button");

    if (!botao) return;

    botao.addEventListener("click", () => {

        const secaoEconomia =
            document.querySelector("#economia");

        secaoEconomia.scrollIntoView({
            behavior: "smooth"
        });

    });

}

// ==========================================
// ANIMAÇÃO DAS SEÇÕES
// ==========================================

function iniciarAnimacoes() {

    const secoes = document.querySelectorAll("section");

    const observador = new IntersectionObserver(

        (entradas) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("mostrar");

                }

            });

        },

        {
            threshold: 0.2
        }

    );

    secoes.forEach((secao) => {

        secao.classList.add("oculto");
        observador.observe(secao);

    });

}

// ==========================================
// FORMULÁRIO DE CONTATO
// ==========================================

function iniciarFormulario() {

    const formulario = document.querySelector("form");

    if (!formulario) return;

    formulario.addEventListener("submit", (evento) => {

        evento.preventDefault();

        const nome =
            document.getElementById("nome").value.trim();

        const email =
            document.getElementById("email").value.trim();

        if (nome.length < 3) {

            alert("Digite um nome válido.");
            return;

        }

        if (!validarEmail(email)) {

            alert("Digite um e-mail válido.");
            return;

        }

        alert(
            `Obrigado pelo contato, ${nome}! Sua mensagem foi enviada com sucesso.`
        );

        formulario.reset();

    });

}

function validarEmail(email) {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

// ==========================================
// QUIZ DE SUSTENTABILIDADE
// ==========================================

function iniciarQuiz() {

    const tituloQuiz = Array.from(
        document.querySelectorAll("section h2")
    ).find(
        titulo =>
            titulo.textContent.includes("Quiz")
    );

    if (!tituloQuiz) return;

    const secaoQuiz = tituloQuiz.parentElement;

    const quizHTML = `

        <div class="quiz-container">

            <h3>Teste seus conhecimentos</h3>

            <p>
                Qual destas práticas ajuda a preservar
                a fertilidade do solo?
            </p>

            <button class="quiz-btn" data-correta="true">
                Rotação de culturas
            </button>

            <button class="quiz-btn">
                Desmatamento
            </button>

            <button class="quiz-btn">
                Queimadas frequentes
            </button>

            <p id="resultadoQuiz"></p>

        </div>

    `;

    secaoQuiz.insertAdjacentHTML(
        "beforeend",
        quizHTML
    );

    const botoes =
        document.querySelectorAll(".quiz-btn");

    const resultado =
        document.getElementById("resultadoQuiz");

    botoes.forEach((botao) => {

        botao.addEventListener("click", () => {

            if (
                botao.dataset.correta === "true"
            ) {

                resultado.textContent =
                    "✅ Resposta correta!";

            } else {

                resultado.textContent =
                    "❌ Resposta incorreta.";

            }

        });

    });

}

// ==========================================
// BOTÃO VOLTAR AO TOPO
// ==========================================

const botaoTopo = document.createElement("button");

botaoTopo.textContent = "↑";
botaoTopo.id = "btnTopo";

document.body.appendChild(botaoTopo);

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        botaoTopo.style.display = "block";

    } else {

        botaoTopo.style.display = "none";

    }

});

botaoTopo.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ==========================================
// MENSAGEM DE BOAS-VINDAS
// ==========================================

window.addEventListener("load", () => {

    console.log(
        "Bem-vindo ao Agro Forte, Futuro Sustentável!"
    );

});
