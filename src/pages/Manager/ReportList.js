import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';
import {
  Card,
  Form,
  Table,
  Button,
  Modal,
  Input,
  Select,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './UserList.less';
import DeadLineInput from './DeadLineInput';

const FormItem = Form.Item;
const { Option } = Select;

const Week = {
  '01': '一',
  '02': '二',
  '03': '三',
  '04': '四',
  '05': '五',
  '06': '六',
  '07': '日',
};

/* eslint react/no-multi-comp:0 */
@connect(({ report, dept, field, loading }) => ({
  reports: report.list,
  depts: dept.list,
  fields: field.list,
  loading: loading.models.report || loading.effects['dept/queryAll'] || loading.effects['field/queryAll'],
}))
@Form.create()
class ReportList extends PureComponent {
  state = {
    target: null,
    showModal: false,
    type: null,
  }

  componentDidMount() {
    const { dispatch, depts, fields } = this.props;
    dispatch({
      type: 'report/queryAll',
    });
    if (!depts.length) {
      dispatch({
        type: 'dept/queryAll',
      });
    }
    if (!fields.length) {
      dispatch({
        type: 'field/queryAll',
      });
    }
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
    this.setState({ target: item, showModal: true, type: item.type });
  };

  handleTypeChange = (val) => {
    this.setState({ type: val });
  };

  OKHandler = () => {
    const { form: { validateFields }, dispatch } = this.props;
    const { target } = this.state;
    validateFields((err, values) => {
      if (!err) {
        if (target) {
          dispatch({
            type: 'report/edit',
            payload: { ...target, ...values },
          });
        } else {
          dispatch({
            type: 'report/add',
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
      reports,
      loading,
      depts,
      fields,
      form: { getFieldDecorator }
    } = this.props;
    const { target, showModal, type } = this.state;
    const columns = [
      {
        title: "报表Id",
        dataIndex: 'id',
      },
      {
        title: "名称",
        dataIndex: 'name',
      },
      {
        title: "部门",
        dataIndex: 'deptId',
        render: this.renderDeptName,
      },
      {
        title: "类型",
        dataIndex: 'type',
        render: (val) => {
          if (val === 'Daily') {
            return '日报表';
          }
          if (val === 'Weekly') {
            return '周报表';
          }
          if (val === 'Monthly') {
            return '月报表';
          }
          return '魔法表';
        }
      },
      {
        title: "填报期限",
        dataIndex: 'deadline',
        render: (val, record) => {
          const s = val.split("-");
          const { type:t } = record;
          if (t === 'Daily') {
            return `每天${s[3]}点${s[4]}分前`;
          }
          if (t === 'Weekly') {
            return `每周${Week[s[1]]}${s[3]}点${s[4]}分前`;
          }
          if (t === 'Monthly') {
            return `每月${s[2]}日${s[3]}点${s[4]}分前`;
          }
          return "未知";
        }
      },
      {
        title: "添加时间",
        dataIndex: 'addTime',
        render: val => val && <span>{moment(val).format('YYYY-MM-DD')}</span>
      },
      {
        title: "最近修改时间",
        dataIndex: 'modifyTime',
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
                <Link to={`/reports/${val.id}`} key={val}>详情</Link>
              </Fragment>
            </span>
          ),
      },
    ];
    return (
      <PageHeaderWrapper title="报表管理">
        <Card bordered={false}>
          <Button type="dashed" onClick={this.handleAddItem} style={{ width: '100%', marginBottom: 8 }} icon="plus">
            添加新报表
          </Button>
          <div className={styles.tableList}>
            <Table rowKey='id' loading={loading} columns={columns} dataSource={reports} />
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
              <FormItem label="报表类型">
                {getFieldDecorator('type', {
                  initialValue: target ? target.type : '',
                  rules: [{ required: true, message: '必填项' }],
                })(
                  <Select onChange={this.handleTypeChange}>
                    <Option value="Daily">日报表</Option>
                    <Option value="Weekly">周报表</Option>
                    <Option value="Monthly">月报表</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem label="填报期限">
                {getFieldDecorator('deadline', {
                  initialValue: target ? target.deadline : '',
                  rules: [{ required: true, message: '必填项' }],
                })(
                  <DeadLineInput type={type || 'Daily'} />
                )}
              </FormItem>
              {
                !target &&
                <FormItem label="字段">
                  {getFieldDecorator('fields', {
                    rules: [
                      { required: true, message: '至少要选一个字段!', type: 'array' },
                    ],
                  })(
                    <Select
                      showSearch
                      mode="multiple"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {fields.map(field => <Option key={field.id} value={field.id}>{field.name}</Option>)}
                    </Select>
                  )}
                </FormItem>
              }
            </Form>
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ReportList;
