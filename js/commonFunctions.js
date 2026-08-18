// LocalStorage
function guardarEnStorage(clave, valor){
	localStorage.setItem(clave, JSON.stringify(valor));
}

function leerDeStorage(clave, valorDefecto){
	let contenido = localStorage.getItem(clave);
	if(!contenido){
		return valorDefecto;
	}
	
	try{
		return JSON.parse(contenido);
	}
	catch(e){
		console.error(e);
		return valorDefecto;
	}
}

//generarID (ID del usuario)
function generarID(lista) {
	if(!lista || lista.length === 0) {
		return 1;
	 }
	
	let ultimo= lista[lista.length - 1];
	return (ultimo.id) + 1;
}

// Validacion
function validateSession(){
	let session = leerDeStorage("sessionData",null);
	if(session){
		document.getElementById("usuarioActual").innerHTML = "Bienvenido <b>'" + session.nombre + "'</b>";
	}
	else{
		window.location.href = "./login.html";
	}
}

function logout(){
	guardarEnStorage("sessionData",null);
	window.location.href = "login.html";
}