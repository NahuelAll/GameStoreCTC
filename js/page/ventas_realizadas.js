import { gestorVentas } from "../actualizarPagina.js";

document.addEventListener("DOMContentLoaded", function(){
    if(!requiereSessionAdmin()){
        return;
    }
    
    renderizarTablaDeVentas();

    let botonSalir = document.getElementById("btn-salir");
	if (botonSalir) {
		botonSalir.addEventListener("click", function() {
			logout();
		});
	}
})

function renderizarTablaDeVentas(){
    let ventas = gestorVentas.obtenerTodas();
    let tbody = document.getElementById("tbody-ventas");
    if(!tbody){
        return;
    }
    tbody.innerHTML = "";

    if(ventas.length === 0){
        tbody.innerHTML = "<tr><td colspan='7'>Todavia no hay registro de ventas.</td></tr>";
        return;
    }

    let orden = ventas.slice().sort(function(a, b){
        return new Date(b.fecha) - new Date(a.fecha);
    });

    for(let i = 0; i < orden.length; i++){
        let venta = orden[i];
        let detalleItems = "";
        for (let o = 0; o < venta.productos.length; o++) {
            let item = venta.productos[o];
            detalleItems += item.cantidad + "x " + item.nombre;
            if (o < venta.productos.length - 1) {
                detalleItems += ", ";
            }
        }
        let fecha = new Date(venta.fecha).toLocaleString();

        tbody.innerHTML += 
            "<tr>" +
            "<td>" + venta.id + "</td>" + 
            "<td>" + venta.nombreUsuario + "</td>" + 
            "<td>" + fecha + "</td>" + 
            "<td>" + detalleItems + "</td>" + 
            "<td>" + "$U " + venta.totalBase.toFixed(2) + "</td>" + 
            "<td>" + "$U " +venta.totalIva.toFixed(2) + "</td>" + 
            "<td>" + "$U " +venta.totalFinal.toFixed(2) + "</td>" +
            "</tr>";
    } 
}
