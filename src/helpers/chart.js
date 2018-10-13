import echarts from 'echarts'

const helper = {
    recent(data) {
        let strs = [];
        let today = new Date();
        let array = [today]
        let now = today.getTime();
        for (let i = 0; i < data - 1; i++) {
            let time = now - (1000 * 60 * 60 * 24) * (i + 1);
            let obj = new Date(time);
            array.push(obj);
        }
        array.forEach(obj => {
            strs.unshift(this.formatDate(obj));
        });
        return strs;
    },

    formatDate(obj) {
        let year = obj.getFullYear();
        let month = obj.getMonth() + 1;
        let date = obj.getDate();
        return `${year}/${month}/${date}`
    },

    random(m, n) {
        return Math.floor(Math.random() * (m - n + 1) + n);
    }
}

const option = {
    title: {
        text: '近五日网站访问量统计',
        subtext: '虚拟数据'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['访问量']
    },
    calculable: true,
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: helper.recent(5)
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            formatter: '{value}'
        }
    }],
    series: [{
        name: '访问量',
        type: 'line',
        data: [helper.random(100, 1000), helper.random(100, 1000), helper.random(100, 1000), helper.random(100, 1000), helper.random(100, 1000)],
        markPoint: {
            data: [
                { type: 'max', name: '最大值' }
            ]
        },
        markLine: {
            data: [
                { type: 'average', name: '平均值' }
            ]
        }
    }, ]
};
class Chart {
    constructor(el) {
        if (typeof el === 'string') {
            this.dom = document.querySelector(el);
        }
        if (typeof el === 'object') {
            this.dom = el;
        }
    }
    axis() {
        echarts.init(this.dom).setOption(option);
    }
}

export default Chart