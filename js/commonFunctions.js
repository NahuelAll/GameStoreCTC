import { ManejadorStorage } from "./managers/ManejadorStorage.js";
const storage = new ManejadorStorage();

// LocalStorage
function guardarEnStorage(clave, valor){
	storage.guardar(clave, valor);
}
window.guardarEnStorage = guardarEnStorage;

function leerDeStorage(clave, valorDefecto){
		return storage.obtener(clave, valorDefecto);
}
window.leerDeStorage = leerDeStorage;

//generarID (ID del usuario)
function generarID(lista) {
	if(!lista || lista.length === 0) {
		return 1;
	 }
	
	let ultimo= lista[lista.length - 1];
	return (ultimo.id) + 1;
}
window.generarID = generarID;

// Validacion
function actualizarUsuarioActual(){
	let session = leerDeStorage("sessionData", null);
	let monstrar = document.getElementById("usuarioActual");

	if (session){
		monstrar.innerHTML = "Bienvenido <b>'" + session.nombre + "'</b>"
	} else {
		monstrar.innerHTML = "Invitado - <a href='./login.html'IniciarSession</a>";
	}
}
window.actualizarUsuarioActual = actualizarUsuarioActual;

function requiereSession(){
	let session = leerDeStorage("sessionData",null);
	if(!session){
		alert("Necesita iniciar session para continuar");
		window.location.href = "login.html";
		return false;
	}
	return true;
}
window.requiereSession = requiereSession;

function requiereSessionAdmin(){
	let session = leerDeStorage("sessionData", null);
    if (!session || session.rol !== "admin") {
		window.location.href = "login.html";
		return false;
	}
	return true;
}
window.requiereSessionAdmin = requiereSessionAdmin;

function logout(){
	guardarEnStorage("sessionData",null);
	window.location.href = "login.html";
}
window.logout = logout;




