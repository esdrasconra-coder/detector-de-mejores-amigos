
// ======================================
// DETECTOR DE MEJOR AMIG@S - PARA MAI 💜
// ======================================

// Todas las preguntas y sus respuestas

const preguntas = [

    {
        pregunta: "¿Cuál es mi color favorito?",
        opciones: [
            "AMARILLO",
            "ROJO",
            "AZUL",
            "CELESTE"
        ],
        correcta: 2
    },

    {
        pregunta: "¿Cuál es mi comida favorita boliviana?",
        opciones: [
            "EL THIMPU",
            "FRICASE",
            "FRITANGA",
            "SAJTA"
        ],
        correcta: 3
    },

    {
        pregunta: "¿Cuántos gatos tuve antes?",
        opciones: [
            "1",
            "4",
            "3",
            "2"
        ],
        correcta: 3
    },

    {
        pregunta: "¿Cuál es mi superhéroe favorito?",
        opciones: [
            "EL HOMBRE ARAÑA",
            "EL CAPITÁN AMÉRICA",
            "TONY STARK",
            "THOR"
        ],
        correcta: 0
    },

    {
        pregunta: "¿Qué es lo que hacía mayormente cuando te llamaba?",
        opciones: [
            "ME DORMÍA",
            "DECÍA COSAS SIN SENTIDO",
            "TE AYUDABA A HACER LA TAREA",
            "TE COLGABA"
        ],
        correcta: 0
    },

    {
        pregunta: "¿Nuestra primera llamada larga fue hasta...?",
        opciones: [
            "2 AM",
            "5 AM",
            "4 AM",
            "1 AM"
        ],
        correcta: 2
    },

    {
        pregunta: "¿De qué me siento más orgulloso en la vida?",
        opciones: [
            "DE MI CUERPO",
            "DE MI FAMILIA",
            "EL COLEGIO",
            "GLORIOSO COLMIL DEL EJÉRCITO"
        ],
        correcta: 3
    },

    {
        pregunta: "¿Qué decíamos siempre cuando algo no nos parecía?",
        opciones: [
            "USH USHH",
            "QUE VA",
            "TU JURAS!",
            "TODAS LAS ANTERIORES"
        ],
        correcta: 3
    },

    {
        pregunta: "¿Quién es mi cantante favorito?",
        opciones: [
            "RESIDENTE",
            "LIL SUPA",
            "CANSERBERO",
            "OCASIONAL TALENTO"
        ],
        correcta: 2
    }

];


// ======================================
// VARIABLES DEL JUEGO
// ======================================

let preguntaActual = 0;
let respuestaSeleccionada = null;


// ======================================
// ELEMENTOS HTML
// ======================================

const bienvenida = document.getElementById("bienvenida");
const zonaQuiz = document.getElementById("zonaQuiz");
const resultado = document.getElementById("resultado");

const preguntasDiv = document.getElementById("preguntas");

const siguiente = document.getElementById("siguiente");
const comenzar = document.getElementById("comenzar");
const reintentar = document.getElementById("reintentar");

const contador = document.getElementById("contador");
const porcentaje = document.getElementById("porcentaje");
const barraProgreso = document.getElementById("barraProgreso");

const mensajeResultado = document.getElementById("mensajeResultado");


// ======================================
// COMENZAR EL JUEGO
// ======================================

comenzar.addEventListener("click", () => {

    bienvenida.classList.add("oculto");
    resultado.classList.add("oculto");

    zonaQuiz.classList.remove("oculto");

    preguntaActual = 0;

    mostrarPregunta();

});


// ======================================
// MOSTRAR PREGUNTAS
// ======================================

function mostrarPregunta() {

    respuestaSeleccionada = null;

    const pregunta = preguntas[preguntaActual];

    contador.textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    const avance =
        (preguntaActual / preguntas.length) * 100;

    porcentaje.textContent = `${Math.round(avance)}%`;

    barraProgreso.style.width = `${avance}%`;

    siguiente.disabled = true;

    siguiente.textContent =
        preguntaActual === preguntas.length - 1
        ? "FINALIZAR 💜"
        : "SIGUIENTE 💜";


    preguntasDiv.innerHTML = `

        <div class="tarjeta-pregunta">

            <span class="numero">
                PREGUNTA ${preguntaActual + 1}
            </span>

            <h2>${pregunta.pregunta}</h2>

            <div class="opciones">

                ${pregunta.opciones.map((opcion, indice) => `

                    <label class="opcion">

                        <input
                            type="radio"
                            name="respuesta"
                            value="${indice}"
                        >

                        <span>${String.fromCharCode(65 + indice)}) ${opcion}</span>

                    </label>

                `).join("")}

            </div>

        </div>

    `;


    // Detectar la opción seleccionada

    const opciones = document.querySelectorAll(".opcion");

    opciones.forEach((opcion, indice) => {

        opcion.addEventListener("click", () => {

            opciones.forEach(elemento => {
                elemento.classList.remove("seleccionada");
            });

            opcion.classList.add("seleccionada");

            respuestaSeleccionada = indice;

            siguiente.disabled = false;

        });

    });

}


// ======================================
// COMPROBAR RESPUESTAS
// ======================================

siguiente.addEventListener("click", () => {

    if (respuestaSeleccionada === null) {
        return;
    }

    const respuestaCorrecta =
        preguntas[preguntaActual].correcta;


    // Si se equivoca, mostrar mensaje triste

    if (respuestaSeleccionada !== respuestaCorrecta) {

        mostrarError();

        return;

    }


    // Si responde correctamente, avanzar

    preguntaActual++;


    // Si terminó todas las preguntas

    if (preguntaActual === preguntas.length) {

        mostrarVictoria();

    } else {

        mostrarPregunta();

    }

});


// ======================================
// MENSAJE CUANDO SE EQUIVOCA
// ======================================

function mostrarError() {

    zonaQuiz.classList.add("oculto");

    resultado.classList.remove("oculto");

    barraProgreso.style.width = "0%";

    mensajeResultado.innerHTML = `

        <div class="personita">🥺</div>

        <h2>¡USH USH!</h2>

        <div class="mensaje-final">

            <p style="font-size: 18px; font-weight: bold;">
                TE EQUIVOCASTE, VUELVELO A INTENTARLO.
            </p>

            <p>
                ¡No te rindas, Mai! 💜
            </p>

            <p>
                Parece que todavía tienes algunas
                cositas que recordar. 🌷
            </p>

        </div>

    `;

    reintentar.classList.remove("oculto");

}


// ======================================
// SI TODAS LAS RESPUESTAS SON CORRECTAS
// ======================================

function mostrarVictoria() {

    zonaQuiz.classList.add("oculto");

    resultado.classList.remove("oculto");

    barraProgreso.style.width = "100%";

    porcentaje.textContent = "100%";

    mensajeResultado.innerHTML = `

        <div class="personita">🥹💜</div>

        <h2>¡LO LOGRASTE, MAI!</h2>

        <p>
            ¡FELICIDADES!
        </p>

        <p>
            Has respondido correctamente
            todas las preguntas.
        </p>

        <div class="mensaje-final">

            <h2>¡ERES UNA VERDADERA MEJOR AMIGA! 💜</h2>

            <p>
                Después de tantas llamadas, risas,
                ocurrencias y recuerdos...
                ¡cómo no iba a preparar algo especial!
            </p>

            <p>
                Gracias por formar parte de tantos
                momentos de mi vida. 🌷
            </p>

            <p>
                ESTA FOTOGRAFÍA ES PARA RECORDAR
                LO ESPECIAL QUE ES NUESTRA AMISTAD.
            </p>

        </div>

        <img
            src="nosotros.png"
            alt="Un recuerdo especial de nuestra amistad"
            class="foto-final"
            onerror="this.style.display='none';
            document.getElementById('avisoFoto').style.display='block';"
        >

        <p id="avisoFoto" style="display:none;">
            💜 Aquí aparecerá nuestra fotografía.
            Revisa que hayas colocado correctamente
            el archivo nosotros.jpg en la carpeta imagenes.
        </p>

        <h2>¡TE QUIERO MUCHO, MAI! 💜</h2>

    `;

    reintentar.classList.add("oculto");

}


// ======================================
// VOLVER A INTENTAR
// ======================================

reintentar.addEventListener("click", () => {

    resultado.classList.add("oculto");

    zonaQuiz.classList.remove("oculto");

    preguntaActual = 0;

    mostrarPregunta();

});
