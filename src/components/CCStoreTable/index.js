import React, { Component } from 'react';
import { connect } from 'umi';
import _get from 'lodash/get';
import CCTable, { ccTablePropTypes } from '@/components/CCTable';
import PropTypes from 'prop-types';

const storeTablePropTypes = {
  tableKey: PropTypes.string.isRequired, // 该table在store中全局唯一的key
  ...ccTablePropTypes,
};

class CCStoreTable extends Component {
  static propTypes = storeTablePropTypes;
  tableRef = React.createRef();

  reload = (params) => {
    this.tableRef.current?.reload(params);
  };

  updatePagingFunc = (page) => {
    const { tableKey } = this.props;
    const { current, pageSize, total } = page;
    this.props.updatePaging({
      tableKey,
      current,
      pageSize,
      total,
    });
  };

  render() {
    const { paging, query } = this.props;
    return (
      <CCTable
        ref={this.tableRef}
        defaultPaging={paging}
        query={query}
        updatePagingFunc={this.updatePagingFunc}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const { tableKey, formKey } = ownProps;
  return {
    paging: _get(store.table, `paging.${tableKey}`, {
      current: 1,
      total: 0,
    }),
    query: formKey ? _get(store.form, `value.${formKey}`) : {},
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updatePaging: (data) => {
      dispatch({ type: 'table/updatePaging', payload: data });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(CCStoreTable);
