// ==UserScript==
// @name         Lab 4 obtener solo un mensaje cifrado
// @namespace    http://tampermonkey.net/
// @version      2024-06-07
// @description  try to take over the world!
// @author       You
// @match        https://cripto.tiiny.site/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instructure.com
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==

function obtenerClave() {
    const paragraph = document.querySelector('p');
    let clave = '';

    if (paragraph) {
        const text = paragraph.textContent;
        const mayusculas = text.match(/[A-Z]/g);

        if (mayusculas) {
            clave = mayusculas.join('');  // Unir sin espacios
            console.log("La llave es: " + clave);
        } else {
            console.log("No se encontraron mayúsculas en el texto");
        }
    } else {
        console.log("No se encontró ningún elemento <p>");
    }

    return clave;
}

function contarMensajesCifrados() {
    var divElements = document.querySelectorAll('div'); // Ajusta el selector según la estructura de la página
    var mensajesCifrados = [];

    divElements.forEach(function(divElement) {
        var id = divElement.getAttribute('id');
        if (id && /^[A-Za-z0-9+/=]+$/.test(id.trim())) {
            mensajesCifrados.push(divElement);
        }
    });

    console.log("Los mensajes cifrados son: " + mensajesCifrados.length);

    return mensajesCifrados;
}

function descifrarUnMensaje(mensajesCifrados, clave) {
if (mensajesCifrados.length > 0) {
    const cifrado = mensajesCifrados[0].id;  // Obtén el primer mensaje cifrado
    try {
        const desencriptar = CryptoJS.TripleDES.decrypt(cifrado, CryptoJS.enc.Utf8.parse(clave), {
            mode: CryptoJS.mode.ECB
        }).toString(CryptoJS.enc.Utf8);

        console.log(`${cifrado} ${desencriptar}`);

        const resultadoElemento = document.createElement('p');
        resultadoElemento.textContent = desencriptar;
        document.body.appendChild(resultadoElemento);
    } catch (error) {
        console.error(`Error al descifrar el mensaje: ${error}`);
    }
} else {
    console.error("No hay mensajes cifrados para descifrar.");
}
}

// Ejecutar las partes en orden
window.addEventListener('load', function() {
const clave = obtenerClave();
if (clave) {
    const mensajesCifrados = contarMensajesCifrados();
    if (mensajesCifrados.length > 0) {
        descifrarUnMensaje(mensajesCifrados, clave);  // Llama a la función para descifrar solo un mensaje
    } else {
        console.log("No se encontraron mensajes cifrados.");
    }
} else {
    console.log("No se pudo obtener la clave.");
}
}, false);
