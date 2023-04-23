import React, { Component, useEffect, useState } from 'react';
import { connect } from 'umi';
import _ from 'lodash';
import saveAs from 'file-saver';
import { Tabs, Button, Modal } from 'antd';
import CCForm from '@/components/CCForm/index.jsx';
import { printManagementFormList } from '../formItems';
import { pmColumnList, pmExportHisColumnList, pmModalColumnList } from '../columns';
import { ContentArea } from '@/layouts/ViewWrapper';
import PrintManagementCell from './PrintManagementCell.jsx';
import OperationArea from '@/layouts/OperationArea';
import Icon from '@/components/Icon';
import last from 'lodash/last';

const confirm = Modal.confirm;

const { TabPane } = Tabs;
const tabList = [
  {
    name: '初始转入',
    key: 'initialTransferIn',
    url: 'BondPrintAction_getInitTurnInList',
    countKey: 'initTurnIn',
    exportAdditionalParam: { type: 1 }, // 导出需要的额外参数
  },
  {
    name: '追加转入',
    key: 'supplementaryTransferIn',
    url: 'BondPrintAction_getAddTurnInList',
    countKey: 'addTurnIn',
    exportAdditionalParam: { type: 2 },
  },
  {
    name: '活期初始',
    key: 'currentInit',
    url: 'BondPrintAction_getCurrentInitList',
    countKey: 'currentInit',
    exportAdditionalParam: { type: 3 },
  },
  {
    name: '活期追加',
    key: 'currentSupplement',
    url: 'BondPrintAction_getCurrentAddList',
    countKey: 'currentAdd',
    exportAdditionalParam: { type: 4 },
  },
  {
    name: '转出',
    key: 'transferOut',
    url: 'BondPrintAction_getTurnOutList',
    countKey: 'turnOut',
  },
  {
    name: '导出历史',
    key: 'transferOutHis',
    url: 'BondPrintAction_getExportHistoryList',
  },
];

function PrintManagement({ query }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabCountList, setTabCountList] = useState([]);
  const [isExporing, setIsExporting] = useState(false);
  const tabListRef = tabList.map((tab) => React.createRef());
  const handleSearch = (value) => {
    reloadTabCount(value);
    reloadTableList();
  };
  const handleExport = () => {
    const { brandName, distributorName } = query;
    if (isExporing) {
      return;
    }
    const currentTab = tabList[tabIndex];
    const url = currentTab.key === 'transferOut' ? 'BondPrintAction_exportBondTurnOut' : 'BondPrintAction_exportBondTurnIn';
    const params = Object.assign({}, { brandName, distributorName }, currentTab.exportAdditionalParam);
    confirm({
      title: '确定要导出这些数据吗?',
      onOk() {
        const hide = message.loading('导出中，请稍后', 0);
        setIsExporting(true);
        exportDataFunc(url, params).then(() => {
          hide();
          setIsExporting(false);
        });
      },
    });
  };
  const onTabChange = (activeKey) => {
    const index = tabList.findIndex((tab) => tab.key === activeKey);
    setTabIndex(index);
  };
  const reloadTabCount = async (value) => {
    const params = {
      brandName: value.brandName,
      distributorName: value.distributorName,
    };
    try {
      const { data } = await httpFormClient.formSubmit('/BondPrintAction_getBondCount', 'bpQuery', params);
      // {"initTurnIn":14,"addTurnIn":4,"currentInit":1,"currentAdd":1,"turnOut":3,"result":0,"msg":"执行成功"}
      if (data.result === 0) {
        const _tabCountList = tabList.slice(0, -1).map((tab) => data[tab.countKey] || 0);
        setTabCountList(_tabCountList);
      } else {
        throw new Error(data.msg);
      }
    } catch (error) {
      message.info(error.message || error || '对不起，接口异常');
    }
  };

  const reloadTableList = () => {
    tabListRef[tabIndex]?.current?.reload();
  };

  useEffect(() => {
    reloadTableList();
  }, [tabIndex]);

  return (
    <>
      <CCForm group={printManagementFormList} onSearch={handleSearch} formKey={'printManagement'} />
      <ContentArea>
        <Tabs defaultActiveKey={tabList[0].key} onChange={onTabChange}>
          {tabList.map((tab, index) => (
            <TabPane tab={`${tab.name}${tabCountList[index] ? `(${tabCountList[index]})` : ''}`} key={tab.key}>
              <PrintManagementCell
                columns={tab.key === 'transferOutHis' ? pmExportHisColumnList : pmColumnList}
                tableKey={tab.key}
                url={tab.url}
                ref={tabListRef[index]}
              />
            </TabPane>
          ))}
        </Tabs>
      </ContentArea>
      <OperationArea>
        {tabIndex !== 4 && tabIndex !== 5 && (
          <Button
            type="primary"
            icon={<Icon type="export" style={{ color: 'white' }} />}
            onClick={handleExport}
            loading={isExporing}
            style={{ width: '96px' }}
          >
            {isExporing ? '导出中' : '导出'}
          </Button>
        )}
      </OperationArea>
    </>
  );
}

const mapStateToProps = (store) => {
  return {
    query: _.get(store.form, 'value.printManagement'),
  };
};
export default connect(mapStateToProps)(PrintManagement);

export function exportDataFunc(url, params) {
  return httpFormClient
    .formSubmit(url, 'bpQuery', params)
    .then(({ data }) => {
      if (data.result === 0) {
        message.success('导出成功', 2.5);
        let filePath = data.filePath;
        const index = filePath.indexOf('.com/') + 4;
        if (!filePath.includes(window.location.origin)) {
          filePath = `${window.location.origin}${filePath.slice(index)}`;
        }
        saveAs(filePath, last(data.filePath.split('/')));
      } else {
        throw new Error(data.msg);
      }
    })
    .catch((err) => {
      return message.error(err.message || '导出失败，请重试', 2.5);
    });
}
