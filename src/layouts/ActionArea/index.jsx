import React, { Component } from 'react';
import { Tabs } from 'antd';
import './index.less';
import { Link, withRouter, history } from 'umi';
import _ from 'lodash';
import rawRouters from '@/routers';
import Breadcrumb from '../Breadcrumb';

const { TabPane } = Tabs;
const routers = groupTabRouter(rawRouters);

@withRouter
class ActionArea extends Component {
  state = {
    active: '',
    tabList: [],
  };
  static getDerivedStateFromProps(props) {
    const { pathname } = props.location;
    const [tabList = []] = routers.filter((group) => group.some((tab) => tab.path === pathname));
    return {
      active: pathname,
      tabList,
    };
  }
  render() {
    const { tabList, active } = this.state;
    return (
      <div className="actionarea-root">
        <Breadcrumb />
        {tabList.length > 0 && (
          <div className="actionArea">
            <div className="wrapper">
              <div className="tabArea">
                <Tabs activeKey={active} onChange={(key) => history.push(key)}>
                  {tabList.map((tab) => (
                    <TabPane tab={tab.tabName} key={tab.path} />
                  ))}
                </Tabs>
              </div>
            </div>
          </div>
        )}
        <div id="operation-root"></div>
      </div>
    );
  }
}

export default ActionArea;

function groupTabRouter(routers) {
  let _routers = routers.filter((router) => router.tabName);
  const filterFunc = (router) => {
    const length = router.path.split('/').length;
    const lastIndex = router.path.lastIndexOf('/');
    return `${length}-${router.path.slice(0, lastIndex)}`;
  };
  return (_routers = _.values(_.groupBy(_routers, filterFunc)));
}
