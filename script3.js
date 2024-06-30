const pianoKeys = document.querySelectorAll(".piano-keys .key");
const keysCheckbox = document.querySelector(".keys-checkbox input");
const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const playButton = document.getElementById('playButton');

let allKeys = [];
let audio = new Audio("tunes/a.wav");

let isRecording = false;
let recordedNotes = [];
let startTime = null;
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
    if (isRecording) {
        const time = Date.now() - startTime;
        recordedNotes.push({ note: key, time });
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

recordButton.addEventListener('click', () => {
    isRecording = true;
    recordedNotes = [];
    startTime = Date.now();
    recordButton.disabled = true;
    stopButton.disabled = false;
    playButton.disabled = true;
});

stopButton.addEventListener('click', () => {
    isRecording = false;
    recordButton.disabled = false;
    stopButton.disabled = true;
    playButton.disabled = false;
});

playButton.addEventListener('click', () => {
    if (recordedNotes.length === 0) return;

    let prevTime = 0;
    recordedNotes.forEach(note => {
        setTimeout(() => {
            playTune(note.note);
        }, note.time - prevTime);
        prevTime = note.time;
    });
});
