// Objeto Quesitos basado en las categorías de la caja
class Quesito {
    constructor(categoria) {
        this.categorias = {
            "history": "amarillo",
            "geography": "azul",
            "science_technology": "verde",
            "entertainment": "morado",
            "sports": "naranja",
            "animals": "rojo",
        };
        
        this.categoria = categoria;
        this.color = this.categorias[categoria];
    }


    // Getter para categoria
    get categoria() {
        return this._categoria;
    }

    // Setter para categoria
    set categoria(nuevaCategoria) {
        if (this.categorias[nuevaCategoria]) {
            this._categoria = nuevaCategoria;
            this.color = this.categorias[nuevaCategoria]; // Actualizamos el color al cambiar la categoría
        } else {
            console.error("Categoría no válida");
        }
    }

    // Getter para color
    get color() {
        return this._color;
    }

    // Setter para color
    set color(nuevoColor) {
        this._color = nuevoColor; // Puedes agregar validaciones si es necesario
    }
}




const container = document.querySelector('.quesito-container');

function crearQuesito() {
    const quesito = document.createElement('img');
    quesito.src = './assets/images/quesito.png'; // Ruta de la imagen del quesito
    quesito.className = 'quesito';

    // Generar una posición aleatoria en el eje X
    const posicionX = Math.random() * (window.innerWidth - 50); // Asegúrate de que no salga de la pantalla
    quesito.style.left = `${posicionX}px`;

    // Posicionar el quesito en la parte superior de la pantalla
    quesito.style.top = `-50px`; // Comienza fuera de la pantalla

    container.appendChild(quesito);

    // Elimina el quesito después de que termine la animación
    quesito.addEventListener('animationend', () => {
        quesito.remove();
    });
}

// Crear un número limitado de quesitos al cargar la página
const numeroDeQuesitos = 10; // Cambia este número para aumentar o disminuir la cantidad de quesitos

window.onload = function() {
    for (let i = 0; i < numeroDeQuesitos; i++) {
        crearQuesito();
    }
};
