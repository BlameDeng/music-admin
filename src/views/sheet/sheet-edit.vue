<template>
    <div class="sheet-edit">
        <div class="sheet-info">
            <h3>编辑歌单</h3>
            <Form label-position="left" class="form">
                <FormItem label="歌单名">
                    <Input v-model.trim="editingSheet.name"></Input>
                </FormItem>
                <FormItem label="标签" style="display:inline-flex;align-items:center;width:30%;white-space:nowrap;">
                    <Input v-model.trim="editingSheet.tag1"></Input>
                </FormItem>
                <FormItem label="标签" style="display:inline-flex;align-items:center;width:30%;white-space:nowrap;">
                    <Input v-model.trim="editingSheet.tag2"></Input>
                </FormItem>
                <FormItem label="标签" style="display:inline-flex;align-items:center;width:30%;white-space:nowrap;">
                    <Input v-model.trim="editingSheet.tag3"></Input>
                </FormItem>
                <FormItem label="封面链接">
                    <Input v-model.trim="editingSheet.cover"></Input>
                </FormItem>
                <div style="text-align:end; margin-top:-20px;">
                    <Button size="small" type="default">预览封面</Button>
                    <Button size="small" type="default">上传新封面</Button>
                </div>
                <FormItem label="简介">
                    <Input v-model.trim="editingSheet.summary" type="textarea" :rows="3"></Input>
                </FormItem>
                <FormItem style="text-align:center;">
                    <Button style="margin-right: 18px">取消</Button>
                    <Button type="primary">保存</Button>
                </FormItem>
            </Form>
        </div>
        <div class="songs">
            <div class="sheet-songs">
                <Button type="error" class="button">从歌单移除</Button>
                <div class="title">
                    已有歌曲列表
                </div>
                <div class="song" v-if="editingSheet&&editingSheet.songs&&editingSheet.songs.length" v-for="(song,index) in editingSheet.songs" :key="song.id">
                    <p class="index">{{index+1}}</p>
                    <p class="song-name">{{song.name}}</p>
                    <p class="singer">{{song.singer}}</p>
                    <p :class="{}">
                        <Icon type="md-checkmark" class="icon" />
                    </p>
                </div>
            </div>
            <div class="all-songs" v-if="allSongs">
                <Button type="success" class="button" @click="pathSheet('addSong')">添加到歌单</Button>
                <div class="title">
                    歌曲库
                </div>
                <div class="song" v-for="(song,index) in allSongs" :key="song.id">
                    <p class="index">{{index+1}}</p>
                    <p class="song-name">{{song.name}}</p>
                    <p class="singer">{{song.singer}}</p>
                    <p :class="{selected:selectedAllSongs&&selectedAllSongs.indexOf(song)>-1}" @click="onClickSong('all',song)">
                        <Icon type="md-checkmark" class="icon" />
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from "vuex";
    export default {
        name: "SheetEdit",
        data() {
            return {
                selectedSheetSongs: null,
                selectedAllSongs: null
            };
        },
        computed: {
            ...mapState({
                editingSheet: state => state.sheet.editingSheet,
                allSongs: state => state.song.allSongs
            }),
            sheetSongs() {
                return editingSheet.songs;
            }
        },
        created() {
            this.allSongs ? "" : this.fetchAllSongs();
        },
        methods: {
            ...mapActions(['fetchAllSongs', 'updateSheet']),
            onClickSong(type, song) {
                if (type === "all") {
                    this.selectedAllSongs = this.selectedAllSongs || [];
                    let index = this.selectedAllSongs.indexOf(song);
                    index === -1 ? this.selectedAllSongs.push(song) : this.selectedAllSongs.splice(index, 1);
                }
            },
            pathSheet(type) {
                if (type === 'addSong') {
                    let copy = JSON.parse(JSON.stringify(this.editingSheet));
                    copy.songs = copy.songs || [];
                    copy.songs = copy.songs.concat(this.selectedAllSongs);
                    this.updateSheet(copy).then(res => {
                        console.log(res)
                    })
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "@/assets/base.scss";
    .sheet-edit {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        >.sheet-info {
            border: 1px solid red;
            width: 40%;
            height: 100%;
            padding: 0 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: $content;
            >h3 {
                margin: 10px 0;
                text-align: center;
                font-size: 20px;
                color: $title;
            }
        }
        >.songs {
            border: 1px solid green;
            width: 60%;
            height: 100%;
            color: $content;
            font-size: 12px;
            position: relative;
            >.sheet-songs {
                height: 30%;
                border: 1px solid red;
                padding: 5px 20px;
                overflow: auto;
                >.title {
                    color: $p;
                }
                >.button {
                    position: absolute;
                    top: 5px;
                    right: 25px;
                    padding: 0 4px;
                }
                >.song {
                    display: inline-flex;
                    align-items: center;
                    width: 40%;
                    vertical-align: top;
                    padding: 3px 0;
                    &:hover {
                        background: $bg;
                    }
                    >p {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin-right: 5px;
                        &:first-child {
                            width: 10%;
                            color: lighten($content, 30%);
                        }
                        &.song-name {
                            width: 50%;
                        }
                        &.singer {
                            width: 30%;
                        }
                        &:last-child {
                            height: 14px;
                            width: 14px;
                            border: 1px solid $border;
                            border-radius: 3px;
                            cursor: pointer;
                            margin-right: 20px;
                            >.icon {
                                display: none;
                            }
                        }
                        &.selected {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            >.icon {
                                display: inline;
                            }
                        }
                    }
                }
            }
            >.all-songs {
                height: 70%;
                border: 1px solid black;
                padding: 5px 20px;
                overflow: auto;
                >.title {
                    color: $p;
                }
                >.button {
                    position: absolute;
                    bottom: 5px;
                    right: 25px;
                    padding: 0 4px;
                }
                >.song {
                    display: inline-flex;
                    align-items: center;
                    width: 40%;
                    vertical-align: top;
                    padding: 3px 0;
                    &:hover {
                        background: $bg;
                    }
                    >p {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        margin-right: 5px;
                        &:first-child {
                            width: 10%;
                            color: lighten($content, 30%);
                        }
                        &.song-name {
                            width: 50%;
                        }
                        &.singer {
                            width: 30%;
                        }
                        &:last-child {
                            height: 14px;
                            width: 14px;
                            border: 1px solid $border;
                            border-radius: 3px;
                            cursor: pointer;
                            margin-right: 20px;
                            >.icon {
                                display: none;
                            }
                        }
                        &.selected {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            >.icon {
                                display: inline;
                            }
                        }
                    }
                }
            }
        }
    }
</style>