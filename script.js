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

function toggleFullscreen() {
    const video = document.getElementById("mainVideo");

    if (!document.fullscreenElement) {

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } 
        else if (video.webkitRequestFullscreen) {  // Safari
            video.webkitRequestFullscreen();
        } 
        else if (video.msRequestFullscreen) {  // IE
            video.msRequestFullscreen();
        }

    } else {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } 
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } 
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

    }
}


function toggleFullscreen() {
    const video = document.getElementById("mainVideo");

    if (!document.fullscreenElement) {
        video.requestFullscreen().catch(() => {});
    } else {
        document.exitFullscreen();
    }
}
