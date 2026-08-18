function leerProductos(){
	return leerDeStorage("productos", [])
}

function guardarProductos(productos){
	guardarEnStorage("productos", productos)
}

function generarIDProducto (productos){
	let mayor = 0;
	for(let i= 0; i < productos.length; i++){
		if(productos[i].id > mayor){
			mayor = productos[i].id;
		}
	}
	return mayor + 1;
}

function calcularPrecioFinal (precioBase, IVA){
	let iva= precioBase * (IVA/100);
	return precioBase + iva;
}

function imagenABase64(archivo, callback) {
	let leerArchivos = new FileReader();
	leerArchivos.onload = function(e){
		callback(e.target.result);
	};
	leerArchivos.readAsDataURL(archivo); // convierte al archivo a base 64(investigado por ia, hablado con pablo y aprobado)
}

// filtrado por categorias de los productos
function filtrarCategoria(categoria) {
	let producto = leerProductos();
	
	let filtrado = producto.filter(function(producto){
		return producto.categoria === categoria;
	});
	renderizarProductosTienda(filtrado);
}
