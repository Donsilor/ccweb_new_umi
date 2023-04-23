import React, { Component } from 'react';
import { Breadcrumb, Button } from 'antd';
import { useRouteMatch, withRouter, Link, connect, useSelector } from 'umi';
import routers from '@/routers';

const BreadcrumbCom = withRouter(({ location }) => {
  const menus = useSelector((state) => state.common.menus);

  const urlMapperFromMenu = menus
    .map((menu) => menu.subMenu)
    .reduce((a, b) => a.concat(b), [])
    .map((menu) => ({ path: `/${menu.link}`, name: menu.name }));
  const urlMapperFromRouter = routers.filter((router) => !router.redirect && (router.name || router.tabName));
  const urlMapper = [...urlMapperFromMenu, ...urlMapperFromRouter];
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    const name = tranUrlToName(url, urlMapper);
    return name ? (
      <Breadcrumb.Item key={url}>
        <span style={{ cursor: 'pointer' }}>{name}</span>
      </Breadcrumb.Item>
    ) : null;
  });
  const moduleUrl = pathSnippets[0];
  const module = menus.find((menu) => Array.isArray(menu.subMenu) && menu.subMenu.some((item) => item.link === moduleUrl));
  let totalBcItems = breadcrumbItems;
  if (module) {
    totalBcItems = [
      <Breadcrumb.Item key={module.name}>
        <span style={{ cursor: 'pointer' }}>{module.name}</span>
      </Breadcrumb.Item>,
      ...breadcrumbItems,
    ];
  }

  return (
    <div style={{ paddingTop: '4px', paddingLeft: '6px' }}>
      <Breadcrumb>{totalBcItems}</Breadcrumb>
    </div>
  );
});

const tranUrlToName = (url, urlMapper) => {
  try {
    let router = urlMapper.find((item) => item.path === url);
    if (router) {
      return router.name || router.tabName;
    } else {
      router = urlMapper.find((item) => item.path.split('/').length === url.split('/').length && useRouteMatch(item.path));
      if (router) {
        return router.name || router.tabName;
      }
    }
  } catch (error) {
    return name;
  }
};

export default BreadcrumbCom;
