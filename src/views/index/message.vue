<template>
    <div class="message">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <Tabs value="name1">
            <TabPane label="未读消息" name="name1">
                <div class="unread">
                    <template v-if="unread&&unread.length">
                        <div class="inner" v-for="(item,index) in unread" :key="index">
                            <span class="content">
                                {{item.content}}
                            </span>
                            <span class="info">
                                <span class="time">{{item.time}}</span>
                                <Button style="padding:1px 8px;" @click="onMoveToRead(item)">标为已读</Button>
                            </span>
                        </div>
                    </template>
                    <div class="none" v-else>暂无数据</div>
                    <Button type="success" style="padding:4px 12px;margin-top:10px;" @click="readAll">全部标为已读</Button>
                </div>
            </TabPane>
            <TabPane label="已读消息" name="name2">
                <div class="read">
                    <template v-if="read&&read.length">
                        <div class="inner" v-for="(item,index) in read" :key="index">
                            <span class="content">
                                {{item.content}}
                            </span>
                            <span class="info">
                                <span class="time">{{item.time}}</span>
                                <Button type="error" style="padding:1px 8px;" @click="onMoveToTrash(item)">删除</Button>
                            </span>
                        </div>
                    </template>
                    <div class="none" v-else>暂无数据</div>
                    <Button type="error" style="padding:4px 12px;margin-top:10px;" @click="trashAll">全部删除</Button>
                </div>
            </TabPane>
            <TabPane label="回收站" name="name3">
                <div class="trash">
                    <template v-if="trash&&trash.length">
                        <div class="inner" v-for="(item,index) in trash" :key="index">
                            <span class="content">
                                {{item.content}}
                            </span>
                            <span class="info">
                                <span class="time">{{item.time}}</span>
                                <Button style="padding:1px 8px;" @click="onBackToRead(item)">还原</Button>
                            </span>
                        </div>
                    </template>
                    <div class="none" v-else>暂无数据</div>
                    <Button type="error" style="padding:4px 12px;margin-top:10px;" @click="destroyAll">清空回收站</Button>
                    <Button style="padding:4px 12px;margin-top:10px;" @click="backAll">全部还原</Button>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: "Message",
        computed: {
            ...mapState({
                unread: state => state.message.unread,
                read: state => state.message.read,
                trash: state => state.message.trash
            })
        },
        methods: {
            ...mapMutations(['moveToRead', 'moveToTrash', 'backToRead', 'destroy']),
            onBack() { this.$router.go(-1); },
            onMoveToRead(item) {
                this.moveToRead(item);
            },
            onMoveToTrash(item) {
                this.moveToTrash(item);
            },
            onBackToRead(item) {
                this.backToRead(item);
            },
            onDestroy(item) {
                this.destroy(item);
            },
            readAll() {
                if (!this.unread || !this.unread.length) { return }
                this.unread.forEach(item => {
                    this.moveToRead(item);
                });
            },
            trashAll() {
                if (!this.read || !this.read.length) { return }
                this.read.forEach(item => {
                    this.moveToTrash(item);
                });
            },
            destroyAll() {
                if (!this.trash || !this.trash.length) { return }
                this.trash.forEach(item => {
                    this.destroy(item);
                });
            },
            backAll() {
                if (!this.trash || !this.trash.length) { return }
                this.trash.forEach(item => {
                    this.backToRead(item);
                });
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "@/assets/base.scss";
    .message {
        width: 100%;
        height: 100%;
        border: 1px solid $border;
        border-radius: 4px;
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
        overflow: auto;
        padding: 20px;
        position: relative;
        >.icon {
            position: absolute;
            top: 5px;
            right: 5px;
            color: lighten($sub, 20%);
            cursor: pointer;
            &:hover {
                color: $p;
            }
        }
        .unread {
            padding-left: 15px;
            font-size: 14px;
            color: $p;
            line-height: 2em;
            >.inner {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 4px 0;
                border-bottom: .5px solid $border;
                &:hover {
                    background: $bg;
                }
                >.info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-right: 20px;
                    >.time {
                        margin-right: 20px;
                        color: $sub;
                        font-size: 12px;
                    }
                }
            }
            >.none {
                font-size: 12px;
                color: $sub;
                text-align: center;
                padding: 4px 0;
                border-bottom: .5px solid $border;
            }
        }
        .read {
            padding-left: 15px;
            font-size: 14px;
            color: $p;
            line-height: 2em;
            >.inner {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 4px 0;
                border-bottom: .5px solid $border;
                &:hover {
                    background: $bg;
                }
                >.info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-right: 20px;
                    >.time {
                        margin-right: 20px;
                        color: $sub;
                        font-size: 12px;
                    }
                }
            }
            >.none {
                font-size: 12px;
                color: $sub;
                text-align: center;
                padding: 4px 0;
                border-bottom: .5px solid $border;
            }
        }
        .trash {
            padding-left: 15px;
            font-size: 14px;
            color: $p;
            line-height: 2em;
            >.inner {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 4px 0;
                border-bottom: .5px solid $border;
                &:hover {
                    background: $bg;
                }
                >.info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-right: 20px;
                    >.time {
                        margin-right: 20px;
                        color: $sub;
                        font-size: 12px;
                    }
                }
            }
            >.none {
                font-size: 12px;
                color: $sub;
                text-align: center;
                padding: 4px 0;
                border-bottom: .5px solid $border;
            }
        }
    }
</style>