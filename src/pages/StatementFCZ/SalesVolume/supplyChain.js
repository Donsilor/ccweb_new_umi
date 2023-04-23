import React, { Component } from 'react';
import CCStoreTable from '@/components/CCStoreTable';
import CCForm from '@/components/CCForm';
import { 年月, 品牌名称, 供应链名称 } from '../formItems';
import { supplyChainColumns } from '../Columns';
import moment from 'moment';
import ImportModal from './importModal';
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
    return (
      <>
        <CCForm
          group={[年月, 品牌名称(brandList), 供应链名称(supplyChain, 'supplyChain')]}
          onSearch={() => this.tableRef.current.reload()}
          formKey={this.props.match.path}
        />
        <CCStoreTable
          columns={supplyChainColumns}
          tableKey={this.props.match.path}
          formKey={this.props.match.path}
          fetchFunc={(data, paging) =>
            httpCommonClient.postWithPaging(
              '/warning/v1.0/warning/supplyChainReturnState/list',
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
