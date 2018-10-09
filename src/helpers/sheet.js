import AV from 'leancloud-storage'
const APP_ID = 'GXqgHEfcB1PWvg0xx4FBnrAC-gzGzoHsz';
const APP_KEY = 'zMJKJISLtf61iaTTtz5eAl8R';
// AV.init({ appId: APP_ID, appKey: APP_KEY });

//新建歌单
const Sheet = {}
// name cover tag1 tag2 tag3 summary
Sheet.createSheet = function(data) {
    let sheet = new AV.Object('Sheet');
    let entries = Object.entries(data);
    entries.forEach(array => {
        sheet.set(array[0], array[1]);
    });
    return sheet.save();
}
//获取所有歌单
Sheet.fetchAllSheets = function() {
    let query = new AV.Query('Sheet');
    return query.find();
}
//更新歌单信息
Sheet.updateSheet = function(obj, id) {
    let sheet = AV.Object.createWithoutData('Sheet', id);
    // 修改属性
    let entries = Object.entries(obj);
    entries.forEach(array => {
        sheet.set(array[0], array[1]);
    });
    // 保存到云端
    return sheet.save();
}
//删除歌单
Sheet.destroySheet = function(id) {
    let sheet = AV.Object.createWithoutData('Sheet', id);
    return sheet.destroy();
}
export default Sheet