import React, { Component } from 'react';
import { Space, Modal } from 'antd';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import CCFormModal from '@/components/CCFormModal';
import * as formItems from '../formItems';
import { allListColumns } from '../Columns';
import { getCode } from '@/utils/dict';
import RecordList from './recordList';
import ItemArea from './itemArea';
import { exportFile } from '@/utils';
export default class View extends Component {
  tableRef = React.createRef();
  modalRef = React.createRef();
  state = {
    isExporting: false,
    showModal: false,
    record: {},
    supervisor: [],
    tradername: [],
  };
  componentDidMount() {
    httpCommonClient.post(`/warning/v1.0/fangche/fangcheSupervisor/list`, {}).then(({ data = {} }) => {
      if (data.code === 200) {
        this.setState({ supervisor: data.data });
      }
    });
    httpCommonClient
      .postWithPaging('/warning/v1.0/warning/supplyChain/list', {}, { pageNum: 1, pageSize: 500 })
      .then(({ data = {} }) => {
        this.setState({ tradername: data.data.list });
      });
  }
  render() {
    const { record, supervisor, tradername, remarkSituationCode, remarkReasonCode, isExporting } = this.state;
    return (
      <>
        <CCForm
          group={[
            formItems.经销商,
            formItems.监管方(supervisor, 'regulator'),
            formItems.标识,
            formItems.实际情况押品状态,
            formItems.发车状态,
            formItems.供应链名称(tradername),
            formItems.业务编号,
            formItems.备注情况(getCode('remark_situation')),
          ]}
          onSearch={() => this.tableRef.current.reload()}
          formKey={'/vehicleTracking/track'}
          enableExport
          isExporting={isExporting}
          onExport={(value) => {
            this.setState({ isExporting: true });
            httpBufferClient
              .submit('/warning/v1.0/fangche/vehicleStatusTracking/export/tracking', value)
              .then((payload) => {
                exportFile(payload);
                this.setState({ isExporting: false });
              })
              .catch((err) => {
                message.error('系统异常');
                this.setState({ isExporting: false });
              });
          }}
        />
        <CCStoreTable
          columns={[
            ...allListColumns,
            {
              title: '操作',
              fixed: 'right',
              render: (text, record) => (
                <Space>
                  <a
                    onClick={() => {
                      this.setState({
                        record,
                        remarkSituationCode: record.remarkSituationCode,
                        remarkReasonCode: record.remarkReasonCode,
                      });
                      this.modalRef.current.show();
                    }}
                  >
                    跟踪{' '}
                  </a>
                  <a
                    onClick={() => {
                      this.setState({ record, showModal: true });
                    }}
                  >
                    日志{' '}
                  </a>
                </Space>
              ),
            },
          ]}
          tableKey={'/vehicleTracking/track'}
          formKey={'/vehicleTracking/track'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/warning/v1.0/fangche/vehicleStatusTracking/list/tracking', data, paging)
          }
          ref={this.tableRef}
        />
        <CCFormModal
          title={'修改'}
          ref={this.modalRef}
          onFinal={() => this.tableRef.current.reload()}
          onSubmit={(formData) => {
            const params = formData;
            params.id = record.id;
            return httpCommonClient.post('/warning/v1.0/fangche/vehicleStatusTracking/update/tracking', params);
          }}
          configList={[
            {
              label: '经销商',
              type: 'input',
              key: 'custname',
              initialvalue: record.custname,
              disabled: true,
            },
            {
              label: '监管方',
              type: 'input',
              key: 'regulator',
              initialvalue: record.regulator,
              disabled: true,
            },
            {
              label: '供应链',
              type: 'input',
              key: 'tradername',
              initialvalue: record.tradername,
              disabled: true,
            },
            {
              label: '标识',
              type: 'input',
              key: 'identification',
              initialvalue: record.identification,
              disabled: true,
            },
            {
              label: '单价',
              type: 'input',
              key: 'unitprice',
              initialvalue: record.unitprice,
              disabled: true,
            },
            {
              label: '备注情况',
              type: 'input',
              key: 'remarkSituationName',
              initialvalue: record.remarkSituationName,
              disabled: true,
            },
            {
              label: '备注原因',
              type: 'input',
              key: 'remarkReasonName',
              initialvalue: record.remarkReasonName,
              disabled: true,
            },
            {
              label: '备注内容',
              type: 'input',
              key: 'remarkContent',
              initialvalue: record.remarkContent,
            },
            remarkSituationCode == 'remark_situation_1' && {
              label: '跟踪结果',
              type: 'select',
              key: 'trackingResultCode',
              optionList: [
                { name: '收回质押物', code: 'tracking_result_1' },
                { name: '空', code: '' },
              ],
              initialvalue: record.trackingResultCode,
            },
            remarkSituationCode == 'remark_situation_3' &&
              remarkReasonCode == 'remark_situation_3_01' && {
                label: '跟踪结果',
                type: 'select',
                key: 'trackingResultCode',
                optionList: [
                  { name: '非我行质押车', code: 'tracking_result_2' },
                  { name: '空', code: '' },
                ],
                initialvalue: record.trackingResultCode,
              },
          ]}
        />
        {this.state.showModal && (
          <Modal title={'操作日志'} visible onCancel={() => this.setState({ showModal: false })} footer={null} width="75%">
            <RecordList record={record} />
          </Modal>
        )}
        <ItemArea />
      </>
    );
  }
}
