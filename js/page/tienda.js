document.addEventListener("DOMContentLoaded", function() {
	renderizarProductosTienda();
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
		productos = leerProductos();
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
				card.innerHTML += `
					<img src="${p.imagen}" style="width:100%; height:300px; object-fit:cover; display: center;" alt="${p.nombre}">
					<h3>${p.nombre}</h3>
					<p>Categoria: ${p.categoria}</p>
					<p>${p.descripcion}</p>
					<p>Precio: $${p.precioFinal.toFixed(2)} + (IVA ${p.iva}% incluido)</p>
					<p>Stock: ${p.stock}</p>
				
					<button onclick="comprarProducto(${p.id})">Agregar al carrito</button>`;

				contenedor.appendChild(card);
	 }
}

function comprarProducto(id){ 
	agregarAlCarrito(id);
}