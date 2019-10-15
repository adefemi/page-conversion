let is_playing = false;
let setupControls;

const toHHMMSS = secs => {
  let sec_num = parseInt(secs, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor(sec_num / 60) % 60;
  let seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map(v => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

class SoundSystem {
  constructor(source, volume, loop) {
    this.source = source || "../assets/test_music.mp3";
    this.volume = volume || 1;
    this.loop = loop || false;
    this.finish = false;
    this.setupAudio();
  }

  setupAudio = () => {
    let me = this;
    this.song = document.createElement("audio");
    this.song.style.display = "none";
    this.song.src = this.source;
    this.song.volume = this.volume;
    this.song.autoplay = false;
    this.song.onended = function() {
      me.song.remove(); //Remove when played.
    };
    document.body.appendChild(this.song);
  };

  play = () => {
    this.song.play();
  };

  currentTime = () => {
    return this.song.currentTime;
  };

  duration = () => {
    return this.song.duration;
  };

  stop = () => {
    this.song.stop();
  };

  pause = () => {
    this.song.pause();
  };
}

const percentCovered = (current, total) => {
  return parseInt((100 * current) / total);
};

window.onload = () => {
  let playerController = document.getElementById("isPlayingControl");
  let isPlayingControlInner = document.getElementById("isPlayingControlInner");
  let lineMeter = document.getElementById("line-meter");
  let lineMeter2 = document.getElementById("line-meter2");
  let isPlayingCurrent = document.getElementById("isPlayingCurrent");
  let isPlayingDuration = document.getElementById("isPlayingDuration");
  let isPlayingCurrent2 = document.getElementById("isPlayingCurrent2");
  let isPlayingDuration2 = document.getElementById("isPlayingDuration2");

  let isPlayingContainer = document.getElementById("isPlayingContainer");
  let soundControl = new SoundSystem();

  isPlayingCurrent.innerHTML = toHHMMSS(soundControl.currentTime()).toString();
  isPlayingDuration.innerHTML = "0:00";
  isPlayingCurrent2.innerHTML = toHHMMSS(soundControl.currentTime()).toString();
  isPlayingDuration2.innerHTML = "0:00";

  playerController.addEventListener("click", () => {
    if (is_playing) {
      soundControl.pause();
      is_playing = false;
      isPlayingControlInner.innerHTML = "play_arrow";
      isPlayingContainer.classList.remove("active-playing");
    } else {
      soundControl.play();
      is_playing = true;
      isPlayingControlInner.innerHTML = "pause";
      setupControls = setInterval(() => {
        isPlayingCurrent.innerHTML = toHHMMSS(soundControl.currentTime());
        isPlayingDuration.innerHTML = toHHMMSS(soundControl.duration());
        isPlayingCurrent2.innerHTML = toHHMMSS(soundControl.currentTime());
        isPlayingDuration2.innerHTML = toHHMMSS(soundControl.duration());
        lineMeter.style.width = `${percentCovered(
          soundControl.currentTime(),
          soundControl.duration()
        )}%`;
        lineMeter2.style.width = `${percentCovered(
          soundControl.currentTime(),
          soundControl.duration()
        )}%`;
      }, 1000);
      isPlayingContainer.classList.add("active-playing");
    }
  });
};
