import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Card,
  Form,
  Table,
  Button,
  Popconfirm,
  Modal,
  Input,
  Select,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './UserList.less';

const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({ user, dept, loading }) => ({
  users: user.list,
  depts: dept.list,
  loading: loading.models.user || loading.effects['dept/queryAll'],
}))
@Form.create()
class UserList extends PureComponent {
  state = {
    target: null,
    showModal: false,
  }

  componentDidMount() {
    const { dispatch, depts } = this.props;
    dispatch({
      type: 'user/queryAllUser',
    });
    if (!depts.length) {
      dispatch({
        type: 'dept/queryAll',
      });
    }
  }

  handleLockEvent = (userId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/lock',
      payload: userId,
    });
  };

  handleEnableEvent = (userId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/unlock',
      payload: userId,
    });
  };

  handleDeleteEvent = (userId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/remove',
      payload: userId,
    });
  }

  renderDeptName = (val) => {
    const { depts } = this.props;
    const dept = depts.find(item => item.id === val);
    if (dept) { return dept.name }
    return 'not set';
  };

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
            type: 'user/edit',
            payload: { ...target, ...values },
          });
        } else {
          dispatch({
            type: 'user/add',
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
      users,
      loading,
      locking,
      deteling,
      enabling,
      depts,
      form: { getFieldDecorator }
    } = this.props;
    const { target, showModal } = this.state;
    const columns = [
      {
        title: "用户Id",
        dataIndex: 'userId',
      },
      {
        title: "用户名",
        dataIndex: 'name',
      },
      {
        title: "部门",
        dataIndex: 'deptId',
        render: this.renderDeptName,
      },
      {
        title: "手机号",
        dataIndex: 'phone',
      },
      {
        title: "添加时间",
        dataIndex: 'addTime',
        render: val => val && <span>{moment(val).format('YYYY-MM-DD')}</span>
      },
      {
        title: '操作',
        render: val => val
          && val.role !== 'Manager' &&
          (
            <span>
              <Fragment>
                <a style={{ marginRight: '10px' }} onClick={() => { this.handleEditItem(val); }}>编辑</a>
                {
                  val.state === 'Valid' &&
                  <Popconfirm title="确定锁定该用户 ?" onConfirm={() => this.handleLockEvent(val.userId)}>
                    <a loading={locking}>锁定</a>
                    &nbsp;
                  </Popconfirm>
                }
                {
                  val.state === 'Locked' &&
                  <Popconfirm title="确定解锁该用户 ?" onConfirm={() => this.handleEnableEvent(val.userId)}>
                    <a loading={enabling}>解锁</a>
                    &nbsp;
                  </Popconfirm>
                }
                <Popconfirm title="删除用户 ?" onConfirm={() => this.handleDeleteEvent(val.userId)}>
                  <a loading={deteling}>删除</a>
                </Popconfirm>
              </Fragment>
            </span>
          ),
      },
    ];
    return (
      <PageHeaderWrapper title="用户管理">
        <Card bordered={false}>
          <Button type="dashed" onClick={this.handleAddItem} style={{ width: '100%', marginBottom: 8 }} icon="plus">
            添加新用户
          </Button>
          <div className={styles.tableList}>
            <Table rowKey='useId' loading={loading} columns={columns} dataSource={users} />
          </div>
          <Modal
            title={target ? '编辑用户' : '添加用户'}
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
              <FormItem label="手机号">
                {getFieldDecorator('phone', {
                  initialValue: target ? target.phone : '',
                  rules: [{ required: true, message: '必填项' }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem label="部门">
                {getFieldDecorator('deptId', {
                  initialValue: target ? target.deptId : '',
                  rules: [{ required: true, message: '必填项' }],
                })(
                  <Select>
                    {
                      depts.filter(item => item.id !== 0).map(d => <Option key={d.id} value={d.id}>{d.name}</Option>)
                    }
                  </Select>
                )}
              </FormItem>
              <FormItem label="登录密码">
                {getFieldDecorator('password', {
                  initialValue: target ? target.password : '',
                  rules: [{ required: !target, message: '必填项' }],
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

export default UserList;
