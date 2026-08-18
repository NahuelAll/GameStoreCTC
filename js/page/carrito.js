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

function obtenerClaveCarrito() {// basicamente te crea un carrito con tu id
	let usuario = leerDeStorage("sessionData", null);
	if (!usuario) {
		return "carrito";
	}
	return "carrito_" + usuario.id;
}

function leerCarrito(){
	return leerDeStorage(obtenerClaveCarrito(), []);
}
function guardarCarrito (carrito){
	guardarEnStorage(obtenerClaveCarrito(), carrito);
}

function agregarAlCarrito(idProducto){
	let productos= leerProductos();
	let carrito= leerCarrito();
	let producto= null;
	for(let i=0; i<productos.length; i++){
		if(productos[i].id === idProducto){
			producto = productos[i];
			break;
		}
	}
	if (!producto){
		alert("producto no encontrado");
		return;
	}
	if (producto.stock === 0){
		alert("no hay stock disponible")
		return;
	}
	let yaEnCarrito= false;
	for (let i=0; i<carrito.length; i++){
		if(carrito[i].id === idProducto){
			if (carrito[i].cantidad >= producto.stock){
				alert("no hay más stock disponible")
				return;
			}
			carrito[i].cantidad=carrito[i].cantidad + 1;
			yaEnCarrito = true
			break;
		}
	}
	if(!yaEnCarrito){
		let itemCarrito= {
			id: producto.id,
			categoria: producto.categoria,
			nombre: producto.nombre,
			precioBase: producto.precioBase,
			iva: producto.iva,
			precioFinal: producto.precioFinal,
			imagen: producto.imagen,
			cantidad: 1
		};
		carrito.push(itemCarrito);
	}
	guardarCarrito(carrito);
	alert("Producto agregado al carrito");
}

function cambiarCantidad(idProducto, nuevaCantidad){
	let productos = leerProductos();
	let carrito = leerCarrito();
	let stockDisponible = 0;
	for(let i=0; i<productos.length; i++){
		if(productos[i].id === idProducto){
			stockDisponible = productos[i].stock;
			break;
		}
	}
	if  (nuevaCantidad<1){
		eliminarDelCarrito(idProducto)
		return;
	}
	if  (nuevaCantidad > stockDisponible){
		alert("no hay suficiente stock")
		return;
	}
	for (let i = 0; i < carrito.length; i++){
		if (carrito[i].id === idProducto){
			carrito[i].cantidad = nuevaCantidad;
			break;
		}
	}
	guardarCarrito(carrito);
	renderizarCarrito();
}

function eliminarDelCarrito(idProducto){
	let carrito = leerCarrito();
	let carritoFiltrado= [];
	for (let i = 0; i < carrito.length; i++){
		if (carrito[i].id !== idProducto){
			carritoFiltrado.push(carrito[i])
		}
	}
	guardarCarrito(carritoFiltrado);
	renderizarCarrito();
}

function vaciarCarrito(){
	if (!confirm("¿seguro que querés vaciar el carrito?")){
		return;
	}
	guardarCarrito([]);
	renderizarCarrito();
}
function confirmarCompra(){
	let carrito= leerCarrito();
	if(carrito.length === 0){
		alert("el carrito esta vacío");
		return;
	}
	if(!confirm("¿Confirmar la compra?")){
		return;
	}
	let productos = leerProductos();
	for (let i= 0; i < carrito.length; i++){
		for(let i2= 0; i2< productos.length; i2++){
			if (productos[i2].id===carrito[i].id){
				if(productos[i2].stock >= carrito[i].cantidad){
					productos[i2].stock -= carrito[i].cantidad;
				}
				break;
			}
		}
	}
	guardarProductos(productos);
	guardarCarrito([]);
	alert("¡Compra realizada con éxito!");
	renderizarCarrito();
}

function calcularTotales(carrito){
	let totalBase = 0;
	let totalIva = 0;
	let totalFinal = 0;
	for (let i=0; i < carrito.length; i++){
		let item=carrito[i];
		let subtotalBase= item.precioBase * item.cantidad;
		let subtotalIva= (item.precioBase * (item.iva/100))*item.cantidad;
		let subtotalFinal= item.precioFinal * item.cantidad;
		totalBase = totalBase + subtotalBase;
		totalIva = totalIva + subtotalIva;
		totalFinal = totalFinal + subtotalFinal;
	}
	return {
		totalBase: totalBase,
		totalIva: totalIva,
		totalFinal: totalFinal
	};
}

function renderizarCarrito(){
	let carrito = leerCarrito();
	let contenedor= document.getElementById("contenedor-carrito");
	if (!contenedor){
		return;
	}
	contenedor.innerHTML= "";
	if(carrito.length === 0){
		contenedor.innerHTML = "<p>El carrito está vacío</p>";
		document.getElementById("resumen-carrito").style.display = "none";
		return;
	}
	for (let i= 0; i <carrito.length; i++){
		let item = carrito[i];
		let subtotal= item.precioFinal * item.cantidad;
		let fila = document.createElement("div");
		fila.className ="carrito-item";
		fila.innerHTML =
		"<img src='"+ item.imagen + "'style='width:80px; object-fit:cover;'/>"+
		"<div class='carrito-item-info'>" +
			"<h3>"+item.nombre+"</h3>" +
			"<p>Precio base: $" + item.precioBase.toFixed(2)+"</p>"+
			"<p>IVA (" + item.iva + "%): $" + (item.precioBase * (item.iva / 100)).toFixed(2) + "</p>" +
			"<p>Precio final: $" + item.precioFinal.toFixed(2) + "</p>" +
			"<p>Subtotal: $" + subtotal.toFixed(2) + "</p>" +
		"</div>" +
			"<div class='carrito-item-acciones'>" +
			"<button class='btn btn-small' onclick='cambiarCantidad(" + item.id + ", " + (item.cantidad - 1) + ")'>-</button>" +
			"<span>" + item.cantidad + "</span>" +
			"<button class='btn btn-small' onclick='cambiarCantidad(" + item.id + ", " + (item.cantidad + 1) + ")'>+</button>" +
			"<button class='btn btn-primary btn-small' onclick='eliminarDelCarrito(" + item.id + ")'>Eliminar</button>" +
		"</div>";
		contenedor.appendChild(fila);
	}
	
	let totales = calcularTotales(carrito);
	
	let resumen = document.getElementById("resumen-carrito");
		resumen.style.display = "block";
		document.getElementById("total-base").textContent = "$" + totales.totalBase.toFixed(2);
		document.getElementById("total-iva").textContent = "$" + totales.totalIva.toFixed(2);
		document.getElementById("total-final").textContent = "$" + totales.totalFinal.toFixed(2);
}
