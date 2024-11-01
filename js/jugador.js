//OBJETO JUGADOR
class Jugador {

    //Atributos
    constructor(nombre, caja) {
        this.nombre = nombre;  // Nombre del jugador
        this.puntuacion = 0;      // Puntaje inicial
        this.caja = caja;    // Quesitos ganados por el jugador
    }

    //Responder pregunta maquina
    responderPreguntas(respuestas){
        return  Math.floor(Math.random() * respuestas.length);
    }

    //elegir categoria amquina
    elegirCategoria(categorias){
        return  Math.floor(Math.random() * categorias.length);
    }

    //conseguir quesito
    consegirQuesito(quesito){
        this.caja.aniadirQuesito(quesito)
    }

    //sumar puntuacion
    sumarPuntuacion(puntuacion_ganada){
        this.puntuacion += puntuacion_ganada
    }

    esGanador(){
        return this.caja.esGanador()
    }
    
    getNumeroQuesitos(){
        return this.caja.getNumeroQuesitos()
    }

   

}


