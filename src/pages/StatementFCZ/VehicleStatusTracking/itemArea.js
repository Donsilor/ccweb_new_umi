import React, { Component } from 'react';
import { Button, Space, Modal } from 'antd';
import OperationArea from '@/layouts/OperationArea';
import CCFormModal from '@/components/CCFormModal';
import { optionsArr } from '@/utils/dict';
import { history } from 'umi';
export default class record extends Component {
  modalRef = React.createRef();
  state = {
    custnameList: [],
    tradername: [],
  };
  render() {
    const { custnameList, tradername } = this.state;
    return (
      <>
        <CCFormModal
          title={'新建'}
          ref={this.modalRef}
          onFinal={() => {
            this.props.onSearch && this.props.onSearch();
            history.push('/vehicleTracking/all');
          }}
          onSubmit={(formData) => {
            const params = formData;
            params.remarkSituationCode = formData.remarkReason[0];
            params.remarkReasonCode = formData.remarkReason[1];
            delete params.remarkReason;
            if (params.remarkReasonCode == 'remark_situation_4_02' && !params.remarkContent) {
              Modal.info({
                title: '提示信息：',
                content: '当备注原因选择【赎错车换车】时，请填写备注内容为车架号',
              });
              this.modalRef.current.hideLoading();
            } else {
              return httpCommonClient.post('/warning/v1.0/fangche/vehicleStatusTracking/add/manual', params);
            }
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
                this.modalRef.current.setValue({ regulator: item.regulator });
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
            },
            {
              label: '监管方',
              type: 'input',
              key: 'regulator',
              disabled: true,
            },
            {
              label: '供应链',
              type: 'select',
              key: 'tradername',
              required: true,
              optionList: tradername,
            },
            {
              label: '标识',
              type: 'input',
              key: 'identification',
              required: true,
            },
            {
              label: '单价',
              type: 'inputNumber',
              key: 'unitprice',
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
            },
          ]}
        />
        <OperationArea>
          <Space size="large">
            <Button
              type="primary"
              onClick={() => {
                history.push('/vehicleTracking/improt');
              }}
            >
              导入
            </Button>
            <Button
              type="primary"
              onClick={() => {
                httpCommonClient.post(`/warning/v1.0/sync/show/list/distributor/selected `, {}).then(({ data = {} }) => {
                  if (data.code === 200) {
                    const custnameList = [];
                    data.data.map((item) => custnameList.push({ ...item, name: item.custname, code: item.custname }));
                    this.setState({ custnameList });
                    this.modalRef.current.show();
                  }
                });
              }}
            >
              新建
            </Button>
          </Space>
        </OperationArea>
      </>
    );
  }
}
