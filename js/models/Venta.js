export  class Venta {
    #id;
    #idUsuario;
    #nombreUsuario;
    #productos;
    #totalBase;
    #totalIva;
    #totalFinal;
    #fecha;

    constructor(id, idUsuario, nombreUsuario, productos, totalBase, totalIva, totalFinal, fecha = new Date().toISOString()){
        this.id = id;
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.productos = productos;
        this.totalBase = totalBase;
        this.totalIva = totalIva;
        this.totalFinal = totalFinal;
        this.fecha = fecha;        
    }

    get id(){
        return this.#id;
    }

    set id(valor){
        if(!Number.isInteger(valor) || valor <= 0) {
            throw new Error("el id debe ser un entero mayor que cero.");
        }
        this.#id = valor;
    }

    get idUsuario(){
        return this.#idUsuario;
    }

    set idUsuario(valor){
        if(valor !== null && (!Number.isInteger(valor) || valor < 0)){
            throw new Error("El valor id debe ser igual o mayor a cero o null");
        }
        this.#idUsuario = valor;
    }

    get nombreUsuario(){
        return this.#nombreUsuario;
    }

    set nombreUsuario(valor){
        if(!valor || String(valor).trim() === ""){
            throw new Error("El nombre de usuario es obligatorio")
        }
        this.#nombreUsuario = String(valor).trim();
    }

    get productos(){
        return this.#productos;
    }

    set productos(valor){
        if(!Array.isArray(valor) || valor.length === 0){
            throw new Error("La venta debe tener al menos un producto");
        }
        for(let i = 0; i < valor.length; i++){
            let producto = valor[i];
            if(!producto || !producto.nombre || !Number.isInteger(producto.cantidad) || producto.cantidad <= 0 || !Number.isFinite(producto.subtotal)){
                throw new Error("Hay un producto de la venta con datos invalidos");
            }
        }
        this.#productos = valor;
    }

    get totalBase(){
        return this.#totalBase;
    }

    set totalBase(valor){
        let numero = Number.parseFloat(valor);
        if(!Number.isFinite(numero) || numero < 0){
            throw new Error("la Base total debe ser un numero mayor o igual a 0");
        }
        this.#totalBase = numero;
    }

    get totalIva(){
        return this.#totalIva;
    }

    set totalIva(valor){
        let numero = Number.parseFloat(valor);
        if(!Number.isFinite(numero) || numero < 0){
            throw new Error("El total con iva debe ser un numero mayor o igual a 0");
        }
        this.#totalIva = numero;
    }

    get totalFinal(){
        return this.#totalFinal;
    }

    set totalFinal(valor){
        let numero = Number.parseFloat(valor);
        if(!Number.isFinite(numero) || numero < 0){
            throw new Error("El total con iva debe ser un numero mayor o igual a 0");
        }
        this.#totalFinal = numero;
    }

    get fecha(){
        return this.#fecha;
    }

    set fecha(valor){
        let fecha = new Date(valor);
        if(isNaN(fecha.getTime())){
            throw new Error("la fecha es invalida");
        }
        this.#fecha = fecha.toISOString();
    }

    toJSON(){
        return {
            id: this.#id,
            idUsuario: this.#idUsuario,
            nombreUsuario: this.#nombreUsuario,
            productos: this.#productos,
            totalBase: this.#totalBase,
            totalIva: this.#totalIva,
            totalFinal: this.#totalFinal,
            fecha: this.#fecha
        };
    }

    static fromJSON(info){
        return new Venta(
            info.id,
            info.idUsuario,
            info.nombreUsuario,
            info.productos,
            info.totalBase,
            info.totalIva,
            info.totalFinal,
            info.fecha
        );
    }
}