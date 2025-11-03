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
      songs.push(element.href);
    }
  }
  return songs; // Return the array of songs
}

async function main() {
  let songs = await getSongs();
  console.log(songs);

  //   play the first song

  var audio = new Audio(songs[0]);
  audio.play();
}

main();
