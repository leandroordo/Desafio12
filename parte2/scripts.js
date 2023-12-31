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
];

var esNuevoColor = false;

function appendTheme(themeName, where) {
  //Crear con JS un elemento span nuevo y agregarle el texto
  const newSpan = document.createElement("span");
  newSpan.innerHTML = `&quot;Temática elegida: ${themeName}&quot;`;
  where.appendChild(newSpan);
}

function loadColors(colors, select) {
  clearSelect(select);

  //Leer los colores de local storage
  const storageColors = window.localStorage.getItem("colores");
  if (storageColors) {
    var colorArray = JSON.parse(storageColors);
    if (colorArray.length > 0) {
      //Reemplazar el contenido de colorDefinitionArray con el contenido de colorArray
      colors.splice(0, colors.length, ...colorArray);
    }
  }

  //Cargar los colores
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

  // Limpiar el contenido del div
  clearDiv(where);

  // Calcular el porcentaje de diferencia de tamaño de los círculos.
  let widthPercentage = 100;
  let widthDecrease = (100 - smallestCircleWidth) / (howMany - 1);

  // Crear los círculos con un for
  for (let i = 0; i < howMany; i++) {
    // Cada círculo es un div
    let circle = document.createElement("div");

    // Setear el tamaño y asignarle la misma función para el click
    circle.style.width = widthPercentage + "%";
    circle.style.paddingBottom = widthPercentage + "%";

    circle.addEventListener("click", clickEventFunction);

    // Agregar el nuevo círculo al div where
    where.appendChild(circle);

    // Decrease the width percentage for the next circle
    widthPercentage -= widthDecrease;
  }
}

function clickHandler() {
  //Al hacer click sobre uno de ellos, cambie su color de fondo por el que esté seleccionado en el momento en el select.
  const checkModoSuperpuesto = document.getElementsByTagName("input")[1];
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

function clearDiv(divElement) {
  while (divElement.firstChild) {
    divElement.removeChild(divElement.firstChild);
  }
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
const resetButton = document.getElementsByTagName("button")[3];
const numberBox = document.getElementsByTagName("input")[0];
const checkBox = document.getElementsByTagName("input")[1];
const detailsForm = document.getElementsByTagName("details")[0];

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

//Agregar evento resize para poder deshabilitar controles
window.addEventListener("resize", () => {
  if (window.innerWidth <= 500) {
    select.disabled = true;
    checkBox.disabled = true;
  } else {
    select.disabled = false;
    checkBox.disabled = false;
  }
});

//Agregar evento blur para redibujar los círculos
numberBox.addEventListener("input", () => {
  const numberValue = Number(numberBox.value);
  if (!isNaN(numberValue) && numberValue >= 2 && numberValue <= 10) {
    createCircles(numberValue, circlesDiv, clickHandler);
  }
});

//Edición de colores
//Eventos de los botones
const colorEditSave = document.getElementById("colorEditSave");
const colorEditNew = document.getElementById("colorEditNew");
const colorEditDelete = document.getElementById("colorEditDelete");

colorEditSave.addEventListener("click", () => {
  const colorName = document.getElementById("color-nombre");
  const colorValue = document.getElementById("color-valor");

  //Guardar los datos del color
  if (!(colorName.value === "") && !(colorValue.value === "")) {
    if (!isValidColorValue(colorValue.value)) {
      alert("Ups! Ese color no es correcto");
      return;
    }
    if (esNuevoColor) {
      colorDefinitionArray.push(
        new colorDefinition(colorName.value, colorValue.value)
      );

      //Actualizar la lista de colores
      loadColors(colorDefinitionArray, select);

      //Seleccionar automáticamente en el select el color recién agregado
      select.selectedIndex = colorDefinitionArray.length - 1;
    } else {
      colorDefinitionArray[select.selectedIndex].name = colorName.value;
      colorDefinitionArray[select.selectedIndex].value = colorValue.value;
    }
    esNuevoColor = false;
  }
});

colorEditNew.addEventListener("click", nuevoColor);

function nuevoColor() {
  const colorName = document.getElementById("color-nombre");
  const colorValue = document.getElementById("color-valor");

  colorName.value = "";
  colorValue.value = "";
  esNuevoColor = true;
}

colorEditDelete.addEventListener("click", () => {
  if (
    window.confirm("¿Estás seguro que quieres borrar este color de la lista?")
  ) {
    colorDefinitionArray.splice(select.selectedIndex, 1);
    nuevoColor();
  }
});

//Al abrir el formulario...
detailsForm.addEventListener("toggle", (event) => {
  if (detailsForm.open) {
    esNuevoColor = false;
    //Establecer valores a los controles
    const colorName = document.getElementById("color-nombre");
    const colorValue = document.getElementById("color-valor");

    colorName.value = select.options[select.selectedIndex].text;
    colorValue.value = select.value;
  } else {
    //Guardar los colores en LocalStorage
    const jsonColores = JSON.stringify(colorDefinitionArray);
    window.localStorage.setItem("colores", jsonColores);

    //El forulario se cerró. Actualizar los colores
    loadColors(colorDefinitionArray, select);
  }
});

function isValidColorValue(valor) {
  // Con una expresión regular verificar si valor es un valor hexadecimal válido
  const hexColorPattern = /^#([0-9A-F]{3,4}){1,2}$/i;
  var isValid = hexColorPattern.test(valor);
  return isValid;
}
