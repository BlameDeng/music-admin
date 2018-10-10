<template>
    <div class="album">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'Album',
        components: {},
        data() {
            return {

            }
        },
    }
</script>
<style scoped lang="scss">
    .album {
        width: 100%;
        height: 100%;
    }
</style>