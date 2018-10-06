const mixin = {
    filters: {
        formatSongSize(val) {
            return `${(val / 1000000).toFixed(2)} MB`;
        },
        formatImgSize(val) {
            return `${(val / 1000).toFixed(2)} KB`;
        }
    }
}
export default mixin