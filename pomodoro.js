let workTime = parseInt(document.getElementById('work-time').value) * 60;
let breakTime = parseInt(document.getElementById('break-time').value) * 60;
let timerId;
let timeLeft = workTime;
let isRunning = false;
let pomodoroCounter = 0;

const timer = document.getElementById('timer');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const pomodoroCount = document.getElementById('pomodoro-count');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  isRunning = true;
  timerId = setInterval(() => {
    timeLeft--;
    timer.innerText = formatTime(timeLeft);
    if (timeLeft === 0) {
      pomodoroCounter++;
      pomodoroCount.innerText = pomodoroCounter.toString();
      clearInterval(timerId);
      if (timer.innerText === formatTime(workTime)) {
        timeLeft = breakTime;
        timer.innerText = formatTime(breakTime);
      } else {
        timeLeft = workTime;
        timer.innerText = formatTime(workTime);
      }
      timer.classList.toggle('break');
      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
  isRunning = false;
}

function updateTimer() {
  if (!isRunning) {
    workTime = parseInt(workTimeInput.value) * 60;
    breakTime = parseInt(breakTimeInput.value) * 60;
    timeLeft = workTime;
    timer.innerText = formatTime(workTime);
    breakCounter = 0;
    breakCount.innerText = breakCounter.toString();
    timer.classList.remove('break');
  }
}

startBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
  }
});

stopBtn.addEventListener('click', () => {
  if (isRunning) {
    stopTimer();
  }
});

workTimeInput.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    updateTimer();
    if (isRunning) {
      stopTimer();
      startTimer();
    }
  }
});

breakTimeInput.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    updateTimer();
    if (isRunning) {
      stopTimer();
      startTimer();
    }
  }
});
