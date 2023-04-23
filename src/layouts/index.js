import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'umi';
import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

import CCMenu from './CCMenu';
import ActionArea from './ActionArea';

function MainLayout(props) {
  const { isLogin, inIframe } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'common/init' });
  }, []);

  useEffect(() => {
    if (isLogin === true) {
      // message.success('登录成功');
    } else if (isLogin === false) {
      message.error(
        <span>
          登录状态已过期，点击<a href="/login">重新登录</a>
        </span>,
        0,
      );
    }
  }, [isLogin]);

  return (
    <ConfigProvider locale={zhCN} componentSize={'small'}>
      <Layout style={{ height: '100vh' }}>
        {!inIframe && (
          <Layout.Sider>
            <CCMenu />
          </Layout.Sider>
        )}
        <Layout className="main-content-root">
          <ActionArea />
          <div className="main-content">{props.children}</div>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default MainLayout;
