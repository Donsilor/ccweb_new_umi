import React, { Component } from 'react';
import { Button, Checkbox, Row, InputNumber } from 'antd';
import { ViewWrapper } from '@/layouts/ViewWrapper';
import styles from './index.less';

const CheckboxGroup = Checkbox.Group;

class SuperviseParam extends Component {
  state = {
    canModify: false,
    param: {},
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    try {
      const { data } = await httpCommonClient.post('/SuperviseAction_getParam', {});
      if (data.result === 0) {
        this.setState({
          param: data.data,
        });
      } else {
        throw new Error(data.msg);
      }
    } catch (e) {
      message.error(e.message || e || '接口异常，请稍后再试');
    }
  };

  onChange = (type) => (value) => {
    const { param } = this.state;
    param[type] = value;
    this.setState({
      param: {
        ...param,
      },
    });
  };

  save = async () => {
    const { param } = this.state;
    const apiParam = {
      id: param.id,
      cntBoundary: param.cntBoundary,
      cntByDay: param.cntByDay,
      cntByDealerDay: param.cntByDealerDay,
      repetRate: param.repetRate,
      timesByDealerWeek: param.timesByDealerWeek,
      unwork: param.unwork,
    };
    try {
      const { data } = await httpCommonClient.post('/SuperviseAction_updateParam', apiParam);
      if (data.result === 0) {
        this.setState({
          canModify: false,
        });
        message.success('修改成功');
      } else {
        throw new Error(data.msg);
      }
    } catch (e) {
      message.error(e.message || e || '接口异常，请稍后再试');
    }
  };

  edit = () => {
    this.setState({
      canModify: true,
    });
  };

  render() {
    const { canModify, param } = this.state;
    const plainOptions = ['星期一', '星期二', '星期三', '星期四', '星期五'];
    let unworkDays = param.unwork ? param.unwork.split(',') : [];

    return (
      <div className={styles.paramWrapper}>
        <div className={styles.paramRow}>
          每家经销商每周至少抽查
          <InputNumber
            className={styles.input}
            disabled={!canModify}
            onChange={this.onChange('timesByDealerWeek')}
            value={param.timesByDealerWeek}
          />
          次
        </div>
        <div className={styles.paramRow}>
          每天每户抽查台数不得超过
          <InputNumber
            className={styles.input}
            disabled={!canModify}
            onChange={this.onChange('cntByDealerDay')}
            value={param.cntByDealerDay}
          />
          台
        </div>
        <div className={styles.paramRow}>
          <InputNumber
            className={styles.input}
            disabled={!canModify}
            onChange={this.onChange('cntBoundary')}
            value={param.cntBoundary}
          />
          台及以下库存经销商每次抽查1台，以上库存经销商每次抽查2台
        </div>
        <div className={styles.paramRow}>
          保证每个月抽查车辆明细
          <InputNumber
            className={styles.input}
            disabled={!canModify}
            onChange={this.onChange('repetRate')}
            value={param.repetRate}
          />
          %以内重复率
        </div>
        <div className={styles.paramRow}>
          每天抽查不得低于
          <InputNumber
            className={styles.input}
            disabled={!canModify}
            onChange={this.onChange('cntByDay')}
            value={param.cntByDay}
          />
          台（包括特殊抽查名单抽查数）
        </div>
        <div className={styles.paramRow}>设置不查工作日</div>
        <CheckboxGroup
          options={plainOptions}
          value={unworkDays}
          disabled={!canModify}
          onChange={(checkedValues) => {
            this.onChange('unwork')(checkedValues.toString());
          }}
        />
        <div className={styles.operation}>
          {!canModify && (
            <Button type="primary" size={'middle'} onClick={this.edit}>
              修改
            </Button>
          )}
          {canModify && (
            <Button type="primary" size={'middle'} onClick={this.save}>
              保存
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default SuperviseParam;
