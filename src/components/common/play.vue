<template>
    <div class="song-play">
        <div class="controller">
            <Icon type="md-play" size="25" class="icon" @click="onClickController('play')" />
            <Icon type="md-pause" size="25" class="icon" @click="onClickController('pause')" />
            <Icon type="md-square" size="25" class="icon" @click="onClickController('stop')" />
            <audio :src="source" ref="audio" @timeupdate="timeupdate"></audio>
        </div>
        <div class="full">
            <div class="pro" ref="pro"></div>
        </div>
        <span>{{duration|formatSongTime}}</span>
    </div>
</template>

<script>
    export default {
        name: "SongPlay",
        props: { source: { type: String, required: true } },
        data() {
            return { duration: 0 }
        },
        filters: {
            formatSongTime(val) {
                if (!val) {
                    return `0:00`;
                }
                let m = Math.floor(val / 60);
                let s = Math.floor(val % 60);
                s === 0 ? s = '00' : '';
                return `${m}:${s}`;
            }
        },
        methods: {
            onClickController(type) {
                let audio = this.$refs.audio;
                type === 'play' ? audio.play() : '';
                type === 'pause' ? audio.pause() : '';
                if (type === 'stop') {
                    audio.currentTime = 0;
                    audio.pause();
                }
            },
            timeupdate() {
                let audio = this.$refs.audio;
                if (!audio) { return }
                let current = audio.currentTime;
                let percent = (current / audio.duration) * 100;
                this.duration ? '' : this.duration = audio.duration;
                this.$refs.pro.style.transform = `translateX(${percent-100}%)`;
            },
        }
    }
</script>

<style scoped lang="scss">
    @import '@/assets/base.scss';
    .song-play {
        border: 1px solid $border;
        width: 80%;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        border-radius: 4px;
        margin: 0 auto;
        color: $sub;
        >.controller {
            margin-right: 20px;
            cursor: pointer;
            >.icon {
                &:hover {
                    color: $p;
                }
            }
        }
        >.full {
            height: 10px;
            width: 60%;
            border-radius: 1px;
            border: 1px solid $border;
            overflow: hidden;
            >.pro {
                width: 100%;
                height: 10px;
                background: lighten($p, 20%);
                border-radius: 1px;
                transition: transform .3s;
                transform: translateX(-100%);
            }
        }
        >span {
            margin-left: 5px;
        }
    }
</style>