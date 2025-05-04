const nomeInput = document.getElementById('nome');
const valorInput = document.getElementById('valor');
const quantidadeInput = document.getElementById('quantidade');
const mostrar = document.getElementById('lista');
const total = document.getElementById('total');

// Carrega produtos do localStorage
window.onload = function () {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.forEach((prod, index) => {
        card(prod.nome, prod.valor, prod.quantidade, prod.concluido, index);
    });
};

function create() {
    const nome = nomeInput.value.trim();
    const valor = valorInput.value.trim();
    const quantidade = quantidadeInput.value.trim();

    if (!nome || !valor || !quantidade) return;

    const novoProduto = { nome, valor, quantidade, concluido: false };
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(novoProduto);
    localStorage.setItem('produtos', JSON.stringify(produtos));

    mostrar.innerHTML = '';
    produtos.forEach((prod, index) => {
        card(prod.nome, prod.valor, prod.quantidade, prod.concluido, index);
    });

    nomeInput.value = '';
    valorInput.value = '';
    quantidadeInput.value = '';
}

function card(nome, valor, quantidade, concluido, index) {
    const concluidoStyle = concluido ? 'background-color: green;' : '';
    const btnVisivel = concluido ? 'style="display: none;"' : '';

    mostrar.innerHTML += `
        <div class="card_produto" style="${concluidoStyle}">
            <h3 class="nome_produto">${nome}</h3>
            <p class="valor_produto">R$ ${valor}</p>
            <p class="quantidade_produto">X${quantidade}</p>
            <button class="btn_feito" ${btnVisivel} onclick="concluirProduto(${index})">Concluído</button>
        </div>
    `;
}

function concluirProduto(index) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    if (produtos[index]) {
        produtos[index].concluido = true;
        localStorage.setItem('produtos', JSON.stringify(produtos));
        mostrar.innerHTML = '';
        produtos.forEach((prod, i) => {
            card(prod.nome, prod.valor, prod.quantidade, prod.concluido, i);
        });
    }
}

function limpar() {
    localStorage.clear();
    mostrar.innerHTML = '';
}

