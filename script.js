// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Rolagem suave para os links do menu
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 2. Interatividade no botão "Saiba Mais"
    const btnSaibaMais = document.querySelector('#home button');
    btnSaibaMais.addEventListener('click', () => {
        alert('Bem-vindo à jornada do agronegócio sustentável! Explore nossas seções para entender como tecnologia e preservação caminham juntas.');
    });

    // 3. Validação simples do formulário de contato
    const form = document.querySelector('#contato form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        if(nome && email) {
            console.log(`Dados recebidos: ${nome} - ${email}`);
            alert(`Obrigado, ${nome}! Recebemos seu contato com sucesso.`);
            form.reset();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    // 4. Efeito de fade-in simples ao rolar a página
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100) {
                section.style.opacity = '1';
                section.style.transition = 'opacity 0.8s ease-in-out';
            }
        });
    });
});
