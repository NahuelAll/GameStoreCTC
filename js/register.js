let usuarios = leerDeStorage("usuariosRegistrados",[]);

document.addEventListener("DOMContentLoaded", function(){
	let botonSalir = document.getElementById("btn-salir");
	if (botonSalir) {
		botonSalir.addEventListener("click", function() {
			logout();
		});
	}
	let formRegistro = document.getElementById("form-registro");
	
	if(formRegistro){
		formRegistro.addEventListener("submit", function(e){
			e.preventDefault();
			
			if(existeUsuarioRegistrado(document.getElementById("email").value)){
				alert("Usted ya esta registrado como usuario.");
				return;
			}
			
			let registro = {
				id: generarID(usuarios),
				nombre: document.getElementById("username").value,
				email: document.getElementById("email").value,
				password: document.getElementById("password").value
			};
			usuarios.push(registro);
			guardarEnStorage("usuariosRegistrados",usuarios);
			alert("Registro OK !!!");
			window.location.href = "login.html?correo="+registro.email;	
		});
	}
});

function existeUsuarioRegistrado(email){
	let usuarios = leerDeStorage("usuariosRegistrados",[]);
	for(let i = 0; i < usuarios.length; i++){
		if(usuarios[i].email === email){
			return true;
		}
	}
	return false;
}