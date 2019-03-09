import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Form,
  Table,
  Button,
  Modal,
  Input,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './UserList.less';

const FormItem = Form.Item;

/* eslint react/no-multi-comp:0 */
@connect(({airport, loading }) => ({
  airports: airport.list,
  loading: loading.models.dept,
}))
@Form.create()
class AirportList extends PureComponent {
  state = {
    target: null,
    showModal: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'airport/queryAll',
    });
  }

  handleAddItem = () => {
    this.setState({ target: null, showModal: true });
  };

  handleEditItem = (item) => {
    this.setState({ target: item, showModal: true });
  };

  OKHandler = () => {
    const { form: { validateFields }, dispatch } = this.props;
    const { target } = this.state;
    validateFields((err, values) => {
      if (!err) {
        if (target) {
          dispatch({
            type: 'airport/edit',
            payload: { ...target, ...values },
          });
        } else {
          dispatch({
            type: 'airport/add',
            payload: { ...values},
          });
        }
        setTimeout(() => {
          this.setState({ showModal: false });
        }, 100);
      }
    });
  }

  render() {
    const {
      airports,
      loading,
      form: { getFieldDecorator }
    } = this.props;
    const { target, showModal } = this.state;
    const columns = [
      {
        title: "机场ID",
        dataIndex: 'id',
      },
      {
        title: "名称",
        dataIndex: 'name',
      },
      {
        title: '操作',
        render: val => val && <a onClick={() => { this.handleEditItem(val); }}>编辑</a>
      },
    ];
    return (
      <PageHeaderWrapper title="机场数据">
        <Card bordered={false}>
          <Button type="dashed" onClick={this.handleAddItem} style={{ width: '100%', marginBottom: 8 }} icon="plus">
            添加新机场
          </Button>
          <div className={styles.tableList}>
            <Table rowKey='id' loading={loading} columns={columns} dataSource={airports} />
          </div>
          <Modal
            title={target ? '编辑机场信息' : '添加新机场'}
            visible={showModal}
            destroyOnClose
            maskClosable={false}
            onOk={this.OKHandler}
            onCancel={() => { this.setState({ showModal: false }); }}
          >
            <Form>
              <FormItem label="名称">
                {getFieldDecorator('name', {
                  initialValue: target ? target.name : '',
                  rules: [{ required: true, message: '必填项' }],
                })(
                  <Input />
                )}
              </FormItem>
            </Form>
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AirportList;
