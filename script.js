const select = document.querySelector('#uf')

const btnBuscarMortesCasos = document.querySelector('#btnBuscarMortesCasos')

const resultadoStatus = document.querySelector('#status')
const resultado = document.querySelector('#resultado')
const resultadoMortes = document.querySelector('#resultadoMortes')
const resultadoCasos = document.querySelector('#resultadoCasos')
const resultadoProporcao = document.querySelector('#resultadoProporcao')
const resultados = document.querySelector('.resultados')

const casosMortes = document.querySelector('.casosMortes')

const ctx = document.getElementById('myChart');

let tabela;

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
            
            let proprocao= (mortos/casos).toFixed(2)
            resultadoCasos.innerHTML = `Casos: ${casos}`
            resultadoMortes.innerHTML = `Mortes: ${mortos}`
            
            resultadoProporcao.innerHTML =
            `Taxa de mortalidade ${proprocao}% <br> 
             Taxa de sobrevivencia ${100-proprocao}%`
            const estado = valorSelecionado

            if(tabela){
                tabela.destroy();
            }
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
                data: [mortos*5],
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
    ctx.classList.add('myChart1')
}

function validarPesquisa() {
    resultados.classList.add('resultadosClass')
    casosMortes.classList.add('casosEMortes')

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

