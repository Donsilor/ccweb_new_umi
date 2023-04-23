import React, { Component } from 'react';
import { Modal, Button, Table } from 'antd';
import CCFormModal from '@/components/CCFormModal';
export default class details extends Component {
  addModal = React.createRef();
  state = {
    list: [],
  };
  componentDidMount() {
    this.handleSearch();
  }
  handleSearch = () => {
    httpCommonClient
      .post('/ScarserialAction_searchBrandSupplyChainRelVoList', { fldSerialid: this.props.record.fld_serialid })
      .then(({ data }) => {
        if (data.result == 0) {
          this.setState({ list: data.list });
        }
      });
  };
  columns = [
    { title: '已关联供应链', dataIndex: 'supplyChain' },
    {
      title: '操作',
      render: (text, record) => (
        <a
          onClick={() => {
            httpCommonClient
              .post(`/ScarserialAction_deleteBrandSupplyChainRel`, {
                id: record.id,
              })
              .then(({ data }) => {
                if (data.result == 0) {
                  message.success(data.msg);
                  this.handleSearch();
                } else {
                  message.error(data.msg);
                }
              });
          }}
        >
          删除
        </a>
      ),
    },
  ];
  render() {
    return (
      <Modal title="关联供应链" width="60%" onCancel={() => this.props.onCancel()} visible footer={null}>
        <Button
          type="primary"
          onClick={() => {
            this.addModal.current.show();
          }}
        >
          新增供应链
        </Button>
        <Table columns={this.columns} dataSource={this.state.list} pagination={false} />
        <CCFormModal
          title={`新增供应链`}
          ref={this.addModal}
          onFinal={() => this.handleSearch()}
          onSubmit={(formData) => {
            return httpCommonClient.post(`/ScarserialAction_addBrandSupplyChainRel`, {
              fldSerialid: this.props.record.fld_serialid,
              supplyChain: formData.supplyChain,
            });
          }}
          configList={[
            {
              label: '供应链名称',
              type: 'input',
              key: 'supplyChain',
              required: true,
            },
          ]}
        />
      </Modal>
    );
  }
}
