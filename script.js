console.log("Lets write javaScript");

async function getSongs() {
  let a = await fetch("http://127.0.0.1:3000/songs/"); //   fecthing the songs from local server

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

async function main() {
  //get the list of all the songs
  let songs = await getSongs();

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
                <img src= "play.svg" alt= " " >
              </div> </li> `;
    index++;
  }
}

main();
