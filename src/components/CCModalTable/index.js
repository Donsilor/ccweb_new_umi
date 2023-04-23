import React, { Component } from 'react';
import { Modal } from 'antd';
import CCTable from '@/components/CCTable';

class CCModalTable extends Component {
  state = {
    modalShown: false,
    confirmLoading: false,
    record: {},
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
  handleModalOk = () => {};

  render() {
    const { title, width = 1100, tableFilter, fetchFunc, columns, rowKey, pagination } = this.props;
    const { modalShown, confirmLoading, record } = this.state;
    return (
      <Modal
        title={title}
        width={width}
        visible={modalShown}
        onOk={this.handleModalOk}
        onCancel={this.handleCancel}
        confirmLoading={confirmLoading}
        {...this.props}
      >
        <CCTable
          ref={this.tableRef}
          columns={columns}
          query={record}
          tableFilter={tableFilter}
          fetchFunc={fetchFunc}
          rowKey={rowKey}
          pagination={pagination}
        />
      </Modal>
    );
  }
}

export default CCModalTable;
