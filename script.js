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
  let songs = await getSongs();   
  console.log(songs);   
  let index = 0;
  let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
  for(const song of songs){ //we use for of loop because its a array
     songUL.innerHTML = songUL.innerHTML + `<li> ${index+1} ${song.replaceAll("%20"," ")} </li>` ;
     index++;
  }
  //   play the first song. 

  var audio = new Audio(songs[1]);   
  audio.play();        

  audio.addEventListener("loadeddata" , () => {

    let duration = audio.duration ;
    console.log(duration)  //the duration variable now holds the duration (in seconds) of the audio clip
  }); 
}
     
main();          
 
              
 
  