import React, { Component } from 'react';
import { Modal } from 'antd';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import * as formItems from '../formItems';
import CCFormModal from '@/components/CCFormModal';
import { carListColumns } from '../Columns';
import { optionsArr } from '@/utils/dict';
import ItemArea from './itemArea';
export default class View extends Component {
  tableRef = React.createRef();
  modalRef = React.createRef();
  state = {
    record: {},
  };
  render() {
    const { record } = this.state;
    return (
      <>
        <CCForm
          group={[formItems.经销商, formItems.标识, formItems.业务编号]}
          onSearch={() => this.tableRef.current.reload()}
          formKey={'/vehicleTracking/car'}
        />
        <CCStoreTable
          columns={[
            ...carListColumns,
            {
              title: '操作',
              fixed: 'right',
              render: (text, record) => (
                <a
                  onClick={() => {
                    this.setState({ record });
                    this.modalRef.current.show();
                  }}
                >
                  保存
                </a>
              ),
            },
          ]}
          tableKey={'/vehicleTracking/car'}
          formKey={'/vehicleTracking/car'}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/warning/v1.0/fangche/vehicleStatusTracking/list/car', data, paging)
          }
          ref={this.tableRef}
        />
        <CCFormModal
          title={'保存'}
          ref={this.modalRef}
          onFinal={() => this.tableRef.current.reload()}
          onSubmit={(formData) => {
            const params = {};
            params.remarkSituationCode = formData.remarkReason[0];
            params.remarkReasonCode = formData.remarkReason[1];
            params.remarkContent = formData.remarkContent;
            params.syncCarId = record.id;
            if (params.remarkReasonCode == 'remark_situation_4_02' && !params.remarkContent) {
              Modal.info({
                title: '提示信息：',
                content: '当备注原因选择【赎错车换车】时，请填写备注内容为车架号',
              });
              this.modalRef.current.hideLoading();
            } else {
              return httpCommonClient.post('/warning/v1.0/fangche/vehicleStatusTracking/add/selected', params);
            }
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
              label: '备注情况/原因',
              type: 'cascader',
              key: 'remarkReason',
              required: true,
              options: optionsArr(),
              fieldNames: { label: 'name', value: 'code' },
              initialvalue: ['remark_situation_1'],
            },
            {
              label: '备注内容',
              type: 'input',
              key: 'remarkContent',
              initialvalue: record.remarkContent,
            },
          ]}
        />
        <ItemArea />
      </>
    );
  }
}
