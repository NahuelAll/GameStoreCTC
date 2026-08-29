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
function validateSession(){
	let session = leerDeStorage("sessionData",null);
	if(session){
		document.getElementById("usuarioActual").innerHTML = "Bienvenido <b>'" + session.nombre + "'</b>";
	}
	else{
		window.location.href = "./login.html";
	}
}
window.validateSession = validateSession;

function logout(){
	guardarEnStorage("sessionData",null);
	window.location.href = "login.html";
}
window.logout = logout;




