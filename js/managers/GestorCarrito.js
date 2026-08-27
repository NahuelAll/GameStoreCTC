import { ProductoCarrito } from "../models/ProductoCarrito.js";
import { ManejadorStorage } from "./ManejadorStorage.js";

export class GestorCarrito{
    #gestorProductos;
    #storage;

    constructor(gestorProductos, storage = new ManejadorStorage()){
        this.#gestorProductos = gestorProductos;
        this.#storage = storage;
    }

    #obtenerClave(){
        let usuario = this.#storage.obtener("sessionData", null);
	    if (!usuario) {
            return "carrito";
	    }
	    return "carrito_" + usuario.id;
    }

    #cargar(){
        let datos = this.#storage.obtener(this.#obtenerClave(), []);
        let carrito = [];

        for (let i = 0; i < datos.length; i++){
            try {
                let producto = ProductoCarrito.fromJSON(datos[i]);
                carrito.push(producto);
            } catch(error) {
                console.warn("Producto carrito invalido, " + error.message);
            }
        }
        return carrito;
    }

    #guardar(carrito) {
        let datos = [];
        for(let i = 0; i < carrito.length; i++){
            datos.push(carrito[i].toJSON());
        }
        this.#storage.guardar(this.#obtenerClave(), datos);
    }

    obtenerCarrito(){
        return this.#cargar();
    }

    agregar(producto){
        let carrito = this.#cargar();
        const item = carrito.find(p => p.id === producto.id);

        if(item){
            item.cantidad++;
        } else {
            carrito.push(new ProductoCarrito(
            producto.id,
            producto.nombre,
            producto.categoria,
            producto.precioBase,
            producto.iva,
            producto.imagen,
            1
            ));
        }
        this.#guardar(carrito);
    }

    eliminar(idProducto){
        let carrito = this.#cargar();
        let filtrado = [];
        for(let i = 0; i < carrito.length; i++){
            if(carrito[i].id !== idProducto){
                filtrado.push(carrito[i]);
            }
        }
        this.#guardar(filtrado);
    }

    vaciar(){
        this.#guardar([]);
    }
    
    cambiarCantidad(producto, nuevaCantidad){
        if(nuevaCantidad < 1){
            this.eliminar(producto.id);
            return;
        }

        if(nuevaCantidad > producto.stock){
            throw new Error("no hay suficiente stock");
        }
        let carrito = this.#cargar();
        const item = carrito.find(p => p.id === producto.id);

        if(!item){
            throw new Error("El producto debe estar en el carrito");
        }
        item.cantidad = nuevaCantidad;
        this.#guardar(carrito);
    }

    calcularTotales(){
        let carrito = this.#cargar();
        let totalBase = 0;
        let totalIva = 0;
        let totalFinal = 0;

        for(let i = 0; i < carrito.length; i++){
            let item = carrito[i];
            totalBase += item.precioBase * item.cantidad;
            totalIva += item.montoIva * item.cantidad;
            totalFinal += item.subtotal;
        }
        return {
            totalBase,
            totalIva,
            totalFinal
        };
    }

    confirmarCompra(){
        let carrito = this.#cargar();
        if(carrito.length === 0){
            throw new Error("El carrito esta vacio");
        }

        for(let i = 0; i < carrito.length; i++){
            let producto = this.#gestorProductos.obtenerPorID(carrito[i].id);
        
            if(producto && producto.stock >= carrito[i].cantidad){
                this.#gestorProductos.editar(producto.id, {
                    nombre: producto.nombre,
                    categoria: producto.categoria,
                    precioBase: producto.precioBase,
                    iva: producto.iva,
                    stock: producto.stock - carrito[i].cantidad,
                    imagen: producto.imagen,
                });
            }
        }
        this.#guardar([]);
    }
}