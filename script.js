console.log("Lets write javaScript");
let currentSong = new Audio(); //we make it a global variable
let songs;
function secondstoMinutesSeconds(seconds) {
  // this code i took from chatgpt for converting seconds to minutes seconds
  if (isNaN(seconds) || seconds < 0) {
    return "00 : 00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");

  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes} : ${formattedSeconds}`;
}


async function getSongs() {
  let a = await fetch("./songs/"); //   fecthing the songs from local server

  let response = await a.text();
  // console.log(response)
  let div = document.createElement("div");
  div.innerHTML = response; //creating demo div container to store songs cause before this its just a string not comes in html that we need to parse
  let as = div.getElementsByTagName("a");
  let songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    
    if (element.href.endsWith(".mp3")) {
      // Parse the HTML and extract links ending with .mp3
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs; // Return the array of songs
}

const playMusic = (track, pause = false) => {
  currentSong.src = "/songs/" + track;
  if (!pause) {
    currentSong.play();
    play.src = "pause.svg";
  }

  document.querySelector(".songinfo").innerHTML = track;
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {
  //get the list of all the songs
  songs = await getSongs();

  playMusic(songs[0], true);

  let index = 0;

  //show all the songs in the playlist
  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    //we use for of loop because its a array
    songUL.innerHTML =
      songUL.innerHTML +
      `<li> <img class="invert" src="music.svg" alt="">
                <div class="info">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>Lucky</div>
              </div>
             
              <div class="playnowSpanImg">
                <span class="playnow">Play Now</span>
                <img  src= "play.svg" alt= " " >
              </div> </li> `;
    index++;
  }

  // Attach an eventListener to each song
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playMusic(e.querySelector(".info").firstElementChild.innerHTML);
    });
  });

  //Attach an event listener to play , next and previos
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });

  // Listen for time update event
  currentSong.addEventListener("timeupdate", () => {
    console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songtime").innerHTML = `${secondstoMinutesSeconds(
      currentSong.currentTime
    )} / ${secondstoMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  //Add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = ((e.offsetX / e.target.getBoundingClientRect().width) * 100)  ;
    document.querySelector(".circle").style.left = percent + "%"; //getBoundingClientRect() tell where we are on the page
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  // //Add an event listener for hamburger
  // document.querySelector(".hamburger").addEventListener("click", () => {
  //   document.querySelector(".left").style.left = "0";
  // });

  // //Add an event listener for close

  // document.querySelector(".close").addEventListener("click", () => {
  //   console.log("Close clicked ✅");
  //   document.querySelector(".left").style.left = "-100%";
  // });

  // Add an event listener for hamburger
const hamburger = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".left .close");
const leftPanel = document.querySelector(".left");

hamburger.addEventListener("click", () => {
  leftPanel.style.left = "0";
  console.log("Sidebar opened ✅");
});

// Add an event listener for close
closeBtn.addEventListener("click", () => {
  console.log("Close clicked ✅");
  leftPanel.style.left = "-100%";
});

//Add event listener to previous  

const previous = document.getElementById("previous");

previous.addEventListener("click", () => {
  console.log("previous clicked ✅");

  let currentFile = currentSong.src.split("/songs/")[1];
  let index = songs.indexOf(currentFile);

  if (index > 0) {
    playMusic(songs[index - 1]);
  } else {
    console.log("No previous song");
  }
});


//Add event listener to  next 

const next = document.getElementById("next");

next.addEventListener("click", () => {
  console.log("next clicked ✅");

  let currentFile = currentSong.src.split("/songs/")[1];
  let index = songs.indexOf(currentFile);

  if (index + 1 < songs.length) {
    playMusic(songs[index + 1]);
  } else {
    console.log("No next song");
  }
});



}

main()
// document.addEventListener("DOMContentLoaded", main); //this ensures that first run all the script then runs main   
