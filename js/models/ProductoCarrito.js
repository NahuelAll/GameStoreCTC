export class ProductoCarrito {
    #id;
    #nombre;
    #categoria;
    #precioBase;
    #iva;
    #imagen;
    #cantidad

    constructor(id, nombre, categoria, precioBase, iva, imagen, cantidad = 1){
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precioBase = precioBase;
        this.iva = iva;
        this.imagen = imagen;
        this.#cantidad = cantidad;
    }

    get id(){
        return this.#id;
    }

    set id(valor){
        if (!Number.isInteger(valor) || valor <= 0) {
            throw new Error("El id debe ser un entero mayor que cero.");
        }

        this.#id = valor;
    }

    get nombre(){
        return this.#nombre;
    }

    set nombre(valor){
        if(!valor || String(valor).trim() === ""){
            throw new Error("El nombre es obligatorio");
        }
        this.#nombre = String(valor).trim();
    }

    get categoria(){
        return this.#categoria;
    }

    set categoria(valor){
        if(!valor || String(valor).trim() === ""){
            throw new Error("Debe de tener una categoria");
        }
        this.#categoria = String(valor).trim();
    }

    get precioBase(){
        return this.#precioBase;
    }

    set precioBase(valor){
        let precioBase = Number.parseFloat(valor);
        if (!Number.isFinite(precioBase) || precioBase < 0){
            throw new Error("Debe ser un numero positivo");
        }
        this.#precioBase = precioBase;
    }

    get iva(){
        return this.#iva;
    }

    set iva(valor){
        let iva = Number.parseFloat(valor);
        if(!Number.isFinite(iva) || iva < 0 || iva > 100){
            throw new Error("el iva debe estar entre 0 y 100");
        }
        this.#iva = iva;
    }

    get imagen(){
        return this.#imagen;
    }

    set imagen(valor){
        this.#imagen = valor;
    }

    get cantidad(){
        return this.#cantidad;
    }

    set cantidad(valor){
        let cantidad = Number.parseInt(valor)
        if(isNaN(cantidad) || cantidad < 0){
            throw new Error("la cantidad debe ser mayor a 0")
        }
        this.#cantidad = cantidad;
    }

    get montoIva(){
        return this.#precioBase * (this.#iva / 100);
    }

    get precioFinal(){
        return this.#precioBase + this.montoIva;
    }

    get subtotal(){
        return this.precioFinal * this.#cantidad;
    }

    toJSON(){
        return{
            id: this.#id,
            nombre: this.#nombre,
            categoria: this.#categoria,
            precioBase: this.#precioBase,
            iva: this.#iva,
            precioFinal: this.precioFinal,
            imagen: this.#imagen,
            cantidad: this.#cantidad
        };
    }

    static fromJSON(info){
        return new ProductoCarrito(
            info.id,
            info.nombre,
            info.categoria,
            info.precioBase,
            info.iva,
            info.imagen,
            info.cantidad
        );
    }
}