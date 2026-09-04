# Ecomerce
objetivo: crear un Ecomerce destinado a publicarse como tienda de videojuegos 
 
## Estructura principal
 
- [index.html]: Pagina principal y tienda, con carrusel de banners, buscador, filtro por categoria, selector de moneda y botones de guia, login, register.
- [register.html]: menu para registrarse.
- [login.html]: menu para logearse, (Gmail de admin: admin@gmail.com Password:admin1234).
- [guia.html]: guia de como usar la pagina.
- [admin.html]: donde creas, editas y eliminas los productos osea juegos.
- [carrito.html]: Para confirmar compra y ver los juegos agregados.
- [ventas.html]: (solo admin) muestra el historial de todas las ventas realizadas.
 
## JavaScript
- [js/commonFunctions.js]: funciones generales y base, guardar/leer del localStorage, generar ID, mostrar el usuario actual, requiereSession, requiereSessionAdmin y logout.
- [js/login.js]: js del login, creacion del admin.
- [js/register.js]: Creacion de los usuarios y registo.
- [js/admin.js]: guardar juegos en el localStorage, js del formulario, previsualizacion de la imagen y calculo del precio final con IVA.
- [js/actualizarPagina.js]: crea los gestores (productos, ventas, carrito) y carga los productos iniciales la primera vez que se abre la pagina.
 
- [js/managers/ManejadorStorage.js]: encargado de leer y escribir en el localStorage.
- [js/managers/GestorProductos.js]: crear, editar, eliminar, filtrar por categoria y buscar productos.
- [js/managers/GestorCarrito.js]: agregar, eliminar y cambiar cantidad de productos del carrito, calcular totales y confirmar compra (descuenta el stock y registra la venta).
- [js/managers/GestorVentas.js]: registrar y obtener las ventas realizadas.
 
- [js/models/Producto.js]: clase del producto, valida sus datos y calcula el IVA y el precio final.
- [js/models/ProductoCarrito.js]: producto dentro del carrito, con su cantidad y subtotal.
- [js/models/Venta.js]: clase de la venta, con los productos comprados y los totales.
- [js/models/moneda.js]: conversion de moneda, consulta la API de frankfurter (UYU a USD, EUR y ARS).
 
- [js/page/tienda.js]: renderiza los productos en la pagina principal, buscador, filtro por categoria, selector de moneda y cotizaciones.
- [js/page/carrito.js]: calcular totales, mostrar carrito, agregar, quitar productos etc.
- [js/page/ventas_realizadas.js]: renderiza la tabla de ventas para el admin en [ventas.html].
 
## Flujo recomendado
 
1. Entrar por [index.html].
2. iniciar sesio como administrador.
3. Ir a [admin.html].
4. Crear juegos en [admin.html].
5. Volver a [index.html]. (aquí puedes registrarte como usuario si deseas y logearte)
6. Agregar productos al carrito.
7. ir a [carrito.html].
8. confirmar compra
9. como admin podes revisar el historial de compras en [ventas.html].
 
 
## Otras funcionalidades
 
- Selector de moneda en la tienda y el carrito, los precios se pueden ver en UYU, USD, EUR o ARS.
- Buscador de productos y filtro por categoria (offcanvas) en la tienda.
- Carrusel de banners hecho con Bootstrap en index.html.
 
## Trabajo alojado en: https://allietti.uy/grupo6/
 
## Aclaracion el manual es guia.html