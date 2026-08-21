export  class Producto {
    #id;
    #nombre;
    #categoria;
    #descripcion;
    #precioBase;
    #iva;
    #stock;
    #imagen;

    constructor(id, nombre, categoria, descripcion, precioBase, iva, stock, imagen){
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.precioBase = precioBase;
        this.iva = iva;
        this.stock = stock;
        this.imagen = imagen;
    }

    get id(){
        return this.#id;
    }

    set id(valor){
        let id = Number(valor);
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error("el id debe ser un entero mayor que cero.");
        }

        this.#id = id;
    }

    get nombre(){
        return this.#nombre;
    }
    
    set nombre(valor){
        let nombre = String(valor).trim();
        if (nombre.length === 0){
            throw new Error("el producto debe contener un nombre");
        }
        
        this.#nombre = nombre;
    }

    get categoria(){
        return this.#categoria;
    }

    set categoria(valor){
        let categoria = String(valor).trim();
        if (categoria.length === 0){
            throw new Error("debe seleccionar una categoria");
        }

        this.#categoria = categoria;
    }

    get descripcion(){
        return this.#descripcion;
    }

    set descripcion(valor){
        this.#descripcion = String(valor).trim();
        
    }

    get precioBase(){
        return this.#precioBase;
    }

    set precioBase(valor){
        let precioBase = Number.parseFloat(valor);
        if (!Number.isFinite(precioBase) || precioBase < 0){
            throw new Error("debe ser un numero positivo y valido")
        }

        this.#precioBase = precioBase;
    }

    get iva(){
        return this.#iva;
    }

    set iva(valor){
        let iva = Number(valor);
        if(!Number.isFinite(iva) || iva < 0 || iva > 100){
            throw new Error("el iva debe estar entre 0 y 100");
        }
    }

    get precioFinal(){
        return this.#precioBase + (this.#precioBase * (this.#iva / 100));
    }

    get stock(){
        return this.#stock;
    }

    set stock(valor){
        let stock = Number.parseInt(valor)
        if(isNaN(this.stock) || stock < 0){
            throw new Error("el stock debe ser mayor o igual a 0")
        }

        this.#stock = stock
    }

    get imagen(){
        return this.#imagen;
    }

    set imagen(valor){
        this.#imagen = valor;
    }

    toJSON(){
        return {
            id: this.#id,
            nombre: this.#nombre,
            categoria: this.#categoria,
            descripcion: this.#descripcion,
            precioBase: this.#precioBase,
            iva: this.#iva,
            precioFinal: this.PrecioFinal,
            stock: this.#stock,
            imagen: this.#imagen
        };
    }

    static fromJSON(info){
        return new Producto(
            info.id,
            info.nombre,
            info.categoria,
            info,descripcion,
            info.precioBase,
            info.iva,
            info.stock,
            info.imagen
        );
    }
}