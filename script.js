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
            status == 'ok' ? resultadoStatus.innerHTML = `ONLINE` : resultadoStatus.innerHTML = `OFFLINE`
        })
        .catch(err => console.error(err));


}

btnBuscar.addEventListener('click', () => {
    const valorSelecionado = select.value
    console.log(valorSelecionado)
})