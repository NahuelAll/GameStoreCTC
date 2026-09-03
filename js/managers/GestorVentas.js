import { Venta } from "../models/Venta.js";
import { ManejadorStorage } from "./ManejadorStorage.js";

export class GestorVentas{
    #ventas;
    #storage;

    constructor(storage = new ManejadorStorage()){
        this.#storage = storage;
        this.#ventas = this.#cargar();
    }

    get ventas(){
        return this.#ventas;
    }
    
    set ventas(nuevasVentas){
        if (nuevasVentas == null){
            throw new Error("las ventas no puedes ser nulas")
        }
        this.#ventas = nuevasVentas;
        this.#guardar();
    }

    #guardar(){
        let datos = this.#ventas.map(function(venta){
            return venta.toJSON();
        });
        this.#storage.guardar("ventas", datos);
    }

    #cargar(){
        let datos = this.#storage.obtener("ventas", []);
        let ventas = [];

        for (let i = 0; i < datos.length; i++){
            try {
                let venta = Venta.fromJSON(datos[i]);
                ventas.push(venta);
            } catch(error) {
                console.warn("Venta invalida, " + error.message);
            }
        }
        return ventas;
    }

    #generarID(){
        let mayor = 0
    	for(let i = 0; i < this.#ventas.length; i++){
            if(this.#ventas[i].id > mayor){
                mayor = this.#ventas[i].id;
            }
        }
        return mayor + 1;
    }

    obtenerTodas(){
        return this.#ventas;
    }

    obtenerPorUsuario(idUsuario){
        return this.#ventas.filter(function(venta){
            return venta.idUsuario === idUsuario;
        });
    }

    registrar(datos){
        let venta = new Venta(
            this.#generarID(),
            datos.idUsuario,
            datos.nombreUsuario,
            datos.productos,
            datos.totalBase,
            datos.totalIva,
            datos.totalFinal,
            datos.fecha
        );
        this.#ventas.push(venta);
        this.#guardar();
        return venta;
    }
}