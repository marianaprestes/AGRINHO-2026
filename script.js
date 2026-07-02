const cards = document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("click",()=>{

card.classList.toggle("virado");

});

});

const ctx = document.getElementById("graficoGraos");

new Chart(ctx,{

type:"bar",

data:{

labels:["2020","2021","2022","2023","2024"],

datasets:[{

label:"Produção de Grãos (milhões de toneladas)",

data:[255,271,271,322,298],

backgroundColor:[

"#4CAF50",
"#66BB6A",
"#81C784",
"#43A047",
"#2E7D32"

]

}]

},

options:{

responsive:true,

plugins:{

legend:{

display:false

}

},

scales:{

y:{

beginAtZero:true

}

}

}

});

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit",function(e){

e.preventDefault();

alert("Mensagem enviada com sucesso! Obrigado por contribuir com um futuro sustentável.");

formulario.reset();

});
