
function gerarPagina() {
    const palavraInput = document.getElementById('palavra');
    const palavra = palavraInput.value.toLowerCase().trim();
    const abrirNovaAba = document.getElementById('novaAba').checked;
    
    if (!palavra) return;

    const urlFinal = `https://s.dicio.com.br/${palavra}.jpg`;

    if (abrirNovaAba) {
        // OPÇÃO 1: CRIAR NOVA PÁGINA (Aba separada)
        const novaJanela = window.open("", "_blank");
        novaJanela.document.write(`
            <html>
            <head>
                <title>Dicio: ${palavra}</title>
                <style>
                    * { margin: 0; padding: 0; }
                    body { background: black; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; }
                    img { width: 100vw; height: 100vh; object-fit: contain; }
                </style>
            </head>
            <body>
                <img src="${urlFinal}" onerror="alert('Não encontrada'); window.close();">
            </body>
            </html>
        `);
    } else {
        // OPÇÃO 2: MESMA PÁGINA (Overlay)
        const fullDiv = document.createElement('div');
        fullDiv.className = 'fullscreen-container';
        fullDiv.id = 'tela-cheia';
        fullDiv.innerHTML = `
            <button class="btn-voltar" onclick="fechar()">VOLTAR</button>
            <img src="${urlFinal}" onerror="erro()">
        `;
        document.body.appendChild(fullDiv);
    }
}

function fechar() {
    const tela = document.getElementById('tela-cheia');
    if (tela) tela.remove();
}

function erro() {
    alert("Palavra não encontrada no banco do Dicio!");
    fechar();
}

// Enter para pesquisar
document.getElementById('palavra').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') gerarPagina();
});