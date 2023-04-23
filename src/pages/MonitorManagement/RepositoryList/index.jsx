import React, { Component } from 'react';
import { Divider, Table } from 'antd';
import CCTable from '@/components/CCTable';
import CCModalTable from '@/components/CCModalTable';
import { ViewWrapper } from '@/layouts/ViewWrapper';
import { repoListColumns, repoListSubColumns, logModalColumns } from './columns';
import RepositoryEditFormModal from './RepositoryEditFormModal';
import KDataModal from './KDataModal';

class RepositoryList extends Component {
  state = {
    loading: false,
    factory: {},
    expandedRow: [],
    expandedSubRow: {},
  };

  tableRef = React.createRef();
  modalFormRef = React.createRef();
  kDataModalRef = React.createRef();
  logModalRef = React.createRef();

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    this.tableRef.current.reload();
  };
  expandedRegionRender = (factory) => {
    const expandedSubRowColumn = [
      ...repoListSubColumns,
      {
        title: '操作',
        dataIndex: 'action',
        align: 'left',
        render: (text, record) => <a onClick={this.updateCameraCode(record.serialNumber)}>影像明细</a>,
      },
    ];
    const id = factory.id;
    const data = this.state.expandedSubRow[id];

    return (
      <ViewWrapper style={{ 'min-height': '100px' }}>
        <Table
          loading={this.state.loading && id === this.state.factory.id}
          columns={expandedSubRowColumn}
          dataSource={data}
          rowKey="id"
          pagination={false}
        />
      </ViewWrapper>
    );
  };
  handleExpand = (expanded, record) => {
    if (expanded) {
      const { id } = record;
      const { expandedRow, expandedSubRow } = this.state;

      if (!expandedRow.includes(id)) {
        expandedRow.push(record.id);

        httpFormClient
          .formSubmit('/WhareHouseAction_findCameraListByWhareHouse', '', {
            whareHouseId: id,
          })
          .then(({ data }) => {
            this.setState({
              factory: record,
              expandedRow,
              expandedSubRow: {
                ...expandedSubRow,
                [id]: data.list || [],
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  edit = (record) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.modalFormRef.current.show(record);
  };
  getKData = (record) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.kDataModalRef.current.show(record);
  };
  getRepoRecord = (record) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.logModalRef.current.show(record);
  };

  getColumns = () => {
    const operationColumn = {
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 160,
      render: (text, record) => {
        return (
          <>
            <a>查看</a>
            <Divider type="vertical" />
            <a onClick={this.edit(record)}>修改</a>
            <Divider type="vertical" />
            <a onClick={this.getKData(record)}>k线图</a>
            <Divider type="vertical" />
            <a onClick={this.getRepoRecord(record)}>操作日志</a>
          </>
        );
      },
    };
    return [...repoListColumns, operationColumn];
  };

  updateCameraCode = (code) => () => {
    this.props.history.push('/repositoryList/detail', { code });
  };

  render() {
    return (
      <>
        <CCTable
          ref={this.tableRef}
          columns={this.getColumns()}
          expandedRowRender={this.expandedRegionRender}
          expandRowByClick
          onExpand={this.handleExpand}
          fetchFunc={(data, paging) => httpFormClient.formSubmit('/WhareHouseAction_findWhareHouseList', '', {}, paging)}
          rowKey={(record) => `${record.id},${record.code}`}
          indentSize={0}
        />
        <RepositoryEditFormModal ref={this.modalFormRef} reload={this.handleSearch} />
        <KDataModal ref={this.kDataModalRef} />
        <CCModalTable
          title={'操作日志'}
          ref={this.logModalRef}
          footer={null}
          columns={logModalColumns}
          rowKey={'updateTime'}
          tableFilter={(record) => ({ whareHouseId: record.id })}
          fetchFunc={(data, paging) => httpCommonClient.post('/WhareHouseAction_findWhareHouseRecord', { ...data, ...paging })}
        />
      </>
    );
  }
}

export default RepositoryList;
