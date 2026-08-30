import { gestorProductos } from "../actualizarPagina.js";

document.addEventListener("DOMContentLoaded", function() {
	renderizarProductosTienda();

	let productoPendiente = leerDeStorage("productoPendiente", null);
	if(productoPendiente){
		guardarEnStorage("productoPendiente", null);
		agregarAlCarrito(productoPendiente);
	}

	let botonSalir = document.getElementById("btn-salir");
	if (botonSalir) {
		botonSalir.addEventListener("click", function() {
			logout();
		});
	}
});

function renderizarProductosTienda(listaProductos = null){
	let productos;
	if (listaProductos){
		productos = listaProductos;
	} else {
		productos = gestorProductos.obtenerTodos();
	}
	let contenedor = document.getElementById("contenedor-productos");
	
	contenedor.innerHTML= "";
	
	if(productos.length === 0){
		contenedor.innerHTML = "<p style='font-size: 137.5%;'>No hay productos disponibles.</p>";
		return;
    }
	
	let productosConStock = productos.filter(p => p.stock > 0);

	 for (let i = 0; i < productosConStock.length; i++) { 
		 let p = productosConStock[i];
         let card = document.createElement("div");
		 card.className = "producto";
				card.innerHTML =
					"<img src='" + p.imagen + "' style='width:100%; height:300px; object-fit:cover; display:center;' alt='" + p.nombre + "'/>" +
					"<h3>" + p.nombre + "</h3>" +
					"<p>Categoria: " + p.categoria + "</p>" +
					"<p>" + p.descripcion + "</p>" +
					"<p>Precio: $" + p.precioFinal.toFixed(2) + " (IVA " + p.iva + "% incluido)</p>" +
					"<p>Stock: " + p.stock + "</p>" +
					"<button onclick='comprarProducto(" + p.id + ")'>Agregar al carrito</button>";

				contenedor.appendChild(card);
	 }
}

window.comprarProducto = comprarProducto;
function comprarProducto(id){
	let session = leerDeStorage("sessionData", null);
	if(!session){
		guardarEnStorage("productoPendiente", id);
		alert("Debe iniciar session para agregar producto al carrito");
		window.location.href = "login.html";
		return;
	}
	agregarAlCarrito(id);
}

window.filtrarCategoria = filtrarCategoria;
function filtrarCategoria(categoria) {
	renderizarProductosTienda(gestorProductos.filtrarPorCategoria(categoria));
}

// Buscador de productos
let lista = document.querySelector('#offcanvasWithBothOptions .list-group');

if(lista){
	lista.addEventListener("click", function(e) {
		e.preventDefault();

		if(!e.target.classList.contains('list-group-item')){
		return;
		}
		let categoria = e.target.dataset.categoria;

		if(categoria === "todos"){
		renderizarProductosTienda(gestorProductos.obtenerTodos())
		} else {
		filtrarCategoria(categoria);
		}
		let offcanvasEl = document.getElementById('offcanvasWithBothOptions');
		let offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
		if (offcanvasInstance) offcanvasInstance.hide();
	});
}
