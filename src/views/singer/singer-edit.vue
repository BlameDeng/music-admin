<template>
    <div class="singer-edit">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <div class="form-wrapper">
            <h3>编辑歌手</h3>
            <Form :label-width="80" style="width:100%;" v-if="singer">
                <FormItem label="名字">
                    <Input v-model.trim="singer.name"></Input>
                </FormItem>
                <FormItem label="其他名字">
                    <Input v-model.trim="singer.othernames"></Input>
                </FormItem>
                <FormItem label="语种">
                    <Select v-model="singer.lang">
                        <Option value="华语">华语</Option>
                        <Option value="欧美">欧美</Option>
                        <Option value="日本">日本</Option>
                        <Option value="韩国">韩国</Option>
                        <Option value="其他">其他</Option>
                    </Select>
                </FormItem>
                <FormItem label="分类">
                    <RadioGroup v-model="singer.type">
                        <Radio label="male">男歌手</Radio>
                        <Radio label="female">女歌手</Radio>
                        <Radio label="group">乐队组合</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="头像链接">
                    <Input v-model="singer.avatar"></Input>
                    <div style="text-align:end;margin-top:3px;" id="singer-avatar-edit-container">
                        <Button size="small" type="default" @click="preview">预览头像</Button>
                        <Button size="small" type="default" id="singer-avatar-edit-picker">上传头像</Button>
                        <x-upload container-id="singer-avatar-edit-container" browse-id="singer-avatar-edit-picker" bucket-name="singeravatars" @uploaded="uploaded($event)"></x-upload>
                    </div>
                </FormItem>
                <FormItem label="简介">
                    <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="singer.summary"></Input>
                </FormItem>
                <FormItem style="text-align:center;">
                    <Button style="margin-right: 8px" @click="onBack">取消</Button>
                    <Button type="primary" @click="onSave">提交</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
    import xUpload from "@/components/upload/upload.vue"
    import { mapActions } from 'vuex'
    export default {
        name: "SingerEdit",
        components: { xUpload },
        data() {
            return { singer: null }
        },
        created() {
            this.$route.query && this.$route.query.id ? this.singer = this.getSinger(this.$route.query.id) : '';
        },
        methods: {
            ...mapActions(['updateSinger']),
            getSinger(id) {
                return this.$store.getters.getSingerById(id);
            },
            onBack() {
                this.$router.go(-1);
            },
            onSave() {
                if (!this.singer.name && !this.singer.othernames) {
                    this.$Message.warning('歌手名字不能为空！');
                    return
                }
                let data = { name: this.singer.name, othernames: this.singer.othernames, lang: this.singer.lang, type: this.singer.type, avatar: this.singer.avatar, summary: this.singer.summary, id: this.singer.id };
                this.updateSinger(data).then(res => {
                    this.$Message.success('修改成功');
                })
            },
            uploaded(obj) {
                this.singer.avatar = obj.url + '?x-oss-process=style/avatar';
            },
            preview() {
                if (!this.singer.avatar) {
                    this.$Message.info('还没有上传该歌手头像！');
                    return
                }
                window.open(this.singer.avatar, '_blank');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/base.scss";
    .singer-edit {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
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
        >.form-wrapper {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: $content;
            >h3 {
                text-align: center;
                margin: 10px 0;
                color: $title;
            }
        }
    }
</style>