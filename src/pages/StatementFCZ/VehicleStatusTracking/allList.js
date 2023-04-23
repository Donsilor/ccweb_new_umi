import React, { Component } from 'react';
import { Modal } from 'antd';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import CCFormModal from '@/components/CCFormModal';
import * as formItems from '../formItems';
import { allListColumns } from '../Columns';
import { Space } from 'antd';
import { optionsArr, getCode } from '@/utils/dict';
import { exportFile } from '@/utils';
import RecordList from './recordList';
import ItemArea from './itemArea';
export default class View extends Component {
  tableRef = React.createRef();
  modalRef = React.createRef();
  state = {
    isExporting: false,
    showModal: false,
    custnameList: [],
    tradername: [],
    supervisor: [],
    remarkSituationCode: '',
    remarkReasonCode: '',
    record: {},
  };
  componentDidMount() {
    httpCommonClient.post(`/warning/v1.0/fangche/fangcheSupervisor/list`, {}).then(({ data = {} }) => {
      if (data.code === 200) {
        this.setState({ supervisor: data.data });
      }
    });
    httpCommonClient.post('/warning/v1.0/warning/supplyChain/list/selected', {}).then(({ data = {} }) => {
      this.setState({ tradername: data.data });
    });
  }
  render() {
    const { custnameList, record, supervisor, tradername, remarkSituationCode, remarkReasonCode, isExporting } = this.state;
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
          formKey={'/vehicleTracking/all'}
          enableExport
          isExporting={isExporting}
          onExport={(value) => {
            this.setState({ isExporting: true });
            httpBufferClient
              .submit('/warning/v1.0/fangche/vehicleStatusTracking/export/all', value)
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
                      httpCommonClient.post(`/warning/v1.0/sync/show/list/distributor/selected `, {}).then(({ data = {} }) => {
                        if (data.code === 200) {
                          const custnameList = [];
                          data.data.map((item) => custnameList.push({ ...item, name: item.custname, code: item.custname }));
                          this.setState({
                            record,
                            custnameList,
                            remarkSituationCode: record.remarkSituationCode,
                            remarkReasonCode: record.remarkReasonCode,
                          });
                          this.modalRef.current.show();
                        }
                      });
                    }}
                  >
                    修改{' '}
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
          tableKey={'/vehicleTracking/all'}
          formKey={'/vehicleTracking/all'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/warning/v1.0/fangche/vehicleStatusTracking/list/all', data, paging)
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
            params.remarkSituationCode = formData.remarkReason[0];
            params.remarkReasonCode = formData.remarkReason[1];
            delete params.remarkReason;
            return httpCommonClient.post('/warning/v1.0/fangche/vehicleStatusTracking/update', params);
          }}
          configList={[
            {
              showSearch: true,
              label: '经销商',
              type: 'select',
              key: 'custname',
              required: true,
              optionList: custnameList,
              onChange: (val, { item }) => {
                this.modalRef.current.setValue({ regulator: item.regulator, tradername: item.supplyChainList });
                if (_.isEmpty(item.supplyChainList)) {
                  httpCommonClient.post(`/warning/v1.0/warning/supplyChain/list/selected `, {}).then(({ data = {} }) => {
                    if (data.code === 200) {
                      this.setState({ tradername: data.data });
                    }
                  });
                } else {
                  this.setState({ tradername: item.supplyChainList });
                }
              },
              initialvalue: record.custname,
              disabled: record.syncCarId,
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
              type: 'select',
              key: 'tradername',
              required: true,
              optionList: tradername,
              initialvalue: record.tradername,
              disabled: record.syncCarId,
            },
            {
              label: '标识',
              type: 'input',
              key: 'identification',
              required: true,
              initialvalue: record.identification,
              disabled: record.syncCarId,
            },
            {
              label: '单价',
              type: 'inputNumber',
              key: 'unitprice',
              initialvalue: record.unitprice,
              disabled: record.syncCarId,
            },
            {
              label: '备注情况/原因',
              type: 'cascader',
              key: 'remarkReason',
              required: true,
              options: optionsArr(),
              fieldNames: { label: 'name', value: 'code' },
              initialvalue: [record.remarkSituationCode, record.remarkReasonCode],
              onChange: (val) => {
                this.setState({ remarkSituationCode: val[0], remarkReasonCode: val[1] });
              },
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
        <ItemArea onSearch={() => this.tableRef.current.reload()} />
      </>
    );
  }
}
