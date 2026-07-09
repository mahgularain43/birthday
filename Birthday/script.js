const scenes = [
  "loadingScene",
  "vaultScene",
  "countScene",
  "birthdayScene",
  "letterScene",
  "finalScene"
];

let currentScene = 0;
let balloonInterval;

const popSound = document.getElementById("popSound");
const partyMusic = document.getElementById("partyMusic");

function showScene(id) {
  document.querySelectorAll(".scene").forEach((scene) => {
    scene.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

function nextScene() {
  currentScene += 1;
  showScene(scenes[currentScene]);
}

setTimeout(() => {
  nextScene();
  startBalloons();
}, 5000);

document.getElementById("openVault").addEventListener("click", () => {
  partyMusic.volume = 0.55;
  partyMusic.play().catch(() => {});
  playPop();
  emojiExplosion(45);

  setTimeout(() => {
    nextScene();
    startCountdown();
  }, 3000);
});

document.getElementById("nextBtn").addEventListener("click", () => {
  nextScene();
  setTimeout(startLetterScene, 900);
});

document.getElementById("partyBtn").addEventListener("click", () => {
  nextScene();
  emojiExplosion(80);
});

function startCountdown() {
  let number = 5;
  const countNumber = document.getElementById("countNumber");
  countNumber.textContent = number;

  const countdown = setInterval(() => {
    number -= 1;
    countNumber.textContent = number;
    playPop();
    emojiExplosion(15);

    if (number === 0) {
      clearInterval(countdown);

setTimeout(() => {
  nextScene();
  partyMusic.volume = 0.9;
  emojiExplosion(70);
}, 1000);
    }
  }, 1200);
}

function playPop() {
  popSound.currentTime = 0;
  popSound.play().catch(() => {});
}

function emojiExplosion(amount = 30) {
  const emojis = ["🎉", "🎈", "💗", "✨", "🎂", "💌", "🌸", "🥳"];

  for (let i = 0; i < amount; i++) {
    const emoji = document.createElement("div");
    emoji.className = "emoji-pop";
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    emoji.style.setProperty("--x", `${(Math.random() - 0.5) * 760}px`);
    emoji.style.setProperty("--y", `${(Math.random() - 0.5) * 620}px`);

    document.body.appendChild(emoji);

    setTimeout(() => {
      emoji.remove();
    }, 1300);
  }
}

function startBalloons() {
  if (balloonInterval) return;

  balloonInterval = setInterval(() => {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.textContent = ["🎈", "💗", "🎀", "🌸"][Math.floor(Math.random() * 4)];

    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.animationDuration = 7 + Math.random() * 6 + "s";
    balloon.style.fontSize = 28 + Math.random() * 24 + "px";

    document.body.appendChild(balloon);

    setTimeout(() => {
      balloon.remove();
    }, 14000);
  }, 850);
}
function startLetterScene() {
  const envelope = document.getElementById("envelopeAsset");
  const paper = document.getElementById("paperSheet");

  envelope.classList.add("envelope-open");

  setTimeout(() => {
    paper.classList.add("paper-show");
    typeLetter();
  }, 1200);
}

function typeLetter() {
  const text = `on your special day, i just want you to know how incredibly amazing you are.

you light up every room you walk into, and your kindness, laughter, chaos, and beautiful heart make everyone around you happier.

keep being your wonderful, cheeky self.

the world is lucky to have you in it.

happy birthday sadaf x sadu x sidra 💗`;

  const typedLetter = document.getElementById("typedLetter");
  typedLetter.textContent = "";

  let i = 0;

  const writing = setInterval(() => {
    typedLetter.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(writing);

setTimeout(() => {
    document.getElementById("partyBtn").classList.add("show");
    emojiExplosion(35);
}, 1200);
    }
  }, 55);
}
