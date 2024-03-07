'use client'

export default function Home() {

  //BOTÃO ENTER PARA SUBMETER O INPUT
  document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
        var btn = document.querySelector("#submit");
      btn.click();
    }
  });

  //FUNÇÃO PARA COPIAR O CAMPO DO INPUT DIGITADO DO CEP
  function copiarCampo(){
    let campo = document.getElementById("campoCep")
    if (campo != null) {
      let texto = campo.value;
      return texto
    }
  }

  //FUNÇÃO PARA APAGAR A MENSAGEM DE ERRO
  function apagarMensagem(){
    let mensagem = document.getElementById("mensagem")
    mensagem.textContent = ""
  }

  //FUNÇÃO PARA PESQUISAR O CEP
  function pesqCep(){
    const cepValidado = copiarCampo().replace(/\D/g,'');
    let campoCep = document.getElementById("campoCep")
    campoCep.value = cepValidado
    let tamanho = cepValidado.length

    let logradouro = document.getElementById("logradouro")
    let cep = document.getElementById("cep")
    let bairro = document.getElementById("bairro")
    let localidade = document.getElementById("localidade")
    let uf = document.getElementById("uf")
    logradouro.textContent = ""
    cep.textContent = ""
    bairro.textContent = ""
    localidade.textContent = ""
    uf.textContent = ""

    let mensagem = document.getElementById("mensagem")

    if (tamanho == 8) {
      fetch(`https://viacep.com.br/ws/${cepValidado}/json/`)
      .then((response) => response.json())
      .then((data) => {
       
        if (data.erro) {
          mensagem.textContent = "CEP não encontrado!"
        }
        else{
    
            cep.textContent = `CEP: ${data.cep}`
            logradouro.textContent = `Endereço: ${data.logradouro}`
            bairro.textContent = `Bairro: ${data.bairro}`
            localidade.textContent = `Localidade: ${data.localidade}`
            uf.textContent = `Estado: ${data.uf}`
          
        }
      })
      .catch((error) => console.log('error', error))
    } else{
      mensagem.textContent = "Digite um CEP válido!"
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#1f2937]">

      <div>
        <h1 className="text-white text-center font-bold text-2xl py-4"> Buscador de CEP</h1>

        <div className=" flex flex-col gap-y-8 items-center">
          <input id="campoCep" type="text" className="w=1/2 p-2 rounded-lg text-center font-bold text-lg" onKeyDown={apagarMensagem} ></input>
        
          <button id="submit" className=" bg-blue-700 px-8 py-3 rounded-lg font-bold text-white text-lg hover:bg-blue-800 transition-all duration-300 ease-in-out" onClick={pesqCep}>Pesquisar</button>

          <p id="mensagem" className=" text-red-300 font-bold items-center gap-4"></p>
        </div>
        
      </div>
      
      <div className="text-2xl py-10 text-white font-bold">
        <p id="cep"></p>
        <p id="logradouro"></p>
        <p id="bairro"></p>
        <p id="localidade"></p>
        <p id="uf"></p>
      </div>

    </main>
  );
}
