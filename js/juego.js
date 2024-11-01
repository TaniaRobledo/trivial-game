// Variables globales
let json_random = {}

// Funciones 
//CATEGORIAS
const seleccionCategoria = (event) => {
const elementoOnClick = event.target;
console.log(elementoOnClick)
if(elementoOnClick.nodeName == "IMG"){
    cargarPreguntas(elementoOnClick.id)
    cambiarPantalla(trivia_container_question, categorias)
  
}

}



//PREGUNTAS Y RESPUESTAS
const cargarPreguntas = (categoria) => {
    json_random = getJsonRandom(categoria); // Usa la variable global
    if (!json_random) {
        console.error('No se encontró una pregunta para la categoría:', categoria);
        return; // Termina la función si no hay preguntas
    }

    console.log(json_random.question);
    const pregunta = json_random.question;
    const respuestas = json_random.choices;

    question_trivia.textContent = pregunta;

    for (let i = 0; i < respuestas.length; i++) {
        container_answers.children[i].textContent = respuestas[i];
    }
}

const cambiarPantalla = (element_to_show, element_to_hide) => {
    element_to_hide.classList.add('hidden');
    element_to_hide.classList.remove('show');
    quesito_container.classList.add('hidden');


    element_to_show.classList.remove('hidden');
    element_to_show.classList.add('show'); 
}

const getElementoCorrecta = (correcta) => {
    for (let child of container_answers.children) {
        if (child.textContent === correcta) {
            return child;
        }
    }
    return null;
}

const marcarRespuesta = (element, color) => {
    element.style.backgroundColor = color
}

const mostrarMensaje = (mensaje, color) => {
    const mensajeRespuesta = document.getElementById('mensaje_respuesta');
    mensajeRespuesta.textContent = mensaje;
    mensajeRespuesta.style.color = color;
    mensajeRespuesta.classList.add('show');


    setTimeout(() => {
        mensajeRespuesta.classList.remove('show');
    }, 2000);
};

const setearPreguntas = () => {
    Array.from(container_answers.children).forEach((element) => element.style.backgroundColor = '#007bff')
}


const comprobarRespuesta = (event) => {
    if (!json_random) {
        console.error('json_random no está definido, verifica la carga de preguntas.');
        return;
    }
    
    let correcta = json_random.answer; // Asegúrate de que json_random esté definido aquí
    let respuestaSeleccionada = event.target;
    let categoria = json_random.category

    // Limpiar colores previos
    for (let child of container_answers.children) {
        child.style.backgroundColor = '';
    }

    // Marcar respuesta seleccionada
    if (respuestaSeleccionada.classList.contains('answer')) {
        console.log("Respuesta seleccionada:", respuestaSeleccionada.textContent);
        if (respuestaSeleccionada.textContent === correcta) {
            marcarRespuesta(respuestaSeleccionada, 'green');
            mostrarMensaje("¡RESPUESTA CORRECTA!", "green");
            jugador.consegirQuesito(new Quesito(categoria))
            jugador.sumarPuntuacion(80)
            
        } else {
            marcarRespuesta(respuestaSeleccionada, 'red');
            mostrarMensaje("RESPUESTA INCORRECTA", "red");
            let elementoCorrecta = getElementoCorrecta(correcta);
            if (elementoCorrecta) {
                marcarRespuesta(elementoCorrecta, 'green');
            }
        }
    }


    setTimeout(() => {
        cambiarPantalla(categorias, trivia_container_question); // Cambia la pantalla
        setearPreguntas(); // Configura las preguntas
        console.log(jugador); // Muestra el objeto jugador
    }, 2000); 

    if(jugador.esGanador())
        showEnding(jugador)
    
}


//Json de las categorias segun cual eliga
const getJsonRandom = (categoria) => {
    switch(categoria){
        case 'animals':
            return animals[Math.floor(Math.random() * animals.length)];
        case 'entertaiment':
            return entertainment[Math.floor(Math.random() * entertainment.length)];
        case 'geography':
            return geography[Math.floor(Math.random() * geography.length)];
        case 'history':
            return history[Math.floor(Math.random() * history.length)];
        case 'science_technology':
            return science_technology[Math.floor(Math.random() * science_technology.length)];
        case 'sports':
            return sports[Math.floor(Math.random() * sports.length)];

    }
}

const crearJugador = (nombre) => {
    jugador = new Jugador(nombre, new Caja)
}

//EMPEIZE DE JUEGO 
const empezarJuego = () => {
    crearJugador(config.nombre_jugador)
    cambiarPantalla(categorias, inicio);
    json_random = getJsonRandom();
    // cargarPreguntas(json_random);
}



// Eventos 
container_answers.addEventListener('click', (event) => comprobarRespuesta(event, json_random));
categorias.addEventListener("click", seleccionCategoria)
