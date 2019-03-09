import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import moment from 'moment';
import {
  Card,
  Form,
  Table,
  Button,
  Popconfirm,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './TableList.less';


/* eslint react/no-multi-comp:0 */
@connect(({ order, global, loading }) => ({
  orders: order.orders,
  payMethods: global.payMethods,
  loading: loading.models.order,
  checking: loading.effects['order/query'],
  canceling: loading.effects['order/cancel'],
  refunding: loading.effects['order/refund'],
}))
@Form.create()
class TableList extends PureComponent {

  componentDidMount() {
    const { dispatch, payMethods } = this.props;
    dispatch({
      type: 'order/fetch',
    });
    if (!payMethods.length) {
      dispatch({type: 'global/queryPayMethods'});
    }
  }

  handleCheckEvent = (orderId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/query',
      payload: orderId,
    });
  };

  handleCancelEvent = (orderId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/cancel',
      payload: orderId,
    });
  };

  handleRefundEvent = (orderId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/refund',
      payload: orderId,
    });
  }

  renderMethodName = (val) => {
    const { payMethods } = this.props;
    const method = payMethods.find(item => item.id === val);
    if (method) { return method.name }
    return 'not set';
  };

  render() {
    const {
      orders,
      loading,
      checking,
      refunding,
      canceling,
    } = this.props;
    const columns = [
      {
        title: formatMessage({ id: 'order.list.id' }),
        dataIndex: 'id',
        width: '80px',
      },
      {
        title: formatMessage({ id: 'order.list.merchant.id' }),
        dataIndex: 'merchantId',
        width: '100px',
      },
      {
        title: formatMessage({ id: 'order.list.uqpay.order.id' }),
        dataIndex: 'uqOrderId',
        width: '140px',
      },
      {
        title: formatMessage({ id: 'order.list.method' }),
        dataIndex: 'methodId',
        render: this.renderMethodName,
        width: '140px',
      },
      {
        title: formatMessage({ id: 'order.list.amount' }),
        dataIndex: 'amount',
        width: '100px',
        render: (val, record) => (
          <Fragment>
            <span>{record.currency}</span>
            &nbsp;
            <span>{val}</span>
          </Fragment>
        ),
      },
      {
        title: formatMessage({ id: 'order.list.state' }),
        dataIndex: 'state',
        width: '100px',
      },
      {
        title: formatMessage({ id: 'order.list.ip' }),
        dataIndex: 'ip',
      },
      {
        title: formatMessage({ id: 'order.list.pay-date' }),
        dataIndex: 'payDate',
        render: val => val && <span>{moment(val).format('MM-DD HH:mm:ss')}</span>,
      },
      {
        title: formatMessage({ id: 'order.list.modify-date' }),
        dataIndex: 'modifyDate',
        render: val => val && <span>{moment(val).format('MM-DD HH:mm:ss')}</span>,
      },
      {
        title: formatMessage({ id: 'order.list.notice-date' }),
        dataIndex: 'noticeDate',
        render: val => val && <span>{moment(val).format('MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '',
        render: val => val
          &&
          (
            <span>
              <Fragment>
                <Button loading={checking} onClick={() => this.handleCheckEvent(val.id)}>Check</Button>
                &nbsp;
                <Popconfirm title="You are trying to cancel a pay order ?" onConfirm={() => this.handleCancelEvent(val.id)}>
                  <Button loading={canceling}>Cancel</Button>
                </Popconfirm>
                &nbsp;
                <Popconfirm title="You are trying to refund a pay order ?" onConfirm={() => this.handleRefundEvent(val.id)}>
                  <Button loading={refunding}>Refund</Button>
                </Popconfirm>
              </Fragment>
            </span>
          ),
      },
    ];
    return (
      <PageHeaderWrapper title={formatMessage({ id: 'order.list.title' })}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table rowKey='id' loading={loading} columns={columns} dataSource={orders} />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
