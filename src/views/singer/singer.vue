<template>
    <div class="singer">
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>
<script>
    export default { name: "Singer" }
</script>
<style scoped lang="scss">
    .singer {
        width: 100%;
        height: 100%;
        background: #fff;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
        margin-bottom: 20px;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>