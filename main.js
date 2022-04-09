var produtos = []
var produtosVendidos = []
let entradas = 0
let saidas = 0
let qtdProdutos = 0
const botaoCadastro = document.getElementById('cadastro')
class criarProduto {
    constructor(nome, preco, qtd) {
        this.nome = nome
        this.preco = preco
        this.qtd = Number(qtd)
        this.quantidadeInicial = Number(qtd)
    }

    get diferenca() {
        return this.quantidadeInicial - this.qtd
    }

}

function ehIgual(testando) {
    for (var k = 0; k < produtos.length; k++) {
        if (produtos[k].nome === testando && produtos.length > 0) {
            return (k);
        }
    }
    return (null);
}


function cadastrar(produto) {
    produtos.push(produto)
}

function botao() {
    entradas += 1;
    let nome = document.getElementById('inputNome').value
    let preco = document.getElementById('inputPreco').value
    let qtd = document.getElementById('inputQtd').value
    document.getElementById('inputNome').value = ""
    document.getElementById('inputPreco').value = ""
    document.getElementById('inputQtd').value = ""
    document.getElementById('inputNome').focus()
    if (ehIgual(nome) === null) {
        let cadastrado = new criarProduto(nome, preco, qtd)
        cadastrarProduto(cadastrado)
        cadastrar(cadastrado)
    } else {
        console.log('lá')
        let display = document.getElementsByClassName('vendas')[0]
        display.innerHTML = ''
        produtos[ehIgual(nome)].qtd += Number(qtd)
        produtos[ehIgual(nome)].quantidadeInicial += Number(qtd)
        for (var l = 0; l < produtos.length; l++) {
            cadastrarProduto(produtos[l])
        }
        
    }
}
function cadastrarProduto(cadastrado) {
    let produtos = document.getElementsByClassName('vendas')[0]
    produtos.innerHTML += `<div class = 'bloquear'>
        <p class = 'bloco'><strong>Nome:</strong> ${cadastrado.nome}</p>
        <p class = 'bloco'><strong>Preço:</strong> ${cadastrado.preco}</p>
        <p class = 'bloco'><strong>Quantidade:</strong> ${cadastrado.qtd}</p>
    </div>`
}

function mostrarVendas(vendas) {
    let produtos = document.getElementsByClassName('vendidos')[0]
    produtos.innerHTML += `<div class = 'bloquear'>
        <p class = 'bloco'><strong>Nome:</strong> ${vendas.nome}</p>
        <p class = 'bloco'><strong>Preço:</strong> ${vendas.preco}</p>
        <p class = 'bloco'><strong>Quantidade:</strong> ${vendas.quantidadeInicial}</p>
    </div>`
}

function mostrarVendidos(vendas) {
    let produtos = document.getElementsByClassName('vendidos')[0]
    produtos.innerHTML += `<div class = 'bloquear'>
        <p class = 'bloco'><strong>Nome:</strong> ${vendas.nome}</p>
        <p class = 'bloco'><strong>Preço:</strong> ${vendas.preco}</p>
        <p class = 'bloco'><strong>Quantidade:</strong> ${vendas.diferenca}</p>
    </div>`
}




function vender() { 
    let quantidade = document.getElementById('numero').value
    let display = document.getElementsByClassName('vendas')[0]
    display.innerHTML = ''
    saidas += 1;
    let vendido = document.getElementById('vendido').value
    for (var i = 0; i < produtos.length; i++) {
        if (produtos[i].nome === vendido) {
             if (produtos[i].qtd === 0 || quantidade >= produtos[i].qtd) {
                produtosVendidos.push(produtos[i])
                produtos.splice(i, 1)
                document.getElementById('numero').value = ""
                document.getElementById('vendido').value = ""
                document.getElementById('vendido').focus()
             } else {
                produtos[i].qtd -= quantidade
             } 
        }
    }
    for (var j = 0; j < produtos.length; j++) {
        cadastrarProduto(produtos[j])
    }
}

function vendas() {
    let display = document.getElementsByClassName('vendidos')[0]
    display.innerHTML = ''
    for (var i = 0; i < produtos.length; i++) {
        if (produtos[i].qtd !== produtos[i].quantidadeInicial) {
            mostrarVendidos(produtos[i])
        }
    }
    for (var j = 0; j < produtosVendidos.length; j++) {
        mostrarVendas(produtosVendidos[j])
    }
}