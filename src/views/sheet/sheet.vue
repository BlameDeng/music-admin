<template>
    <div class="sheet">
        <transition name="fade">
            <router-view />
        </transition>
    </div>
</template>
<script>
    export default { name: "Sheet" }
</script>
<style scoped lang="scss">
    .sheet {
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