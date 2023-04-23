import React, { PureComponent } from 'react';
import { useHistory } from 'umi';
import { Button } from 'antd';

function BackToList({ n = -1 }) {
  const history = useHistory();

  const goBack = () => {
    history.go(n);
  };
  return <Button onClick={goBack}>返回</Button>;
}

export default BackToList;
