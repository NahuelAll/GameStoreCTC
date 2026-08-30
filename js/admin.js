import { gestorProductos } from "./actualizarPagina.js";

document.addEventListener("DOMContentLoaded", function () { 
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
	let botonSalir = document.getElementById("btn-salir");
	if (botonSalir) {
		botonSalir.addEventListener("click", function() {
			logout();
		});
	}
});

function controlProducto (){
	let idEditando = document.getElementById("idEditando").value;
	let imagen = document.getElementById("imagen").files[0];

	if(imagen){
		imagenABase64(imagen, function (base64){
			guardarProducto(idEditando, base64);
			});
		}else{
			let imagenActual = document.getElementById("imagenActual").value;
			guardarProducto(idEditando, imagenActual);
	}
}
function guardarProducto(idEditando, imagen){
	let datos = {
		nombre: document.getElementById("nombre").value.trim(),
		categoria: document.getElementById("categoria").value,
		descripcion: document.getElementById("descripcion").value.trim(),
		precioBase: parseFloat(document.getElementById("precio").value),
		iva: parseFloat(document.getElementById("iva").value),
		stock: parseInt(document.getElementById("stock").value),
		imagen: imagen
	};

	try{
		if(idEditando===""){ // si es un producto nuevo, GestorProducto le asigna una id.
			gestorProductos.crear(datos);
			alert("producto creado correctamente");
		} else{ // si ya existe, usa el mismo ID
			gestorProductos.editar(parseInt(idEditando), datos)
			alert("producto modificado correctamente")
		}
	} catch (error) {
		alert(error.message);
		return;
	}
	
	resetearFormulario();
	renderizarTablaProductos();
}
	
function editarProducto(id){
	let producto = gestorProductos.obtenerPorID(id);
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
	document.getElementById("imagenActual").value = producto.imagen; // esto solo asigna la imagen en input oculto
	document.getElementById("preview-imagen").src = producto.imagen; // y esto es lo que la muestra
	document.getElementById("preview-imagen").style.display = "block";
	document.getElementById("btn-cancelar-creacion").style.display = "inline-block";
	document.getElementById("btn-crear").textContent = "Guardar cambios";
	actualizarPrecioFinal();
}

window.eliminarProducto = eliminarProducto;
function eliminarProducto (id){
	if(!confirm("¿estas seguro que queres borrar esto?")){
		return;
	}
	gestorProductos.eliminar(id);
	renderizarTablaProductos();
}

window.actualizarPrecioFinal = actualizarPrecioFinal;
function actualizarPrecioFinal(){
	let precio = parseFloat(document.getElementById("precio").value)||0;
	let iva = parseFloat(document.getElementById("iva").value)||0;
	let finalPrecio = precio + precio * (iva / 100);
	document.getElementById("precio-final").textContent = "Precio final con IVA: $" + finalPrecio.toFixed(2); // nota: toFixed es para saber cuantos decimales mostrar, en este caso 2
}

window.editarProducto = editarProducto;
function renderizarTablaProductos(){
	let productos = gestorProductos.obtenerTodos();
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

window.previsualizarImagen = previsualizarImagen;	
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

function imagenABase64(archivo, callback) {
	let leerArchivos = new FileReader();
	leerArchivos.onload = function(e){
		callback(e.target.result);
	};
	leerArchivos.readAsDataURL(archivo); // convierte al archivo a base 64(hablado con pablo y aprobado)
}