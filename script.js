console.log("Lets write javaScript");

let currentSong = new Audio();
let songs;

// Convert seconds → mm:ss
function secondstoMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) return "00 : 00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return (
    String(minutes).padStart(2, "0") +
    " : " +
    String(remainingSeconds).padStart(2, "0")
  );
}

// Load songs from songs.json
async function getSongs() {
  let response = await fetch("songs.json");   // here response is not real data its like envelope real data is inside envelope(response.json())
  let data = await response.json(); // extracting real data from envelope
  return data.songs;// songs is key inside songs.json
}

// Play music
const playMusic = (track, pause = false) => {
  currentSong.src = "./" + track; // FIXED PATH

  if (!pause) {
    currentSong.play();
    play.src = "pause.svg";
  }

  document.querySelector(".songinfo").innerHTML = track;
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {
  songs = await getSongs();

  // Load first song but don't play
  playMusic(songs[0], true);

  // Render playlist
  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];

  for (const song of songs) {
    songUL.innerHTML += `
      <li>
        <img class="invert" src="music.svg" alt="">
        <div class="info">
          <div>${song}</div>
          <div>Lucky</div>
        </div>
        <div class="playnowSpanImg">
          <span class="playnow">Play Now</span>
          <img src="play.svg" alt="">
        </div>
      </li>
    `;
  }

  // Play song on click
  Array.from(songUL.getElementsByTagName("li")).forEach((item) => {
    item.addEventListener("click", () => {
      let track = item.querySelector(".info").firstElementChild.innerHTML;
      playMusic(track);
    });
  });

  // Play / pause button
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });

  // Update time + seekbar
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${secondstoMinutesSeconds(
      currentSong.currentTime
    )} / ${secondstoMinutesSeconds(currentSong.duration)}`;

    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // Seekbar click
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  // Sidebar open
  const hamburger = document.querySelector(".hamburger");
  const closeBtn = document.querySelector(".left .close");
  const leftPanel = document.querySelector(".left");

  hamburger.addEventListener("click", () => (leftPanel.style.left = "0"));
  closeBtn.addEventListener("click", () => (leftPanel.style.left = "-100%"));

  // Previous button
  const previous = document.getElementById("previous");
  previous.addEventListener("click", () => {
    let currentFile = currentSong.src.split("/").pop(); // FIXED
    let index = songs.indexOf(currentFile);

    if (index > 0) playMusic(songs[index - 1]);
  });

  // Next button
  const next = document.getElementById("next");
  next.addEventListener("click", () => {
    let currentFile = currentSong.src.split("/").pop(); // FIXED
    let index = songs.indexOf(currentFile);

    if (index + 1 < songs.length) playMusic(songs[index + 1]);
  });
}

main();
