const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");

function resetForm() {
    widthInput.value = 10;
    heightInput.value = 10;
}

function generateTable(width, height) {
    document.querySelector(".button-grid").innerHTML = "";
    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            const element = document.createElement("button");
            element.setAttribute("x", i);
            element.setAttribute("y", j);
            element.addEventListener("contextmenu", function (event) {
                event.preventDefault();
                mark(element.getAttribute("x"), element.getAttribute("y"))
                console.log();
            });
            document.querySelector(".button-grid").append(element);
        }
    }
    document.querySelector(
        ".button-grid"
    ).style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    resetForm();
}

function mark(x, y) {
    const markedButton = document.querySelector(`[x="${x}"][y="${y}"]`);
    if(markedButton.style.backgroundColor == "green")
    {
        markedButton.style.backgroundColor = "red";
        return;
    }
    if(markedButton.style.backgroundColor == "")
    {
        markedButton.style.backgroundColor = "green"
    }
    if(markedButton.style.backgroundColor == "red")
    {
        markedButton.style.backgroundColor = ""
    }
}

function getByttonByXandY() {}

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
