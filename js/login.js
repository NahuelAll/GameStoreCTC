let usuarios = leerDeStorage("usuariosRegistrados",[]);

var params = new URLSearchParams(window.location.search);
var mail = params.get("correo");
document.getElementById("email").value = mail;

document.addEventListener("DOMContentLoaded", function(){
	IniciarAdmin();
	let botonSalir = document.getElementById("btn-salir");
	if (botonSalir) {
		botonSalir.addEventListener("click", function() {
			logout();
		});
	}
	let formLogin = document.getElementById("form-login");
	
	if(formLogin){
		formLogin.addEventListener("submit", function(e){
			e.preventDefault();
			
			let usuario = buscarUsuarioPorEmail(document.getElementById("email").value);	
			if(!usuario){
				alert("Credenciales incorrectas.");
				return;
			}
			
			if(usuario.password === document.getElementById("password").value){
				guardarEnStorage("sessionData", usuario);
				if (usuario.rol === "admin"){
					window.location.href="admin.html"
				}else {
						window.location.href="tienda.html"
					}
			}
			else{
				alert("Credenciales incorrectas.");
				return;
			}
		});
	}
});

function buscarUsuarioPorEmail(email){
	let usuarios = leerDeStorage("usuariosRegistrados",[]);
	for(let i = 0; i < usuarios.length; i++){
			if(usuarios[i].email === email){
				return usuarios[i];
			}
		}
		
	return null;
}

var admin_Name= "Administrador";
var admin_Email= "admin@gmail.com";
var admin_Pass= "admin1234";

function IniciarAdmin(){
	var adminExiste= false;
	for(var i=0; i<usuarios.length; i++){//for para verificar si ya existe un admin
		if(usuarios[i].id === 0){
			adminExiste = true;
			break;
		}
	}
	if(!adminExiste){// crea el objeto admin si no existe
		var admin={
			id: 0,
			nombre: admin_Name,
			email:  admin_Email,
			password: admin_Pass,
			rol: "admin",
		};
		usuarios.unshift(admin);//agrega al admin al inicio del array ya que es el id 0
		guardarEnStorage("usuariosRegistrados",usuarios);// lo guarda en el storage
	}
}
