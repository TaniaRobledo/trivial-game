//OBJETO JUGADOR
class Jugador {

    //Atributos
    constructor(nombre, caja) {
        this.nombre = nombre;  // Nombre del jugador
        this.puntuacion = 0;      // Puntaje inicial
        this.caja = caja;    // Quesitos ganados por el jugador
    }

    //Responder pregunta maquina
    responderPreguntas(){
        return  Math.floor(Math.random() * 4);
    }

    //elegir categoria amquina
    elegirCategoria(){
        return  Math.floor(Math.random() * 6);
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
        // return true
    }
    
    getNumeroQuesitos(){
        return this.caja.getNumeroQuesitos()
    }

   

}


