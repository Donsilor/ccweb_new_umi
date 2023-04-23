// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/yeqixu/Desktop/ccweb_new_umi/node_modules/umi/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/login",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Login' */'@/pages/Login')}),
    "exact": true
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__index' */'@/layouts/index')}),
    "routes": [
      {
        "path": "/daoqiFCZ",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__DQbill' */'@/pages/StatementFCZ/DQbill')}),
        "exact": true
      },
      {
        "path": "/carCollectFCZ",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__CarCollect' */'@/pages/StatementFCZ/CarCollect')}),
        "exact": true
      },
      {
        "path": "/salesVolumeFCZ",
        "redirect": "/salesVolumeFCZ/dealer",
        "name": "经销商销量/回款统计表(同步)",
        "exact": true
      },
      {
        "path": "/salesVolumeFCZ/dealer",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__SalesVolume__dealer' */'@/pages/StatementFCZ/SalesVolume/dealer')}),
        "tabName": "经销商+品牌+供应链",
        "exact": true
      },
      {
        "path": "/salesVolumeFCZ/brand",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__SalesVolume__brand' */'@/pages/StatementFCZ/SalesVolume/brand')}),
        "tabName": "品牌情况表",
        "exact": true
      },
      {
        "path": "/salesVolumeFCZ/supplyChain",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__SalesVolume__supplyChain' */'@/pages/StatementFCZ/SalesVolume/supplyChain')}),
        "tabName": "品牌+供应链情况表",
        "exact": true
      },
      {
        "path": "/salesVolumeFCZ/exception",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__SalesVolume__exception' */'@/pages/StatementFCZ/SalesVolume/exception')}),
        "tabName": "异常数据",
        "exact": true
      },
      {
        "path": "/salesVolumeFCZ_DR",
        "redirect": "/salesVolumeFCZ_DR/dealer",
        "name": "经销商销量/回款统计表(导入)",
        "exact": true
      },
      {
        "path": "/salesVolumeFCZ_DR/dealer",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__SalesVolume__dealer' */'@/pages/StatementFCZ/SalesVolume/dealer')}),
        "tabName": "经销商+品牌+供应链",
        "exact": true
      },
      {
        "path": "/salesVolumeFCZ_DR/brand",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__SalesVolume__brand' */'@/pages/StatementFCZ/SalesVolume/brand')}),
        "tabName": "品牌情况表",
        "exact": true
      },
      {
        "path": "/salesVolumeFCZ_DR/supplyChain",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__SalesVolume__supplyChain' */'@/pages/StatementFCZ/SalesVolume/supplyChain')}),
        "tabName": "品牌+供应链情况表",
        "exact": true
      },
      {
        "path": "/salesVolumeFCZ_DR/exception",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__SalesVolume__exception' */'@/pages/StatementFCZ/SalesVolume/exception')}),
        "tabName": "异常数据",
        "exact": true
      },
      {
        "path": "/collectFCZ_sync",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__CarCollect_sync' */'@/pages/StatementFCZ/CarCollect_sync')}),
        "name": "车辆汇总表(同步)",
        "exact": true
      },
      {
        "path": "/ledgerFCZ_sync",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__LedgerFCZ_sync' */'@/pages/StatementFCZ/LedgerFCZ_sync')}),
        "name": "台账下载(同步)",
        "exact": true
      },
      {
        "path": "/vehicleTracking",
        "redirect": "/vehicleTracking/car",
        "name": "车辆实际情况",
        "exact": true
      },
      {
        "path": "/vehicleTracking/car",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__VehicleStatusTracking__carList' */'@/pages/StatementFCZ/VehicleStatusTracking/carList')}),
        "tabName": "选择车辆",
        "exact": true
      },
      {
        "path": "/vehicleTracking/all",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__VehicleStatusTracking__allList' */'@/pages/StatementFCZ/VehicleStatusTracking/allList')}),
        "tabName": "全部",
        "exact": true
      },
      {
        "path": "/vehicleTracking/tracking",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__VehicleStatusTracking__trackingList' */'@/pages/StatementFCZ/VehicleStatusTracking/trackingList')}),
        "tabName": "需跟踪还款",
        "exact": true
      },
      {
        "path": "/vehicleTracking/improt",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__StatementFCZ__VehicleStatusTracking__importArea' */'@/pages/StatementFCZ/VehicleStatusTracking/importArea')}),
        "name": "导入数据",
        "exact": true
      },
      {
        "path": "/transferIn",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__BondManagement__TransferIn' */'@/pages/BondManagement/TransferIn')}),
        "exact": true
      },
      {
        "path": "/transferOut",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__BondManagement__TransferOut' */'@/pages/BondManagement/TransferOut')}),
        "exact": true
      },
      {
        "path": "/printManagement",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__BondManagement__PrintManagement' */'@/pages/BondManagement/PrintManagement')}),
        "exact": true
      },
      {
        "path": "/confirmReceiptList",
        "redirect": "/confirmReceiptList/todo",
        "exact": true
      },
      {
        "path": "/confirmReceiptList/todo",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__BondManagement__ConfirmReceipt__TabTodoCom' */'@/pages/BondManagement/ConfirmReceipt/TabTodoCom')}),
        "exact": true,
        "tabName": "待确认回执"
      },
      {
        "path": "/confirmReceiptList/all",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__BondManagement__ConfirmReceipt__TabAllCom' */'@/pages/BondManagement/ConfirmReceipt/TabAllCom')}),
        "exact": true,
        "tabName": "全部任务"
      },
      {
        "path": "/confirmReceiptList/ewDetail",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__BondManagement__ConfirmReceipt__EwDetail' */'@/pages/BondManagement/ConfirmReceipt/EwDetail')}),
        "exact": true,
        "name": "保证金详情"
      },
      {
        "path": "/marketList",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__EwMarket__MarketList__index' */'@/pages/EwMarket/MarketList/index')}),
        "exact": true
      },
      {
        "path": "/CarAction_Dis",
        "redirect": "/CarAction_Dis/carTodo",
        "exact": true,
        "name": "车辆明细上报"
      },
      {
        "path": "/CarAction_Dis/carTodo",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarAction__todo' */'@/pages/Yqzl/CarAction/todo')}),
        "exact": true,
        "tabName": "车辆明细上报"
      },
      {
        "path": "/CarAction_Dis/carList",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarAction__list' */'@/pages/Yqzl/CarAction/list')}),
        "exact": true,
        "tabName": "发车明细"
      },
      {
        "path": "/carChengType",
        "redirect": "/carChengType/upload",
        "exact": true,
        "name": "车辆导入"
      },
      {
        "path": "/carChengType/upload",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarCheng__upload' */'@/pages/Yqzl/CarCheng/upload')}),
        "exact": true,
        "tabName": "导入"
      },
      {
        "path": "/carChengType/list",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarCheng__list' */'@/pages/Yqzl/CarCheng/list')}),
        "exact": true,
        "tabName": "导入记录"
      },
      {
        "path": "/carChengType/detail/:id",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarCheng__detail' */'@/pages/Yqzl/CarCheng/detail')}),
        "exact": true,
        "name": "查看详情"
      },
      {
        "path": "/carReturnType",
        "redirect": "/carReturnType/upload",
        "exact": true,
        "name": "车辆赎回"
      },
      {
        "path": "/carReturnType/upload",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarReturn__upload' */'@/pages/Yqzl/CarReturn/upload')}),
        "exact": true,
        "tabName": "导入"
      },
      {
        "path": "/carReturnType/list",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarReturn__list' */'@/pages/Yqzl/CarReturn/list')}),
        "exact": true,
        "tabName": "导入记录"
      },
      {
        "path": "/carReturnType/detail/:id",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarReturn__detail' */'@/pages/Yqzl/CarReturn/detail')}),
        "exact": true,
        "name": "查看详情"
      },
      {
        "path": "/carSync",
        "redirect": "/carSync/carSend",
        "exact": true,
        "name": "数据同步"
      },
      {
        "path": "/carSync/carSend",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarSync__carSend' */'@/pages/Yqzl/CarSync/carSend')}),
        "exact": true,
        "tabName": "车辆明细"
      },
      {
        "path": "/carSync/carIn",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarSync__carIn' */'@/pages/Yqzl/CarSync/carIn')}),
        "exact": true,
        "tabName": "车辆入库"
      },
      {
        "path": "/carSync/carOut",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarSync__carOut' */'@/pages/Yqzl/CarSync/carOut')}),
        "exact": true,
        "tabName": "赎车明细"
      },
      {
        "path": "/carSync/carReturn",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarSync__carReturn' */'@/pages/Yqzl/CarSync/carReturn')}),
        "exact": true,
        "tabName": "退货明细"
      },
      {
        "path": "/carSync/carDis",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarSync__carDis' */'@/pages/Yqzl/CarSync/carDis')}),
        "exact": true,
        "tabName": "经销商列表"
      },
      {
        "path": "/carSync/disAccounting",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarSync__disAccounting' */'@/pages/Yqzl/CarSync/disAccounting')}),
        "exact": true,
        "tabName": "经销商出账信息"
      },
      {
        "path": "/carSync/disExposure",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarSync__disExposure' */'@/pages/Yqzl/CarSync/disExposure')}),
        "exact": true,
        "tabName": "单笔业务敞口更新"
      },
      {
        "path": "/carSync/disSettlement",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarSync__disSettlement' */'@/pages/Yqzl/CarSync/disSettlement')}),
        "exact": true,
        "tabName": "单笔业务到期结清"
      },
      {
        "path": "/carSync/trader",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarSync__trader' */'@/pages/Yqzl/CarSync/trader')}),
        "exact": true,
        "tabName": "经销商贸易商列表"
      },
      {
        "path": "/carSync/lackDistributor",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarSync__lackDistributor' */'@/pages/Yqzl/CarSync/lackDistributor')}),
        "exact": true,
        "tabName": "未同步经销商"
      },
      {
        "path": "/carAccount",
        "redirect": "/carAccount/accList",
        "exact": true,
        "name": "车辆明细对账"
      },
      {
        "path": "/carAccount/accList",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarAccount__accList' */'@/pages/Yqzl/CarAccount/accList')}),
        "exact": true,
        "tabName": "发送明细"
      },
      {
        "path": "/carAccount/accList/:id",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarAccount__detail' */'@/pages/Yqzl/CarAccount/detail')}),
        "exact": true,
        "name": "查看"
      },
      {
        "path": "/carAccount/emailList",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__CarAccount__emailList' */'@/pages/Yqzl/CarAccount/emailList')}),
        "exact": true,
        "tabName": "邮箱维护"
      },
      {
        "path": "/hxInvoice",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Yqzl__HxInvoice' */'@/pages/Yqzl/HxInvoice')}),
        "exact": true,
        "name": "航信对接数据"
      },
      {
        "path": "/brandModel",
        "redirect": "/brandModel/index",
        "name": "品牌与车型库",
        "exact": true
      },
      {
        "path": "/brandModel/index",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SystemManagement__BrandModels' */'@/pages/SystemManagement/BrandModels')}),
        "tabName": "品牌管理",
        "exact": true
      },
      {
        "path": "/brandModel/more",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SystemManagement__BrandModels__more' */'@/pages/SystemManagement/BrandModels/more')}),
        "tabName": "多品牌录入规则",
        "exact": true
      },
      {
        "path": "/importView",
        "name": "库存明细导入",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Supervise__ImportView' */'@/pages/Supervise/ImportView')}),
        "exact": true
      },
      {
        "path": "/superviseManager",
        "name": "抽查管理",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Supervise__SuperviseManager' */'@/pages/Supervise/SuperviseManager')}),
        "exact": true
      },
      {
        "path": "/superviseAmount",
        "name": "抽查记录统计",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Supervise__SuperviseAmount' */'@/pages/Supervise/SuperviseAmount')}),
        "exact": true
      },
      {
        "path": "/superviseCompany",
        "name": "监管公司",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Supervise__SuperviseCompany' */'@/pages/Supervise/SuperviseCompany')}),
        "exact": true
      },
      {
        "path": "/specialDealer",
        "name": "特殊抽查名单",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Supervise__SpecialDealer' */'@/pages/Supervise/SpecialDealer')}),
        "exact": true
      },
      {
        "path": "/superviseParam",
        "name": "参数设置",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Supervise__SuperviseParam' */'@/pages/Supervise/SuperviseParam')}),
        "exact": true
      },
      {
        "path": "/repositoryList",
        "redirect": "/repositoryList/list",
        "exact": true
      },
      {
        "path": "/repositoryList/list",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__MonitorManagement__RepositoryList' */'@/pages/MonitorManagement/RepositoryList')}),
        "exact": true
      },
      {
        "path": "/repositoryList/detail",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__MonitorManagement__RepositoryList__RepositoryDetail' */'@/pages/MonitorManagement/RepositoryList/RepositoryDetail')}),
        "exact": true,
        "name": "影像明细"
      },
      {
        "path": "/repositoryWarning",
        "redirect": "/repositoryWarning/todo",
        "exact": true
      },
      {
        "path": "/repositoryWarning/todo",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__MonitorManagement__RepositoryWarning__TodoPage' */'@/pages/MonitorManagement/RepositoryWarning/TodoPage')}),
        "exact": true,
        "tabName": "未解除"
      },
      {
        "path": "/repositoryWarning/gone",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__MonitorManagement__RepositoryWarning__GonePage' */'@/pages/MonitorManagement/RepositoryWarning/GonePage')}),
        "exact": true,
        "tabName": "已解除"
      },
      {
        "path": "/pushMatchUpload",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__CarMatching__UploadMatch__view' */'@/pages/CarMatching/UploadMatch/view')}),
        "exact": true,
        "name": "推送车辆导入"
      },
      {
        "path": "/pushMatchList",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__CarMatching__collectMatch' */'@/pages/CarMatching/collectMatch')}),
        "exact": true,
        "name": "车辆推送明细"
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Common' */'/Users/yeqixu/Desktop/ccweb_new_umi/src/pages/Common')}),
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
