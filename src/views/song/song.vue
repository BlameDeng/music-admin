<template>
    <div class="song">
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>
<script>
    export default { name: "Song" }
</script>
<style scoped lang="scss">
    .song {
        width: 100%;
        height: 100%;
        background: #fff;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
        margin-bottom: 20px;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>