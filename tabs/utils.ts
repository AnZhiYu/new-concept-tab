export const  formatNumber = (num) => {
    if (num < 10) {
      return "00" + num;
    } else if (num < 100) {
      return "0" + num;
    } else {
      return num.toString();
    }
}
  

export const formatTime = (timestamp) => {
  const date = new Date(timestamp); // 将时间戳转换为毫秒
  const hours = date.getUTCHours().toString().padStart(2, '0'); // 小时
  const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // 分钟
  const seconds = date.getUTCSeconds().toString().padStart(2, '0'); // 秒钟
  return `${hours}:${minutes}:${seconds}`;
}