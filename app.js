class BeatMaker {
  constructor() {
    this.clapSound = document.querySelector(".clap-sound");
    this.crashSound = document.querySelector(".crash-sound");
    this.hihatSound = document.querySelector(".hihat-sound");
    this.playBtn = document.querySelector(".play-btn");
    this.currentClap = "allSounds/clap-808.wav";
    this.currentCrash = "allSounds/crash-808.wav";
    this.currentHihat = "allSounds/hihat-808.wav";
    this.pads = document.querySelectorAll(".pad");
    this.index = 0;
    this.slider = document.querySelector(".slider");
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.mutes = document.querySelectorAll(".mute");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.c${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = "playTrack 0.5s  alternate ease-in-out 2";
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("clap")) {
          this.clapSound.currentTime = 0;
          this.clapSound.play();
        }
        if (bar.classList.contains("crash")) {
          this.crashSound.play();
          this.crashSound.currentTime = 0;
        }
        if (bar.classList.contains("hihat")) {
          this.hihatSound.play();
          this.hihatSound.currentTime = 0;
        }
      }
    });
    this.index++;
  }
  activePad() {
    this.classList.toggle("active");
  }
  start() {
    const time = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.playBtn.innerHTML = "STOP";
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, time);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.playBtn.innerHTML = "PLAY";
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "clap-select":
        this.clapSound.src = selectionValue;
        break;
      case "crash-select":
        this.crashSound.src = selectionValue;
        break;
      case "hithat-select":
        this.hithatSound.src = selectionValue;
        break;
    }
  }
  setMute(e) {
    const mutedSound = e.target.id;
    const mutedText = e.target.innerHTML;
    if (mutedText === "MUTED") {
      switch (mutedSound) {
        case "clap":
          this.clapSound.volume = 1;
          e.target.innerHTML = "MUTE";
          break;
        case "crash":
          this.crashSound.volume = 1;
          e.target.innerHTML = "MUTE";
          break;
        case "hihat":
          this.hihatSound.volume = 1;
          e.target.innerHTML = "MUTE";
          break;
      }
    } else {
      switch (mutedSound) {
        case "clap":
          this.clapSound.volume = 0;
          e.target.innerHTML = "MUTED";
          break;
        case "crash":
          this.crashSound.volume = 0;
          e.target.innerHTML = "MUTED";
          break;
        case "hihat":
          this.hihatSound.volume = 0;
          e.target.innerHTML = "MUTED";
          break;
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".demo");
    this.bpm = e.target.value;
    tempoText.innerHTML = e.target.value;
  }
  updateTempo() {
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    this.playBtn.innerHTML = "PLAY";
  }
}

let thisBeat = new BeatMaker();

thisBeat.pads.forEach((pad) => {
  pad.addEventListener("click", thisBeat.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

thisBeat.playBtn.addEventListener("click", () => {
  thisBeat.start();
});

thisBeat.mutes.forEach((muteBtn) => {
  muteBtn.addEventListener("click", function (e) {
    thisBeat.setMute(e);
  });
});

thisBeat.selects.forEach((mySelect) => {
  mySelect.addEventListener("change", function (e) {
    thisBeat.changeSound(e);
  });
});

thisBeat.slider.addEventListener("input", function (e) {
  thisBeat.changeTempo(e);
});

thisBeat.slider.addEventListener("change", function (e) {
  thisBeat.updateTempo(e);
});
