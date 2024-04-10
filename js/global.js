// Função para validar e armazenar informações pessoais no localStorage
//Passo 01

// Função para validar e armazenar informações pessoais no localStorage
function handlePersonalInfo(event) {
    event.preventDefault();
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cep = document.getElementById('cep').value;
    const receberPromos = document.getElementById('consent').checked;

    // Validar campos
    if (!nome || !email || !cep || !isValidEmail(email) || !isValidCEP(cep)) {
        // Adicionar classes de erro aos campos inválidos
        document.getElementById('name').classList.add('error');
        document.getElementById('email').classList.add('error');
        document.getElementById('cep').classList.add('error');
        return;
    }

    const cadastro = {
        nome,
        email,
        cep,
        receberPromos,
    };
    
    console.log(cadastro);
    salvarLocalStorage(cadastro);

    // Mostrar mensagem de sucesso
    alert("Dados salvos corretamente!");
}

// Armazenar informações no localStorage
function salvarLocalStorage(cadastro) {
    localStorage.setItem('churrasqueiro', JSON.stringify(cadastro));
}
    
function carregarLocalStorage() {
    return JSON.parse(localStorage.getItem('churrasqueiro'));
}

// Função para verificar se um e-mail é válido
function isValidEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Função para verificar se um CEP é válido (só verifica se possui 8 dígitos)
function isValidCEP(cep) {
    const re = /^\d{8}$/;
    return re.test(cep);
}


//Passo 02 e 03

// Função para validar e calcular os itens necessários para o churrasco
function handlePeopleInfo(event) {
    event.preventDefault();
    const homens = parseInt(document.getElementById('homens').value) || 0;
    const mulheres = parseInt(document.getElementById('mulheres').value) || 0;
    const criancas = parseInt(document.getElementById('criancas').value) || 0;
    const bebedores = parseInt(document.getElementById('bebedores').value) || 0;

    // Cálculo dos itens necessários
    const carne = 0.4 * homens + 0.32 * mulheres + 0.2 * criancas;
    const paoDeAlho = 2 * (homens + mulheres) + criancas;
    const carvao = homens + mulheres + criancas;
    const sal = 0.04 * (homens + mulheres + criancas);
    const gelo = Math.ceil((homens + mulheres + criancas) / 10) * 5;
    const refrigerante = Math.ceil((homens + mulheres + criancas) / 5) * 2;
    const agua = Math.ceil((homens + mulheres + criancas) / 5);
    const cerveja = 3 * bebedores;

    // Criação do campo de resultados
    const resultDiv = document.getElementById('result-div');
    resultDiv.innerHTML = `

        <div class="row ">
            <div class="col-6 ">Carne:</div>
            <div class="col-6 ">${carne.toFixed(2)} KG</div>
        </div>
            <div class="row">
                <div class="col-6">Pão de alho:</div>
                <div class="col-6">${paoDeAlho} unidades</div>
            </div>
            <div class="row">
                <div class="col-6">Carvão:</div>
                <div class="col-6">${carvao} KG</div>
            </div>
            <div class="row">
                <div class="col-6">Sal:</div>
                <div class="col-6">${sal.toFixed(2)} KG</div>
            </div>
            <div class="row">
                <div class="col-6">Gelo:</div>
                <div class="col-6">${gelo} KG</div>
            </div>
            <div class="row">
                <div class="col-6">Refrigerante:</div>
                <div class="col-6">${refrigerante} garrafas de 2L</div>
            </div>
            <div class="row">
                <div class="col-6">Água:</div>
                <div class="col-6">${agua} garrafas de 1L</div>
            </div>
            <div class="row">
                <div class="col-6">Cerveja:</div>
                <div class="col-6">${cerveja} garrafas de 600ml</div>
            </div>
    `;

}

window.onload = function() {
    // Adicionar ouvinte de evento ao formulário
    document.getElementById('people-info-form').addEventListener('submit', handlePeopleInfo);
}
