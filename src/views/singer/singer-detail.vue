<template>
    <div class="singer-detail">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <div class="singer-info">
            <div class="avatar">
                <img :src="singer.avatar" alt="avatar">
            </div>
            <div class="info">
                <div class="names">
                    <p><span>歌手</span><span>{{singer.name}}</span></p>
                    <span>{{singer.othernames}}</span>
                </div>
                <div class="counts">
                    <div class="single">
                        <Icon type="ios-musical-notes" size="16" /><span style="margin-left:5px;">单曲数：121</span>
                    </div>
                    <div class="album">
                        <Icon type="ios-disc-outline" size="16" /><span style="margin-left:5px;">专辑数：120</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="singer-detail">
            <div class="nav">
                <Tabs value="name1" style="border:none;">
                    <TabPane label="单曲" name="name1">
                        <div class="song-wrapper" style="padding:0 20px 20px 20px;">
                            <div class="song" v-for="(song,index) in songs" :key="song.id">
                                <span class="index">{{index|num}}</span><span class="songname">{{song.name}}</span><span class="play">
                                    <Icon type="md-play" size="8" class="icon" style="cursor:pointer;" />
                                </span>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="专辑" name="name2">
                        <p style="padding-left:20px;text-indent:2em;">标签二的内容</p>
                    </TabPane>
                    <TabPane label="歌手详情" name="name3">
                        <p style="padding-left:20px;text-indent:2em;">{{singer.summary}}</p>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: 'SingerDetail',
        components: {},
        data() {
            return {
                singer: null,
            }
        },
        computed: {
            ...mapState({
                allSongs: state => state.song.allSongs,
            }),
            songs() {
                return this.allSongs.filter(song => song.singer === this.singer.name);
            }
        },
        filters: {
            num(val) {
                let str = ''
                val + 1 <= 9 ? str = `0${val+1}` : str = `${val+1}`;
                return str;
            }
        },
        created() {
            this.$route.query && this.$route.query.singer ? this.singer = this.$route.query.singer : '';
        },
        methods: {
            onBack() {
                this.$router.go(-1);
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .singer-detail {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        position: relative;
        >.icon {
            position: absolute;
            top: 5px;
            right: 5px;
            color: lighten($sub, 20%);
            cursor: pointer;
            &:hover {
                color: $p;
            }
        }
        >.singer-info {
            width: 100%;
            height: 40%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding-left: 20px;
            >.avatar {
                width: 180px;
                height: 180px;
                margin-right: 20px;
                >img {
                    width: 180px;
                    height: 180px;
                    vertical-align: top;
                    border-radius: 4px;
                }
            }
            >.info {
                height: 150px;
                >.names {
                    >p {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-bottom: 5px;
                        >span {
                            font-size: 18px;
                            color: $title;
                            &:first-child {
                                background: $error;
                                color: #fff;
                                font-size: 12px;
                                padding: 4px 6px;
                                border-radius: 4px;
                                margin-right: 8px;
                            }
                        }
                    }
                    >span {
                        margin-left: 44.67px;
                    }
                }
                >.counts {
                    font-size: 12px;
                    color: $content;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    margin-top: 5px;
                    line-height: 1.8em;
                }
            }
        }
        >.singer-detail {
            width: 100%;
            height: 60%;
            font-size: 12px;
            color: $content;
            overflow: auto;
            .song {
                color: $sub;
                display: flex;
                align-items: center;
                line-height: 2em;
                padding-left: 20px;
                border: .5px solid $border;
                border-bottom: none;
                border-top: none;
                &:nth-child(2n) {
                    background: $bg;
                }
                &:hover {
                    background: darken($border, 10%);
                }
                &:first-child {
                    border-top: .5px solid $border;
                }
                &:last-child {
                    border-bottom: .5px solid $border;
                }
                >.index {
                    margin-right: 20px;
                }
                >.play {
                    margin-left: 30px;
                    display: flex;
                    align-items: center;
                    border: .5px solid $error;
                    color: $error;
                    padding: 2px;
                    border-radius: 2px;
                }
            }
        }
    }
</style>