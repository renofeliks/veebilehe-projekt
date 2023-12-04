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
    name: "Beautiful (2023 Edit)",
    artist: "A. G. Cook",
    image: "https://lh3.googleusercontent.com/pw/ADCreHc7n3ptSH_8sYLH4LgqpRzOqecENDmLh4qN1A1jCVfz5UcxRhP7-nPxhwKjald_LrJHGTRxgewiiuGTxsRhHaxhAX1jm3K0oI4_iZrGU3YM2wJoYJD4T0cFbDZaplQQdXg3L_IJ0m7FZNFMSg4vTdQC4DUkyZUKzhRTqAGnqxHGQT4mMyYbWRPFQvifwCbLA_Op8S7-XeVpBI3yyQSmzCqUlO0ffkZ2ciWfuQTtgs3PtuXk2YkyJx1AsBMuwqtA1ra_RbmSUjnra7YeQiv9xD5RSxqFNs7JgY0hN-h7iUXzJH40ekPDwBQh9GLyQ4apTlSUHPCoMAAWb4QP8Wultx7bLvYsj1Xak7wmc_9PLcMlbAfthV6xWkZw1iWzO-TZMvwGZyPDk3XxyNm6P3Eq11SrmodvTzbdUkALVZpEgMWnHsfpcOxKFEq6rMmJ_NUP-b3nouQsOFPpFEYyy6VpIJlUAaDMmiEsn18zM3VSMr8NCAJtwdcApntFKSrUj6WKToEYSKp0XT1Qk34am0Tt3exb57ZCV0ZAIobYukGA034JHDI68YxHb_Bu6aERhcFbmbCQ6UwBtBLS1_RlCj8XxiBOg9pgV1i3rvOtyY7WOIHmZApm5ISv70ifnJZ0G1_f7Rtrp0KZZX3hPygZMnXMyFRKMK5QWIKrIvhwp8SRAI-rqR4YJS3oUeU0WHV5BnhYtCX5-sPh9aVvWTUMgAPNpjKAYiBhX9kmT4dg17iUgm1LT1893GE5J2o6rHw37q5zawi59uJEFgvvyGUb8yTQvpEnV9NyvOQoWQgHizIjEBw-o3skbLQnFmjjJHa34_e7R3D4vyjeB603LPvgKLyr3dNlqAp2e533JSWkAOzlU4r9MMWXeE62SO0csUXP3IlitA=w700-h700-s-no-gm?authuser=0",
    path: "https://p.scdn.co/mp3-preview/b31a6562bc48dc158d5a734877d4fea02bee70d6"
  },
  {
    name: "BIPP",
    artist: "SOPHIE",
    image: "https://lh3.googleusercontent.com/pw/ADCreHdYTl6GBnneiXIvybsrFeMjidqXZlg1kQUYCnFl5gc83Uz6nqa9FgX-kA5h7qIDa3O3bz09mOKoCWtC63pJXj5rTJeZlJuJalKlbUx0YkvXchLGCT3MutIDpkobMmjSCFYU7tdV6g7kJtzWpVY2UFXaEBllhLV7xZrZupYGsPzd4x75ICcYKYHOJVcGSnVJNcVMXtlzkDcMoU-oyO8WSfqUL_z2Z5t1zRCYaF6GPkJZ_g05HTyplJ8rGil5c2hXEnWTAcOHkjcADJFI263Cy7iJF5Y9KEvGqiZy_tqvkr4XLn5WX4bPToZ1Cfi8nuDF2EtSlxKSp9bqHxYdivDZ8-sAWqZCkrF_y4RT3wAiQpirVJxJNd1H-VIAf0uaP24QkNLbZGS_aXGQvKc4nE8YwuElqzVAA5yKx33rKJn_9FZEQ6Jmh5ZAMUD7jLW50k5HpoJeCrWcId0xwY1sGg3N-ObKb-bFSIV8NW4yS4CU83yUbw-SY4ClNINbU6udSCpZBzL3jev9ZI9pmqmfimXtD2T2Rrvo9KE8XBOxq1tlXyxlZW9M6OX0_-AAU6lvMDREaaVBpnusr9HTJGiTX_mM92FQzFv7j0gZQ0C4yg5AQdBAbiQ7SISlX777eVsB9CdVa8ip5gdeb_NonYhv1fIQeIhGXwFTl5L9VVKfCS1RkqdolFYLgW303NriDb1pfX5FAIbAMqztycbo4JggmhlWwpvrDnav7bDKROSyT1cyN-UCO7tw7_J9D30yR5sWsgeR9aoUk3iqwbKhiwCHztyNYkIUFQu4JurbKc3XOXJSBt2K1UqxUSyPlTCXg9WybtbHzrwH24nuNCBklL-gah5Cu2YmbssWbU1mbgDrBNOc-3ahLw_KpmBA7j_bgkZfUlr-vw=w316-h316-s-no-gm?authuser=0",
    path: "https://p.scdn.co/mp3-preview/cbf3d9b36086121c10f7cd9d448fa74f7ca157fc"
  },
  {
    name: "movinglikeazombie (Remix)",
    artist: "ericdoa, umru, SEBii, angelus, kmoe, Lewis Grant, savepoint, Tony Velour, emotegi, d0llywood1",
    image: "https://lh3.googleusercontent.com/pw/ADCreHeJLnO8AQe-IO80Z2kjx4v5Lzi38VXhXtI_787fO_uVM7k4vPK5lH0WkAseihxjDeFTxlZ97pGHEzCOBdSLmsOW6wGSR5dQvjpnz0Dji-DzijcAzVeu2q7CIjOP__NxIYgcE0QYgLtZJhf8TnBbpuBoo8zJgR5mIgNtGDd_YD00pcvC1GkNHj2WzDPeVX-B8GUwNW8CxLu9yaUQvliEgqV9aBll4CeakTTmJd6ktQOexOSXJ2UzT5DUm11Cpa-AcxSiwlAcQGmVSSXNGjxfU4IbpwKUKwg6D7WGKnvhkdu9_kIXm2dU68NvMYswEiCCdFyRFnQcnfVx9lvhDkwnQ-0_MO16WVtdMz2ZuEugA5PgBgQcSKpfHK8OPnzPJ8MS_2LGtCKc-rTq4suj6lpCxuSJ3W1zbteWbc09suZgk2Mr6PMJUu6wH1ZxW3yAISBTi6CuGFuouXb--2Kmbj3keQtVvfLjlGpU2aZjVwPhcKcfn2FALsWIluQd35agSZaQVBUxEldyBcf72Yq3e4OubJgqgOkRzZrZro7BbjZI3j28nJH2OOxTEC3IuwCwqRjzJWgvvUMSJ5uDjb9_nh__afiMKF-wdo2KzSjJZwmiGqeIqRM4LeF2eFB_ImkTRxBxY6XcyObH2ISTOuQKizZdBXTNFrVK52I8N6Xm_4iK8WR_--ymjuIVM5vu0caIrX-by4UuG9yE1hGBXmMsWIp-9rGoChfKXAXlAdEXxjvW4iAtMF-y6hwASSfhWopAO1t_vs2Y5mdbDY_CactEqLe_ndSDhKlFQW75UbUNlxvhgNjVfcmBKu4ypXXrGb9Y67gcW7gnjUOyYXBoY49DdgjwXxliV53rIQxkkBR3yvBQmvTqdmP0D-LZtg6lzP7UEORJhA=w500-h500-s-no-gm?authuser=0",
    path: "https://p.scdn.co/mp3-preview/9903cefddb9335cf6dd2e9401fb9a24d074607dc",
  },
  {
    name: "X-RAY (Harlecore Re-Edit)",
    artist: "Danny L Harle, Tommy Cash",
    image: "https://lh3.googleusercontent.com/pw/ADCreHctUArt8Em1vF8RpSF5Ru9UiBdMxVhVgbu-eAdk0dgkpko8gM9-fVeCFZUq-DbzvnBF1eF8CYcKcNeqbfc7wZuvEDQD_IANeCTtR_Zp4F2jyhdantEQWJE7YOdgVXAvLt8HdwO8vuZws_rIyA2sjZzQSuSJtUGARU4Ef4OsKuaFm58FOEoAvWM1UICQ425xNrUU1Z3HztmhXW7Sk316ObEQ6KS18FXbdA7ztleAMd2N-sjwGT3KktVvT965IfEEO31gtbjQzlnVQwFjTlJNOuNVFKJauagSiye5e0gHyITyleGeJN35fFBqJ9sd9LXiLsoaoZ473RglT0qboVn7O_rsKMdsneztaiNv1LoLNqeD6JHoziLug7ojavca9zN5hCKi5sOChr429h_xveb9qhEfCP0GpXZcUlKVwqnWmrvBL6CXYMKLSthObEm6lxyt27fywtKFVeU1I__eUztNlS8NMvkTKJQ67RBykZJ1Ev_hh8KwvPLUflAPi95uZZRPDG-_tAkOwmLi74WOJieAtgDUXRbSHDJXcVmRNGzYdPZgOz6BHw-FT-my4Kg8bb28wx3uurwmg7zAoqIhWW-1RtMhsz-ouadBBSALW2DXMgH_wBLJHZzxycmvVtAtayt_OcZW6OEEImK__ZcrO9RdQDTg4qJknVKt-ZaZKX-V2MMmLZaukNBvkr2zQ-P0PoBfdyOAbBj3IYJ8dEg4aL1Bw0g7bwNQuEcyw4LZPpUP1W6C3cwbtHXqne9Cv7X-LVmR5O5nOJmjwFonpheYQOKC2FBFkIEOPnLHoSdoOkBJo3TSeMWcaEgFMDCRkLv7J4C9pdViY72pRGgUZAw5CsoaZ6oMi4Jl8LCk5TPCMMbjyJRPT9z9UQ6TuxIOH1jR3RWdHw=w1200-h1200-s-no-gm?authuser=0",
    path: "https://p.scdn.co/mp3-preview/adb60204d8a6201947db4bef990d24f28af1fbde",
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
