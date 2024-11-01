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