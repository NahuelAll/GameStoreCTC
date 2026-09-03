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
        },
        {
            nombre: "SpeedRunners 2",
            categoria: "carreras",
            descripcion: "es un juego de plataformas multijugador frenético donde te enfrentarás a superhéroes en trepidantes carreras haciendo parkour",
            precioBase: 760,
            iva: 10,
            stock: 35,
            imagen: "img/speedrunners2.jpg"
        },
        {
            nombre: "The Binding of Isaac: Rebirth",
            categoria: "roguelike",
            descripcion: "juego de acción y aventura roguelike donde los jugadores guían a Isaac por un mapa procedural para sobrevivir.",
            precioBase: 329,
            iva: 0,
            stock: 20,
            imagen: "img/Binding-of-isaac-rebirth.jpg"
        },
        {
            nombre: "NBA 2K27 Standar Edition",
            categoria: "deportes",
            descripcion: "La intensidad no para y la carrera nunca termina en NBA 2K27. Persigue la grandeza sin descanso.",
            precioBase: 2699,
            iva: 22,
            stock: 42,
            imagen: "img/2k27.jpg"
        },
        {
            nombre: "Bodycam",
            categoria: "shooter",
            descripcion: "Bodycam es el primer FPS táctico multijugador con una vista real de la cámara corporal en Unreal Engine 5.",
            precioBase: 1030,
            iva: 22,
            stock: 5,
            imagen: "img/bodycam.jpg"
        },
        {
            nombre: "Escape the Backrooms",
            categoria: "terror",
            descripcion: "es un juego de terror y exploración cooperativa de 1 a 4 jugadores. Recorre más de 30 niveles de backrooms.",
            precioBase: 224,
            iva: 0,
            stock: 20,
            imagen: "img/EscapeTheBackrooms.jpg"
        },
        {
            nombre: "Valheim",
            categoria: "supervivencia",
            descripcion: "Un brutal juego de supervivencia y exploración multijugador, inspirado en la cultura vikinga.",
            precioBase: 885,
            iva: 10,
            stock: 17,
            imagen: "img/Valheim.jpg"
        }
    ];

    for(let i = 0; i < productosIniciales.length; i++){
        gestorProductos.crear(productosIniciales[i]);
    }
}