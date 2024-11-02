//Definir el objeto Quesitos
class Caja {
    constructor() {
        this.quesitos = {
            "history": false,
            "geography": false,
            "science_technology": false,
            "entertainment": false,
            "sports": false,
            "animals": false,
        };; // Inicializas el array vacío
    }


    //Funcion añadir quesitos
    aniadirQuesito(quesito){
        this.quesitos[quesito.categoria] = true
    }

    //Metodo de cantidad de quesitos
    esGanador(){
        return Object.values(this.quesitos).every((element) => element === true)

    }

    //Saber l numero de quesitos que tiene
    getNumeroQuesitos(){
        return this.quesitos.length;
    }




}