const select = document.querySelector('#uf')
const btnBuscar = document.querySelector('#btnBuscar')
const resultadoStatus = document.querySelector('#status')

verificarStatus()
function verificarStatus() {
    fetch("https://covid19-brazil-api.now.sh/api/status/v1", {
    })
        .then(response => response.json())
        .then(dados => {
            let status = dados.status
            if (status == 'ok') {
                resultadoStatus.innerHTML = `ONLINE`
                resultadoStatus.classList.add('estilizacaoStatusPositivo')
            }
            else {
                resultadoStatus.innerHTML = `OFFLINE`
                resultadoStatus.classList.add('estilizacaoStatusNegativo')
            }
        })
        .catch(err => console.error(err));


}

btnBuscar.addEventListener('click', () => {
    const valorSelecionado = select.value
    console.log(valorSelecionado)
})