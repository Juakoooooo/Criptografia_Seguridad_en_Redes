// ==UserScript==
// @name         Lab 4
// @namespace    http://tampermonkey.net/
// @version      2024-06-07
// @description  try to take over the world!
// @author       You
// @match        https://cripto.tiiny.site/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instructure.com
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==


(function() {
    'use strict';

    // Parte 1: Obtener la clave de descifrado
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

    // Parte 2: Contar los mensajes cifrados
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

    // Parte 3: Descifrar y mostrar mensajes
    function descifrarMensajes(mensajesCifrados, clave) {
        mensajesCifrados.forEach((elemento, index) => {
            const cifrado = elemento.id;
            try {
                const desencriptar = CryptoJS.TripleDES.decrypt(cifrado, CryptoJS.enc.Utf8.parse(clave), {
                    mode: CryptoJS.mode.ECB
                }).toString(CryptoJS.enc.Utf8);

                console.log(`${cifrado} ${desencriptar}`);

                const resultadoElemento = document.createElement('p');
                resultadoElemento.textContent = desencriptar;
                document.body.appendChild(resultadoElemento);
            } catch (error) {
                console.error(`Error al descifrar el mensaje ${index + 1}: ${error}`);
            }
        });
    }

    // Función para crear nuevo contenido
    function createNewContent() {
        // Nuevo contenido del mensaje en el párrafo (p)
         var newMessage = `
           Hoy Oigo Llover Agua en medio de la tranquilidad de la naturaleza.
           Hoy Oigo Llover Agua en medio de la serenidad del bosque.
           Hoy Oigo Llover Agua en medio de la majestuosidad de las montañas.
           Hoy Oigo Llover Agua en medio de la frescura del aire matutino.
           Hoy Oigo Llover Agua en medio de la calma del atardecer.
           Hoy Oigo Llover Agua en medio de la quietud de la noche.
        `;

        // Lista de clases para los contenedores div (M1, M2, ...)
        var mensajesCifrados = [
            { id: 'LJm+e4doSew=' },
            { id: 'pax94rlysO8=' },
            { id: 'z0LtoRTKBrA=' },
            { id: 'T1pK8RE82ZI=' },
            { id: 'gfgO0aCNvLA=' }
        ];

        // Eliminar todo el contenido HTML existente en la página
        document.body.innerHTML = '';

        // Crear un nuevo elemento HTML para el mensaje en el párrafo (p)
        var newParagraph = document.createElement("p");
        newParagraph.textContent = newMessage;
        document.body.appendChild(newParagraph);

        // Agregar mensajes cifrados en divs al cuerpo de la página
        mensajesCifrados.forEach((mensajeCifrado, index) => {
            var nuevoDiv = document.createElement('div');
            nuevoDiv.setAttribute('id', mensajeCifrado.id);
            document.body.appendChild(nuevoDiv);
        });
    }


    //IMPORTANTE: SI SE QUIERE VER EL TEXTO ORIGINAL DEL SITIO WEB
    //            DEJAR COMENTADA LA FUNCION createNewContent()


    // Ejecutar las partes en orden
    window.addEventListener('load', function() {
        // Crear nuevo contenido
        createNewContent();

        // Obtener la clave
        const clave = obtenerClave();
        if (clave) {
            // Contar los mensajes cifrados
            const mensajesCifrados = contarMensajesCifrados();
            if (mensajesCifrados.length > 0) {
                // Descifrar y mostrar mensajes
                descifrarMensajes(mensajesCifrados, clave);
            } else {
                console.log("No se encontraron mensajes cifrados.");
            }
        } else {
            console.log("No se pudo obtener la clave.");
        }
    }, false);
})();