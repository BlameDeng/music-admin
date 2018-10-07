function formatDate(val) {
    let obj;
    if (typeof val === 'object') { obj = val; } else { obj = new Date(val); }
    let year = obj.getFullYear();
    let month = formatNum(obj.getMonth() + 1);
    let date = formatNum(obj.getDate());
    let hours = formatNum(obj.getHours());
    let minutes = formatNum(obj.getMinutes());
    return `${year}-${month}-${date} ${hours}:${minutes}`;
}

function formatNum(num) {
    num = '' + num;
    if (num.length === 1) { num = '0' + num; }
    return num
}
export default formatDate