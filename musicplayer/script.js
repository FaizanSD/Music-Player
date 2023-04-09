let songIndex = 1;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let isPlay = false;
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById("masterSongName");
console.log(songItems);

let songs = [
    {songName: "Hum Baat Nhi karte", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Channa Mereya", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Ae Dil Hai Mushkil", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Kun Faya Kun", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Apna Bana Le", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Mai Hu Itte Ghussae Wala", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Eid Mubarak Sanjay", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Chalte Raho Morning To Night", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tum Hi Ho", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
]


let audioElement = new Audio(songs[songIndex].filePath);

// audioElement.play()

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
}) 


// Handle Play/Pause Click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        isPlay = true;
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        isPlay = false;
        gif.style.opacity = 0;
    }
} )


audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value*audioElement.duration / 100;
})


const makeAllPlay = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-pause-circle")
        element.classList.add("fa-play-circle");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})


// Handling Backward/Forward Play Button ----------------------->
let next = document.getElementById('next');
let prev = document.getElementById('prev');

next.addEventListener('click', () => {
    if (songIndex >= 8) {
        songIndex = 0;
    } 
    else {
        songIndex++;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}) 

prev.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9;
    } 
    else {
        songIndex--;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    myProgressBar.value = 0;
}) 