import getBlobDuration from 'get-blob-duration';

const { doc } = require('prettier');

const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayButton');
const volumeBtn = document.getElementById('jsVolumeBtn');
const fullScrnBtn = document.getElementById('jsFullScreen');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volumeRange = document.getElementById('jsVolume');

const registerView = () => {
  /* how to get URL from users address */
  const videoId = window.location.href.split('/videos/')[1];
  fetch(`/api/${videoId}/view`, {
    method: 'POST',
  });
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeRange.value = videoPlayer.volume;

    if (volumeRange.value > 0.7) volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    else if (volumeRange.value > 0.3) volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    else if (volumeRange.value > 0) volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    else volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
  }
}

function outFullScreen() {
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScrnBtn.addEventListener('click', goFullScreen);
  document.webkitExitFullscreen()();
}

function goFullScreen() {
  /* there is no function to check if screen is full or not */
  /* So i will just handle my eventListener to do it */
  videoContainer.requestFullscreen();
  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScrnBtn.removeEventListener('click', goFullScreen);
  fullScrnBtn.addEventListener('click', outFullScreen);
}

const formatDate = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

async function setTotalTime() {
  let duration;
  if (!isFinite(videoPlayer.duration)) {
    const blob = await fetch(videoPlayer.src).then((response) => response.blob());
    duration = await getBlobDuration(blob);
  } else {
    duration = videoPlayer.duration;
  }
  const totalTimeString = formatDate(duration);
  totalTime.innerHTML = totalTimeString;
}

function setCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleVolumeDrag(event) {
  //console.log(event.target.value);
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;

  if (videoPlayer.muted) {
    videoPlayer.muted = false;
  }

  if (value > 0.7) volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  else if (value > 0.3) volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  else if (value > 0) volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  else volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
}

function init() {
  videoPlayer.volume = 0.5;

  playBtn.addEventListener('click', handlePlayClick);
  volumeBtn.addEventListener('click', handleVolumeClick);
  fullScrnBtn.addEventListener('click', goFullScreen);
  videoPlayer.addEventListener('loadedmetadata', setTotalTime);
  videoPlayer.addEventListener('timeupdate', setCurrentTime);
  videoPlayer.addEventListener('ended', handleEnded);
  volumeRange.addEventListener('input', handleVolumeDrag);
}

if (videoContainer) {
  init();
}
