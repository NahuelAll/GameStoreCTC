import { Producto } from "../models/Producto.js";
import { ManejadorStorage } from "./ManejadorStorage.js";

export class GestorProductos {
    #productos;
    #storage;

    constructor(storage = new ManejadorStorage()){
        this.#storage = storage;
        this.#productos = this.#cargar();
    }

    #cargar(){
        let datos = this.#storage.obtener("productos", []);
        let productos = [];

        for (let i = 0; i < datos.length; i++){
            try {
                let producto = Producto.fromJSON(datos[i]);
                productos.push(producto);
            } catch(error) {
                console.warn("Producto invalido, " + error.message);
            }
        }
        return productos;
    }

    #guardar(){
        let datos = this.#productos.map(function(valor) {
			return valor.toJSON();
		});

		this.#storage.guardar("productos", datos);
    }

    #generarID(){
        let mayor = 0

    	for(let i = 0; i < this.#productos.length; i++){
            if(this.#productos[i].id > mayor){
                mayor = this.#productos[i].id;
            }
        }
        return mayor + 1;
	    }
	
    obtenerTodos(){
        return this.#productos;
    }

    obtenerPorID(id){
        for(let i = 0; i < this.#productos.length; i++){
            if(this.#productos[i].id === id) {
                return this.#productos[i];
            }
        }
        return null;
    }

    filtrarPorCategoria(categoria) {
		return this.#productos.filter(function(producto){
			return producto.categoria === categoria;
		});
	}

    crear(datos){
        let producto = new Producto(
            this.#generarID(),
            datos.nombre,
            datos.categoria,
            datos.descripcion,
            datos.precioBase,
            datos.iva,
            datos.stock,
            datos.imagen
        );
        this.#productos.push(producto);
        this.#guardar();

        return producto;
    }

    editar(id, datos){
        let posicion = -1;
        for (let i = 0; i < this.#productos.length; i++){
            if(this.#productos[i].id === id){
                posicion = i;
                break;
            }
        }

        if(posicion === -1) {
            throw new Error("Producto no encontrado")
        }

        let producto = new Producto(
            id,
            datos.nombre,
            datos.categoria,
            datos.descripcion,
            datos.precioBase,
            datos.iva,
            datos.stock,
            datos.imagen
        );
        this.#productos[posicion] = producto;
		this.#guardar();
        return producto;
    }
    
    eliminar(id){
        let posicion = -1;
        for (let i = 0; i < this.#productos.length; i++){
            if(this.#productos[i].id === id){
                posicion = i;
                break;
            }
        }
        if (posicion === -1) {
			return false;
        }
        this.#productos.splice(posicion, 1);
        this.#guardar();
        return true;
    }
}