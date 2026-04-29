// Busca do CEP via API
document.getElementById("cep").addEventListener("blur", (evento) => { 
    const cepInformado = evento.target.value;

    if(!(cepInformado.length === 8)) {
        alert("CEP inválido. Digite 8 números.");
        return;
    }
    
// Fazer busca no ViaCEP
    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(response => response.json())
        .then(data => {
            if(!data.erro){
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            }else{
               alert("CEP não encontrado.");
            }
        })

        .catch(error => {
            console.error("Erro ao buscar o CEP", error); alert("Erro ao buscar o CEP. Tente novamente.");
        });
});

// Evento para salvar os dados, usando LocalStorage        
 document.getElementById("cadastrar").addEventListener("click", (event) => {
    event.preventDefault();

    const novoCadastro = {  // colocando todos os campos dentro de "dados", para salvar tudo no click
        nome: document.getElementById("nome").value,
        cep: document.getElementById("cep").value,
        logradouro: document.getElementById("logradouro").value,
        numero: document.getElementById("numero").value,
        bairro: document.getElementById("bairro").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value
    };

    const lista = JSON.parse(localStorage.getItem("cadastros")) || [];

    lista.push(novoCadastro);

    localStorage.setItem("cadastros", JSON.stringify(lista)); // gravando os dados no JSON

    alert("Cadastro salvo!");

    mostrarCadastros();
});

// restaurar os dados
document.addEventListener("DOMContentLoaded", () => { // Executa esse código quando a página terminar de carregar
    const lista = JSON.parse(localStorage.getItem("cadastros")) || []; // pega os dados (localStorage.getItem) e converte a string em objeto (parse) 
    // Verificação para evitar erro caso não exista nada salvo
    if (lista.length > 0) {
        const ultimo = lista[lista.length - 1];

        document.getElementById("nome").value = dados.nome || ""; // usa o conteúdo de "dados.nome" OU null
        document.getElementById("cep").value = dados.cep || "";
        document.getElementById("logradouro").value = dados.logradouro || "";
        document.getElementById("numero").value = dados.numero || "";
        document.getElementById("bairro").value = dados.bairro || "";
        document.getElementById("cidade").value = dados.cidade || "";
        document.getElementById("estado").value = dados.estado || "";
    }

    mostrarCadastros();
});

// mostrar lista dos cadastros
function mostrarCadastros() {
    const lista = JSON.parse(localStorage.getItem("cadastros")) || []; // “Se o valor da esquerda for inválido (null, undefined, false), use []”
    const ul = document.getElementById("listaCadastros");

    ul.innerHTML = ""; // limpa antes

    lista.forEach((cadastro) => { // para cada cadastro, adiciona o conteúdo li
        const li = document.createElement("li");

        li.textContent = `${cadastro.nome} - ${cadastro.logradouro}, ${cadastro.numero} - ${cadastro.cidade}`;

        ul.appendChild(li); // adicionando o conteúdo (li) dentro de ul
    });

}

// manter na página mesmo após teclar "F5"
document.addEventListener("DOMContentLoaded", () => {
    mostrarCadastros();
});
