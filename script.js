document.addEventListener("DOMContentLoaded", function () {

    const words = document.querySelectorAll(".word");
    let current = 0;

    setInterval(() => {

        words[current].classList.remove("active", "exit");
        words[current].classList.add("exit");

        current = (current + 1) % words.length;

        words[current].classList.add("active");

        setTimeout(() => {
            words.forEach(word => word.classList.remove("exit"));
        }, 600);

    }, 2000);

});

function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    const btn = document.querySelector(".theme-toggle");

    if (document.body.classList.contains("dark-mode")) {
        btn.textContent = "☀️";
    } else {
        btn.textContent = "🌙";
    }
}

// 🎬 PLAY YOUTUBE VIDEO
function playVideo(id, title, element) {
    const iframe = document.getElementById("mainVideo");

    // change video
    iframe.src = "https://www.youtube.com/embed/" + id;

    // change title
    document.getElementById("videoTitle").innerText = title;

    // active class
    document.querySelectorAll(".video-item").forEach(v => v.classList.remove("active"));
    element.classList.add("active");
}


// 🔳 FULLSCREEN (works with iframe)
function toggleFullscreen() {
    const video = document.getElementById("mainVideo");

    if (!document.fullscreenElement) {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}


let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('mainVideo');
}

function playYT() {
    player.playVideo();
}

function pauseYT() {
    player.pauseVideo();
}

function playVideo(id, title, element) {
    player.loadVideoById(id);

    document.getElementById("videoTitle").innerText = title;

    document.querySelectorAll(".video-item").forEach(v => v.classList.remove("active"));
    element.classList.add("active");
}
