// 统一处理各个后端了列表接口的返回值，CCTable组件使用
import _ from 'lodash';

/**
 * type1 易查库后台返回值
 * result 0
 * msg string
 * list array
 * page
 * - pageNum
 * - pageSize
 * - total
 */

/**
 * type2 /yck/vehicle返回值
 * code 200
 * msg string
 * rows array
 * pageNum
 * pageSize
 * total
 */

/**
 *
 * type3 自有车、预警后台返回值（两个不同的后台但返回值格式一致）
 * code 200
 * message string
 * data
 * - list
 * - pageNum
 * - pageSize
 * - total
 */

/**
 * 处理后的标准格式
 * @param code 200
 * @returns {
 *   code 200
 *   list array
 *   page 若不分页则不返回该字段
 *    - pageNum
 *    - pageSize
 *    - total
 * }
 */

function resFilter(resData) {
  if (!resData || _.isEmpty(resData)) {
    throw new Error('对不起，接口数据出现异常');
  }
  let code, list, pageNum, pageSize, total;
  if (resData.code && resData.data && !resData.data.total) {
    // 预警后台无分页接口返回值
    code = resData.code;
    list = resData.data;
    if (!Array.isArray(list)) {
      throw new Error('接口返回数据格式不规范：list字段不是数组');
    }
  } else if (resData.code && resData.data) {
    // type3 自有车、预警后台返回值
    code = resData.code;
    list = resData.data.list;
    pageNum = resData.data.pageNum;
    pageSize = resData.data.pageSize;
    total = resData.data.total;
    if (!Array.isArray(list)) {
      throw new Error('接口返回数据格式不规范：list字段不是数组');
    }
  } else if (resData.code && resData.rows) {
    // type2 /yck/vehicle返回值
    code = resData.code;
    list = resData.rows;
    pageNum = resData.pageNum;
    pageSize = resData.pageSize;
    total = resData.total;
    if (!Array.isArray(list)) {
      throw new Error('接口返回数据格式不规范：rows字段不是数组');
    }
  } else {
    // type1 易查库后台返回值
    code = resData.result === 0 ? 200 : 500;
    list = resData.list;
    if (!Array.isArray(list)) {
      throw new Error('接口返回数据格式不规范：list字段不是数组');
    }
    if (resData.page && !_.isEmpty(resData.page)) {
      pageNum = resData.page.pageNum;
      pageSize = resData.page.pageSize;
      total = resData.page.total;
    }
  }
  const finalData = {
    msg: resData.msg || resData.message || '接口异常',
    code: code,
    list,
  };
  if (!_.isNil(pageNum) && !_.isNil(pageSize) && !_.isNil(total)) {
    finalData.page = {
      pageNum,
      pageSize,
      total,
    };
  }
  return finalData;
}

export default resFilter;
