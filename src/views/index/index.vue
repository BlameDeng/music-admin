<template>
    <div class="index">
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>
<script>
    export default { name: "Index" }
</script>
<style scoped lang="scss">
    .index {
        width: 100%;
        height: 100%;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
        margin-bottom: 20px;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>