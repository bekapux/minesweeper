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
            document.querySelector(".button-grid").append(element);
        }
    }
    document.querySelector(
        ".button-grid"
    ).style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    resetForm();
}



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
