<template>
    <div class="message">
        <Icon type="md-close" size="25" class="icon" @click="onBack" />
        <Tabs value="name1">
            <TabPane label="未读消息" name="name1">
                <div class="unread">
                    <div class="inner" v-for="n in 5">
                        <span class="content">
                            【系统通知】该系统将于今晚凌晨2点到5点进行升级维护
                        </span>
                        <span class="info">
                            <span class="time">2018-04-19 20:00:00</span>
                            <Button style="padding:1px 8px;">标为已读</Button>
                        </span>
                    </div>
                    <Button type="success" style="padding:4px 12px;margin-top:10px;">全部标为已读</Button>
                </div>
            </TabPane>
            <TabPane label="已读消息" name="name2">
                <div class="read">
                    <div class="inner" v-for="n in 5">
                        <span class="content">
                            【系统通知】该系统将于今晚凌晨2点到5点进行升级维护
                        </span>
                        <span class="info">
                            <span class="time">2018-04-19 20:00:00</span>
                            <Button type="error" style="padding:1px 8px;">删除</Button>
                        </span>
                    </div>
                    <Button type="error" style="padding:4px 12px;margin-top:10px;">全部删除</Button>
                </div>
            </TabPane>
            <TabPane label="回收站" name="name3">
                <div class="trash">
                    <div class="inner" v-for="n in 5">
                        <span class="content">
                            【系统通知】该系统将于今晚凌晨2点到5点进行升级维护
                        </span>
                        <span class="info">
                            <span class="time">2018-04-19 20:00:00</span>
                            <Button style="padding:1px 8px;">还原</Button>
                        </span>
                    </div>
                    <Button style="padding:4px 12px;margin-top:10px;">全部还原</Button>
                </div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    export default {
        name: "Message",
        methods: {
            onBack() { this.$router.go(-1); },
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
        }
    }
</style>