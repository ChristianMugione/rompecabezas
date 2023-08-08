/* */
const tablero = document.getElementById("tablero");
const btnReset = document.getElementById("btn-reset");
btnReset.addEventListener("click", reset);
const msg = document.getElementById("msg");

let numA;
let numB;
let piezaA = "";
let piezaB = "";
let gameOn = true;
let coordsImg = [];
coordsImg[0] = [0, 0, 0];
let tiempoIni;
let tiempoTotal;
let intercambios;

function inicializarPiezas() {
  let numero = 1;
  coordsImg[0] = [0, 0, 0];
  for (let row = 0; row >= -300; row = row - 100) {
    for (let col = 0; col >= -300; col = col - 100) {
      coordsImg[numero] = [col, row, numero];
      let estaPieza = document.getElementById("pieza" + numero);
      estaPieza.style.backgroundPosition = col + "px " + row + "px";
      estaPieza.style.border = "1px solid white";
      numero++;
    }
  }
}
// inicializarPiezas();

function imprimirPiezas() {
  let pos = 0;
  coordsImg.forEach((registro) => {
    if (pos != 0) {
      let posicion = document.getElementById("pieza" + pos);
      posicion.style.backgroundPosition =
        "" + registro[0] + "px " + registro[1] + "px";
      posicion.style.border = "1px solid white";
    }
    pos++;
  });
}

function idToNumber(id) {
  let numberId = Number(id.split("a")[1]);
  return numberId;
}

function numberToId(num) {
  return "pieza" + num.toString();
}

function intercambiarPiezas(a, b) {
  [coordsImg[a], coordsImg[b]] = [coordsImg[b], coordsImg[a]];
  intercambios++;
  msg.textContent = "Movidas: " + intercambios;
}

function mezclarPiezas() {
  let a, b;
  for (let i = 1; i < 30; i++) {
    do {
      a = Math.ceil(Math.random() * 16);
      b = Math.ceil(Math.random() * 16);
    } while (a === b || a < 1 || a > 16 || b < 1 || b > 16);

    intercambiarPiezas(a, b);
  }
}

function isOver() {
  let control = true;
  let num = 0;
  coordsImg.forEach((registro) => {
    if (registro[2] != num) {
      control = false;
    }
    num++;
  });
  return control;
}

function reset() {
  inicializarPiezas();
  mezclarPiezas();
  imprimirPiezas();

  msg.textContent = "";
  btnReset.textContent = "RESET";
  btnReset.style.backgroundColor = "red";

  tiempoIni = Date.now();
  tiempoTotal = 0;
  intercambios = 0;

  gameOn = true;
}

reset();

tablero.addEventListener("click", (e) => {
  if (gameOn === true) {
    if (piezaA === "") {
      document.getElementById(e.target.id).style.border = "1px solid red";
      piezaA = e.target.id;
      numA = idToNumber(piezaA);
    } else if (piezaB === "") {
      document.getElementById(e.target.id).style.border = "1px solid red";
      piezaB = e.target.id;
      numB = idToNumber(piezaB);
      intercambiarPiezas(numA, numB);
      imprimirPiezas();

      if (isOver() == true) {
        gameOn = false;
        tiempoTotal = Math.trunc((Date.now() - tiempoIni) / 1000);
        msg.textContent =
          "FIN! " + intercambios + " intercambios | " + tiempoTotal + " seg";
        btnReset.textContent = "INICIAR";
        btnReset.style.backgroundColor = "green";
      }
      piezaA = "";
      piezaB = "";
    }
  }
});

/**
 * To do:
 * - mostrar imagen completa mientras se juega
 * - puntaje
 * - high scores
 */
