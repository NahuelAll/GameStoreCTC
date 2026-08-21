export class ManejadorStorage {
	guardar(clave, datos) {
		localStorage.setItem(clave, JSON.stringify(datos));
	}
 
	obtener(clave, valorPorDefecto = null) {
		let contenido = localStorage.getItem(clave);
 
		if (contenido === null) {
			return valorPorDefecto;
		}
 
		try {
			return JSON.parse(contenido);
		} catch (error) {
			console.error(`No fue posible leer la clave "${clave}".`, error);
			return valorPorDefecto;
		}
	}
 
	eliminar(clave) {
		localStorage.removeItem(clave);
	}
 
	existe(clave) {
		return localStorage.getItem(clave) !== null;
	}
 
	limpiarTodo() {
		localStorage.clear();
	}
}