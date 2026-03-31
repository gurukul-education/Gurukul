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

document.querySelectorAll('.file-box input').forEach(input => {
  input.addEventListener('change', function () {
    let fileName = this.files[0]?.name || "File selected";
    this.nextElementSibling.innerText = fileName;
  });
});


function openCourses() {
    document.getElementById("courseDropdown").classList.toggle("active");
}

function selectCourse(course) {
    document.getElementById("courseInput").value = course;
    document.getElementById("courseDropdown").classList.remove("active");
}

document.addEventListener("click", function(e) {
    const box = document.querySelector(".course-box-select");
    if (!box.contains(e.target)) {
        document.getElementById("courseDropdown").classList.remove("active");
    }
});





function goFullscreen() {
    const video = document.getElementById("mainVideo");

    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

let isSubmitting = false; // 🔥 ADD THIS ABOVE

document.getElementById("admissionForm").addEventListener("submit", async function(e) {
    e.preventDefault();

      if (isSubmitting) return; // 🔥 STOP MULTIPLE CALLS
    isSubmitting = true;
    // 🔹 GET VALUES
    let name = document.getElementById("studentName").value;
    let phone = document.getElementById("phone").value;
    let course = document.getElementById("courseInput").value;
    let passkey = document.getElementById("passkey").value;

    // 🔐 DEFINE PASSKEY
    const correctPasskey = "1234"; // 👉 change this

    
    // ❌ WRONG PASSKEY
    if (passkey !== correctPasskey) {
        alert("❌ Wrong Passkey");
        isSubmitting = false;
        return;
    }

    // ❌ NO COURSE SELECTED
    if (!course) {
        alert("⚠️ Please select course");
        isSubmitting = false;
        return;
    }
    
    // 📸 PHOTO
let photo = document.getElementById("photo").files[0];
let photoURL = photo ? await uploadFile(photo) : "";

// 🪪 AADHAR
let aadhar = document.getElementById("aadhar").files[0];
let aadharURL = aadhar ? await uploadFile(aadhar) : "";

// 📄 10th MARKSHEET
let marksheet10 = document.getElementById("marksheet10").files[0];
let marksheet10URL = marksheet10 ? await uploadFile(marksheet10) : "";

// 📄 12th MARKSHEET
let marksheet12 = document.getElementById("marksheet12").files[0];
let marksheet12URL = marksheet12 ? await uploadFile(marksheet12) : "";
    

    localStorage.setItem("studentPhoto", photoURL);
    localStorage.setItem("aadharURL", aadharURL);
    localStorage.setItem("marksheet10URL", marksheet10URL);
    localStorage.setItem("marksheet12URL", marksheet12URL);
    localStorage.setItem("studentName", name);
    localStorage.setItem("studentPhone", phone);
    localStorage.setItem("courseName", course);

    
    // ✅ REDIRECT BASED ON COURSE
    let page = "";

    switch(course) {
        case "PYTHON":
        page = "admission-python.html";
        break;

    case "C++":
        page = "admission-cpp.html";
        break;

    case "WEB DEVELOPMENT":
        page = "admission-web-development.html";
        break;

    case "BASIC COMPUTER":
        page = "admission-basic-computer.html";
        break;

    case "OFFICE MANAGMENT":
        page = "admission-office-managment.html";
        break;

    case "OFFICE MANAGMENT HINDI":
        page = "admission-office-managment-hindi.html";
        break;

    case "ADVANCE OFFICE MANAGMENT":
        page = "admission-advance-office-managment.html";
        break;

    case "TALLY":
        page = "admission-tally.html";
        break;

    case "ENGLISH TYPING":
        page = "admission-english-typing.html";
        break;

    case "HINDI TYPING":
        page = "admission-hindi-typing.html";
        break;

    case "CCC":
        page = "admission-ccc.html";
        break;

    case "PGDCA":
        page = "admission-pgdca.html";
        break;

    case "NIOS 10TH/12TH":
        page = "admission-nios-10th-12th.html";
        break;

    case "BASIC GRAPHIC DESIGNING":
        page = "admission-basic-graphic-designing.html";
        break;

    case "PROFESSIONAL GRAPHIC DESIGNING":
        page = "admission-professional-graphic-designing.html";
        break;

    case "RS-CIT PRACTICE":
        page = "admission-rs-cit-practice.html";
        break;

    case "ACCOUNTS":
        page = "admission-accounts.html";
        break;

        default:
            alert("⚠️ Invalid course");
            isSubmitting = false;
            return;
    }

    isSubmitting = false;
     window.location.href = page;
    
});
async function uploadFile(file) {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "student_upload");

    let res = await
        fetch("https://api.cloudinary.com/v1_1/dr1wbu1og/upload", {
        method: "POST",
        body: formData

    });

    let data = await res.json();
    return data.secure_url;
}
