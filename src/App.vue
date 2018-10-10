<template>
    <div id="app">
        <div class="header">
            <x-header></x-header>
        </div>
        <div class="main">
            <div class="nav">
                <x-nav></x-nav>
            </div>
            <div class="views">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
    import xHeader from '@/components/common/header.vue'
    import xNav from '@/components/common/nav.vue'
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'App',
        components: { xHeader, xNav },
        computed: {
            ...mapState({
                allSongs: state => state.song.allSongs,
                allSheets: state => state.sheet.allSheets
            })
        },
        methods: {
            ...mapActions(['fetchAllSongs', 'fetchAllSheets'])
        },
        created() {
            this.$Message.config({
                top: 75,
                duration: 2
            });
            this.allSongs ? '' : this.fetchAllSongs();
            this.allSheets ? '' : this.fetchAllSheets().then(res => {});
        }
    }
</script>
<style lang="scss">
    #app {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        height: 100%;
        padding-top: 60px;
        font-size: 14px;
        >.header {
            width: 100%;
            height: 60px;
            margin-top: -60px;
        }
        >.main {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: flex-start;
            >.nav {
                height: 100%;
                width: 150px;
                flex-shrink: 0;
            }
            >.views {
                flex-grow: 1;
                padding: 20px;
                overflow: auto;
            }
        }
    }
    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html, body {
        width: 100%;
        height: 100%;
        line-height: 1.4em;
        min-width: 1000px;
        min-height: 600px;
    }
    ul, ol {
        list-style: none;
    }
</style>