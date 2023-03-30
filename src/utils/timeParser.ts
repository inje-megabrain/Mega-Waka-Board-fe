const timeParser = (seconds) => {
  seconds = seconds.toFixed(0);
  if (seconds < 60) {
    return "0시간 0분 " + seconds + "초";
  }
  if (seconds < 3600) {
    let min = Math.floor(seconds / 60);
    let sec = seconds - min * 60;
    return "0시간 " + min + "분 " + sec + "초";
  }
  let hours = Math.floor(seconds / 3600);
  let min = Math.floor((seconds - hours * 3600) / 60);
  let sec = seconds - hours * 3600 - min * 60;
  return hours + "시간 " + min + "분 " + sec + "초";
};

export default timeParser;
