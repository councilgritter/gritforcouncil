console.log("game.js loaded");
const sounds = [
  {
    file: "audio/caar.mp3",
    answers: ["cả", "cã", "cạ", "ca", "cá"]
  }
];

const buttonsDiv = document.getElementById("buttons");
const feedback = document.getElementById("feedback");
const playButton = document.getElementById("play");

function renderButtons(options) {
  buttonsDiv.innerHTML = "";
  options.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.onclick = () => {
      feedback.textContent = "Clicked: " + letter;
    };
    buttonsDiv.appendChild(btn);
  });
}

playButton.onclick = () => {
  const current = sounds[0];
  const audio = new Audio(current.file);
  audio.play().catch(() => {
    feedback.textContent = "Click play to enable audio";
  });
  renderButtons(current.answers);
};
