let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

function formatTime(ms){
  let totalMs = Math.floor(ms);
  let minutes = Math.floor(totalMs / 60000);
  let seconds = Math.floor((totalMs % 60000) / 1000);
  let centis = Math.floor((totalMs % 1000) / 10);
  
  return `${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}:${String(centis).padStart(2,'0')}`;
}

function updateDisplay(){
  display.textContent = formatTime(elapsedTime);
}

function start(){
  if(!isRunning){
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(()=>{
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
    resetBtn.disabled = false;
  }
}

function pause(){
  if(isRunning){
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}

function reset(){
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  lapCount = 0;
  updateDisplay();
  lapList.innerHTML = '';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
  resetBtn.disabled = true;
}

function lap(){
  if(isRunning){
    lapCount++;
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `<span>Lap ${lapCount}</span><span>${formatTime(elapsedTime)}</span>`;
    lapList.prepend(lapItem);
  }
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Keyboard shortcuts
document.addEventListener('keydown', e=>{
  if(e.code === 'Space'){e.preventDefault(); isRunning ? pause() : start()}
  if(e.code === 'KeyL'){lap()}
  if(e.code === 'KeyR'){reset()}
});