<template>
    <div class="song">
        <div class="add-song">
            <x-upload container-id="song-upload-container" browse-id="song-picker" post-id="song-uploader" bucket-name="songsbucket" @files-added="songAdded($event)" @uploading="uploading($event)" @uploaded="uploaded($event)"></x-upload>
            <div class="steps">
                <Steps :current="current">
                    <Step title="选择文件" content="选择将要上传的歌曲文件"></Step>
                    <Step title="点击上传" content="开始上传文件"></Step>
                    <Step title="编辑歌曲" content="编辑歌曲信息"></Step>
                    <Step title="新增成功" content="点击保存"></Step>
                </Steps>
            </div>
            <div class="upload-area">
                <div class="upload-step" v-show="current<2">
                    <h3>上传歌曲</h3>
                    <div class="file-info">
                        <p>文件名称：{{songFile&&songFile.name}}</p>
                        <p>文件大小：{{songFile&&songFile.size|formatSongSize}}</p>
                    </div>
                    <div class="progress">
                        <p class="slider" ref="slider"></p>
                    </div>
                    <div class="song-upload-container" id="song-upload-container">
                        <Button type="primary" icon="md-add-circle" id="song-picker" class="button" :disabled="!usable" @click="onClickPick">选择文件</Button>
                        <Button type="primary" icon="md-cloud-upload" id="song-uploader" class="button" :disabled="usable">开始上传</Button>
                    </div>
                </div>
                <div class="edit-step" v-show="current===2||current===3">
                    <h3>编辑歌曲</h3>
                    <Form label-position="right" :label-width="60" class="edit-form">
                        <FormItem label="歌名" style="display:inline-block;width:40%;">
                            <Input v-model.trim="formData.name"></Input>
                        </FormItem>
                        <FormItem label="歌手" style="display:inline-block;width:40%;">
                            <Input v-model.trim="formData.singer"></Input>
                        </FormItem>
                        <FormItem label="链接">
                            <Input v-model.trim="formData.url"></Input>
                        </FormItem>
                        <FormItem label="封面">
                            <Input v-model.trim="formData.cover"></Input>
                        </FormItem>
                        <FormItem label="歌词">
                            <Input type="textarea" v-model.trim="formData.lrc"></Input>
                        </FormItem>
                        <FormItem style="text-align:center;">
                            <Button style="margin-right: 8px" @click="onCancleSave">取消</Button>
                            <Button type="primary" @click="onSave">保存</Button>
                        </FormItem>
                    </Form>
                </div>
                <div class="success-info" v-show="infoVisible">
                    <h4>
                        <Icon type="md-checkmark-circle" color="#19be6b" size="20" style="margin-right:5px;" />新增歌曲成功！您可以...</h4>
                    <p @click="continueAdd">继续新增</p>
                    <p @click="scanNewSong">查看刚刚添加的歌曲</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import xUpload from "@/components/upload/upload.vue"
    import mixin from "@/mixin/mixin.js"
    import { mapActions } from 'vuex'
    export default {
        name: "Song",
        components: { xUpload },
        mixins: [mixin],
        data() {
            return {
                songFile: null,
                current: 0,
                usable: true,
                formData: { name: '', singer: '', url: '', cover: '', lrc: '' },
                infoVisible: false
            };
        },
        methods: {
            ...mapActions(['createSong']),
            onClickPick() {
                this.current = 0;
            },
            songAdded(file) {
                if (file.type.toLowerCase() !== 'audio/mp3') {
                    this.$Message.warning('您需要选择一个MP3音频文件');
                }
                this.songFile = file;
                this.current = 1;
                this.usable = false;
                this.$refs.slider.style.transform = `translateX(-100%)`;
            },
            uploading(file) {
                let { percent } = file;
                this.$refs.slider.style.transform = `translateX(${percent-100}%)`;
            },
            uploaded(obj) {
                this.usable = true;
                this.current = 2;
                this.formData.url = obj.url;
                this.formData.name = this.formatSongName(obj.file.name);
                this.songFile = null;
            },
            onSave() {
                this.current = 3;
                this.createSong(this.formData).then(res => {
                    this.current = 4;
                    this.formData = { name: '', singer: '', url: '', cover: '', lrc: '' };
                    this.infoVisible = true;
                }).catch(err => {});
            },
            onCancleSave() {
                this.current = 0;
                this.formData = { name: '', singer: '', url: '', cover: '', lrc: '' };
                this.songFile = null;
            },
            continueAdd() {
                this.current = 0;
                this.songFile = null;
                this.infoVisible = false;
                this.$refs.slider.style.transform = `translateX(-100%)`;
            },
            scanNewSong() {

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
                margin-bottom: 50px;
            }
            >.upload-area {
                height: 70%;
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
                            &:first-child {
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
                            transition: all .3s linear;
                        }
                    }
                    >.song-upload-container {
                        margin-bottom: 10%;
                        >.button {
                            margin: 0 20px;
                        }
                    }
                }
                >.edit-step {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    >h3 {
                        font-size: 20px;
                        margin: 5px auto;
                        text-align: center;
                    }
                    >.edit-form {
                        width: 80%;
                        margin: 0 auto;
                    }
                }
                >.success-info {
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    >h4 {
                        color: $success;
                        font-size: 18px;
                        margin-bottom: 10%;
                    }
                    >p {
                        margin-bottom: 5%;
                        font-size: 16px;
                        &:hover {
                            text-decoration: underline;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>