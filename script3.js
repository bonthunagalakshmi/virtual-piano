const pianoKeys = document.querySelectorAll(".piano-keys .key");
const keysCheckbox = document.querySelector(".keys-checkbox input");
let allKeys = [];
let audio = new Audio("tunes/a.wav");

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play().then(() => {
        console.log(`Playing ${key}`);
    }).catch(error => {
        console.error(`Failed to play ${key}:`, error);
    });
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    if (clickedKey) {
        clickedKey.classList.add("active");
        setTimeout(() => {
            clickedKey.classList.remove("active");
        }, 150);
    }
};

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
};

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const pressedKey = (e) => {
    if (allKeys.includes(e.key)) playTune(e.key);
};

keysCheckbox.addEventListener("click", showHideKeys);
document.addEventListener("keydown", pressedKey);
