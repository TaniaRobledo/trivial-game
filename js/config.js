// Elementos de DOM 
const nombreInput = document.getElementById('nombreInput')
const enviarConfig = document.getElementById('enviarConfig')
const numeroInput = document.getElementById('numeroInput')
const inicio = document.getElementById('inicio');
const quesito_container = document.getElementById('quesito-container')
const trivia_container_question = document.getElementById('trivia_container_question')
const categorias = document.getElementById('categorias')
const question_trivia = document.getElementById('question_trivia');
const container_answers = document.getElementById('container_answers');
const final = document.getElementById('final');
const container_quesitos = document.getElementById('container_quesitos');
const boton_inicio = document.getElementById('boton_inicio');
const miAudio = document.getElementById('miAudio');



// Variables globales
let config = {
    'nombre_jugador' : '',
    'numero_jugadores' : 1
}
let nombre_jugador = ''

//Funciones
const saveName = () => {
    config.nombre_jugador = nombreInput.value
}
const savePlayerNumber = () => {
    config.numero_jugadores = numeroInput.value
}

const setConfig = () => {
    saveName()
    savePlayerNumber()
 
    
}

// eventos
enviarConfig.addEventListener('click', () => {
    setConfig()
    empezarJuego()
})

 // Selecciona el elemento y actualiza su contenido
 const ganadorElements = document.getElementsByClassName('ganador');
 ganadorElement.textContent = `!!!ENHORABUENA ${jugador.nombre.toUpperCase()}!!!`;



