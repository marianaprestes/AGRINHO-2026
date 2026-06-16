document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Efeito de Scroll Suave para o menu
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 2. Lógica do Quiz de Sustentabilidade
    const quizSection = document.querySelector('#quiz-container');
    const quizHTML = `
        <h3>O que é Agricultura Regenerativa?</h3>
        <select id="resposta-quiz">
            <option value="errado">Apenas usar máquinas novas</option>
            <option value="certo">Práticas que recuperam a saúde do solo e biodiversidade</option>
            <option value="errado">Aumentar o uso de insumos químicos</option>
        </select>
        <button id="btn-responder" style="margin-top:10px">Verificar Resposta</button>
        <p id="resultado-quiz"></p>
    `;
    
    // Injetando o quiz na seção que estava vazia
    const sectionQuiz = document.querySelectorAll('section')[4]; // Seleciona a seção do quiz
    sectionQuiz.innerHTML = `<h2>Quiz de Sustentabilidade</h2>` + quizHTML;

    document.getElementById('btn-responder').addEventListener('click', () => {
        const resposta = document.getElementById('resposta-quiz').value;
        const display = document.getElementById('resultado-quiz');
        if(resposta === 'certo') {
            display.innerText = "Correto! Você entende a importância da regeneração.";
            display.style.color = "green";
        } else {
            display.innerText = "Ops! Tente novamente.";
            display.style.color = "red";
        }
    });

    // 3. Validação do Formulário com feedback visual
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        
        // Simulação de envio
        form.style.opacity = '0.5';
        setTimeout(() => {
            alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`);
            form.reset();
            form.style.opacity = '1';
        }, 800);
    });

    // 4. Animação simples de entrada ao carregar
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = "all 1s ease-out";
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    });

    sections.forEach(sec => {
        sec.style.opacity = "0";
        sec.style.transform = "translateY(50px)";
        observer.observe(sec);
    });
});
