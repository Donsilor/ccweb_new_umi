/* eslint-disable no-undef */
import React from 'react';
import _ from 'lodash';
import { Badge, message } from 'antd';
import saveAs from 'file-saver';
import moment from 'moment';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';
function translate(text, dicList, withBadge, isConfirmReceipt = 0, isException = 0) {
  if (!Array.isArray(dicList)) {
    return '';
  }
  const index = dicList.findIndex((dic) => dic.value === text);
  if (text === 0 && isConfirmReceipt === 1) {
    // 确认回执
    if (withBadge) {
      return <Badge status={'success'} text={'确认回执'} />;
    } else {
      return '确认回执';
    }
  } else if (text === 0 && isException === 1) {
    if (withBadge) {
      return <Badge status={'error'} text={'异常任务'} />;
    } else {
      return '异常任务';
    }
  }
  if (index === -1) {
    return text;
  } else if (withBadge) {
    return <Badge status={dicList[index].badgeStatus || 'default'} text={dicList[index].name} />;
  } else {
    return dicList[index].name;
  }
}
function translatePureDic(text, dicList, withBadge) {
  if (!Array.isArray(dicList)) {
    return '';
  }
  const index = dicList.findIndex((dic) => dic.value === text);
  if (index === -1) {
    return text;
  } else if (withBadge) {
    return <Badge status={dicList[index].badgeStatus || 'default'} text={dicList[index].name} />;
  } else {
    return dicList[index].name;
  }
}

// success  error  default processing  warning
function tranBadgeStatus(text, statusDicList, key) {
  if (!Array.isArray(statusDicList)) {
    return 'processing';
  }
  const index = statusDicList.findIndex((dic) => (key ? dic[key] === text : dic.name === text));
  if (index === -1) {
    return 'processing';
  } else {
    return statusDicList[index].badgeStatus;
  }
}

function getAuthStep(status, cmAuditFlag, bpAuditFlag) {
  if (!status) {
    return -1;
  }
  const index = EBDic.statusDicList.findIndex((dic) => String(dic.value) === String(status));
  if (index === -1) {
    return -1;
  } else if (cmAuditFlag + bpAuditFlag === 2 && EBDic.statusDicList[index].processStep === 3) {
    if (status === 33) {
      return 3;
    }
    return 6;
  } else if (cmAuditFlag + bpAuditFlag === 1 && EBDic.statusDicList[index].processStep === 3) {
    if (status === 33) {
      return 3;
    }
    return 5;
  } else {
    return EBDic.statusDicList[index].processStep;
  }
}

function exportFile(payload) {
  try {
    const { data, headers } = payload || {};
    const contentDisposition = headers['new-content-disposition'] || headers['content-disposition'];
    if (!contentDisposition) {
      const enc = new TextDecoder('utf-8');
      const msg = new Uint8Array(data);
      const res = JSON.parse(enc.decode(msg));
      message.info(res.message || '');
    } else {
      const filename = decodeURI(contentDisposition && contentDisposition.slice(20));
      const blob = new Blob([data], {
        type: headers['content-type'],
      });
      saveAs(blob, filename);
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

export function loadBMap() {
  const ak = '2RUyt79vH3CDGdSyhi2lH8UWwf8Fg4kT';
  if (window.BMap) {
    return Promise.resolve(window.BMap);
  }
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.dataset.name = 'map';
    script.src = `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=initMap`; //callback调用init函数。
    document.head.appendChild(script);
    window.initMap = () => {
      resolve(window.BMap);
    };
  });
}

export function formatTime(text) {
  if (!text) {
    return '-';
  } else if (moment.isMoment(text)) {
    return text.format(TIME_FORMAT);
  } else if (text.time) {
    return moment.unix(text.time / 1000).format(TIME_FORMAT);
  } else if (moment.isMoment(moment(text))) {
    return moment(text).format(TIME_FORMAT);
  } else {
    return text || '-';
  }
}
export function formatDate(text) {
  if (!text) {
    return '-';
  } else if (moment.isMoment(text)) {
    return text.format(DATE_FORMAT);
  } else if (text.time) {
    return moment.unix(text.time / 1000).format(DATE_FORMAT);
  } else if (moment.isMoment(moment(text))) {
    return moment(text).format(DATE_FORMAT);
  } else {
    return text || '-';
  }
}

export default translate;
export { translate, translatePureDic, tranBadgeStatus, getAuthStep, exportFile };
