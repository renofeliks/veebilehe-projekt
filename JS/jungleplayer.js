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
    name: "Atlantis (I Need You)",
    artist: "LTJ Bukem",
    image: "https://lh3.googleusercontent.com/eG_sO4_EuaQDDYTVR-8v4YJ9PFMntj_-NycRI3czr6IK-sMJJAobdReiS_tvgmlZLRBx8EXy_qD1UCzL=w544-h544-l90-rj",
    path: "https://p.scdn.co/mp3-preview/63e6952172458e8db503cd11f3187d1aeeda61dc?cid=ad5ebaf37746484ca61e02068fd2988e"
  },
  {
    name: "Super Sharp Shooter",
    artist: "The Ganja Gru",
    image: "https://lh3.googleusercontent.com/sASQ5hRmuQgPDRquilcTXMc45_LpnAjvNscc9SulhuYLIPMhvN6LvWZjbqz38wncjAv-i5SjH6r0Z_eH=w544-h544-l90-rj",
    path: "https://p.scdn.co/mp3-preview/bc1c0444baacc4729669b59b4b4b572c9637c2be?cid=ad5ebaf37746484ca61e02068fd2988e"
  },
  {
    name: "Soundsystem Culture",
    artist: "DJ Hybrid",
    image: "https://lh3.googleusercontent.com/rl7eKgiPdAA6cauxKPULS2sNG79J6xlzwyiEHyImQFKiHB1h8FuZ5GbPtd6HyIHe1Qi_Xq6rgJnNn2LW=w544-h544-l90-rj",
    path: "https://p.scdn.co/mp3-preview/87da043188d7d7594bb8411a39ea5a08f9795257?cid=a58345ad6cf4414987774f6a1528198d",
  },
  {
    name: "The HitMan - Dreamteam Remix",
    artist: "Marvellous Cain",
    image: "https://lh3.googleusercontent.com/coUQ9Qioge_YuUKBLbRHfFKeQHZdUoaKG5AiAFVD0b6lT60IgxJLowu8gdfD8i7REZ5Y3MAAjt0RRfM=w544-h544-l90-rj",
    path: "https://p.scdn.co/mp3-preview/e12bd3d51a946d0306c1b016f4ba3c022acf49a5?cid=a58345ad6cf4414987774f6a1528198d",
  },
  {
    name: "Soundboy Don't Push Your Luck",
    artist: "Sully",
    image: "https://i.scdn.co/image/ab67616d0000b2732c0217ff9f8605b7d7b3a162",
    path: "https://p.scdn.co/mp3-preview/8d7e4d00695ee5af7e7be8caaa07a8999a184654?cid=3adc8ef4c01046648691ceace3205be1",
  },
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
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

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
