// Cotação de moedas do dia
const USD = 5.77
const EUR = 6.14
const GBP = 7.42

// Obtendo os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const desciprion = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {

    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Capturando o evento de submit do formulário
form.onsubmit = (event) => {
    event.preventDefault()

    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break
    }
}

// FUnção para converter a moeda
function convertCurrency(amount, price, symbol) {
    
    try {
        // Atualizando o conteúdo da contação da moeda selecionada
        desciprion.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        // Calculando o total
        let total = amount * price

        // Verifica se o resultado não é um número
        if(isNaN(total)) {
            return alert ("Por favor, digite o valor corretamente")
        }

        // Transforma o ponto em vírgula e tira o R$
        total = formatCurrencyBRL(total).replace("R$", "")

        // Exibe o resultado total
        result.textContent = `${total} Reais`

        // Aplica a classe que exibe o footer para mostrar o resultado
        footer.classList.add("show-result")

    } catch (error) {
        // Remove a classe que exibe o footer
        footer.classList.remove("show-result")
        console.log(error)
        alert("Não foi possível converter, tente novamente mais tarde")
    }
}

function formatCurrencyBRL(value) {

    // Converte para número para depois formatar para moeda brasileira
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}