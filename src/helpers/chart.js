import echarts from 'echarts'

function recent(data) {
    let now = new Date();
    

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
        data: ['周一', '周二', '周三', '周四', '周五']
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            formatter: '{value} °C'
        }
    }],
    series: [{
        name: '访问量',
        type: 'line',
        data: [200, 1400, 1500, 1600, 1400],
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