import AV from 'leancloud-storage'
const APP_ID = 'GXqgHEfcB1PWvg0xx4FBnrAC-gzGzoHsz';
const APP_KEY = 'zMJKJISLtf61iaTTtz5eAl8R';
// AV.init({ appId: APP_ID, appKey: APP_KEY });

//新建专辑
const Album = {}
Album.createAlbum = function(data) {
    let album = new AV.Object('Album');
    let entries = Object.entries(data);
    entries.forEach(array => {
        album.set(array[0], array[1]);
    });
    return album.save();
}
//获取所有专辑
Album.fetchAllAlbums = function() {
    let query = new AV.Query('Album');
    return query.find();
}
//更新专辑信息
Album.updateAlbum = function(obj, id) {
    let album = AV.Object.createWithoutData('Album', id);
    // 修改属性
    let entries = Object.entries(obj);
    entries.forEach(array => {
        album.set(array[0], array[1]);
    });
    // 保存到云端
    return album.save();
}
//删除专辑
Album.destroyAlbum = function(id) {
    let album = AV.Object.createWithoutData('Album', id);
    return album.destroy();
}
export default Album