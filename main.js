const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const mineField = document.querySelector(".button-grid");
let bombNumber = (widthInput.value * heightInput.value) / 10;
let bombs = [];
let width = 10;
let height = 10;

function resetForm() {
    widthInput.value = 10;
    heightInput.value = 10;
}

function setBombNumber(width, height) {
    return (width * height) / 10;
}

function generateTable(width, height) {
    setBombs(width, height);

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

function setBombs(width, height) {
    bombs = [];
    bombNumber = setBombNumber(width, height);
    while (bombs.length < bombNumber) {
        const x = getRandom(width);
        const y = getRandom(height);

        const itemInArray = bombs.find(bomb => bomb.x == x && bomb.y == y);
        if (itemInArray == null) {
            bombs.push({ x, y });
        }
    }
    console.log(bombs);
}

function getRandom(n) {
    return Math.floor(Math.random() * n);
}

function mark(x, y) {
    const markedButton = document.querySelector(`[x="${x}"][y="${y}"]`);
    if (markedButton.style.backgroundColor == "blue") {
        markedButton.style.backgroundColor = "red";
        return;
    }
    if (markedButton.style.backgroundColor == "") {
        markedButton.style.backgroundColor = "blue";
        return;
    }
    if (markedButton.style.backgroundColor == "red") {
        markedButton.style.backgroundColor = "";
        return;
    }
}

document.querySelector(".button-grid").addEventListener("contextmenu", (e) => {
    e.preventDefault();
    mark(e.target.getAttribute("x"), e.target.getAttribute("y"));
});

document.getElementById("props").addEventListener("click", () => {
    width = widthInput.value;
    if (width > 20) width = 20;
    height = heightInput.value;
    if (height > 20) height = 20;
    generateTable(width, height);
});

generateTable(width, height);
