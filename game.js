const buttonsDiv = document.getElementById("buttons");
const feedback = document.getElementById("feedback");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");

/* ---------------------------
   Contrast groups (UI layer)
---------------------------- */

const contrastGroups = {
  a: [
    { telex: "a",  char: "a" },
    { telex: "aa", char: "â" },
    { telex: "aw", char: "ă" }
  ],
  o: [
    { telex: "o",  char: "o" },
    { telex: "oo", char: "ô" },
    { telex: "ow", char: "ơ" }
  ],
  u: [
    { telex: "u",  char: "u" },
    { telex: "uw", char: "ư" },
    { telex: "ow", char: "ơ" }
  ],
  e: [
    { telex: "e",  char: "e" },
    { telex: "ee", char: "ê" }
  ]
};

/* ---------------------------
   Audio files (manual for now)
---------------------------- */

const audioFiles = [
  "audio/ca.mp3",
  "audio/caa.mp3",
  "audio/caw.mp3",
  "audio/co.mp3",
  "audio/coo.mp3",
  "audio/cow.mp3",
  "audio/cu.mp3",
  "audio/cuw.mp3",
  "audio/ce.mp3",
  "audio/cee.mp3"
];

/* ---------------------------
   State
---------------------------- */

let currentAudioFile = null;
let currentCorrectTelex = null;

/* ---------------------------
   Helpers
---------------------------- */

function extractTelexVowel(filename) {
  const base = filename.replace(".mp3", "");
  const vowels = ["aa", "aw", "oo", "ow", "uw", "ee", "a", "o", "u", "e"];

  for (const v of vowels) {
    if (base.endsWith(v)) return v;
  }
  return null;
}

function findGroupsForVowel(telexVowel) {
  return Object.keys(contrastGroups).filter(group =>
    contrastGroups[group].some(v => v.telex === telexVowel)
  );
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ---------------------------
   UI
---------------------------- */

function renderButtons(group, correctTelex) {
  buttonsDiv.innerHTML = "";

  contrastGroups[group].forEach(v => {
    const btn = document.createElement("button");
    btn.textContent = v.char;

    btn.onclick = () => {
      feedback.textContent =
        v.telex === correctTelex ? "✅ Correct" : "❌ Try again";
    };

    buttonsDiv.appendChild(btn);
  });
}

/* ---------------------------
   Game flow
---------------------------- */

function loadQuestion() {
  feedback.textContent = "";

  currentAudioFile = randomItem(audioFiles);
  const filename = currentAudioFile.split("/").pop();

  currentCorrectTelex = extractTelexVowel(filename);
  const possibleGroups = findGroupsForVowel(currentCorrectTelex);
  const group = randomItem(possibleGroups);

  const audio = new Audio(currentAudioFile);
  audio.play();

  renderButtons(group, currentCorrectTelex);
}

/* ---------------------------
   Controls
---------------------------- */

playButton.onclick = () => {
  if (currentAudioFile) {
    new Audio(currentAudioFile).play();
  }
};

nextButton.onclick = loadQuestion;

/* ---------------------------
   Start
---------------------------- */

loadQuestion();
