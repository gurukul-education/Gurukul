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

// 🎬 PLAY cloudinary VIDEO

function playVideo(src, title, el) {
    const video = document.getElementById("mainVideo");
    const titleText = document.getElementById("videoTitle");

    video.src = src;
    video.play();
    titleText.innerText = title;

    document.querySelectorAll(".video-item").forEach(v => v.classList.remove("active"));
    el.classList.add("active");
}

// 🔳 FULLSCREEN (works with iframe)
function toggleFullscreen() {
    const wrapper = document.querySelector(".video-wrapper"); // 🔥 changed

    if (!document.fullscreenElement) {
        if (wrapper.requestFullscreen) {
            wrapper.requestFullscreen();
        } else if (wrapper.webkitRequestFullscreen) {
            wrapper.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});




