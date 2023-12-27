const smallestCircleWidth = 20; //Tamaño del círculo más pequeño, en porcentaje del contenedor
const theme = "Minions";
const colorDefinition = [
  { name: "Minion yellow", value: "#fce03fff" },
  { name: "Minion blue", value: "#0b5d85ff" },
  { name: "Minion despicable me", value: "#ed2025ff" },
  { name: "Minion Gru gray", value: "#93abadff" },
];

function appendTheme(themeName, where) {
  //Crear con JS un elemento span nuevo y agregarle el texto
  const newSpan = document.createElement("span");
  newSpan.innerHTML = `&quot;Temática elegida: ${themeName}&quot;`;
  where.appendChild(newSpan);
}

function loadColors(colorDefinition, select) {
  clearSelect(select);

  for (const color of colorDefinition) {
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

const title = document.getElementsByTagName("h1")[0];
const select = document.getElementsByTagName("select")[0];

appendTheme(theme, title);
loadColors(colorDefinition, select);

let whereDiv = document.getElementsByClassName("circles-section")[0];
createCircles(4, whereDiv, clickHandler);

function clickHandler() {
  this.style.backgroundColor = select.value;
}
