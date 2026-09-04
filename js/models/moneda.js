let cotizaciones = [];

async function cargarTiposCambio() {
    const url = "https://api.frankfurter.dev/v2/rates?base=UYU&quotes=EUR,USD,ARS";
    try{
        let respuesta = await fetch(url);
        if (!respuesta.ok){
            throw new Error("fallo al consultar API");
        }

        cotizaciones = await respuesta.json();
        return cotizaciones;
        
    } catch (error) {
        console.error(error);
        return[];
    }
}

function convertirMoneda(monto, moneda) {

    if (moneda === "UYU") {
        return monto;
    }

    let cotizacion = cotizaciones.find(
        item => item.quote === moneda
    );

    if (!cotizacion) {
        throw new Error("No se encontró la cotización");
    }

    return monto * cotizacion.rate;
}

export { cargarTiposCambio, convertirMoneda};