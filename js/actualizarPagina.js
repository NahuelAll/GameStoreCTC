import { GestorProductos } from "./managers/GestorProductos";
import { GestorCarrito } from "./managers/GestorCarrito";

//solucion para evitar que muestre el stock viejo cuando se compra producto.
export const gestorProductos = new GestorProductos(); 
export const gestorCarrito = new GestorCarrito();