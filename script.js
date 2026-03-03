const select= document.querySelector('#uf')
const btnBuscar = document.querySelector('#btnBuscar')

btnBuscar.addEventListener('click', ()=>{
    const valorSelecionado= select.value
    console.log(valorSelecionado) 
})