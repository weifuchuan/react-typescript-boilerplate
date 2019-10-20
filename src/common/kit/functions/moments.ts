import moment from 'moment';

moment.locale('zh-cn');

export function formatTime(at: number, format = 'YYYY-MM-DD HH:mm') {
	return moment(at).format(format);
}

export function formatDate(at: number, format = 'YYYY-MM-DD') {
	return moment(at).format(format);
}

export function fromNow(at: number) {
	const days = (Date.now() - at) / (1000 * 60 * 60 * 24 * 30);
	if (days < 31) return moment(at).fromNow();
	else return formatTime(at);
}
