let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Desire (with Sam Smith)",
    artist: "Calvin Harris",
    image: "https://upload.wikimedia.org/wikipedia/en/3/3f/Calvin_Harris_and_Sam_Smith_-_Desire.png",
    path: "https://p.scdn.co/mp3-preview/52bafd70c4f8a80a3a134e5b897ea5fc90774f79?cid=ad5ebaf37746484ca61e02068fd2988e"
  },
  {
    name: "I'm Good (Blue)",
    artist: "David Guetta",
    image: "https://upload.wikimedia.org/wikipedia/en/8/87/David_Guetta_and_Bebe_Rexha_-_I%27m_Good_%28Blue%29.png",
    path: "https://p.scdn.co/mp3-preview/08e77cc86cde4969b8411674a0f4eb4688a9f6a9?cid=ad5ebaf37746484ca61e02068fd2988e"
  },
  {
    name: "Yeah! (feat. Lil Jon & Ludacris)",
    artist: "Usher",
    image: "https://cdns-images.dzcdn.net/images/cover/b89c20012cccb051c8a4e04d98386f95/350x350.jpg",
    path: "https://p.scdn.co/mp3-preview/775632d9867341c779b7238f1718f9abd1773061?cid=3adc8ef4c01046648691ceace3205be1",
  },
  {
    name: "Low (feat. T-Pain)",
    artist: "Flo Rida",
    image: "https://upload.wikimedia.org/wikipedia/en/3/36/Low_fr_tp.JPG",
    path: "https://p.scdn.co/mp3-preview/f978a18a30f5623a02e9d1a61e8dadb2afeffdd4?cid=ad5ebaf37746484ca61e02068fd2988e",
  },
  {
    name: "Flowers",
    artist: "Miley Cyrus",
    image: "https://images.genius.com/ae53e01e34645923dae2e3bb87aadd48.1000x1000x1.png",
    path: "https://p.scdn.co/mp3-preview/5184d19d1b7fcc3e7c067e38af45a7cc80851440?cid=9c1e714b207b46429963ee8fa8bf0044",
  },
  {
    name: "Centuries",
    artist: "Fall Out Boy",
    image: "https://i.scdn.co/image/ab67616d0000b2733cf1c1dbcfa3f1ab7282719b",
    path: "https://p.scdn.co/mp3-preview/cf7c3a587d5ca3a6858dd8229979a70ae0b22edf?cid=3adc8ef4c01046648691ceace3205be1",
  },
  {
    name: "As It Was",
    artist: "Harry Styles",
    image: "https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14",
    path: "https://p.scdn.co/mp3-preview/f0c2adc40766cd8c1ec3f2bc6e1cc293a77ba684?cid=3adc8ef4c01046648691ceace3205be1",
  }
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Allikas: https://github.com/sayantanm19/js-music-player?fbclid=IwAR2NIvjMSV-u6YBuuinke7y7-nVOomEV2KPkh8mKkvgJ_81nRjZhQ3Bqs7M
