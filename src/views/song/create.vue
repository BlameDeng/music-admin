<template>
    <div class="create-song">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <x-upload container-id="song-upload-container" browse-id="song-picker" post-id="song-uploader" bucket-name="songsbucket" @files-added="songAdded($event)" @uploading="uploading($event)" @uploaded="uploaded($event)" @before-upload="beforeUpload($event)"></x-upload>
        <div class="steps">
            <Steps :current="current" direction="vertical">
                <Step title="选择文件" content="选择上传的歌曲文件"></Step>
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
                    <Button type="primary" icon="md-add-circle" id="song-picker" class="button" :disabled="!pickerUsable" @click="onClickPick" ref='filePicker'>选择文件</Button>
                    <Button type="primary" icon="md-cloud-upload" id="song-uploader" class="button" :disabled="!uploadUsable">开始上传</Button>
                </div>
            </div>
            <div class="edit-step" v-show="current===2||current===3">
                <div class="form-wrapper">
                    <Form label-position="left" class="form">
                        <FormItem style="margin:0;">
                            <h3>编辑歌曲</h3>
                        </FormItem>
                        <FormItem label="歌名" style="margin:0;">
                            <Input v-model.trim="formData.name"></Input>
                        </FormItem>
                        <FormItem label="歌手" style="margin:0;">
                            <Input v-model.trim="formData.singer"></Input>
                        </FormItem>
                        <FormItem label="歌曲链接" style="margin:0;">
                            <Input v-model.trim="formData.url"></Input>
                        </FormItem>
                        <FormItem label="封面链接" style="margin:0;">
                            <Input v-model.trim="formData.cover" ref="cover"></Input>
                            <div style="text-align:end;" id="avatar-upload-container">
                                <Button size="small" type="default" @click="preview">预览封面</Button>
                                <Button size="small" type="default" id="create-song-avatar-picker">上传新封面</Button>
                            </div>
                            <x-upload container-id="avatar-upload-container" browse-id="create-song-avatar-picker" bucket-name="songcovers" @uploaded="coverUploaded($event)"></x-upload>
                        </FormItem>
                        <FormItem label="歌词" style="margin:0;">
                            <Input type="textarea" v-model.trim="formData.lrc" :rows="3"></Input>
                        </FormItem>
                        <FormItem style="text-align:center;margin-top:10px;">
                            <Button style="margin-right: 28px" @click="onCancleSave">取消</Button>
                            <Button type="primary" @click="onSave">保存</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
            <div class="success-info" v-show="infoVisible">
                <h4>
                    <Icon type="md-checkmark-circle" color="#19be6b" size="20" style="margin-right:5px;" />
                    新增歌曲成功！您可以...
                </h4>
                <p @click="continueAdd">继续新增</p>
                <p @click="scanSongList">查看歌曲列表</p>
            </div>
        </div>
    </div>
</template>
<script>
    import xUpload from "@/components/upload/upload.vue"
    import mixin from "@/mixin/mixin.js"
    import { mapActions } from 'vuex'
    export default {
        name: "CreateSong",
        components: { xUpload },
        mixins: [mixin],
        data() {
            return {
                songFile: null,
                current: 0,
                pickerUsable: true,
                uploadUsable: true,
                formData: { name: '', singer: '', url: '', cover: '', lrc: '' },
                infoVisible: false
            };
        },
        methods: {
            ...mapActions(['createSong', 'fetchAllSongs']),
            onClickPick() {
                this.current = 0;
                this.$refs.slider.style.transform = `translateX(-100%)`;
            },
            songAdded(file) {
                if (file.type.toLowerCase() !== 'audio/mp3') {
                    this.$Message.warning('您需要选择一个MP3音频文件');
                    return;
                }
                this.songFile = file;
                this.current = 1;
                this.pickerUsable = false;
                this.$refs.slider.style.transform = `translateX(-100%)`;
            },
            uploading(file) {
                let { percent } = file;
                this.$refs.slider.style.transform = `translateX(${percent-100}%)`;
            },
            uploaded(obj) {
                this.pickerUsable = true;
                this.uploadUsable = true;
                this.current = 2;
                this.formData.url = obj.url;
                this.formData.name = this.formatSongName(obj.file.name);
                this.songFile = null;
            },
            coverUploaded(obj) {
                this.formData.cover = obj.url + '?x-oss-process=style/avatar';
            },
            onSave() {
                if (!this.formData.name) {
                    this.$$Message.warning('歌名不能为空！');
                    return;
                }
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
                this.songFile = null;
                this.infoVisible = false;
                let e = new Event('click');
                this.$refs.filePicker.$el.dispatchEvent(e);
            },
            scanSongList() {
                this.$router.push('/song/list');
            },
            beforeUpload(file) {
                this.uploadUsable = false;
            },
            preview() {
                if (!this.formData.cover) {
                    this.$Message.info('该歌曲还没有上传封面！');
                    return
                }
                window.open(this.formData.cover, '_blank');
            },
            onBack() {
                this.$router.go(-1);
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .create-song {
        @include container;
        display: flex;
        justify-content: flex-start;
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
        >.steps {
            width: 150px;
            margin: 0 20px;
            padding-top: 50px;
        }
        >.upload-area {
            border-left: 1px solid $border;
            flex-grow: 1;
            display: flex;
            align-items: center;
            >.upload-step {
                width: 100%;
                min-height: 70%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                >h3 {
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
                    >.button {
                        margin: 0 20px;
                    }
                }
            }
            >.edit-step {
                width: 100%;
                min-height: 70%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                >.form-wrapper {
                    width: 80%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto;
                    color: $content;
                    >.form {
                        width: 100%;
                        h3 {
                            text-align: center;
                            font-size: 20px;
                            padding: 10px 0;
                            line-height: 1.8em;
                            color: $title;
                        }
                    }
                }
            }
            >.success-info {
                width: 100%;
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                >h4 {
                    color: $success;
                    font-size: 18px;
                    margin-bottom: 40px;
                }
                >p {
                    font-size: 16px;
                    margin-bottom: 10px;
                    &:hover {
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>