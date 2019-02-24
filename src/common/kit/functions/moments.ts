import moment from "moment";

moment.locale("zh-cn");

export function formatTime(at: number) {
  return moment(at).format("YYYY-MM-DD HH:mm");
}

export function formatDate(at: number) {
  return moment(at).format("YYYY-MM-DD");
}

export function fromNow(at: number) {
  const days = (Date.now() - at) / (1000 * 60 * 60 * 24 * 30);
  if (days < 31) return moment(at).fromNow();
  else return formatTime(at);
}
