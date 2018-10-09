<template>
    <div class="index">
        <canvas id="xxx" style="outline:1px solid #ddd;"></canvas>
    </div>
</template>
<script>
    import Canvas from '@/helpers/canvas.js'
    export default {
        name: 'Index',
        components: {},
        data() {
            return {};
        },
        mounted() {
            let canvas1 = new Canvas('#xxx');
            canvas1.drawRectangle('fill', [10, 10, 40, 40], 'black');
            canvas1.drawRectangle('stroke', [60, 10, 40, 40], 'black');
            canvas1.drawRectangle('clear', [10, 10, 20, 20]);
            canvas1.draw('fill', [
                [200, 0],
                [150, 50],
                [250, 50]
            ], 'red');
        },
    };
</script>
<style scoped lang="scss">
</style>