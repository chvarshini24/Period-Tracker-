//  Dark Mode Toggle 
document.getElementById("toggleDarkMode")?.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    let isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    this.innerHTML = isDark ? "☀️" : "🌙";
});
//  Apply Dark Mode on Page Load
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        document.getElementById("toggleDarkMode").innerHTML = "☀️";
    }
});
//  Predict Next Period
document.getElementById("periodForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    let startDate = new Date(document.getElementById("startDate").value);
    let cycleLength = parseInt(document.getElementById("cycleLength").value);

    if (!startDate || cycleLength < 1) {
        alert("Please enter valid details.");
        return;
    }

    let nextPeriodDate = new Date(startDate);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

    document.getElementById("predictionResult").innerHTML = `
        <div class="alert alert-info">
            Your next period is expected on: <strong>${nextPeriodDate.toDateString()}</strong>
        </div>
    `;
    savePeriodDate(startDate);
});
// Log Symptoms 
function logSymptom() {
    let symptom = document.getElementById("symptoms").value;
    let symptomList = document.getElementById("symptomList");
    let comfortMessageDiv = document.getElementById("comfortMessage");
    if (!symptom) return;
    let listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = symptom;
    symptomList.appendChild(listItem);
    let messages = {
        "Cramps": "You're strong! A warm compress and rest will help. 🌸💖",
        "Headache": "Take deep breaths and rest your eyes. You deserve peace. 🌿✨",
        "Fatigue": "You're doing amazing! Stay hydrated and take a little break. ☁️💤",
        "Mood Swings": "You're loved and valued. It's okay to feel this way. 💕🤗",
        "Back Pain": "Stretch a little and rest. Your body is working hard. 🌷💆‍♀️",
        "Bloating": "You're beautiful just the way you are! Herbal tea might help. ☕🌼"
    };
    comfortMessageDiv.innerHTML = `
        <div class="alert alert-info">
            ${messages[symptom]}
        </div>
    `;
}

function loadProfileImage(event) {
    document.getElementById("profileImage").src = URL.createObjectURL(event.target.files[0]);
}

function savePeriodDate(date) {
    let savedDates = JSON.parse(localStorage.getItem("periodDates")) || [];
    if (!savedDates.includes(date)) {
        savedDates.push(date);
        localStorage.setItem("periodDates", JSON.stringify(savedDates));
        updateCalendarDropdown();
    }
}

function updateCalendarDropdown() {
    let savedDates = JSON.parse(localStorage.getItem("periodDates")) || [];
    let dropdownMenu = document.getElementById("savedDatesList");

    dropdownMenu.innerHTML = ""; 
    if (savedDates.length === 0) {
        dropdownMenu.innerHTML = '<li class="dropdown-item">No dates recorded yet</li>';
    } else {
        savedDates.forEach(date => {
            let listItem = document.createElement("li");
            listItem.className = "dropdown-item";
            listItem.textContent = date;
            dropdownMenu.appendChild(listItem);
        });
    }
}

document.getElementById("periodForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    let startDate = document.getElementById("startDate").value;
    if (startDate) {
        savePeriodDate(startDate);
    }
});
document.addEventListener("DOMContentLoaded", updateCalendarDropdown);
