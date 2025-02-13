let score = 0;
let currentFlagIndex = 0;
let flags = [];

const scoreElement = document.getElementById("score");
const flagImage = document.getElementById("flag-image");
const choicesContainer = document.getElementById("choices");

fetch('flags.json')
    .then(response => response.json())
    .then(data => {
        flags = data.flags;
        startGame();
    });

function startGame() {
    currentFlagIndex = Math.floor(Math.random() * flags.length);
    const flag = flags[currentFlagIndex];
    flagImage.src = flag.image;
    generateChoices(flag);
}

function generateChoices(correctFlag) {
    choicesContainer.innerHTML = "";
    let choices = [correctFlag];

    // Randomly pick two other flags for the choices
    while (choices.length < 3) {
        let randomFlag = flags[Math.floor(Math.random() * flags.length)];
        if (!choices.includes(randomFlag)) {
            choices.push(randomFlag);
        }
    }

    // Shuffle choices
    choices = shuffleArray(choices);

    // Create buttons for the choices
    choices.forEach(flag => {
        const button = document.createElement("button");
        button.textContent = flag.name;
        button.onclick = () => checkAnswer(flag, correctFlag);
        choicesContainer.appendChild(button);
    });
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function checkAnswer(selectedFlag, correctFlag) {
    const okkokElement = document.getElementById("okkok"); // Pobieramy element z komunikatem
    if (selectedFlag === correctFlag) {
        score++;
        okkokElement.textContent = "Brawo! Poprawna odpowiedź."; // Wyświetlamy komunikat "Brawo!"
        okkokElement.style.color = "green"; // Opcjonalnie zmiana koloru tekstu na zielony
    } else {
        okkokElement.textContent = "Niestety, spróbuj ponownie."; // Komunikat przy błędnej odpowiedzi
        okkokElement.style.color = "red"; // Opcjonalnie zmiana koloru tekstu na czerwony
    }

    scoreElement.textContent = `Wynik: ${score}`;
    startGame();
}
