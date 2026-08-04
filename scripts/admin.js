document.addEventListener("DOMContentLoaded", function () { // nota: esto sirve para cargar todo esto, pero la funcion puntualmente es para verificar si el usuario esta logeado con el rol de admin, si no, lo redirige al login
	let session = leerDeStorage("sessionData", null);
	if (!session || session.rol !== "admin") {
		window.location.href = "login.html";
		return;
	}
	renderizarTablaProductos();
	let formulario = document.getElementById("form-producto")
	if (formulario){ // si existe el formulario aplica el if
		formulario.addEventListener("submit", function(e){
		e.preventDefault();
		controlProducto();
		});
	}
	let btnCancelar = document.getElementById("btn-cancelar-creacion");
	if (btnCancelar){
		btnCancelar.addEventListener("click", function (){
			resetearFormulario();
		});
	}
});

function controlProducto (){
	let idEditando = document.getElementById("idEditando").value;
	let imagen = document.getElementById("imagen").files[0];
	let iva = parseFloat(document.getElementById("iva").value);
	let precioBase = parseFloat(document.getElementById("precio").value);
	let precioFinal= calcularPrecioFinal(precioBase,iva);
	if(imagen){
		imagenABase64(imagen, function (base64){
			guardarProducto(idEditando, base64, precioBase, iva, precioFinal);
			});
		}else{
			let imagenActual = document.getElementById("imagenActual").value;
			guardarProducto(idEditando, imagenActual, precioBase, iva, precioFinal);
	}
}
function guardarProducto(idEditando, imagen, precioBase, iva, precioFinal){
	let productos = leerProductos();
	let producto = {
		nombre: document.getElementById("nombre").value.trim(),
		categoria: document.getElementById("categoria").value,
		descripcion: document.getElementById("descripcion").value.trim(),
		precioBase: precioBase,
		iva: iva,
		precioFinal: precioFinal,
		stock: parseInt(document.getElementById("stock").value), // parsenInt es para que el numero sea entero y no tenga decimales
		imagen: imagen
	};
	if(idEditando===""){// si es un producto nuevo, genera el id con la funcion generarIDProducto porque no tiene id
		producto.id = generarIDProducto(productos);
		productos.push(producto);
		alert("producto creado correctamente");
	}else{ // si ya existe, usa el mismo ID
		producto.id = parseInt(idEditando);
		for (let i= 0; i <productos.length; i++){
			if(productos[i].id === producto.id){ 
			productos[i] = producto;
			break;
			}
		}
	alert("producto modificado correctamente")
	}
	guardarProductos(productos);
	resetearFormulario();
	renderizarTablaProductos();
}
	
function editarProducto(id){
	let productos = leerProductos();
	let producto
	for (let i = 0; i< productos.length; i++){
		if(productos[i].id === id){
			producto = productos[i];
			break;
		}
	}
	if(!producto){
		return;
	}
	document.getElementById("idEditando").value = producto.id;
	document.getElementById("categoria").value = producto.categoria;
	document.getElementById("nombre").value = producto.nombre;
	document.getElementById("descripcion").value = producto.descripcion;
	document.getElementById("precio").value = producto.precioBase;
	document.getElementById("iva").value = producto.iva;
	document.getElementById("stock").value = producto.stock;
	document.getElementById("imagenActual").value = producto.imagen;//esto solo asigna la imagen en input oculto
	document.getElementById("preview-imagen").src = producto.imagen; // y esto es lo que la muestra
	document.getElementById("preview-imagen").style.display = "block"; // esto puede parecer raro pero solo hace visible la imagen que por default la puse oculta
	document.getElementById("btn-cancelar-creacion").style.display = "inline-block";// solo muestra el boton de cancelar
	document.getElementById("btn-crear").textContent = "Guardar cambios";// esto solo cambia el texto del boton crear, para mostrar que estas modificando y no creando
	actualizarPrecioFinal();
}//basicamente todo lo mismo



function eliminarProducto (id){
	if(!confirm("¿estas seguro que queres borrar esto?")){
		return;
	}
	let productos= leerProductos();
	let productosFiltrados= [];
	for (let i= 0; i<productos.length; i++){
		if(productos[i].id !== id){
			productosFiltrados.push(productos[i]);
		}
	}
	guardarProductos(productosFiltrados);
	renderizarTablaProductos();
}

function actualizarPrecioFinal(){
	let precio=parseFloat(document.getElementById("precio").value)||0;
	let iva=parseFloat(document.getElementById("iva").value)||0;
	let finalPrecio=calcularPrecioFinal(precio, iva);
	document.getElementById("precio-final").textContent= "Precio final con IVA: $"+ finalPrecio.toFixed(2); // nota: toFixed es para saber cuantos decimales mostrar, en este caso 2
}

function renderizarTablaProductos(){
	let productos = leerProductos();
	let tbody = document.getElementById("tbody-productos");
	if(!tbody){
		return;
	}
	tbody.innerHTML="";
	if(productos.length === 0){
		tbody.innerHTML = "<tr><td colspan='7'>No hay productos cargados.</td></tr>";
		return;
	}
	for(let i = 0; i<productos.length; i++){
		let p = productos[i];
		let fila = document.createElement("tr");
		fila.innerHTML ="<td>" + p.categoria + "</td>" +
						"<td><img src='" + p.imagen + "' style='width:50px; height:50px; object-fit:cover; display: center;'/></td>" +
						"<td>" + p.nombre + "</td>" +
						"<td>$" + p.precioBase.toFixed(2) + "</td>" +
						"<td>" + p.iva + "%</td>" +
						"<td>$" + p.precioFinal.toFixed(2) + "</td>" +
						"<td>" + p.stock + "</td>" +
						"<td>" +
						"<button onclick='editarProducto(" + p.id + ")'>Editar</button> " +
						"<button onclick='eliminarProducto(" + p.id + ")'>Eliminar</button>" +
						"</td>";
						tbody.appendChild(fila);// esto solo agrega la fila dentro de tbody
	}
}

function resetearFormulario(){
	document.getElementById("form-producto").reset();
	document.getElementById("idEditando").value = "";
	document.getElementById("imagenActual").value = "";
	document.getElementById("preview-imagen").style.display = "none";
	document.getElementById("precio-final").textContent = "";
	document.getElementById("btn-cancelar-creacion").style.display = "none";
	document.getElementById("btn-crear").textContent = "Crear producto"
}
	
function previsualizarImagen(input){
	if(input.files && input.files[0]){ // nota: verifica si hay un archivo cargado y si hay uno seleccionado
		let leerArchivo= new FileReader();
		leerArchivo.onload = function(e){
			document.getElementById("preview-imagen").src = e.target.result;//asigna la imagen
			document.getElementById("preview-imagen").style.display = "block";// hace visible la imagen, lo mismo
		};
		leerArchivo.readAsDataURL(input.files[0]); // nota: esto basicamente lee el primer archivo y lo pasa a base64
	}
}





document.addEventListener("DOMContentLoaded", function() {
	let botonSalir = document.getElementById("btn-salir");
	if (botonSalir) {
		botonSalir.addEventListener("click", function() {
			logout();
		});
	}
});