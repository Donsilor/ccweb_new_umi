import React, { useEffect, useState, useRef } from 'react';
import { Tabs, DatePicker } from 'antd';
import CCForm from '@/components/CCForm/index.jsx';
import { ContentArea } from '@/layouts/ViewWrapper';
import CCStoreTable from '@/components/CCStoreTable';
import { httpCommonClient } from '@/utils/axios';
import { amountDistributorColumns, amountCarColumns } from '../columns';
import moment from 'moment';
import { useSelector } from 'umi';
import _ from 'lodash';
import exportExcelFunc from '@/pages/Supervise';

const { TabPane } = Tabs;

const tabList = [
  {
    name: '经销商',
    key: 'distributor',
    url: 'SuperviseAction_dealerAmount',
  },
  {
    name: '车辆',
    key: 'vehicle',
    url: 'SuperviseAction_vehicleAmount',
  },
];

function SuperviseAmount() {
  const [tabIndex, setTabIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [ifCurrentMonth, setIfCurrentMonth] = useState(true);
  const tabListRef = tabList.map((tab) => React.createRef());

  const handleSearch = (value) => {
    if (value?.theMonth) {
      setIfCurrentMonth(moment().isSame(moment(value.theMonth), 'month'));
    }
    reload();
  };

  const reload = () => {
    tabListRef[tabIndex].current?.reload();
  };

  useEffect(() => {
    reload();
  }, [tabIndex]);

  const onTabChange = (activeKey) => {
    const index = tabList.findIndex((tab) => tab.key === activeKey);
    setTabIndex(index);
  };
  const fetchFunc = (url) => (data, paging) => {
    return httpCommonClient.post(
      url,
      Object.assign({}, { theMonth: data.theMonth ? moment(data.theMonth).format('YYYYMM') : '' }, paging),
    );
  };
  const renderColumns = (tabKey) => {
    const columns = tabKey === 'distributor' ? amountDistributorColumns.slice() : amountCarColumns.slice();
    if (!ifCurrentMonth) {
      columns.pop();
    }
    return columns;
  };
  const handleExport = async (query) => {
    const { theMonth } = query || {};
    const fileDate = moment(theMonth).format('YYYYMM');
    if (isExporting) {
      return;
    }
    setIsExporting(true);
    try {
      const { data } = await httpCommonClient.post(
        tabIndex === 0 ? '/SuperviseAction_dealerAmount' : '/SuperviseAction_vehicleAmount',
        {
          theMonth: fileDate,
          pageNum: 1,
          pageSize: 10000,
        },
      );
      if (data.result === 0 && Array.isArray(data.list)) {
        exportExcel(data.list, fileDate);
      } else {
        throw new Error(data.msg);
      }
    } catch (error) {
      message.error(error.message || error || '对不起，导出失败');
      setIsExporting(false);
    }
  };
  const exportExcel = async (list, fileDate) => {
    let columns = ['抽查日期', '监管公司', '品牌', '经销商名称', '是否特殊名单', '本月抽查次数'];
    let resList = [];
    let fileName = '';

    if (tabIndex === 0) {
      if (ifCurrentMonth) {
        columns = ['抽查日期', '监管公司', '品牌', '经销商名称', '是否特殊名单', '本月抽查次数', '本周抽查次数'];
        resList = list.map((item) => [
          fileDate,
          item.company,
          item.brand,
          item.dealer,
          item.isSpecial === 1 ? '是' : '否',
          item['cntByMonth'],
          item['cntByWeek'],
        ]);
      } else {
        columns = ['抽查日期', '监管公司', '品牌', '经销商名称', '是否特殊名单', '本月抽查次数'];
        resList = list.map((item) => [
          fileDate,
          item.company,
          item.brand,
          item.dealer,
          item.isSpecial === 1 ? '是' : '否',
          item['cntByMonth'],
        ]);
      }
      fileName = fileDate + '经销商抽查名单.xlsx';
    } else {
      if (ifCurrentMonth) {
        columns = ['抽查日期', '监管公司', '品牌', '经销商名称', '车架号', '是否特殊名单', '本月抽查次数', '本周抽查次数'];
        resList = list.map((item) => [
          fileDate,
          item.company,
          item.brand,
          item.dealer,
          item.vin,
          item.isSpecial === 1 ? '是' : '否',
          item['cntByMonth'],
          item['cntByWeek'],
        ]);
      } else {
        columns = ['抽查日期', '监管公司', '品牌', '经销商名称', '车架号', '是否特殊名单', '本月抽查次数'];
        resList = list.map((item) => [
          fileDate,
          item.company,
          item.brand,
          item.dealer,
          item.vin,
          item.isSpecial === 1 ? '是' : '否',
          item['cntByMonth'],
        ]);
      }
      fileName = fileDate + '车辆抽查名单.xlsx';
    }
    try {
      await exportExcelFunc(resList, columns, fileName, '抽查名单');
    } catch (error) {
      message.error(error.message || error || '对不起，导出失败');
    }
    setIsExporting(true);
  };
  return (
    <>
      <CCForm
        group={[monthPicker]}
        onSearch={handleSearch}
        formKey={'superviseAmount'}
        enableExport
        onExport={handleExport}
        isExporting={isExporting}
      />
      <ContentArea>
        <Tabs defaultActiveKey={tabList[0].key} onChange={onTabChange} destroyInactiveTabPane={false}>
          {tabList.map((tab, index) => (
            <TabPane tab={tab.name} key={tab.key} forceRender={true}>
              <CCStoreTable
                columns={renderColumns(tab.key)}
                tableKey={tab.key}
                formKey={'superviseAmount'}
                ref={tabListRef[index]}
                rowKey={
                  index === 0
                    ? (record) => `${record.company}${record.brand}${record.dealer}`
                    : (record) => `${record.vin}${record.brand}${record.dealer}`
                }
                fetchFunc={fetchFunc(tab.url)}
              />
            </TabPane>
          ))}
        </Tabs>
      </ContentArea>
    </>
  );
}

export default SuperviseAmount;

const monthPicker = {
  label: '统计月份',
  name: 'theMonth',
  defaultValue: moment(),
  lg: 12,
  render: () => <DatePicker picker="month" />,
};
