//defino canvas, donde irá todo el juego
let tablero = document.getElementById("tablero");
let btnReset = document.getElementById("btn-reset");
btnReset.addEventListener("click", inicializarPiezas);

let gameOver = false;
let coordsImg = [];
function inicializarPiezas() {
  let numero = 1;
  for (let row = 0; row >= -300; row = row - 100) {
    for (let col = 0; col >= -300; col = col - 100) {
      coordsImg[numero] = [col, row];
      // let pipi = "pieza" + numero;
      let estaPieza = document.getElementById("pieza" + numero);
      // estaPieza.innerText = numero;
      estaPieza.style.backgroundPosition = col + "px " + row + "px";
      estaPieza.style.border = "1px solid white";
      // console.log(numero, coordsImg[numero]);
      numero++;
    }
  }
}
inicializarPiezas();
// function mostrar(e) {
//   // console.log(e);
//   console.log(e.target.id);
// }

tablero.addEventListener("click", primerClick);
while (gameOver === false) {
  let piezaA, piezaB;
  //espero primer click
  tablero.addEventListener("click", primerClick);
  //on click:
  //     marco pieza
  function primerClick(e) {
    piezaA = e.target.id;
    console.log(piezaA);
    document.getElementById(piezaA).style.border = "1px solid red";
  }
  gameOver = true;
  // const estaPieza = document.getElementById();
  //     guardo pieza a
  //     espero segundo click
  //     on click:
  //        si no es la misma pieza intercambio piezas
  //        compruebo rompecabezas
}
