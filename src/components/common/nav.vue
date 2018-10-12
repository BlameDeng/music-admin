<template>
    <div class="nav">
        <Menu style="height:100%;width:150px;font-size:14px;" accordion @on-select="onSelectItem($event)" class="menu">
            <Submenu name="index">
                <template slot="title">
                    <Icon type="md-qr-scanner" />
                    首页
                </template>
                <MenuItem name="index-search">搜索</MenuItem>
            </Submenu>
            <Submenu name="song">
                <template slot="title">
                    <Icon type="md-musical-notes" />
                    歌曲
                </template>
                <MenuItem name="song-list">歌曲列表</MenuItem>
                <MenuItem name="song-create">新增歌曲</MenuItem>
            </Submenu>
            <Submenu name="singer">
                <template slot="title">
                    <Icon type="md-person" />
                    歌手
                </template>
                <MenuItem name="singer-list">歌手列表</MenuItem>
                <MenuItem name="singer-create">新增歌手</MenuItem>
            </Submenu>
            <Submenu name="album">
                <template slot="title">
                    <Icon type="md-disc" />
                    专辑
                </template>
                <MenuItem name="album-list">专辑列表</MenuItem>
                <MenuItem name="album-create">新增专辑</MenuItem>
            </Submenu>
            <Submenu name="sheet">
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
        data() { return {} },
        methods: {
            onSelectItem(name) {
                this.$router.push('/' + name.replace('-', '/'));
            }
        }
    }
</script>
<style scoped lang="scss">
    .nav {
        height: 100%;
    }
</style>