/**
 * 2. Validação e Envio do Formulário de Contato
 * Processa o envio e exibe uma mensagem de sucesso diretamente na tela.
 */
function initFormValidation() {
    const form = document.querySelector('#contato form');
    if (!form) return;

    // Cria o elemento que exibirá o feedback na tela
    const feedbackMessage = document.createElement('p');
    feedbackMessage.style.marginTop = '15px';
    feedbackMessage.style.fontWeight = 'bold';
    feedbackMessage.style.textAlign = 'center';
    feedbackMessage.style.transition = 'all 0.3s ease';
    form.appendChild(feedbackMessage);

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();

        // Validação básica de segurança
        if (nome === '' || email === '') {
            feedbackMessage.innerText = 'Por favor, preencha todos os campos.';
            feedbackMessage.style.color = '#e74c3c'; // Vermelho
            return;
        }

        // Estado de carregamento do botão
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerText = 'Enviando...';
        feedbackMessage.innerText = ''; // Limpa mensagens anteriores

        // Simulação de envio assíncrono (1.5 segundos)
        setTimeout(() => {
            // Exibe a mensagem de sucesso na tela
            feedbackMessage.innerText = `✨ Sucesso! Obrigado pelo contato, ${nome}. Sua mensagem foi enviada.`;
            feedbackMessage.style.color = '#2ecc71'; // Verde
            
            // Reseta o formulário e o botão
            form.reset();
            submitButton.disabled = false;
            submitButton.innerText = 'Enviar';

            // Remove a mensagem da tela após 5 segundos
            setTimeout(() => {
                feedbackMessage.innerText = '';
            }, 5000);

        }, 1500);
    });
}
