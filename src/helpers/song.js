import AV from 'leancloud-storage'
const APP_ID = 'GXqgHEfcB1PWvg0xx4FBnrAC-gzGzoHsz';
const APP_KEY = 'zMJKJISLtf61iaTTtz5eAl8R';
AV.init({ appId: APP_ID, appKey: APP_KEY });

const Song = AV.Object.extend('Song');

//新建一个对象
Song.createSong = function(obj) {
    if (typeof obj !== 'object') {
        return Promise.reject('create方法必须传一个非空对象作为参数！');
    }
    let entries = Object.entries(obj);
    if (entries.length === 0) {
        return Promise.reject('create方法必须传一个非空对象作为参数！');
    }
    const song = new Song();
    entries.forEach(array => {
        song.set(array[0], array[1]);
    });
    return song.save();
};
//根据条件查找对象
Song.querySong = function(obj) {
    if (typeof obj !== 'object') {
        return Promise.reject('query方法必须传一个非空对象作为参数！');
    }
    let entries = Object.entries(obj);
    if (entries.length === 0) {
        return Promise.reject('query方法必须传一个非空对象作为参数！');
    }
    let query = new AV.Query('Song');
    let array = entries[0];
    query.equalTo(array[0], array[1]);
    return query.find();
};
//更新对象
Song.updateSong = function(obj, objectId) {
    if (typeof obj !== 'object') {
        return Promise.reject('update方法必须传一个非空对象作为参数！');
    }
    let entries = Object.entries(obj);
    if (entries.length === 0) {
        return Promise.reject('提交参数为空，未做更改');
    }
    if (!objectId) {
        return Promise.reject('必须提供objectId');
    }
    let song = AV.Object.createWithoutData('Song', objectId);
    // 修改属性
    entries.forEach(array => {
        song.set(array[0], array[1]);
    });
    // 保存到云端
    return song.save();
}

export default Song