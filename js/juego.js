// Variables globales
let json_random = {}

let turno_maquina = false

let cpu_player = new Jugador('cpu')

// Funciones 
//CATEGORIAS
const seleccionCategoria = (event) => {
const elementoOnClick = event.target;
if(elementoOnClick.nodeName == "IMG"){
    cargarPreguntas(elementoOnClick.id)
    cambiarPantalla(trivia_container_question, categorias)
  
}

}

const setDefaultValuesPreguntas = () =>{
    Array.from(container_answers.children).forEach((element) => element.textContent = '')
}



//PREGUNTAS Y RESPUESTAS
const cargarPreguntas = (categoria) => {
    setDefaultValuesPreguntas()
    json_random = getJsonRandom(categoria); // Usa la variable global
    if (!json_random) {
        console.error('No se encontró una pregunta para la categoría:', categoria);
        return; // Termina la función si no hay preguntas
    }

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
    // quesito_container.classList.add('hidden');


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

const agregarQuesito = (color) => {
    const quesito_para_mostrar = document.getElementById(color)
    quesito_para_mostrar.classList.add(color)
}

const esTurnoMaquina = () => {
    return turno_maquina
}

const turnoMaquina = () => {
    console.log('entro')
    // Eleccion de la vategoria
    let categoria_elegida = cpu_player.elegirCategoria()
    const categoria_a_clickar = categorias.children[categoria_elegida]
    setTimeout(() => {
        categoria_a_clickar.click()
        // Eleccion de una respuesta
        setTimeout(() => {
            let respuesta_elegida = cpu_player.responderPreguntas()
            const respuesta_a_clickar = container_answers.children[respuesta_elegida]
            respuesta_a_clickar.click()
        }, 2000)
    }, 2000)

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
            let quesito_ganado = new Quesito(categoria)
            jugador.consegirQuesito(quesito_ganado)
            jugador.sumarPuntuacion(80)
            agregarQuesito(quesito_ganado.color)
            
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
        if(jugador.esGanador()){
            showEnding(jugador)
        }
        if(turno_maquina){
            console.log('estoy entrado')
            turno_maquina = false
            turnoMaquina() 
        }
        
    }, 2000); 

   
    
}

const showEnding = () => {

cambiarPantalla(final, categorias)

const end = Date.now() + (8 * 1000);

// go Buckeyes!
const colors = ['#bb0000', '#ffffff'];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  });
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());
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
container_answers.addEventListener('click', (event) =>{
    if(!turno_maquina){
        turno_maquina = true
        comprobarRespuesta(event, json_random)
    }

} );
categorias.addEventListener("click", seleccionCategoria)
