var deadline = new Date ('2015', '10', '08', '11', '00');

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.max(Math.floor((t / 1000) % 60), 0);
  var minutes = Math.max(Math.floor((t / 1000 / 60) % 60), 0);
  var hours = Math.max(Math.floor((t / (1000 * 60 * 60)) % 24), 0);
  var days = Math.max(Math.floor((t / (1000 * 60 * 60 * 24))), 0);
  if (seconds < 10) seconds = '0' + seconds;
  if (minutes < 10) minutes = '0' + minutes;
  if (hours < 10) hours = '0' + hours;
  if (days < 10) days = '0' + days;
  if (days == 0) return hours + ':' + minutes + ':' + seconds;
  return days + ':' + hours + ':' + minutes + ':' + seconds;
}

var clock = document.getElementById('clockdiv');

updateTime();

function updateTime() {
  clock.innerHTML = getTimeRemaining(deadline);
  var t = Date.parse(deadline) - Date.parse(new Date());
  if (t <= -1000) window.location.reload();
}
setInterval(updateTime, 500);