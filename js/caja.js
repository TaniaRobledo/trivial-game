//Definir el objeto Quesitos
class Caja {
    constructor() {
        this.quesitos = []; // Inicializas el array vacío
    }


    //Funcion añadir quesitos
    aniadirQuesito(quesito){
        this.quesitos.push(quesito)
    }

    //Metodo de cantidad de quesitos
    esGanador(){
        return this.quesitos.length == 6;
    }

    //Saber l numero de quesitos que tiene
    getNumeroQuesitos(){
        return this.quesitos.length;
    }




}