<template>
    <div class="sheet">
        <transition name="router-transition">
            <router-view />
        </transition>
    </div>
</template>
<script>
    export default { name: "Sheet" }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .sheet {
        @include router-transition;
    }
</style>