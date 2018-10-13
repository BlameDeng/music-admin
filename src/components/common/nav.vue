<template>
    <div class="nav">
        <Menu style="height:100%;width:150px;font-size:14px;background: #f8f8f9;" accordion @on-select="onSelectItem($event)" class="menu" :active-name="activeName" :open-names="openNames" ref="menu">
            <Submenu name="index">
                <template slot="title">
                    <div class="slot">
                        <Icon type="md-home" />
                        <span>系统首页</span>
                    </div>
                </template>
                <MenuItem name="index-scan">系统概览</MenuItem>
                <MenuItem name="index-search">搜索</MenuItem>
            </Submenu>
            <Submenu name="song">
                <template slot="title">
                    <div class="slot">
                        <Icon type="md-musical-notes" />
                        <span>歌曲管理</span>
                    </div>
                </template>
                <MenuItem name="song-list">歌曲列表</MenuItem>
                <MenuItem name="song-create">新增歌曲</MenuItem>
            </Submenu>
            <Submenu name="singer">
                <template slot="title">
                    <div class="slot">
                        <Icon type="md-person" />
                        <span>歌手管理</span>
                    </div>
                </template>
                <MenuItem name="singer-list">歌手列表</MenuItem>
                <MenuItem name="singer-create">新增歌手</MenuItem>
            </Submenu>
            <Submenu name="album">
                <template slot="title">
                    <div class="slot">
                        <Icon type="md-disc" />
                        <span>专辑管理</span>
                    </div>
                </template>
                <MenuItem name="album-list">专辑列表</MenuItem>
                <MenuItem name="album-create">新增专辑</MenuItem>
            </Submenu>
            <Submenu name="sheet">
                <template slot="title">
                    <div class="slot">
                        <Icon type="ios-list-box" />
                        <span>歌单管理</span>
                    </div>
                </template>
                <MenuItem name="sheet-list">歌单列表</MenuItem>
                <MenuItem name="sheet-create">新建歌单</MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>
<script>
export default {
  name: "Nav",
  data() {
    return { activeName: "", openNames: null };
  },
  methods: {
    onSelectItem(name) {
      this.$router.push("/" + name.replace("-", "/"));
    }
  },
  watch: {
    $route: {
      handler: function(val) {
        let array = val.path.split("/").filter(v => v);
        this.activeName = `${array[0]}-${array[1]}`;
        this.openNames = array.slice(0, 1);
        this.$nextTick(() => {
          this.$refs.menu.updateOpened();
        });
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style scoped lang="scss">
.nav {
  height: 100%;
  /deep/ .ivu-menu-item {
    padding: 8px;
    font-size: 14px;
  }
  /deep/ i.ivu-icon {
    top: 1px;
  }
  .slot {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    > span {
      margin-left: 5px;
      font-weight: bold;
      margin-right: 5px;
    }
  }
}
</style>