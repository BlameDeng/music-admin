<template>
    <div class="song">
        <div class="add-song">
            <x-upload container-id="song-upload-container" browse-id="song-picker" post-id="song-uploader" bucket-name="songsbucket" @files-added="songAdded($event)"></x-upload>
            <div class="steps">
                <Steps :current="0">
                    <Step title="选择文件" content="选择将要上传的歌曲文件"></Step>
                    <Step title="点击上传" content="开始上传文件"></Step>
                    <Step title="编辑歌曲" content="完善歌曲信息"></Step>
                    <Step title="点击保存" content="保存歌曲信息"></Step>
                </Steps>
            </div>
            <div class="upload-area">
                <div class="upload-step">
                    <h3>上传歌曲</h3>
                    <div class="file-info">
                        <p>文件名称：{{songFile&&songFile.name}}</p>
                        <p>文件大小：{{songFile&&songFile.size|formatSongSize}}</p>
                    </div>
                    <div class="progress">
                        <p class="slider" ref="slider"></p>
                    </div>
                    <div class="song-upload-container" id="song-upload-container">
                        <Button type="primary" icon="md-add-circle" id="song-picker" class="button">选择文件</Button>
                        <Button type="primary" icon="md-cloud-upload" id="song-uploader" disabled class="button">开始上传</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import xUpload from "@/components/upload/upload.vue"
    import mixin from "@/mixin/mixin.js"
    export default {
        name: "Song",
        components: { xUpload },
        mixins: [mixin],
        data() {
            return { songFile: null };
        },
        methods: {
            songAdded(file) {
                console.log(file);
                this.songFile = file;
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .song {
        width: 100%;
        height: 100%;
        >.add-song {
            width: 100%;
            height: 100%;
            border: 1px solid $border;
            border-radius: 4px;
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
            >.steps {
                padding-left: 12.5%;
                margin-top: 50px;
                margin-bottom: 100px;
            }
            >.upload-area {
                height: 60%;
                width: 60%;
                margin: 0 auto;
                border-radius: 4px;
                border: 1px solid $border;
                box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
                >.upload-step {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    >h3 {
                        margin: 5% 0 2.5%;
                        font-size: 20px;
                    }
                    >.file-info {
                        align-self: flex-start;
                        width: 100%;
                        >p {
                            width: 50%;
                            margin-left: auto;
                            margin-right: auto;
                            font-size: 16px;
                            white-space: nowrap;
                            &:first-child{
                                margin-bottom: 20px;
                            }
                        }
                    }
                    >.progress {
                        border: 1px solid $border;
                        border-radius: 2px;
                        width: 50%;
                        height: 20px;
                        overflow: hidden;
                        >.slider {
                            height: 18px;
                            width: 100%;
                            background: lighten($lp, 10%);
                            border-radius: 2px;
                            transform: translateX(-100%);
                        }
                    }
                    >.song-upload-container {
                        margin-bottom: 10%;
                        >.button {
                            margin: 0 20px;
                        }
                    }
                }

            }
        }
    }
</style>