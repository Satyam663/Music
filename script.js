let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
}

function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    }
}

// Update progress bar only when the song is playing
setInterval(() => {
    if (!song.paused) {
        progress.value = song.currentTime;
    }
}, 500);

progress.onchange = function () {
    song.currentTime = progress.value;
}

// --------------------------------- Volume -------------------------------------
let volumeControl = document.getElementById("volume");
volumeControl.oninput = function () {
    song.volume = volumeControl.value;
};

// ------------------------------- Time -----------------------------------------------------
let currentTimeDisplay = document.getElementById("currentTime");
let durationDisplay = document.getElementById("duration");

song.ontimeupdate = function () {
    currentTimeDisplay.textContent = formatTime(song.currentTime);
};

song.onloadedmetadata = function () {
    durationDisplay.textContent = formatTime(song.duration);
};

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return minutes + ":" + secs;
}