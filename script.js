const select = document.querySelector('#uf')
const btnBuscarMortesCasos = document.querySelector('#btnBuscarMortesCasos')
const resultadoStatus = document.querySelector('#status')
const resultado = document.querySelector('#resultado')
const resultadoMortes = document.querySelector('#resultadoMortes')
const resultadoCasos = document.querySelector('#resultadoCasos')
const ctx = document.getElementById('myChart');
const ctx2 = document.getElementById('myChart2');


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

function verificarMortosCasos(valorSelecionado) {
    fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${valorSelecionado}`, {
    })
        .then(response => response.json())
        .then(dados => {
            const mortos = dados.deaths
            const casos = dados.cases
            resultadoMortes.innerHTML = `Mortes: ${mortos}`
            resultadoCasos.innerHTML = `Casos: ${casos}`
            const estado = valorSelecionado
            criarTabela(estado,mortos,casos)
        })
        .catch(err => console.error(err));
}


function criarTabela(valorSelecionado,mortos,casos) {
    tabela = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [`Casos de Covid em ${valorSelecionado}`],
            datasets: [{
                label: ['Mortes'],
                data: [mortos],
                backgroundColor: 'rgba(255, 0, 0, 0.6)',
                borderWidth: 1
            },
            {
                label: 'Casos',
                data: [casos],
                backgroundColor: 'rgba(0, 158, 255, 0.6)',
                borderWidth: 1
            }
            ]
        },
        options: {
            title: {
                display: true,
                fontSize: 20,
                text: 'TABELA DE MORTES E CASOS POR ESTADOS',
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    })
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

    verificarMortosCasos(valorSelecionado)

}

btnBuscarMortesCasos.addEventListener('click', () => validarPesquisa())

