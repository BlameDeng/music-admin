<template>
    <div class="song-edit">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <h3>编辑歌曲</h3>
        <div class="form-wrapper">
            <Form label-position="right" :label-width="60" class="form">
                <FormItem label="歌名">
                    <Input v-model.trim="song.name"></Input>
                </FormItem>
                <FormItem label="歌手">
                    <Input v-model.trim="song.singer"></Input>
                </FormItem>
                <FormItem label="歌曲链接">
                    <Input v-model.trim="song.url"></Input>
                </FormItem>
                <FormItem label="封面链接">
                    <Input v-model.trim="song.cover" ref="cover"></Input>
                    <div style="text-align:end;" id="avatar-upload-container">
                        <Button size="small" type="default" @click="preview">预览封面</Button>
                        <Button size="small" type="default" id="avatar-picker">上传新封面</Button>
                    </div>
                    <x-upload container-id="avatar-upload-container" browse-id="avatar-picker" bucket-name="songcovers" @uploaded="coverUploaded($event)"></x-upload>
                </FormItem>
                <FormItem label="歌词">
                    <Input type="textarea" v-model.trim="song.lrc" :rows="3"></Input>
                </FormItem>
                <FormItem style="text-align:center;">
                    <Button style="margin-right: 28px" @click="onBack">取消</Button>
                    <Button type="primary" @click="onSave">保存</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
    import xUpload from "@/components/upload/upload.vue"
    import { mapActions } from 'vuex'
    export default {
        name: "SongEdit",
        components: { xUpload },
        data() {
            return { song: null }
        },
        created() {
            this.$route.query && this.$route.query.id && this.getSong(this.$route.query.id);
        },
        methods: {
            ...mapActions(['updateSong', 'destroySong']),
            onBack() {
                this.$router.go(-1);
            },
            getSong(id) {
                this.song = this.$store.getters.getSongById(id);
            },
            onSave() {
                this.updateSong(this.song).then(res => {
                    this.$Message.success('保存成功！');
                })
            },
            preview() {
                if (!this.song.cover) {
                    this.$Message.info('该歌曲还没有上传封面！');
                    return
                }
                window.open(this.song.cover, '_blank');
            },
            coverUploaded(obj) {
                this.song.cover = obj.url + '?x-oss-process=style/avatar';
            },
        }
    }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .song-edit {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        position: relative;
        padding-top: 60px;
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
        >h3 {
            text-align: center;
            font-size: 20px;
            padding: 10px 0;
            line-height: 2em;
            color: $title;
            margin-top: -60px;
        }
        >.form-wrapper {
            height: 100%;
            width: 80%;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
            >.form {
                width: 100%;
            }
        }
    }
</style>