const smallestCircleWidth = 20; //Tamaño del círculo más pequeño, en porcentaje del contenedor
const theme = "Minions";
const gifs = [
  "minion1.gif",
  "minion2.gif",
  "minion3.gif",
  "minion4.gif",
  "minion5.gif",
  "minion6.gif",
  "minion7.gif",
  "minion8.gif",
  "minion9.gif",
];

class colorDefinition {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

const colorDefinitionArray = [
  new colorDefinition("Minion yellow", "#fce03fff"),
  new colorDefinition("Minion blue", "#0b5d85ff"),
  new colorDefinition("Minion despicable me", "#ed2025ff"),
  new colorDefinition("Minion Gru gray", "#93abadff"),
  new colorDefinition("Red", "red"),
];

function appendTheme(themeName, where) {
  //Crear con JS un elemento span nuevo y agregarle el texto
  const newSpan = document.createElement("span");
  newSpan.innerHTML = `&quot;Temática elegida: ${themeName}&quot;`;
  where.appendChild(newSpan);
}

function loadColors(colors, select) {
  clearSelect(select);

  for (const color of colors) {
    const newOption = new Option(color.name, color.value);
    select.add(newOption);
  }
}

function clearSelect(selectElement) {
  const length = selectElement.options.length - 1;
  for (let i = length; i >= 0; i--) {
    selectElement.remove(i);
  }
}

function createCircles(howMany, where, clickEventFunction) {
  // howMany debería estar entre 2 y 10 como máximo
  howMany = Math.max(2, Math.min(10, howMany));

  // Calcular el porcentaje de diferencia de tamaño de los círculos.
  let widthPercentage = 100;
  let widthDecrease = (100 - smallestCircleWidth) / (howMany - 1);

  // Create the circles
  for (let i = 0; i < howMany; i++) {
    // Create a new div for the circle
    let circle = document.createElement("div");

    // Style the circle
    circle.style.width = widthPercentage + "%";
    circle.style.height = "0";
    circle.style.paddingBottom = widthPercentage + "%";
    circle.style.borderRadius = "50%";
    circle.style.position = "absolute";
    circle.style.top = "50%";
    circle.style.left = "50%";
    circle.style.transform = "translate(-50%, -50%)";
    circle.style.border = "1px solid black";
    circle.addEventListener("click", clickEventFunction);

    // Add the circle to the where div
    where.appendChild(circle);

    // Decrease the width percentage for the next circle
    widthPercentage -= widthDecrease;
  }
}

function clickHandler() {
  //Al hacer click sobre uno de ellos, cambie su color de fondo por el que esté seleccionado en el momento en el select.
  const checkModoSuperpuesto = document.getElementsByTagName("input")[0];
  if (checkModoSuperpuesto.checked) {
    //Si el modo superpuesto está activado, se deberán pintar también los círculos que se encuentren detrás
    let circle = this.nextSibling;
    while (circle) {
      circle.style.backgroundColor = select.value;
      circle = circle.nextSibling;
    }
  }
  //En caso contrario, solo cambiará el color del círculo clickeado
  //(En ambos casos se cambia el color del círculo clickeado)
  this.style.backgroundColor = select.value;
}

function showRandomGif() {
  const imgElement = document.getElementById("randomGif");
  // Elegir una imagen al azar
  var gif = "./img/" + gifs[Math.floor(Math.random() * gifs.length)];

  // Elegir una posición X aleatoria
  var x = Math.floor(Math.random() * window.innerWidth);

  // Setear la imagen y la posición
  imgElement.src = gif;
  imgElement.style.left = x + "px";
  imgElement.style.display = "block";

  // Esconder el minion animado después de 3 segundos
  setTimeout(function () {
    imgElement.style.display = "none";
  }, 3000);
}

const title = document.getElementsByTagName("h1")[0];
const select = document.getElementsByTagName("select")[0];
const circlesDiv = document.getElementsByClassName("circles-section")[0];
const resetButton = document.getElementsByTagName("button")[0];

appendTheme(theme, title);
loadColors(colorDefinitionArray, select);

//Crear en la vista 4 círculos concéntricos sin color de fondo, con borde negro
createCircles(4, circlesDiv, clickHandler);

resetButton.addEventListener("click", () => {
  const circles = circlesDiv.getElementsByTagName("div");
  const circlesArray = Array.prototype.slice.call(circles);
  circlesArray.forEach((element, index) => {
    //Borrar el color de todos los círculos
    element.style.backgroundColor = "transparent";
  });
});

setInterval(showRandomGif, 20000 + Math.random() * 10000);
