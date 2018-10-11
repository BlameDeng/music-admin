<template>
    <div class="song-play">
        <p class="songname" :title="name">{{name}}</p>
        <div class="controller">
            <Icon type="md-play" size="20" class="icon play" :class="{ready}" @click="onClickController('play')" />
            <Icon type="md-pause" size="20" class="icon" @click="onClickController('pause')" />
            <Icon type="md-square" size="20" class="icon" @click="onClickController('stop')" />
        </div>
        <span class="current">{{current|formatSongTime}}</span>
        <div class="full">
            <div class="pro" ref="pro"></div>
        </div>
        <span class="duration">{{duration|formatSongTime}}</span>
         <audio @canplay="canplay" :src="source" ref="audio" @timeupdate="timeupdate" @loadstart="loadstart"></audio>
    </div>
</template>

<script>
    export default {
        name: "SongPlay",
        props: {
            source: { type: String, required: true },
            name: { type: String, default: '' }
        },
        data() {
            return {
                duration: 0,
                current: 0,
                ready: false,
                audio: null
            }
        },
        filters: {
            formatSongTime(val) {
                if (!val) {
                    return `00:00`;
                }
                let m = Math.floor(val / 60);
                m < 10 ? m = `0${m}` : '';
                let s = Math.floor(val % 60);
                s < 10 ? s = `0${s}` : '';
                return `${m}:${s}`;
            }
        },
        mounted() {
            this.audio = this.$refs.audio;
        },
        methods: {
            onClickController(type) {
                if (type === 'play') {
                    this.ready ? this.audio.play() : '';
                }
                type === 'pause' ? this.audio.pause() : '';
                if (type === 'stop') {
                    this.audio.currentTime = 0;
                    this.audio.pause();
                }
            },
            play() {
                this.audio.addEventListener('canplay', this.startToPlay);
            },
            startToPlay() {
                this.audio.play();
                this.audio.removeEventListener('canplay', this.startToPlay);
            },
            loadstart() {
                this.ready = false;
            },
            canplay() {
                this.ready = true;
                this.duration = this.audio.duration;
                this.$refs.pro.style.transform = `translateX(-100%)`;
            },
            timeupdate() {
                if (!this.audio) { return }
                this.current = this.audio.currentTime;
                let percent = (this.current / this.audio.duration) * 100;
                this.$refs.pro.style.transform = `translateX(${percent-100}%)`;
            },
        },
        beforeDestroy() {
            this.audio.removeEventListener('canplay', this.startToPlay);
            this.audio = null;
        },
    }
</script>

<style scoped lang="scss">
    @import '@/assets/base.scss';
    .song-play {
        border: 1px solid $border;
        width: 80%;
        height: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        user-select: none;
        border-radius: 4px;
        margin: 0 auto;
        color: $sub;
        >.songname {
            font-size: 12px;
            margin-left: 20px;
            width: 60px;
            margin-right: 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        >.controller {
            margin-right: 10px;
            cursor: pointer;
            color: $lp;
            >.icon {
                &.play {
                    color: $disabled;
                    &.ready {
                        color: $lp;
                    }
                }
            }
        }
        >.current {
            margin-right: 5px;
        }
        >.full {
            height: 10px;
            width: 40%;
            border-radius: 1px;
            outline: 1px solid $border;
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
        >.duration {
            margin-left: 5px;
        }
    }
</style>