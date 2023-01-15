const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const mineField = document.querySelector(".button-grid");

function resetForm() {
    widthInput.value = 10;
    heightInput.value = 10;
}

function generateTable(width, height) {
    document.querySelector(".button-grid").innerHTML = "";
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const element = document.createElement("button");
            element.setAttribute("x", x);
            element.setAttribute("y", y);
            mineField.append(element);
        }
    }
    mineField.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    resetForm();
}

function mark(x, y) {
    const markedButton = document.querySelector(`[x="${x}"][y="${y}"]`);
    if (markedButton.style.backgroundColor == "green") {
        markedButton.style.backgroundColor = "red";
        return;
    }
    if (markedButton.style.backgroundColor == "") {
        markedButton.style.backgroundColor = "green";
    }
    if (markedButton.style.backgroundColor == "red") {
        markedButton.style.backgroundColor = "";
    }
}

document.querySelector(".button-grid").addEventListener("contextmenu", (e) => {
    e.preventDefault();
    mark(e.target.getAttribute("x"), e.target.getAttribute("y"));
});

let width = 10;
let height = 10;

document.getElementById("props").addEventListener("click", () => {
    console.log("click");
    width = widthInput.value;
    if (width > 20) width = 20;
    height = heightInput.value;
    if (height > 20) height = 20;
    generateTable(width, height);
});

generateTable(width, height);
