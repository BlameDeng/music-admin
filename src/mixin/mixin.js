const mixin = {
    filters: {
        formatSongSize(val) {
            if (!val) { return }
            return `${(val / 1000000).toFixed(2)} MB`;
        },
        formatImgSize(val) {
            return `${(val / 1000).toFixed(2)} KB`;
        },
        formatSongTime(val) {
            if (!val) {
                return `0:00`;
            }
            let m = Math.floor(val / 60);
            let s = Math.floor(val % 60);
            s===0?s='00':'';
            return `${m}:${s}`;
        }
    },
    methods: {
        formatSongName(name) {
            let array = name.match(/^(.*)\.[^\.]+$/);
            return array[1];
        },
        formatDate(val) {
            let obj;
            if (typeof val === 'object') { obj = val; } else { obj = new Date(val); }
            let year = obj.getFullYear();
            let month = this.formatNum(obj.getMonth() + 1);
            let date = this.formatNum(obj.getDate());
            let hours = this.formatNum(obj.getHours());
            let minutes = this.formatNum(obj.getMinutes());
            return `${year}-${month}-${date} ${hours}:${minutes}`;
        },
        formatNum(num) {
            num = '' + num;
            if (num.length === 1) { num = '0' + num; }
            return num;
        }
    }
}
export default mixin