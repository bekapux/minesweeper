const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const mineField = document.querySelector(".button-grid");
const generateFormBtn = document.getElementById("props");
const revealBtn = document.getElementById("reveal");

let bombNumber = (widthInput.value * heightInput.value) / 10;
let bombs = [];
let width = 10;
let height = 10;
let safeClusterCount = width * height - bombNumber;
let isGameOver;

function resetForm() {
    widthInput.value = 10;
    heightInput.value = 10;
}

function setBombNumber(width, height) {
    return (width * height) / 10;
}

function generateTable(width, height) {
    isGameOver = false
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
    safeClusterCount = width * height - bombNumber;
    while (bombs.length < bombNumber) {
        const x = getRandom(width);
        const y = getRandom(height);

        const itemInArray = bombs.find((bomb) => bomb.x == x && bomb.y == y);
        if (itemInArray == null) {
            bombs.push({ x, y });
        }
    }
}

function getRandom(n) {
    return Math.floor(Math.random() * n);
}

function mark(x, y) {
    const markedButton = document.querySelector(`[x="${x}"][y="${y}"]`);
    if (markedButton.innerHTML == "⛳") {
        markedButton.innerHTML = "❓";
        return;
    }
    if (markedButton.innerHTML == "") {
        markedButton.innerHTML = "⛳";
        return;
    }
    if (markedButton.innerHTML == "❓") {
        markedButton.innerHTML = "";
        return;
    }
}

function countNearbyBombs(x, y) {
    return bombs.filter(
        (bomb) => Math.abs(bomb.x - x) <= 1 && Math.abs(bomb.y - y) <= 1
    ).length;
}

revealBtn.addEventListener("click", revealAll);

mineField.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    mark(e.target.getAttribute("x"), e.target.getAttribute("y"));
});

mineField.addEventListener("click", (e) => {
    e.preventDefault();
    revealCluster(
        parseInt(e.target.getAttribute("x")),
        parseInt(e.target.getAttribute("y"))
    );
});

function revealCluster(x, y) {
    if(isGameOver) return;
    const nearbyBombs = countNearbyBombs(x, y);
    const clickedButton = document.querySelector(`[x="${x}"][y="${y}"]`);

    if (!clickedButton) return;

    if (clickedButton.disabled) {
        return;
    }

    if (bombs.find((bomb) => bomb.x == x && bomb.y == y)) {
        clickedButton.innerHTML = "💥";
        revealBombs("💥")
        isGameOver = true;
        return;
    } else {
        clickedButton.innerHTML = nearbyBombs;
    }

    clickedButton.disabled = true;
    if (
        document.querySelectorAll("button:disabled").length == safeClusterCount
    ) {
        revealBombs();
    }

    if (nearbyBombs > 0) {
        return;
    }
    if (nearbyBombs == 0) {
        revealCluster(x, y + 1);
        revealCluster(x, y - 1);
        revealCluster(x + 1, y + 1);
        revealCluster(x + 1, y - 1);
        revealCluster(x + 1, y);
        revealCluster(x - 1, y - 1);
        revealCluster(x - 1, y + 1);
        revealCluster(x - 1, y);
    }
}

function youWon(){
    console.log("won");
    revealBombs("⛳");
    alert('won');
}

function revealBombs(symbol="💥") {
    bombs.forEach((item) => {
        document.querySelector(`[x="${item.x}"][y="${item.y}"]`).innerHTML =
        symbol;
    });
}

generateFormBtn.addEventListener("click", () => {
    width = widthInput.value;
    if (width > 20) width = 20;
    height = heightInput.value;
    if (height > 20) height = 20;
    generateTable(width, height);
});

generateTable(width, height);

function revealAll() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            revealCluster(x, y);
        }
    }
}
