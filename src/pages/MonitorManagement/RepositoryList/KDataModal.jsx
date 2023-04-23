import React, { Component } from 'react';
import { Modal } from 'antd';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { CandlestickChart } from 'echarts/charts';
import { DataZoomComponent, GridComponent, LegendComponent, TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LegendComponent,
  CandlestickChart,
  CanvasRenderer,
]);
class KDataModal extends Component {
  state = {
    kCharts: {},
    modalShown: false,
    loading: false,
    record: {},
  };
  show = (record) => {
    if (!record.id) {
      message.error('数据异常，缺少id');
      return;
    }
    this.setState({
      modalShown: true,
      record,
    });
    this.fetchData(record);
  };
  fetchData = async (record) => {
    this.setState({
      loading: true,
    });
    try {
      const { data: resData } = await httpCommonClient.post('/WhareHouseAction_getWhareHouseKData', { id: record.id });
      if (resData.result === 0 && Array.isArray(resData.list)) {
        let data = [];
        let realCnt = [];
        let categoryData = [];
        resData.list.forEach((item) => {
          const itemDate = item.createTime && formatTime(item.createTime);
          // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
          data.push([item.openNumber, item.closeNumber ? item.closeNumber : item.realNumber, item.minNumber, item.maxNumber]);
          realCnt.push(item.realNumber);
          categoryData.push(itemDate);
        });
        this.setState({
          loading: false,
          kCharts: {
            showKChartsModal: true,
            data: data,
            realCnt: realCnt,
            categoryData: categoryData,
          },
        });
      } else {
        throw new Error(resData.msg);
      }
    } catch (e) {
      message.error(e.message || e || '对不起，查询失败');
      this.setState({
        kCharts: {
          showKChartsModal: false,
        },
        loading: false,
      });
    }
  };
  getKOption = () => {
    const { data, realCnt, categoryData } = this.state.kCharts;
    let rate = 0;
    if (categoryData && categoryData.length > 30) {
      rate = (30 / categoryData.length) * 100;
    }

    var upColor = '#ec0000';
    var upBorderColor = '#8A0000';
    var downColor = '#00da3c';
    var downBorderColor = '#008F28';

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      legend: {
        data: ['日K', '实际在库车辆数'],
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '20%',
      },
      xAxis: {
        type: 'category',
        data: categoryData,
        scale: true,
        boundaryGap: true,
        axisLine: { onZero: false },
        splitLine: { show: false },
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax',
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: rate,
          end: 100,
        },
        {
          show: true,
          type: 'slider',
          y: '90%',
          start: rate,
          end: 100,
        },
      ],
      series: [
        {
          // dimensions: ['日期', '最高', '最低', null, null],
          name: '日K',
          type: 'candlestick',
          data: data,
          itemStyle: {
            color: upColor,
            color0: downColor,
            borderColor: upBorderColor,
            borderColor0: downBorderColor,
          },
        },
        {
          name: '实际在库车辆数',
          type: 'line',
          data: realCnt,
          lineStyle: {
            normal: { opacity: 0.5 },
          },
        },
      ],
    };

    return option;
  };
  handleCancel = () => {
    this.setState({
      modalShown: false,
    });
  };
  render() {
    const { modalShown, loading } = this.state;
    return (
      <Modal title="K线图" visible={modalShown} onCancel={this.handleCancel}>
        <ReactEcharts echarts={echarts} showLoading={loading} option={this.getKOption()} notMerge={true} lazyUpdate={true} />
      </Modal>
    );
  }
}

export default KDataModal;
