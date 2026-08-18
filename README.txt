# Ecomerce
objetivo: crear una tienda de juegos en la cual se puedan crear, eliminar, juegos, agregarlos a un carrito, eliminar del carrito y mas.

## Estructura principal

- [index.html]:Pagina principal con botones de guia, login, register.
- [register.html]: menu para registrarse.
- [login.html]: menu para logearse, (Gmail de admin: admin@gmail.com Password:admin1234).
- [guia.html]: guia de como usar la pagina.
- [admin.html]: donde creas y editas los productos osea juegos.
- [tienda.html]: Para agregar los juegos al carrito.
- [carrito.html]: Para confirmar compra y ver los juegos agregados.

## JavaScript
- [js/commonFunctions.js]:funciones generales y base.
- [js/login.js]: js del login, creacion del admin.
- [js/register.js]: Creacion de los usuarios y registo.
- [js/admin.js]: guardar juegos en el localStorage, js del formulario.
- [js/page/productos.js]: calcular precios, imagenes de productos.
- [js/page/carrito.js]: calcular totales, mostrar carrito, agregar, quitar productos etc.
- [js/page/tienda.js]: renderizar los productos en tienda.

## Flujo recomendado

1. Entrar por [index.html].
2. iniciar sesio como administrador.
3. Ir a [admin.html].
4. Crear juegos en [admin.html].
5. ir a [tienda.html]. (aquí puedes registrarte como usuario si deseas y logearte)
6. Agregar productos al carrito.
7. ir a [carrito.html].
8. confirmar compra


## Trabajo alojado en: https://allietti.uy/grupo6/

## Aclaracion el manual es guia.html