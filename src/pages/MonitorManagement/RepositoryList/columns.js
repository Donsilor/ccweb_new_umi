const repoNameColumn = {
  title: '二库名称',
  dataIndex: 'whareHouseName',
  align: 'left',
};
const repoCameraNumColumn = {
  title: '摄像头数量',
  dataIndex: 'cameraNum',
  align: 'left',
};
const repoCarNumColumn = {
  title: '库存车实际数量',
  dataIndex: 'realCarNum',
  align: 'left',
};
const monitorCarNumColumn = {
  title: '摄像头识别数量',
  dataIndex: 'monitorCarNum',
  align: 'left',
};
const upDateColumn = {
  title: '最后更新时间',
  dataIndex: 'updateTime',
  align: 'left',
  render: (text) => formatTime(text),
};

export const cameraSNColumn = {
  title: '摄像头编号',
  dataIndex: 'serialNumber',
  align: 'left',
  width: 100,
};
export const cameraBrandColumn = {
  title: '摄像头品牌',
  dataIndex: 'brand',
  align: 'left',
  width: 100,
};
export const clientTypeColumn = {
  title: '型号',
  dataIndex: 'modelNumber',
  align: 'left',
  width: 100,
};
export const monitorStatusColumn = {
  title: '运行情况',
  dataIndex: 'status',
  align: 'left',
  width: 100,
  render: (text) => {
    return text.toString() && (text.toString() === '0' ? '正常' : '关闭');
  },
};
export const repoListColumns = [repoNameColumn, repoCameraNumColumn, repoCarNumColumn, monitorCarNumColumn, upDateColumn];

export const repoListSubColumns = [cameraSNColumn, cameraBrandColumn, clientTypeColumn, monitorStatusColumn];

export const logModalColumns = [
  {
    title: '操作时间',
    dataIndex: 'updateTime',
  },
  {
    title: '操作人',
    dataIndex: 'userName',
  },
  {
    title: '操作内容',
    dataIndex: 'action',
    render: (text, record) => {
      return '库存车实际数量由' + record.oldNumber + '更改为' + record.newNumber + ', 说明：' + record.remark;
    },
  },
];

const monitorImgCodeColumn = {
  title: '影像编号',
  dataIndex: 'imageCode',
  align: 'left',
};
const monitorImgTypeColumn = {
  title: '影像类型',
  dataIndex: 'imageType',
  align: 'left',
  render: (text) => {
    return text.toString() && (text.toString() === '0' ? '图片' : '视频');
  },
};
const monitorImgOriginColumn = {
  title: '缩略图',
  dataIndex: 'imageOriginUrl',
  align: 'left',
};
const monitorImgRecognitionColumn = {
  title: '识别结果图',
  dataIndex: 'imageRecognitionUrl',
  align: 'left',
};
const monitorRecognitionCarNumColumn = {
  title: '识别车辆数',
  dataIndex: 'recognitionCarNum',
  align: 'left',
};
const monitorImgTimeColumn = {
  title: '图像获取时间',
  dataIndex: 'imageGetTime',
  align: 'left',
  render: (text) => formatTime(text),
};

export const detailColumns = [
  monitorImgCodeColumn,
  monitorImgTypeColumn,
  monitorImgOriginColumn,
  monitorImgRecognitionColumn,
  monitorRecognitionCarNumColumn,
  monitorImgTimeColumn,
];
