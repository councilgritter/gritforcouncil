/**********************
 * CONFIG
 **********************/

// For now, hard-code one file.
// Later we can auto-scan or randomise.
const AUDIO_FILE = "audio/caar.mp3";

/**********************
 * TELEX LOGIC
 **********************/

const VOWEL_MAP = {
  "aa": "â",
  "aw": "ă",
  "ee": "ê",
  "oo": "ô",
  "ow": "ơ",
  "uw": "ư"
};

const TONE_MARKS = {
  "s": "́", // sắc
  "f": "̀", // huyền
  "r": "̉", // hỏi
  "x": "̃", // ngã
  "j": "̣"  // nặng
};

// Decode a Telex syllable (e.g. "caar" -> "cẩ")
function telexToUnicode(telex) {
  let tone = "";
  const lastChar = telex.slice(-1);

  if (TONE_MARKS[lastChar]) {
    tone = TONE_MARKS[lastChar];
    telex = telex.slice(0, -1);
  }

  let result = telex;

  for (const key of Object.keys(VOWEL_MAP)) {
    if (result.includes(key)) {
      result = result.replace(key, VOWEL_MAP[key]);
      break;
    }
  }

  if (tone) {
    // apply tone to the vowel
    result = result.replace(
      /[aâăeêiioôơuưy]/,
      match => match + tone
    );
  }

  return result.normalize("NFC");
}

/**********************
 * GAME LOGIC
 **********************/

const playButton = document.getElementById("play");
const buttonsDiv = document.getElementById("buttons");
const feedbackDiv = document.getElementById("feedback");

const audio = new Audio(AUDIO_FILE);

// extract "caar" from "audio/caar.mp3"
const baseName = AUDIO_FILE.split("/").pop().replace(".mp3", "");

// base without tone letter (e.g. "caa")
const stem = baseName.replace(/[sfrxj]$/, "");

// all tone variants
const TONES = ["", "s", "f", "r", "x", "j"];

// correct answer
const correct = telexToUnicode(baseName);

// play sound
playButton.onclick = () => {
  audio.currentTime = 0;
  audio.play();
};

// generate buttons
TONES.forEach(tone => {
  const telexForm = stem + tone;
  const label = telexToUnicode(telexForm);

  const btn = document.createElement("button");
  btn.textContent = label;

  btn.onclick = () => {
    if (label === correct) {
      feedbackDiv.textContent = "✅ Correct";
      feedbackDiv.style.color = "green";
    } else {
      feedbackDiv.textContent = "❌ Try again";
      feedbackDiv.style.color = "red";
    }
  };

  buttonsDiv.appendChild(btn);
});

