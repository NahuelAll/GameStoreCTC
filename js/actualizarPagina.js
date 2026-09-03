import { GestorProductos } from "./managers/GestorProductos.js";
import { GestorVentas } from "./managers/GestorVentas.js";
import { GestorCarrito } from "./managers/GestorCarrito.js";

//solucion para evitar que muestre el stock viejo cuando se compra producto.
export const gestorProductos = new GestorProductos(); 
export const gestorVentas = new GestorVentas();
export const gestorCarrito = new GestorCarrito(gestorProductos, gestorVentas);

inicioProductos();

function inicioProductos(){
    if(gestorProductos.obtenerTodos().length > 0){
        return; // si hay producto no borra lo que se creo
    }

    let productosIniciales = [
        {
            nombre: "Grand Theft Auto V",
            categoria: "mundo-abierto",
            descripcion: "Un joven estafador, un ex ladrón de bancos y un psicópata se ven atrapados entre el crimen.",
            precioBase: 1139,
            iva: 22,
            stock: 10,
            imagen: "img/GTAV.jpg"
        },
        {
            nombre: "HELLDIVER 2",
            categoria: "accion",
            descripcion: "La última línea de ataque de la galaxia. Alístate en los Helldivers y únete a la lucha por la libertad.",
            precioBase: 1067,
            iva: 22,
            stock: 12,
            imagen: "img/Helldiver2.jpg"
        }
    ];

    for(let i = 0; i < productosIniciales.length; i++){
        gestorProductos.crear(productosIniciales[i]);
    }
}