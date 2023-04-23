import React from 'react';
import {
  LoadingOutlined,
  SearchOutlined,
  UserAddOutlined,
  UpOutlined,
  FileDoneOutlined,
  DownOutlined,
  CheckOutlined,
  CloseOutlined,
  BranchesOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  LogoutOutlined,
  ExportOutlined,
  MinusCircleOutlined,
  MinusOutlined,
  PlusOutlined,
  WarningOutlined,
  LinkOutlined,
  CalendarOutlined,
  LockOutlined,
  EyeOutlined,
  EditOutlined,
  PlusCircleOutlined,
  PaperClipOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  RedoOutlined,
  FileImageOutlined,
  UploadOutlined,
} from '@ant-design/icons';

export default function Icons(props) {
  const { type } = props;
  const IconCom = mapIconV3ToV4(type);
  return <IconCom {...props} />;
}

const iconMapDict = [
  ['loading', LoadingOutlined],
  ['search', SearchOutlined],
  ['user-add', UserAddOutlined],
  ['file-done', FileDoneOutlined],
  ['file-search', FileSearchOutlined],
  ['up', UpOutlined],
  ['down', DownOutlined],
  ['check', CheckOutlined],
  ['close', CloseOutlined],
  ['branches', BranchesOutlined],
  ['home', HomeOutlined],
  ['info-circle', InfoCircleOutlined],
  ['check-circle', CheckCircleOutlined],
  ['close-circle', CloseCircleOutlined],
  ['exclamation-circle', ExclamationCircleOutlined],
  ['minus-circle-o', MinusCircleOutlined],
  ['minus', MinusOutlined],
  ['user', UserOutlined],
  ['warning', WarningOutlined],
  ['logout', LogoutOutlined],
  ['plus', PlusOutlined],
  ['plus-circle', PlusCircleOutlined],
  ['paper-clip', PaperClipOutlined],
  ['link', LinkOutlined],
  ['calendar', CalendarOutlined],
  ['lock', LockOutlined],
  ['eye', EyeOutlined],
  ['delete', DeleteOutlined],
  ['edit', EditOutlined],
  ['clock-circle', ClockCircleOutlined],
  ['environment', EnvironmentOutlined],
  ['export', ExportOutlined],
  ['redo', RedoOutlined],
  ['upload', UploadOutlined],
  ['file-image', FileImageOutlined],
];

function mapIconV3ToV4(type) {
  const group = iconMapDict.find((group) => group.includes(type));
  if (!group) {
    return SearchOutlined;
  }
  return group[1];
}
