import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import OperationArea from '@/layouts/OperationArea';
import CCFormModal from '@/components/CCFormModal';
import * as formItems from '../formitems';
import _ from 'lodash';
const { confirm } = Modal;
export default class list extends Component {
  tableRef = React.createRef();
  modModal = React.createRef();
  state = {
    disList: [],
    brandList: [],
    supplyChainList: [],
  };
  componentDidMount() {
    httpCommonClient.post(`/taxcontrol/v1.0/organization/distributorBrandSupply/list/distributor`, {}).then(({ data = {} }) => {
      if (data.errorCode == '00000') {
        const disList = [];
        data.data.map((item) => disList.push({ name: item.distributorName, code: item.id }));
        this.setState({ disList });
      } else {
        message.error(data.message);
      }
    });
  }
  render() {
    const { disList, brandList, supplyChainList } = this.state;
    return (
      <>
        <CCForm group={[formItems.经销商]} formKey={'/brandModel/more'} onSearch={() => this.tableRef.current.reload()} />
        <CCStoreTable
          tableKey={'/brandModel/more'}
          formKey={'/brandModel/more'}
          columns={[
            { title: '经销商', dataIndex: 'distributorName' },
            { title: '品牌', dataIndex: 'brandName' },
            { title: '供应链', dataIndex: 'supplyChain' },
            {
              title: '操作',
              render: (text, record) => (
                <a
                  onClick={() => {
                    let self = this;
                    confirm({
                      title: '请确认是否删除?',
                      onOk() {
                        httpCommonClient
                          .post(`/taxcontrol/v1.0/organization/distributorBrandSupply/delete`, {
                            id: record.id,
                          })
                          .then(({ data = {} }) => {
                            if (data.errorCode == '00000') {
                              message.success(data.message);
                            } else {
                              message.error(data.message);
                            }
                            self.tableRef.current.reload();
                          });
                      },
                    });
                  }}
                >
                  删除
                </a>
              ),
            },
          ]}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging('/taxcontrol/v1.0/organization/distributorBrandSupply/list', data, paging)
          }
          ref={this.tableRef}
        />
        <CCFormModal
          title="新增规则"
          ref={this.modModal}
          onFinal={() => {
            this.tableRef.current.reload();
          }}
          onSubmit={(formData) => {
            return httpCommonClient.post('/taxcontrol/v1.0/organization/distributorBrandSupply/add', formData);
          }}
          configList={[
            {
              showSearch: true,
              label: '经销商',
              type: 'select',
              key: 'distributorId',
              optionList: disList,
              required: true,
              onChange: (val) => {
                this.modModal.current.setValue({ brandId: [], supplyChain: [] });
                httpCommonClient
                  .post(`/taxcontrol/v1.0/organization/distributorBrandSupply/list/brand`, { distributorId: val })
                  .then(({ data }) => {
                    if (data.errorCode == '00000') {
                      const options = [];
                      data.data.map((item) => options.push({ name: item.fldSerial, code: item.fldSerialid }));
                      this.setState({ brandList: options });
                    } else {
                      message.error(data.message);
                    }
                  });
              },
            },
            {
              showSearch: true,
              label: '品牌',
              type: 'select',
              key: 'brandId',
              optionList: brandList,
              required: true,
              onChange: (val) => {
                this.modModal.current.setValue({ supplyChain: [] });
                httpCommonClient
                  .post(`/taxcontrol/v1.0/organization/distributorBrandSupply/list/supplyChain`, { fldSerialid: val })
                  .then(({ data }) => {
                    if (data.errorCode == '00000') {
                      const options = [];
                      data.data.map((item) => options.push({ name: item.v, code: item.v }));
                      this.setState({ supplyChainList: options });
                    } else {
                      message.error(data.message);
                    }
                  });
              },
            },
            {
              showSearch: true,
              label: '供应链',
              type: 'select',
              key: 'supplyChain',
              optionList: supplyChainList,
              required: true,
            },
          ]}
        />
        <OperationArea>
          <Button
            type="primary"
            onClick={() => {
              this.modModal.current.show();
            }}
          >
            新增规则
          </Button>
        </OperationArea>
      </>
    );
  }
}
