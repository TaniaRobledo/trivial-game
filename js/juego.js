// Variables globales
let json_random = {}

let turno_maquina = false

let cpu_player = new Jugador('cpu', new Caja())

// Funciones 
//CATEGORIAS
const seleccionCategoria = (event) => {
    // Obtenemos el elemento que fue clickeado
    const elementoOnClick = event.target; 
    // Verifica si el elemento clickeado es una imagen
    if(elementoOnClick.nodeName == "IMG"){ 
        elementoOnClick.classList.add('blink'); // Añade la clase 'blink' al elemento, que probablemente aplicará algún efecto visual.
        
        setTimeout(() => { 
            // Llamar a la función cargarPreguntas
            cargarPreguntas(elementoOnClick.id); 
             // Cambia la pantalla a la de preguntas
            cambiarPantalla(trivia_container_question, categorias);
             // Elimina la clase blink del elemento
            elementoOnClick.classList.remove('blink');
        }, 500); 
    }
}

const setDefaultValuesPreguntas = () =>{
    // Recorrer todos los hijos de container_answers y ponemos su contenido de texto como una cadena vacia.
    Array.from(container_answers.children).forEach((element) => element.textContent = '')
}



//PREGUNTAS Y RESPUESTAS
const cargarPreguntas = (categoria) => {
    setDefaultValuesPreguntas(); // Llama a la función para limpiar los valores de las respuestas.
    
    json_random = getJsonRandom(categoria); // Llama a la función getJsonRandom con la categoría especificada y asigna el resultado a la variable global json_random
    
    if (!json_random) { // Verifica si json_random es null .
        console.error('No se encontró una pregunta para la categoría:', categoria);
        return; 
    }

    const pregunta = json_random.question; // Extrae la pregunta del objeto json_random.
    const respuestas = json_random.choices; // Extrae las opciones de respuesta del objeto json_random.

    question_trivia.textContent = pregunta; // Asigna la pregunta al elemento question_trivia para mostrarlo.

    for (let i = 0; i < respuestas.length; i++) { // Itera a través de las respuestas disponibles.
        container_answers.children[i].textContent = respuestas[i]; // Asigna cada respuesta al texto correspondiente de los elementos hijos en container_answers.
    }
}

//Funcion para cambiar la pantalla 
const cambiarPantalla = (element_to_show, element_to_hide) => {
    element_to_hide.classList.add('hidden'); // Añade la clase hidden al elemento en ese momento que queremos ocultar
    element_to_hide.classList.remove('show'); // Elimina la clase show del elemento que se va a ocultar, para que no se muestre
    element_to_show.classList.remove('hidden'); 
    element_to_show.classList.add('show'); 
}

//Funcion para ver si es correcta
const getElementoCorrecta = (correcta) => {
    for (let child of container_answers.children) { // Itera sobre cada hijo en container_answers.
        if (child.textContent === correcta) { // Comprueba si el contenido de texto del hijo es igual a la respuesta correcta.
            return child; // Si hay una coincidencia, devuelve el hijo.
        }
    }
    return null; // Si no se encuentra una coincidencia, devuelve null.
}

//Funcion para marcar las respuestas de color verde o rojo
const marcarRespuesta = (element, color) => {
    element.style.backgroundColor = color
}

const mostrarMensaje = (mensaje, color) => {
    const mensajeRespuesta = document.getElementById('mensaje_respuesta'); 
    
    mensajeRespuesta.textContent = mensaje; // Ponemos el contenido de texto del elemento a mensaje.
    mensajeRespuesta.style.color = color; // Cambia el color del texto del elemento al valor color
    mensajeRespuesta.classList.add('show'); // Añade la clase show al elemento.

    setTimeout(() => { 
        mensajeRespuesta.classList.remove('show'); 
    }, 2000); 
};

//Setear preguntas
const setearPreguntas = () => {
    Array.from(container_answers.children).forEach((element) => element.style.backgroundColor = '#007bff')
}

//Colores segun la categoria
const getClassNameByCategory = (category_on_search) => {
    switch (category_on_search) {
    case "history":
        return "amarillo"; // Color para history
    case "geography":
        return "azul"; // Color para geography
    case "science_technology":
        return "verde"; // Color para science_technology
    case "entertainment":
        return "morado"; // Color para entertainment
    case "sports":
        return "naranja"; // Color para sports
    case "animals":
        return "rojo"; // Color para animals
    }
}

//Funcion para mostrar la caja del quesito
const mostrarCaja = (jugador_actual) => {
    // console.log(`entramos con el jugador ${jugador_actual.nombre}`); 
    // console.log(`su caja ${jugador_actual.caja.quesitos}`); 
    // console.log(jugador_actual.caja.quesitos);

    Array.from(container_quesitos.children).forEach(element => { // Itera sobre cada hijo en container_quesitos.
        if(jugador_actual.caja.quesitos[element.id]) // Verifica si el id del elemento existe en la caja de quesitos del jugador.
            element.classList.add(getClassNameByCategory(element.id)); // Si existe, añade una clase especifica segun la categoría.
        else
            element.className = 'img_quesito'; // Si no existe, establece la clase del elemento como img_quesito.
    });
}

//Truno d ela CPU
const esTurnoMaquina = () => {
    return turno_maquina
}

//Funcion para la logica de la jugada de la maquina
const turnoMaquina = () => {
    // console.log('entro en el turno de la maquina') 
    
    // Elección de la categoría
    let categoria_elegida = cpu_player.elegirCategoria(); // Llama al método elegirCategoria del objeto cpu_player para seleccionar una categoria.
    const categoria_a_clickar = categorias.children[categoria_elegida]; // Obtiene el elemento de categoría segun la categoría elegida.

    setTimeout(() => {
        categoria_a_clickar.click(); // Simula un clic en la categoria elegida por la maquina.
        
        // Elección de una respuesta
        setTimeout(() => {
            let respuesta_elegida = cpu_player.responderPreguntas(); // Llama al metodo responderPreguntas del objeto cpu_player para seleccionar una respuesta.
            const respuesta_a_clickar = container_answers.children[respuesta_elegida]; // Obtiene el elemento de respuesta segun a la respuesta elegida.
            respuesta_a_clickar.click(); // Simula un clic en la respuesta elegida por la máquina.
        }, 2000);
    }, 2000);
}


const comprobarRespuesta = (event, jugador_actual) => {
    if (!json_random) {
        console.error('json_random no está definido, verifica la carga de preguntas.'); // Mensaje de error si no hay preguntas cargadas
        return; // Termina la función si no hay preguntas disponibles
    }
    
    let correcta = json_random.answer; // Obtiene la respuesta correcta de la pregunta actual
    let respuestaSeleccionada = event.target; // Almacena la respuesta seleccionada por el jugador
    let categoria = json_random.category; // Obtiene la categoría de la pregunta actual

    // Limpiar colores previos
    for (let child of container_answers.children) {
        child.style.backgroundColor = ''; // Restablece el color de fondo de todas las respuestas
    }

    // Marcar respuesta seleccionada
    if (respuestaSeleccionada.classList.contains('answer')) { // Verifica si el elemento clicado es una respuesta válida
        // console.log("Respuesta seleccionada:", respuestaSeleccionada.textContent); // Muestra en consola la respuesta seleccionada

        if (respuestaSeleccionada.textContent === correcta) { // Verifica si la respuesta seleccionada es correcta
            marcarRespuesta(respuestaSeleccionada, 'green'); // Marca la respuesta correcta en verde
            mostrarMensaje("¡RESPUESTA CORRECTA!", "green"); // Muestra un mensaje de respuesta correcta
            let quesito_ganado = new Quesito(categoria); // Crea un nuevo objeto Quesito para la categoría
            jugador_actual.consegirQuesito(quesito_ganado); // Añade el quesito a la caja del jugador
            jugador_actual.sumarPuntuacion(80); // Suma 80 puntos a la puntuación del jugador
            mostrarCaja(jugador_actual); // Muestra la caja actualizada del jugador
            
        } else { // Si la respuesta es incorrecta
            marcarRespuesta(respuestaSeleccionada, 'red'); // Marca la respuesta incorrecta en rojo
            mostrarMensaje("RESPUESTA INCORRECTA", "red"); // Muestra un mensaje de respuesta incorrecta
            let elementoCorrecta = getElementoCorrecta(correcta); // Obtiene el elemento segun la respuesta correcta
            if (elementoCorrecta) { // Si se encontro la respuesta correcta
                marcarRespuesta(elementoCorrecta, 'green'); // Marca la respuesta correcta en verde
            }
        }
    }

    // Temporzador de 2 segundos antes de cambiar la pantalla y configurar las preguntas
    setTimeout(() => {
        cambiarPantalla(categorias, trivia_container_question); // Cambia la pantalla de categorias a la pantalla de preguntas
        setearPreguntas(); // Configura las preguntas para el siguiente turno

        if(jugador.esGanador()){ // Verifica si el jugador es el ganador
            showEnding(jugador); // Muestra la pantalla de finalización del juego
            turno_maquina = false; // Detiene el turno de la máquina
            return; // Termina la función
        }

        if(jugador_actual == jugador) // Si el jugador actual es el jugador y no la mñaquina
            mostrarCaja(cpu_player); // Muestra la caja del jugador controlado por la computadora

        if(jugador_actual == cpu_player) // Si el jugador actual es la máquina
            mostrarCaja(jugador); // Muestra la caja del jugador 

        if(turno_maquina) // Si es el turno de la máquina
            turnoMaquina(); // Llama a la función que hace la logica del turno de la maquina
        
    }, 2000); 
}

//Cambiar la pantalla cuando se acaba el juego para ver el ganador
const showEnding = () => {

cambiarPantalla(final, categorias) // Cambia la pantalla actual a la pantalla de finalización, ocultando las categorías.

const end = Date.now() + (8 * 1000);; // Establece un tiempo de finalización de 8 segundos

//Funcion para los confetis si el jugador es ganador
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

//Crear el jugador
const crearJugador = (nombre) => {
    jugador = new Jugador(nombre, new Caja)
}

//Empieze dle juego
const empezarJuego = () => {
    //Musica del juego
    miAudio.play()
    //LLamada ala funcion crear jugador
    crearJugador(config.nombre_jugador)
    //Llamada ala funcion cambiar pantalla
    cambiarPantalla(categorias, inicio);
    json_random = getJsonRandom();
    // cargarPreguntas(json_random);

   
}



// Eventos 
container_answers.addEventListener('click', (event) =>{
    if(event.target.classList.contains('answer')){

    setTimeout(() => {
        if(!turno_maquina){
            comprobarRespuesta(event, jugador)
            turno_maquina = true
        }else{
            comprobarRespuesta(event, cpu_player)
            turno_maquina = false
        }
    }, 1000)
}

} );

//Para reiniciar al partida y poder empezar a jugar de nuevo
const volverInicio = (event) => {
    let elementOnClcik = event.target
    console.log(elementOnClcik);
    if(elementOnClcik.nodeName == "BUTTON"){
        location.reload();
    }
}

//Eventos
categorias.addEventListener("click", seleccionCategoria)
boton_inicio.addEventListener("click", volverInicio)

