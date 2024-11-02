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


