const mixin = {
    filters: {
        formatSongSize(val) {
            if (!val) { return }
            return `${(val / 1000000).toFixed(2)} MB`;
        },
        formatImgSize(val) {
            return `${(val / 1000).toFixed(2)} KB`;
        }
    },
    methods: {
        formatSongName(name) {
            let array = name.match(/^(.*)\.[^\.]+$/);
            return array[1];
        }
    }
}
export default mixin