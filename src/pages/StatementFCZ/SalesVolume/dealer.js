import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { 经销商品牌供应链, 品牌名称, 供应链名称 } from '../formItems';
import { dealerColumns } from '../Columns';
import ImportModal from './importModal';
import moment from 'moment';
export default class View extends Component {
  tableRef = React.createRef();
  state = {
    brandList: [],
    supplyChain: [],
  };
  componentDidMount() {
    httpCommonClient.post(`/warning/v1.0/warning/brand/list/all`, {}).then((respone) => {
      if (respone.data.code === 200) {
        this.setState({ brandList: respone.data.data });
      }
    });
    httpCommonClient
      .postWithPaging('/warning/v1.0/warning/supplyChain/list', {}, { pageNum: 1, pageSize: 500 })
      .then(({ data = {} }) => {
        this.setState({ supplyChain: data.data.list });
      });
  }
  render() {
    const { brandList, supplyChain } = this.state;
    // 销量/回款统计(导入) 增加参数dataSourceType: '导入'
    return (
      <>
        <CCForm
          group={[...经销商品牌供应链, 品牌名称(brandList), 供应链名称(supplyChain, 'supplyChain')]}
          onSearch={() => this.tableRef.current.reload()}
          formKey={this.props.match.path}
        />
        <CCStoreTable
          columns={dealerColumns}
          tableKey={this.props.match.path}
          formKey={this.props.match.path}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging(
              '/warning/v1.0/warning/dealerReturnState/list',
              {
                ...data,
                paramYearMonth: moment(data.paramYearMonth).format('YYYY/MM'),
                ...(this.props.match.path.includes('DR') && { dataSourceType: '导入' }),
              },
              paging,
            )
          }
          ref={this.tableRef}
          bordered
        />
        <ImportModal onSearch={() => this.tableRef.current.reload()} path={this.props.match.path} />
      </>
    );
  }
}
