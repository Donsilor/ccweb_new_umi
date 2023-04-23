import React, { Component } from 'react';
import { Table, Alert } from 'antd';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { ContentArea } from '@/layouts/ViewWrapper';
import resFilter from '@/utils/axios/resFilter';
import PropTypes from 'prop-types';

export const ccTablePropTypes = {
  columns: PropTypes.array.isRequired, // table的columns
  fetchFunc: PropTypes.func.isRequired, // 获取list接口的方法
  query: PropTypes.object, // 来自form的查询项
  defaultPaging: PropTypes.object, // 外部中存的paging，table首次渲染时需要
  tableFilter: PropTypes.func, // 调用后台前对query值进行处理的回调
  tableList: PropTypes.func, // 将取到的list值发送给父组件
  updatePaging: PropTypes.func, // 更新paging，存储在外部组件（非必须）
};

const pageSizeOptions = ['10', '30', '50', '100'];
const defaultPageSize = 10;

const defaultPaging = {
  current: 1,
  pageSize: defaultPageSize,
  total: 0,
};

class CCTable extends Component {
  state = {
    list: [],
    paging: Object.assign(defaultPaging, this.props.defaultPaging),
    selectedRowKeys: [],
    loading: true,
  };
  static propTypes = ccTablePropTypes;

  reload = () => {
    this.setState({
      loading: true,
      selectedRowKeys: [],
    });
    this.handleSearch(this.props.paging?.search ? 1 : this.state.paging.current, this.state.paging.pageSize);
  };
  updatePaging = (page) => {
    const { pageNum: current, pageSize, total } = page;
    const paging = {
      current,
      pageSize,
      total,
    };
    this.setState({
      paging,
    });
    if (typeof this.props.updatePaging === 'function') {
      this.props.updatePagingFunc(paging);
    }
  };
  handleSearch = async (current, pageSize) => {
    this.setState({
      loading: true,
    });
    const Current = current,
      PageSize = pageSize;
    try {
      const { query, tableFilter, tableList, fetchFunc } = this.props;
      const { paging } = this.state;
      const _query = typeof tableFilter === 'function' ? tableFilter(query) : query;
      const res = await fetchFunc(_query, {
        pageNum: Current || paging.current || 1,
        pageSize: PageSize || paging.pageSize || defaultPageSize,
      });
      if (!res.data) throw new Error(res.statusText);
      const resData = resFilter(res.data);
      const { list, page } = resData;
      if (page && !_isEmpty(page)) {
        this.updatePaging(page);
      }
      this.setState({
        list: list,
        loading: false,
      });
      tableList && tableList(list);
    } catch (error) {
      // message.error(error.message || error || '对不起，接口数据出现异常');
      this.setState({
        list: [],
        loading: false,
      });
      this.updatePaging({
        total: 0,
      });
    }
  };
  showTotal = (total) => {
    return `共 ${total} 条数据`;
  };
  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };
  operSelectedRows = () => {
    const { rowSelection } = this.props;
    const { selectedRowKeys } = this.state;
    const { operFunc } = rowSelection;
    if (selectedRowKeys.length === 0) {
      message.error('请至少选择一条数据进行操作', 2.5);
      return;
    }
    typeof operFunc === 'function' && operFunc(selectedRowKeys);
  };
  renderOperArea = () => {
    const { selectedRowKeys } = this.state;
    const { rowSelection } = this.props;
    const { operName } = rowSelection;
    return (
      <p className="selectInfo">
        已选择 <b style={{ color: '#1da02b' }}>{selectedRowKeys.length}</b> 条记录{' '}
        <a onClick={() => this.onSelectChange([])}>取消选择</a>
        <a onClick={this.operSelectedRows}>{operName || '操作'}</a>
      </p>
    );
  };

  render() {
    const { loading, list, paging, selectedRowKeys } = this.state;
    const { pagination, size = 'small', rowKey = 'id', columns = [], rowSelection } = this.props;
    const { current, pageSize, total } = paging;
    const _pagination =
      pagination === false
        ? false
        : {
            current,
            pageSize,
            total,
            pageSizeOptions,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: this.handleSearch,
            // onShowSizeChange: this.handleSearch,
            showTotal: this.showTotal,
          };
    const _rowSelection = _isEmpty(rowSelection) ? null : { selectedRowKeys, onChange: this.onSelectChange };
    return (
      <ContentArea>
        {!_isEmpty(rowSelection) && (
          <div className="cctable-operarea">
            <Alert message={this.renderOperArea()} type="success" showIcon />
          </div>
        )}
        <Table
          {...this.props}
          loading={loading}
          dataSource={list}
          columns={columns}
          pagination={_pagination}
          size={size}
          rowSelection={_rowSelection}
          rowKey={rowKey}
          scroll={{ x: true }}
        />
      </ContentArea>
    );
  }
}

export default CCTable;
