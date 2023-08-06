/* */
const tablero = document.getElementById("tablero");
const btnReset = document.getElementById("btn-reset");
const msg = document.getElementById("msg");
btnReset.addEventListener("click", reset);

let piezaA = "";
let piezaB = "";

let coordsImg = [];
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
inicializarPiezas();

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

function reset() {
  mezclarPiezas();
  imprimirPiezas();
  piezaA = "";
  piezaB = "";
  msg.textContent = "";
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

mezclarPiezas();
imprimirPiezas();

let numA;
let numB;

tablero.addEventListener("click", (e) => {
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
      msg.textContent = "ganaste";
      // ACA HAY QUE HACER ALGO MAS
    }
    piezaA = "";
    piezaB = "";
  }
});
