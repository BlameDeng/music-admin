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

Sheet.fetchAllSheets = function() {
    let query = new AV.Query('Sheet');
    return query.find();
}

export default Sheet