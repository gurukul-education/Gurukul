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

  const passkey = document.getElementById("passkey").value;



  // SUCCESS → REDIRECT
  window.location.href = "admission.html";
});

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



document.getElementById("admissionForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // GET VALUES
    let name = document.getElementById("studentName").value;
    let phone = document.getElementById("phone").value;
    let course = document.getElementById("courseInput").value;
    let passkey = document.getElementById("passkey").value;

   

    // SUCCESS
    redirectToCourse(course);
});

function redirectToCourse(course) {
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
            page = "admission.html";
    }

    window.location.href = page;
}

function goFullscreen() {
    const video = document.getElementById("mainVideo");

    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function goFullscreen() {
    const video = document.getElementById("mainVideo");

    if (!document.fullscreenElement) {
        video.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

document.getElementById("admissionForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    // 🔹 GET VALUES
    let name = document.getElementById("studentName").value;
    let phone = document.getElementById("phone").value;
    let course = document.getElementById("courseInput").value;
    let passkey = document.getElementById("passkey").value;

    let aadhar = document.getElementById("aadhar").files[0];
    let tenth = document.getElementById("tenth").files[0];
    let photo = document.getElementById("photo").files[0];
    let twelfth = document.getElementById("twelfth").files[0];

    // 🔹 VALIDATION
    if (!name || !phone || !course || !aadhar || !tenth || !photo || !twelfth || !passkey) {
        alert("⚠️ Please fill all details");
        return;
    }

    if (passkey !== correctPasskey) {
        alert("Wrong Passkey ❌");
        return;

    }

    // 🔥 CLOUDINARY UPLOAD FUNCTION
    async function uploadFile(file) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "student_upload"); // 🔁 change this

        let res = await fetch("https://api.cloudinary.com/v1_1/dr1wbu1og/upload", {
            method: "POST",
            body: formData
        });

        let data = await res.json();
        return data.secure_url;
    }

    try {
        // 🔹 UPLOAD FILES
        let aadharURL = await uploadFile(aadhar);
        let tenthURL = await uploadFile(tenth);
        let photoURL = await uploadFile(photo);
        let twelfthURL = await uploadFile(twelfth);

        // 🔹 SEND DATA TO GOOGLE SHEET
      await fetch("https://script.google.com/macros/s/AKfycbzxfCtCn1xa7UReqIAZb9un0GCd8XVwIuOWJrD9oxz9W1JdwtKpaEdYEw8SKFL-52ZG/exec", {
    method: "POST",
          mode: "no-cors",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: name,
        phone: phone,
        course: course,
        aadhar: aadharURL,
        tenth: tenthURL,
        photo: photoURL,
        twelfth: twelfthURL
    })
});

        // 🔹 SUCCESS
        alert("✅ Admission Submitted Successfully!");

        redirectToCourse(course);

    } catch (error) {
        console.error(error);
        alert("❌ Upload Failed. Try again.");
    }
});
