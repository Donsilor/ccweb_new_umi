import React, { Component } from 'react';
import { Tabs, Modal } from 'antd';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { 生成日期 } from '../formItems';
const { TabPane } = Tabs;
export default class view extends Component {
  tableRef = React.createRef();
  formRef = React.createRef();
  state = {
    tabs: [],
    tabIndex: '虚出库',
  };
  columns = [
    { title: '台账名称', dataIndex: 'ledgerName' },
    { title: '生成时间', dataIndex: 'generateTime' },
    { title: '累计下载', dataIndex: 'downloadTimes' },
    {
      title: '操作',
      render: (text, record) => (
        <a
          onClick={() => {
            if (!record.fileUrl) {
              Modal.info({
                title: '提示信息：',
                content: '文件尚未生成，请稍后下载！',
              });
            } else {
              httpCommonClient
                .post(`/warning/v1.0/fangche/fangcheLedger/update/downloadTimes`, { id: record.id })
                .then(({ data = {} }) => {
                  if (data.code === 200) {
                    this.handleSearch();
                  }
                });
              let a = document.createElement('a');
              a.href = `/warning${record.fileUrl}`;
              a.click();
            }
          }}
        >
          下载
        </a>
      ),
    },
  ];
  componentDidMount() {
    httpCommonClient.post(`/warning/v1.0/fangche/fangcheLedger/tab/list`, {}).then(({ data = {} }) => {
      if (data.code === 200) {
        this.setState({
          tabs: data.data,
        });
      }
    });
  }
  render() {
    const { tabs, tabIndex } = this.state;
    return (
      <>
        <div className="ccTableArea">
          <Tabs
            defaultActiveKey="虚出库"
            onChange={(key) => {
              this.setState({ tabIndex: key }, () => {
                this.tableRef.current.reload();
              });
            }}
          >
            {tabs.map((item) => (
              <TabPane tab={item} key={item}></TabPane>
            ))}
          </Tabs>
        </div>
        <CCForm
          ref={this.formRef}
          group={[生成日期]}
          formKey={'ledgerFCZ_sync'}
          onSearch={() => this.tableRef.current.reload()}
        />
        <CCStoreTable
          tableKey={'ledgerFCZ_sync'}
          formKey={'ledgerFCZ_sync'}
          columns={this.columns}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging(
              '/warning/v1.0/fangche/fangcheLedger/sync/list',
              { ...data, ledgerName: tabIndex },
              paging,
            )
          }
          ref={this.tableRef}
        />
      </>
    );
  }
}
