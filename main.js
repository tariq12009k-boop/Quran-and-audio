const tasks = [
  "Read Surah Al-Kahf today 🌿",
  "Say SubhanAllah 100 times ✨",
  "Pray 2 rak'ahs of Duha 🌞",
  "Make dua for your parents 💖",
  "Read one page of the Quran 📖",
  "Say Astaghfirullah 50 times 🙏",
  "Give charity (even 1 rial) 💎",
  "Smile at someone (it's charity) 🙂",
  "Say: La hawla wa la quwwata illa billah 50 times 🌸",
  "Remember Allah before sleeping 🌙"
];
const taskButton = document.getElementById("taskButton");
const taskDiv = document.getElementById("task");
const progressBar = document.getElementById("progressBar");
const countdownDiv = document.getElementById("countdown");
const WAIT_TIME = 3 * 60 * 60 * 1000;
checkTaskStatus();
taskButton.addEventListener("click", () => {
  const lastTime = localStorage.getItem("lastTaskTime");
  const now = Date.now();
  if (lastTime && now - lastTime < WAIT_TIME) {
    alert("⏳ Please wait 3 hours before getting a new mission!");
    return;
  }
  document.getElementById("clickSound").play();
  const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
  taskDiv.innerHTML = `<b>Your mission:</b> ${randomTask}`;
  progressBar.style.width = "100%";
  setTimeout(() => { progressBar.style.width = "0"; }, 2000);
  localStorage.setItem("lastTaskTime", now);
  showNotification("Your mission today", randomTask);
  startCountdown(WAIT_TIME);
});
function startCountdown(remaining) {
  updateCountdown(remaining);
  const interval = setInterval(() => {
    remaining -= 1000;
    if (remaining <= 0) {
      clearInterval(interval);
      countdownDiv.innerHTML = "✅ You can get a new mission now!";
      taskButton.disabled = false;
    } else {
      updateCountdown(remaining);
    }
  }, 1000);
}
function updateCountdown(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  countdownDiv.innerHTML = `⏳ Next mission in ${hours}h ${minutes}m ${seconds}s`;
}
function checkTaskStatus() {
  const lastTime = localStorage.getItem("lastTaskTime");
  if (lastTime) {
    const now = Date.now();
    const diff = now - lastTime;

    if (diff < WAIT_TIME) {
      taskButton.disabled = true;
      startCountdown(WAIT_TIME - diff);
    }
  }
}
function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("📢 Notifications allowed");
      }
    });
  }
}
function showNotification(title, message) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, {
      body: message,
      icon: "praying.png"
    });
  }
}
requestNotificationPermission();
const suraNames = [
  "Al-Fatihah", "Al-Baqarah", "Aal-E-Imran", "An-Nisa", "Al-Ma'idah", "Al-An'am", "Al-A'raf",
  "Al-Anfal", "At-Tawbah", "Yunus", "Hud", "Yusuf", "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Ta-Ha",
  "Al-Anbiya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan", "Ash-Shu'ara", "An-Naml", "Al-Qasas", "Al-Ankabut", "Ar-Rum", "Luqman",
  "As-Sajda", "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad", "Az-Zumar", "Ghafir", "Fussilat", "Ash-Shura", "Az-Zukhruf",
  "Ad-Dukhan", "Al-Jathiyah", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf", "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar",
  "Ar-Rahman", "Al-Waqia", "Al-Hadid", "Al-Mujadila", "Al-Hashr", "Al-Mumtahina", "As-Saff", "Al-Jumu'a", "Al-Munafiqoon", "At-Taghabun",
  "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqa", "Al-Ma'arij", "Nuh", "Al-Jinn", "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyama",
  "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "Abasa", "At-Takwir", "Al-Infitar", "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj",
  "At-Tariq", "Al-A'la", "Al-Ghashiya", "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Lail", "Ad-Duha", "Ash-Sharh", "At-Tin", "Al-Alaq",
  "Al-Qadr", "Al-Bayyina", "Az-Zalzala", "Al-Adiyat", "Al-Qari'a", "At-Takathur", "Al-Asr", "Al-Humaza", "Al-Fil", "Quraysh", "Al-Ma'un",
  "Al-Kawthar", "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
];
const surahSelect = document.getElementById("surahSelect");
const reciterSelect = document.getElementById("reciterSelect");
const playButton = document.getElementById("playButton");
const loopButton = document.getElementById("loopButton");
const audioPlayer = document.getElementById("audioPlayer");
const quranTextDiv = document.getElementById("quranText");
for (let i = 0; i < suraNames.length; i++) {
  const option = document.createElement("option");
  option.value = i + 1;
  option.textContent = `${i + 1} - ${suraNames[i]}`;
  surahSelect.appendChild(option);
}
surahSelect.value = "1";
surahSelect.dispatchEvent(new Event("change"));
let isLooping = false;
loopButton.addEventListener("click", () => {
  isLooping = !isLooping;
  audioPlayer.loop = isLooping;
  loopButton.innerHTML = `<i class="fa-solid fa-repeat"></i> Loop: ${isLooping ? "On" : "Off"}`;
});
playButton.addEventListener("click", () => {
  const surahId = surahSelect.value.toString().padStart(3, "0");
  const reciter = reciterSelect.value;
  const url = `https://download.quranicaudio.com/quran/${reciter}/${surahId}.mp3`;

  playButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Loading...`;
  audioPlayer.src = url;
  audioPlayer.play()
    .then(() => {
      playButton.innerHTML = `<i class="fa-solid fa-play"></i> Play Audio`;
    })
    .catch((e) => {
      playButton.innerHTML = `<i class="fa-solid fa-play"></i> Play Audio`;
      alert("Unable to play the audio. Please try another reciter or surah.");
      console.error(e);
    });
});
surahSelect.addEventListener("change", () => {
  const surahNumber = surahSelect.value;
  quranTextDiv.innerHTML = "<p>📖 Loading Surah...</p>";
  fetch(`http://api.alquran.cloud/v1/quran/quran-uthmani`)
    .then(response => response.json())
    .then(data => {
      const surahName = data.data.name;
      const surahEnglishName = data.data.englishName;
      const ayahs = data.data.ayahs;
      const ayahHtml = ayahs.map(ayah =>
        `<p><b>(${ayah.numberInSurah})</b> ${ayah.text}</p>`
      ).join("");
      quranTextDiv.innerHTML = `
        <h4 style="text-align:center; margin-bottom: 10px;">${surahEnglishName} - ${surahName}</h4>
        ${ayahHtml}
      `;
    })
    .catch(error => {
      console.error(error);
      quranTextDiv.innerHTML = "<p style='color:red;'>⚠️ Error loading the Surah.</p>";
    });
});
async function loadSurahAndThen(surahNumber) {
  quranTextDiv.innerHTML = "<p>📖 Loading Surah...</p>";
  try {
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`);
    const data = await response.json();
    const name = data.data.name;
    const englishName = data.data.englishName;
    const ayahs = data.data.ayahs;
    const ayahHtml = ayahs.map(ayah => `<p><b>(${ayah.numberInSurah})</b> ${ayah.text}</p>`).join("");
    quranTextDiv.innerHTML = `
      <h4>${englishName} - ${name}</h4>
      ${ayahHtml}
    `;
    afterTextShown();
  } catch (error) {
    quranTextDiv.innerHTML = "<p style='color:red;'>❌ Failed to load Surah text.</p>";
  }
}
surahSelect.addEventListener("change", () => {
  loadSurahAndThen(surahSelect.value);
});

