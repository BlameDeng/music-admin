<template>
    <div class="singer-create">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <div class="form-wrapper">
            <Form label-position="left" class="form">
                <FormItem style="margin:0;">
                    <h3>新增歌手</h3>
                </FormItem>
                <FormItem label="名字" style="margin:0;">
                    <Input v-model.trim="formData.name"></Input>
                </FormItem>
                <FormItem label="其他名字" style="margin:0;">
                    <Input v-model.trim="formData.othernames"></Input>
                </FormItem>
                <FormItem label="语种" style="margin:0;">
                    <Select v-model="formData.lang">
                        <Option value="华语">华语</Option>
                        <Option value="欧美">欧美</Option>
                        <Option value="日本">日本</Option>
                        <Option value="韩国">韩国</Option>
                        <Option value="其他">其他</Option>
                    </Select>
                </FormItem>
                <FormItem label="分类" style="margin:0;">
                    <RadioGroup v-model="formData.type">
                        <Radio label="male">男歌手</Radio>
                        <Radio label="female">女歌手</Radio>
                        <Radio label="group">乐队组合</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="头像链接" style="margin:0;">
                    <Input v-model="formData.avatar"></Input>
                    <div style="text-align:end;margin-top:3px;" id="singer-avatar-create-container">
                        <Button size="small" type="default" @click="preview">预览头像</Button>
                        <Button size="small" type="default" id="singer-avatar-create-picker">上传头像</Button>
                        <x-upload container-id="singer-avatar-create-container" browse-id="singer-avatar-create-picker" bucket-name="singeravatars" @uploaded="uploaded($event)"></x-upload>
                    </div>
                </FormItem>
                <FormItem label="简介" style="margin:0;">
                    <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="formData.summary"></Input>
                </FormItem>
                <FormItem style="text-align:center;margin-top:10px;">
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
    import pinyin from 'pinyin'
    export default {
        name: "SingerCreate",
        components: { xUpload },
        data() {
            return { formData: { name: '', othernames: '', lang: '', type: '', avatar: '', summary: '' } }
        },
        methods: {
            ...mapActions(['createSinger', 'fetchAllSingers']),
            onBack() {
                this.$router.go(-1);
            },
            onSave() {
                if (!this.name && !this.othernames) {
                    this.$Message.warning('歌手名字不能为空！');
                    return
                }
                let temp = this.name || this.othernames;
                temp = temp.substr(0, 1);
                let firstLetter = pinyin(temp, { style: pinyin.STYLE_FIRST_LETTER })[0][0].toUpperCase();
                /[A-Z]/.test(firstLetter) ? '' : firstLetter = '#';
                let data = { ...this.formData, firstLetter };
                this.createSinger(data).then(res => {
                    this.$Message.success('创建成功');
                    this.fetchAllSingers().then(res => {
                        this.$router.push('/singer/list');
                    });
                })
            },
            uploaded(obj) {
                this.avatar = obj.url + '?x-oss-process=style/avatar';
            },
            preview() {
                if (!this.avatar) {
                    this.$Message.info('还没有上传该歌手头像！');
                    return
                }
                window.open(this.avatar, '_blank');
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "@/assets/base.scss";
    .singer-create {
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
</style>