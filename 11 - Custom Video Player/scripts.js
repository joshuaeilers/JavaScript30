const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fsButton = player.querySelector('[data-fs]')

function togglePlay(e) {
  video[video.paused ? 'play' : 'pause']();
}

function updateButton(e) {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

function skip(e) {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e) {
  video[this.name] = this.value;
}

function handleProgress(e) {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullscreen(e) {
  console.dir(e);
  console.dir(video);
  console.dir(player);
  video.webkitEnterFullscreen();
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(btn => btn.addEventListener('change', handleRangeUpdate));
ranges.forEach(btn => btn.addEventListener('mousemove', handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mouseDown && scrub(e));
progress.addEventListener('mousedown', e => mouseDown = true);
progress.addEventListener('mouseup', e => mouseDown = false);

fsButton.addEventListener('click', toggleFullscreen);
