const select = document.querySelector('#uf')
const btnBuscarMortes = document.querySelector('#btnBuscarMortes')
const resultadoStatus = document.querySelector('#status')
const resultado = document.querySelector('#resultado')


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

function verificarMortos(valorSelecionado) {

    fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${valorSelecionado}`, {
    })
        .then(response => response.json())
        .then(dados => {
            const mortos = dados.deaths
            resultado.innerHTML = `${mortos}`
        })
        .catch(err => console.error(err));
}

function validarPesquisa() {
    let valorSelecionado = select.value;

    if (valorSelecionado == '') {
        resultado.innerHTML = 'insira um valor valido'
        return;
    }
    if (valorSelecionado != '') {
        valorSelecionado = select.value;
        resultado.innerHTML = '';
    }

    verificarMortos(valorSelecionado)

}

btnBuscarMortes.addEventListener('click', () => validarPesquisa())