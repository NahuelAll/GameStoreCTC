import { gestorCarrito } from "../actualizarPagina.js";
import { gestorProductos } from "../actualizarPagina.js";

document.addEventListener("DOMContentLoaded", function () {
	renderizarCarrito();
	let btnVaciar = document.getElementById("btn-vaciar");
	if (btnVaciar){
		btnVaciar.addEventListener("click",function(){
			vaciarCarrito();
		});
	}
	let btnConfirmar= document.getElementById("btn-confirmar");
	if (btnConfirmar){
		btnConfirmar.addEventListener("click",function(){
			confirmarCompra();
		});
	}
	let botonSalir = document.getElementById("btn-salir");
	if (botonSalir){
		botonSalir.addEventListener("click",function(){
			logout();
		});
	}
});

function agregarAlCarrito(idProducto){
	let producto = gestorProductos.obtenerPorID(idProducto);
	if (!producto){
		alert("producto no encontrado");
		return;
	}
	if (producto.stock === 0){
		alert("no hay stock disponible")
		return;
	}
	
	let carrito = gestorCarrito.obtenerCarrito();
	for(let i = 0; i < carrito.length; i++){
		if(carrito[i].id === idProducto && carrito[i].cantidad >= producto.stock){
			alert("no hay mas stock disponible");
			return;
		}
	}
	gestorCarrito.agregar(producto);
	alert("Producto agregado al carrito");
}
window.agregarAlCarrito = agregarAlCarrito;

function cambiarCantidad(idProducto, nuevaCantidad){
	let producto = gestorProductos.obtenerPorID(idProducto);
	if(!producto){
		eliminarDelCarrito(idProducto);
		return;
	}
	try{
		gestorCarrito.cambiarCantidad(producto, nuevaCantidad);
	} catch(error){
		alert(error.message);
	}
	renderizarCarrito();
}
window.cambiarCantidad = cambiarCantidad;

function eliminarDelCarrito(idProducto){
	gestorCarrito.eliminar(idProducto);
	renderizarCarrito();
}
window.eliminarDelCarrito = eliminarDelCarrito;

function vaciarCarrito(){
	if (!confirm("¿seguro que querés vaciar el carrito?")){
		return;
	}
	gestorCarrito.vaciar();
	renderizarCarrito();
}

function confirmarCompra(){
	if(!requiereSession()){
		return;
	}
	let carrito= gestorCarrito.obtenerCarrito();
	if(carrito.length === 0){
		alert("el carrito esta vacío");
		return;
	}
	if(!confirm("¿Confirmar la compra?")){
		return;
	}
	try{
		gestorCarrito.confirmarCompra();
		alert("compra realizada con exito !!")
	} catch(error){
		alert(error.message);
	}
	renderizarCarrito();
}

function renderizarCarrito(){
	let carrito = gestorCarrito.obtenerCarrito();
	let contenedor = document.getElementById("contenedor-carrito");
	if (!contenedor){
		return;
	}
	contenedor.innerHTML= "";
	if(carrito.length === 0){
		contenedor.innerHTML = "<p>El carrito está vacío</p>";
		document.getElementById("resumen-carrito").style.display = "none";
		return;
	}

	for (let i= 0; i < carrito.length; i++){
		let item = carrito[i];
		let fila = document.createElement("div");
		fila.className ="carrito-item";
		fila.innerHTML =
			"<img src='" + item.imagen + "'style='width:80px; object-fit:cover;'/>"+
			"<div class='carrito-item-info'>" +
				"<h3>" + item.nombre + "</h3>" +
				"<p>Precio base: $" + item.precioBase.toFixed(2) + "</p>" +
				"<p>IVA (" + item.iva + "%): $" + item.montoIva.toFixed(2) + "</p>" +
				"<p>Precio final: $" + item.precioFinal.toFixed(2) + "</p>" +
				"<p>Subtotal: $" + item.subtotal.toFixed(2) + "</p>" +
			"</div>" +
			"<div class='carrito-item-acciones'>" +
				"<button class='btn btn-small' onclick='cambiarCantidad(" + item.id + ", " + (item.cantidad - 1) + ")'>-</button>" +
				"<span>" + item.cantidad + "</span>" +
				"<button class='btn btn-small' onclick='cambiarCantidad(" + item.id + ", " + (item.cantidad + 1) + ")'>+</button>" +
				"<button class='btn btn-primary btn-small' onclick='eliminarDelCarrito(" + item.id + ")'>Eliminar</button>" +
			"</div>";
		contenedor.appendChild(fila);
	}
	
	let totales = gestorCarrito.calcularTotales();
	
	let resumen = document.getElementById("resumen-carrito");
	resumen.style.display = "block";
	document.getElementById("total-base").textContent = "$" + totales.totalBase.toFixed(2);
	document.getElementById("total-iva").textContent = "$" + totales.totalIva.toFixed(2);
	document.getElementById("total-final").textContent = "$" + totales.totalFinal.toFixed(2);
}