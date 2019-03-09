import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Card,
  Form,
  Table,
  Button,
  Modal,
  Input,
  Select,
  Checkbox,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './UserList.less';

const FormItem = Form.Item;
const { Option } = Select;

/* eslint react/no-multi-comp:0 */
@connect(({field, loading }) => ({
  fields: field.list,
  loading: loading.models.dept,
}))
@Form.create()
class FieldList extends PureComponent {
  state = {
    target: null,
    showModal: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'field/queryAll',
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
            type: 'field/edit',
            payload: { ...target, ...values },
          });
        } else {
          dispatch({
            type: 'field/add',
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
      fields,
      loading,
      form: { getFieldDecorator }
    } = this.props;
    const { target, showModal } = this.state;
    const columns = [
      {
        title: "字段ID",
        dataIndex: 'id',
      },
      {
        title: "名称",
        dataIndex: 'name',
      },
      {
        title: "类型",
        dataIndex: 'type',
        render: (val) => {
          if (val === 'Integers') {
            return '整数';
          }
          if (val === 'Float') {
            return '小数（两位）';
          }
          return "文本";
        },
      },
      {
        title: "是否必填",
        dataIndex: 'required',
        render: val => val ? '是':'否',
      },
      {
        title: "添加时间",
        dataIndex: 'addTime',
        render: val => val && <span>{moment(val).format('YYYY-MM-DD')}</span>
      },
      {
        title: '操作',
        render: val => val && <a onClick={() => { this.handleEditItem(val); }}>编辑</a>
      },
    ];
    return (
      <PageHeaderWrapper title="报表字段">
        <Card bordered={false}>
          <Button type="dashed" onClick={this.handleAddItem} style={{ width: '100%', marginBottom: 8 }} icon="plus">
            添加新字段
          </Button>
          <div className={styles.tableList}>
            <Table rowKey='id' loading={loading} columns={columns} dataSource={fields} />
          </div>
          <Modal
            title={target ? '编辑字段' : '添加字段'}
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
              <FormItem label="类型">
                {getFieldDecorator('type', {
                  initialValue: target ? target.type : 'Integers',
                  rules: [{ required: true, message: '必填项' }],
                })(
                  <Select>
                    <Option value="Integers">整数</Option>
                    <Option value="Float">小数(两位)</Option>
                    <Option value="String">文本</Option>
                  </Select>
                )}
              </FormItem>
              <Form.Item>
                {getFieldDecorator('required', {
                  valuePropName: 'checked',
                  initialValue: target ? target.required : true,
                })(
                  <Checkbox>必填项</Checkbox>
                )}
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default FieldList;
