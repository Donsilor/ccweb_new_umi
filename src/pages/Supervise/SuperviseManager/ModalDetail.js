import React, { Component } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import CCTable from '@/components/CCTable';
import { managerDetailModalColumns } from '../columns';
import moment from 'moment';
import exportExcel from './index';

class ModalDetail extends Component {
  state = {
    modalShown: false,
    exportBtnLoading: false,
    confirmBtnLoading: false,
    record: {},
    generationFinished: false,
  };
  tableRef = React.createRef();
  show = (record) => {
    this.setState(
      {
        modalShown: true,
        record,
      },
      () => {
        this.tableRef.current?.reload();
      },
    );
  };
  handleCancel = () => {
    this.setState({
      modalShown: false,
    });
  };

  fetchFunc = (data, paging) =>
    httpCommonClient.post('/SuperviseAction_getLog', {
      logRecordId: this.state.record?.id,
      ...paging,
    });
  exportFunc = (type) => async () => {
    const { exportBtnLoading, record } = this.state;
    if (exportBtnLoading) {
      return;
    }
    this.setState({
      exportBtnLoading: true,
    });
    const params = {
      logRecordId: record.id,
      pageNum: 1,
      pageSize: 10000,
    };
    try {
      const { data } = await httpCommonClient.post('/SuperviseAction_getLog', params);
      if (!data || data.result !== 0) {
        throw new Error(data.msg);
      }
      let fileDate = '';
      if (type == 'log') {
        fileDate = moment.unix(new Date(record.createdTime).getTime() / 1000).format('YYYYMMDD');
      } else {
        fileDate = moment().format('YYYYMMDD');
      }
      // this.exportExcel(Array.isArray(data.list) ? data.list : [], fileDate);
      const list = !Array.isArray(data.list)
        ? []
        : data.list.map((item) => [
            fileDate,
            item.company,
            item.brand,
            item.dealer,
            item.vin,
            item.isSpecial === 1 ? '是' : '否',
          ]);
      const columns = ['抽查日期', '监管公司', '品牌', '经销商名称', '车架号', '是否特殊名单'];
      const fileName = fileDate + '.xlsx';
      const sheetName = '抽查名单';
      await exportExcel(list, columns, fileName, sheetName);
      this.setState({
        exportBtnLoading: false,
      });
    } catch (error) {
      this.setState({
        exportBtnLoading: false,
      });
      message.error(error.message || error || '对不起，导出失败');
    }
  };
  generateConfirm = async () => {
    const { confirmBtnLoading, record } = this.state;
    if (confirmBtnLoading) {
      return;
    }
    this.setState({
      confirmBtnLoading: true,
    });
    try {
      const { data } = await httpCommonClient.post('/SuperviseAction_confirmSupervision', { id: record.logRecordId });
      if (data && data.result === 0) {
        this.setState({
          confirmBtnLoading: false,
          generationFinished: true,
        });
      } else {
        throw new Error(data.msg);
      }
    } catch (error) {
      message.error(error.message || error || '对不起，接口调用失败');
      this.setState({
        confirmBtnLoading: false,
      });
    }
  };

  render() {
    const { modalShown, record, exportBtnLoading, generationFinished, confirmBtnLoading } = this.state;
    const { normalDealerCnt, normalVehicleCnt, specialDealerCnt, specialVehicleCnt, isPreGenerate } = record;
    return (
      <Modal title={''} width={1100} footer={null} visible={modalShown} onCancel={this.handleCancel}>
        <Row style={{ margin: '15px 0' }}>
          <Col span={11} style={{ border: '2px solid #1D9F2A', padding: 15, borderRadius: 10 }}>
            <Row>本次普通抽查情况</Row>
            <Row>
              <Col span={4}>经销商数：</Col>
              <Col span={20}>{normalDealerCnt}</Col>
            </Row>
            <Row>
              <Col span={4}>车辆数：</Col>
              <Col span={20}>{normalVehicleCnt}</Col>
            </Row>
          </Col>
          <Col span={2} />
          <Col span={11} style={{ border: '2px solid #1D9F2A', padding: 15, borderRadius: 10 }}>
            <Row>
              <Col span={12}>特殊名单抽查情况</Col>
            </Row>
            <Row>
              <Col span={4}>经销商数：</Col>
              <Col span={20}>{specialDealerCnt}</Col>
            </Row>
            <Row>
              <Col span={4}>车辆数：</Col>
              <Col span={20}>{specialVehicleCnt}</Col>
            </Row>
          </Col>
        </Row>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {isPreGenerate && (
            <Button
              size="middle"
              type="primary"
              onClick={this.generateConfirm}
              disabled={generationFinished}
              loading={confirmBtnLoading}
              style={{ marginRight: '20px' }}
            >
              确认生成
            </Button>
          )}
          <Button
            size="middle"
            type="primary"
            onClick={this.exportFunc(isPreGenerate ? 'generate' : 'log')}
            loading={exportBtnLoading}
          >
            导出
          </Button>
        </div>
        <CCTable ref={this.tableRef} columns={managerDetailModalColumns} fetchFunc={this.fetchFunc} />
      </Modal>
    );
  }
}

export default ModalDetail;
