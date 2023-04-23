import React, { useState, useEffect } from 'react';
import { useSelector, Link, withRouter } from 'umi';
import { Menu } from 'antd';
import * as Icon from '@ant-design/icons';
import { HomeOutlined, PicLeftOutlined } from '@ant-design/icons';
import _ from 'lodash';

const { SubMenu } = Menu;
const Index = withRouter(({ location }) => {
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const menus = useSelector((state) => state.common.menus);

  useEffect(() => {
    onPathNameChange(location.pathname);
  }, [location]);

  const onPathNameChange = (pathname) => {
    let key = pathname;
    if (!key || key === '/') {
      setSelectedKeys(['/']);
      return;
    }
    key = _.head(key.slice(1).split('/'));
    let menuKey = '';
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      if (Array.isArray(menu.subMenu) && menu.subMenu.map((item) => item.link).includes(key)) {
        menuKey = menu.name;
        break;
      }
    }
    setOpenKeys(menuKey ? [menuKey] : []);
    setSelectedKeys([key]);
  };

  // 点击菜单组时
  const onMenuGroupChange = (keys) => {
    const key = _.last(keys);
    if (!key) {
      setOpenKeys([]);
      return;
    }
    const menuKey = menus.find((menu) => menu.name === key);
    setOpenKeys(menuKey ? [menuKey.name] : []);
  };

  const renderIcon = (icon) => {
    if (!icon) {
      return <PicLeftOutlined />;
    }
    const IconCom = Icon[icon];
    return <IconCom />;
  };

  return (
    <Menu mode="inline" openKeys={openKeys} onOpenChange={onMenuGroupChange} theme="dark" selectedKeys={selectedKeys}>
      <Menu.Item key="/">
        <Link to="/">
          <HomeOutlined style={{ marginRight: '10px' }} />
          首页
        </Link>
      </Menu.Item>
      {menus.map((menu) => (
        <SubMenu key={menu.name} icon={renderIcon(menu.icon)} title={menu.name}>
          {menu.subMenu.map((submenu) => (
            <Menu.Item key={submenu.link}>
              <Link to={`/${submenu.link}`}>{submenu.name}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
});

export default Index;
