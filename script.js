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

/* 🖱️ MOUSE MOVE (Desktop) */
document.addEventListener("DOMContentLoaded", () => {

const glow = document.querySelector(".cursor-glow");

if (!glow) return; // 🔥 prevents error

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    glow.style.left = touch.clientX + "px";
    glow.style.top = touch.clientY + "px";
});

document.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    glow.style.left = touch.clientX + "px";
    glow.style.top = touch.clientY + "px";
});

});



function openPopup() {
  document.getElementById("admissionPopup").style.display = "flex";
}

function closePopup() {
  document.getElementById("admissionPopup").style.display = "none";
}


/* FORM SUBMIT */

document.getElementById("admissionForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // 🔹 GET VALUES
    let course = document.getElementById("courseInput").value;
    let passkey = document.getElementById("passkey").value;

    // 🔐 DEFINE PASSKEY
    const correctPasskey = "1234"; // 👉 change this

    // ❌ WRONG PASSKEY
    if (passkey !== correctPasskey) {
        alert("❌ Wrong Passkey");
        return;
    }

    // ❌ NO COURSE SELECTED
    if (!course) {
        alert("⚠️ Please select course");
        return;
    }

    // ✅ REDIRECT BASED ON COURSE
    let page = "";

    switch(course) {
        case "CCC":
            page = "admission-ccc.html";
            break;

        case "TALLY":
            page = "admission-tally.html";
            break;

        case "PYTHON":
            page = "admission-python.html";
            break;

        case "WEB DEVELOPMENT":
            page = "admission-web-development.html";
            break;

        case "PGDCA":
            page = "admission-pgdca.html";
            break;

        default:
            alert("⚠️ Invalid course");
            return;
    }

    // 🚀 REDIRECT
    window.location.href = page;
});
