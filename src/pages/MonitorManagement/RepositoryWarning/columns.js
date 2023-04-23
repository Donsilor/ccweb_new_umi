const repoIdColumn = {
  title: '预警编号',
  dataIndex: 'warningCode',
};

const repoNameColumn = {
  title: '二库名称',
  dataIndex: 'whareHouseName',
  align: 'left',
};
const repoStartTimeColumn = {
  title: '发生时间',
  dataIndex: 'startTime',
};
const repoFinishTimeColumn = {
  title: '预警最后更新时间',
  dataIndex: 'finishTime',
};
const repoRealNumColumn = {
  title: '库存车实际数量',
  dataIndex: 'realNumber',
};
const repoRecognitionNumColumn = {
  title: '库存车识别数量',
  dataIndex: 'recognitionCarNum',
};

const repoRemoveTimeColumn = {
  title: '解除时间',
  dataIndex: 'updateTime',
};
const repoRemarkColumn = {
  title: '解除备注',
  dataIndex: 'remark',
};

export const todoColumns = [
  repoIdColumn,
  repoNameColumn,
  repoStartTimeColumn,
  repoFinishTimeColumn,
  repoRealNumColumn,
  repoRecognitionNumColumn,
];
export const goneColumns = [
  repoIdColumn,
  repoNameColumn,
  repoStartTimeColumn,
  repoFinishTimeColumn,
  repoRealNumColumn,
  repoRecognitionNumColumn,
  repoRemoveTimeColumn,
  repoRemarkColumn,
];
