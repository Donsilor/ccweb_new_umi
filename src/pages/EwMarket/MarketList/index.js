import React from 'react';
import ListView from '../ListView';
import { marketListColumns } from '../columns';
import { marketFormItems } from '../formitems';

export default (props) => (
  <ListView
    columns={marketListColumns}
    pageKey={'marketList'}
    formItemList={marketFormItems}
    fetchFunc={(data, paging) => httpCommonClient.getWithPaging('/yck/vehicle/infolist', data, paging)}
    {...props}
  />
);
