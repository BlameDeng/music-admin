<template>
    <div class="nav">
        <Menu style="width:100%;height:100%;font-size:14px;" accordion @on-select="onSelectItem($event)">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="md-qr-scanner" />
                    概览
                </template>
                <MenuItem name="1-1">123</MenuItem>
                <MenuItem name="1-2">评论管理</MenuItem>
                <MenuItem name="1-3">举报管理</MenuItem>
            </Submenu>
            <Submenu name="song">
                <template slot="title">
                    <Icon type="md-musical-notes" />
                    歌曲
                </template>
                <MenuItem name="song-list">歌曲列表</MenuItem>
                <MenuItem name="song-create">新增歌曲</MenuItem>
            </Submenu>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="md-person" />
                    歌手
                </template>
                <MenuItem name="3-1">文章管理</MenuItem>
                <MenuItem name="3-2">评论管理</MenuItem>
                <MenuItem name="3-3">举报管理</MenuItem>
            </Submenu>
            <Submenu name="4">
                <template slot="title">
                    <Icon type="md-disc" />
                    专辑
                </template>
                <MenuItem name="4-1">文章管理</MenuItem>
                <MenuItem name="4-2">评论管理</MenuItem>
                <MenuItem name="4-3">举报管理</MenuItem>
            </Submenu>
            <Submenu name="5">
                <template slot="title">
                    <Icon type="ios-list-box" />
                    歌单
                </template>
                    <MenuItem name="sheet-list">歌单列表</MenuItem>
                    <MenuItem name="sheet-create">新建歌单</MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>
<script>
    export default {
        name: 'Nav',
        components: {},
        data() {
            return {

            }
        },
        methods: {
            onSelectItem(name) {
                this.$router.push('/'+name.replace('-', '/'));
            }
        }
    }
</script>
<style scoped lang="scss">
    .nav {
        width: 100%;
        height: 100%;
    }
</style>