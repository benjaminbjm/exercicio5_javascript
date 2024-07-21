document.getElementById('cep-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
    
    const cep = document.getElementById('cep').value;
    const resultDiv = document.getElementById('result');

    // Valida o formato do CEP (apenas números e com 8 dígitos)
    if (!/^\d{5}-?\d{3}$/.test(cep)) {
        resultDiv.innerHTML = 'CEP inválido. Por favor, insira um CEP válido.';
        return;
    }

    // Formata o CEP (adiciona o hífen se estiver ausente)
    const formattedCep = cep.replace(/\D/g, '').replace(/^(\d{5})(\d{3})$/, '$1-$2');

    // Consulta a API ViaCEP
    fetch(`https://viacep.com.br/ws/${formattedCep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultDiv.innerHTML = 'CEP não encontrado.';
            } else {
                // Escolhe e exibe alguns dados da resposta
                resultDiv.innerHTML = `
                    <p><strong>CEP:</strong> ${data.cep}</p>
                    <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                    <p><strong>Bairro:</strong> ${data.bairro}</p>
                    <p><strong>Cidade:</strong> ${data.localidade}</p>
                    <p><strong>Estado:</strong> ${data.uf}</p>
                `;
            }
        })
        .catch(error => {
            resultDiv.innerHTML = 'Ocorreu um erro ao consultar o CEP.';
            console.error('Erro na consulta:', error);
        });
});