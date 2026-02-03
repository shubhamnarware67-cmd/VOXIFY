const synth = window.speechSynthesis;

const textArea = document.getElementById("text");
const speakBtn = document.getElementById("speak");
const stopBtn = document.getElementById("stop");
const downloadBtn = document.getElementById("download");
const voiceSelect = document.getElementById("voiceSelect");
const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");
const themeToggle = document.getElementById("themeToggle");

let voices = [];

function loadVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = "";

  if (voices.length === 0) {
    const option = document.createElement("option");
    option.textContent = "No voices available";
    option.disabled = true;
    voiceSelect.appendChild(option);
    return;
  }

  voices.forEach((voice, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})${voice.default ? " [Default]" : ""}`;
    voiceSelect.appendChild(option);
  });
}

synth.onvoiceschanged = loadVoices;
window.onload = loadVoices;

function speakText() {
  const text = textArea.value.trim();
  if (!text) {
    alert("⚠️ Please enter some text to speak!");
    return;
  }

  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voices[voiceSelect.value];
  utterance.rate = rate.value;
  utterance.pitch = pitch.value;

  synth.speak(utterance);
}

function stopSpeech() {
  synth.cancel();
}

/* Theme Toggle */
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
};

/* Download Notice */
downloadBtn.onclick = () => {
  alert(
    "⚠️ Browser-based speech synthesis does not support direct MP3 download.\n\n💡 Tip: You can record system audio using a screen/audio recorder or use advanced server-side APIs (like Google Cloud TTS or ElevenLabs) for downloadable output."
  );
};

speakBtn.onclick = speakText;
stopBtn.onclick = stopSpeech;
