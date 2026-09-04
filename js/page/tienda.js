import { gestorProductos } from "../actualizarPagina.js";
import { cargarTiposCambio, convertirMoneda } from "../models/Moneda.js";

document.addEventListener("DOMContentLoaded", async function() {
	let cotizaciones = await cargarTiposCambio();
	mostrarTasas(cotizaciones);

	let selector = document.getElementById("selector-moneda");
	if(selector){
		selector.addEventListener("change", function(){
			renderizarProductosTienda();
		});
	}

	renderizarProductosTienda();

	let productoPendiente = leerDeStorage("productoPendiente", null);
	if(productoPendiente){
		guardarEnStorage("productoPendiente", null);
		agregarAlCarrito(productoPendiente);
	}

	let session = leerDeStorage("sessionData", null);
	let botonLogin = document.getElementById("botonLogin");
	let botonRegister = document.getElementById("botonRegister");
	let botonSalir = document.getElementById("btn-salir");
	if (botonSalir){
		if(session){
			botonSalir.classList.remove("oculto");
		}else {
			botonSalir.classList.add("oculto");
		}
		botonSalir.addEventListener("click", function() {
			logout();
		});
	}

	if (botonLogin){
		if(!session){
			botonLogin.classList.remove("oculto");
		}else {
			botonLogin.classList.add("oculto");
		}
	}
	if (botonRegister){
		if(!session){
			botonRegister.classList.remove("oculto");
		}else {
			botonRegister.classList.add("oculto");
		}
	}
});

function mostrarTasas(cotizaciones){
		let dolar = cotizaciones.find(item => item.quote === "USD");
		let euro = cotizaciones.find(item => item.quote === "EUR");
		let argentino = cotizaciones.find(item => item.quote === "ARS");

		if(!dolar || !euro || !argentino){
			return;
		}
		document.getElementById("tasa-dolar").textContent =" 1 USD = " + (1 / dolar.rate).toFixed(2) + " UYU |";
		document.getElementById("tasa-euro").textContent =" 1 EUR = " + (1 / euro.rate).toFixed(2) + " UYU |";
		document.getElementById("tasa-peso-argentino").textContent =" 1 ARS = " + (1 / argentino.rate).toFixed(2) + " UYU |";
}

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

	let moneda = document.getElementById("selector-moneda").value;
	for(let i = 0; i < productosConStock.length; i++){
		let p = productosConStock[i];
		let precioConvertido;
		try{
			precioConvertido = convertirMoneda(p.precioFinal, moneda);
		} catch(error){
			precioConvertido = p.precioFinal;
			moneda = "UYU";
		}


    let card = document.createElement("div");
	card.className = "producto";
			card.innerHTML =
				"<img src='" + p.imagen + "' style='width:100%; height:300px; object-fit:cover; display:center;' alt='" + p.nombre + "'/>" +
				"<h3>" + p.nombre + "</h3>" +
				"<p>Categoria: " + p.categoria + "</p>" +
				"<p>" + p.descripcion + "</p>" +
				"<p>Precio: $" + precioConvertido.toFixed(2) + " " + moneda + " (IVA " + p.iva + "% incluido)</p>" +
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

// Barra de busqueda
let formBuscar = document.getElementById("form-buscar");
let inputBuscar = document.getElementById("input-buscar");

if(formBuscar && inputBuscar){
	formBuscar.addEventListener("submit", function(e){
		e.preventDefault();
		buscarProducto();
	});

	inputBuscar.addEventListener("input", function(){
		buscarProducto();
	});
}

function buscarProducto(){
	let texto = inputBuscar.value;
	if(texto.trim() === ""){
		renderizarProductosTienda();
		return;
	}
	renderizarProductosTienda(gestorProductos.buscador(texto));
}

// Buscador de productos categoria
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
