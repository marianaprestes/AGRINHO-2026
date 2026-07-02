const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("click",()=>{

card.classList.toggle("virado");

});

});

const perguntas=[

"Qual máquina é muito utilizada na agricultura moderna?",

"Qual recurso natural é indispensável para as plantações?",

"O que significa sustentabilidade?",

"Qual profissional trabalha cultivando alimentos?"

];

const respostas=[

"🚜 Trator.",

"💧 Água.",

"🌱 Produzir preservando o meio ambiente.",

"👨‍🌾 Agricultor."

];

function mostrarPergunta(){

let numero=Math.floor(Math.random()*perguntas.length);

let resposta=confirm(perguntas[numero]);

if(resposta){

document.getElementById("pergunta").innerHTML=respostas[numero];

}else{

document.getElementById("pergunta").innerHTML="Clique novamente para outra pergunta.";

}

}
