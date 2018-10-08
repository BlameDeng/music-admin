<template>
    <div class="sheet-edit">
        <div class="sheet-info">
            <div class="cover">
                <img src="" alt="cover">
            </div>
            <h3 class="name">{{editingSheet.name}}</h3>
            <div class="time">
                <p>{{editingSheet.createdAt}}</p>
                <p>{{editingSheet.updatedAt}}</p>
            </div>
            <div class="tags">
                标签：
                <span class="tag">{{editingSheet.tag1}}</span>
                /
                <span class="tag">{{editingSheet.tag2}}</span>
                /
                <span class="tag">{{editingSheet.tag3}}</span>
            </div>
            <div class="summary">
                {{editingSheet.summary}}
            </div>
        </div>
        <div class="songs"></div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "SheetEdit",
        data() {
            return {}
        },
        computed: {
            ...mapState({
                editingSheet: state => state.sheet.editingSheet
            })
        }
    }
</script>

<style scoped lang="scss">
    .sheet-edit {
        display: flex;
        justify-content: center;
        >.sheet-info {
            border: 1px solid red;
            width: 40%;
            >.cover {
                width: 150px;
                height: 150px;
                >img {
                    width: 150px;
                    height: 150px;
                    vertical-align: top;
                }
            }
        }
        >.songs {
            border: 1px solid green;
            width: 60%;
        }
    }
</style>