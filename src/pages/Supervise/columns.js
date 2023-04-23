import moment from 'moment';
const uploadTimeColumn = {
  title: '文件上传时间',
  dataIndex: 'createdTime',
  render: (text) => {
    return text && formatTime(text);
  },
};
const fileNameColumn = {
  title: '文件名',
  dataIndex: 'fileName',
};
const actionStatusColumn = {
  title: '处理状态',
  dataIndex: 'actionStatus',
  render: (text) => {
    return text === '1' ? '导入完成' : '待导入';
  },
};

const logCreatedTimeColumn = {
  title: '抽查记录生成时间',
  dataIndex: 'createdTime',
  render: (text) => {
    return text && formatTime(text);
  },
};
const dayForWeekColumn = {
  title: '星期',
  dataIndex: 'dayForWeek',
  render: (text, record) => {
    switch (record['createdTime'] && moment.unix(new Date(record['createdTime']).getTime() / 1000).day()) {
      case 1:
        return '星期一';
      case 2:
        return '星期二';
      case 3:
        return '星期三';
      case 4:
        return '星期四';
      case 5:
        return '星期五';
      case 6:
        return '星期六';
      case 7:
        return '星期日';
      default:
        return '';
    }
  },
};
const dealerCntColumn = {
  title: '经销商数',
  dataIndex: 'superviseDealerCnt',
};
const vehicleCntColumn = {
  title: '车辆数',
  dataIndex: 'superviseVehicleCnt',
};

const companyColumn = {
  title: '监管公司',
  dataIndex: 'company',
  align: 'center',
  width: 120,
};
const brandColumn = {
  title: '品牌',
  dataIndex: 'brand',
  width: 120,
};
const dealerColumn = {
  title: '经销商',
  dataIndex: 'dealer',
  width: 100,
};
const vinColumn = {
  title: '车架号',
  dataIndex: 'vin',
  width: 150,
};
const isSpecialColumn = {
  title: '是否特殊名单',
  dataIndex: 'isSpecial',
  render: (text) => {
    return text === 1 ? '是' : '否';
  },
  width: 100,
  align: 'center',
};

const cntByMonthColumn = {
  title: '本月抽查次数',
  dataIndex: 'cntByMonth',
};
const cntByWeekColumn = {
  title: '本周抽查次数',
  dataIndex: 'cntByWeek',
};

const dealerCountColumn = {
  title: '经销商数',
  dataIndex: 'dealerCnt',
};
const rateColumn = {
  title: '占比',
  dataIndex: 'rate',
  render: (text) => {
    return text + '%';
  },
};
const repoCntColumn = {
  title: '主库车数量',
  dataIndex: 'primaryRepoCnt',
};
const countColumn = {
  title: '统计时间',
  dataIndex: 'createdTime',
};

const createdTimeColumn = {
  title: '创建时间',
  dataIndex: 'createdTime',
  render: (text) => formatTime(text),
};
const updatedTimeColumn = {
  title: '更新时间',
  dataIndex: 'updatedTime',
  render: (text) => formatTime(text),
};
const startColumn = {
  title: '生效日期',
  dataIndex: 'startTime',
  render: (text) => formatDate(text),
};
const endColumn = {
  title: '失效日期',
  dataIndex: 'endTime',
  render: (text) => formatDate(text),
};

const statusColumn = {
  title: '是否有效',
  dataIndex: 'status',
  render: (text, record) => {
    let content = '';
    if (moment().isBefore(moment(record.startTime))) {
      content = EBDic.statusTypeList[0].name;
    } else if (moment().isAfter(moment(record.endTime))) {
      content = EBDic.statusTypeList[2].name;
    } else {
      content = EBDic.statusTypeList[1].name;
    }
    return <span>{content}</span>;
  },
};

export const importViewColumns = [uploadTimeColumn, fileNameColumn, actionStatusColumn];
export const managerColumns = [logCreatedTimeColumn, dayForWeekColumn, dealerCntColumn, vehicleCntColumn];
export const managerDetailModalColumns = [companyColumn, brandColumn, dealerColumn, vinColumn, isSpecialColumn];
export const amountDistributorColumns = [
  companyColumn,
  brandColumn,
  dealerColumn,
  isSpecialColumn,
  cntByMonthColumn,
  cntByWeekColumn,
];
export const amountCarColumns = [
  companyColumn,
  brandColumn,
  dealerColumn,
  vinColumn,
  isSpecialColumn,
  cntByMonthColumn,
  cntByWeekColumn,
];

export const companyColumns = [companyColumn, dealerCountColumn, rateColumn, repoCntColumn, countColumn];

export const specialDColumns = [
  companyColumn,
  brandColumn,
  dealerColumn,
  createdTimeColumn,
  updatedTimeColumn,
  startColumn,
  endColumn,
  statusColumn,
];
