import BondManagement from '../pages/BondManagement/router'; // 保证金管理
import EwMarket from '../pages/EwMarket/router'; // 二网销售确认
import Yqzl from '../pages/Yqzl/router'; // 银企直联
import SystemManagement from '../pages/SystemManagement/router'; // 系统管理
import Supervise from '../pages/Supervise/router'; // 监管公司抽查管理
import MonitorManagement from '../pages/MonitorManagement/router'; // 二库视频监控
import StatementFCZRouter from '../pages/StatementFCZ/router'; // 放车组报表
import CarMatchingRouter from '../pages/CarMatching/router'; // 车辆推送橙E
export default [
  ...StatementFCZRouter,
  ...BondManagement,
  ...EwMarket,
  ...Yqzl,
  ...SystemManagement,
  ...Supervise,
  ...MonitorManagement,
  ...CarMatchingRouter,
  { path: '/', component: 'Common', exact: true },
];
