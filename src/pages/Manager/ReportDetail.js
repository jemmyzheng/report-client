import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Tag, Divider, Icon, Popconfirm, Button, Form, Select, Modal  } from 'antd';
import moment from 'moment';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Description } = DescriptionList;
const FormItem = Form.Item;
const { Option } = Select;
const Type = {
  'Daily': '日报表',
  'Weekly': '周报表',
  'Monthly': '月报表',
};
const Week = {
  '01': '一',
  '02': '二',
  '03': '三',
  '04': '四',
  '05': '五',
  '06': '六',
  '07': '日',
};
@connect(({ report, dept, field, loading }) => ({
  detail: report.target,
  depts: dept.list,
  fields: field.list,
  loading: loading.effects['report/detail'],
  deleting: loading.effects['report/rmField'],
}))
@Form.create()
class ReportDetail extends Component {
  state={
    addField: false,
  }

  componentDidMount() {
    const { dispatch, match, depts, fields } = this.props;
    const { reportId } = match.params;
    dispatch({
      type: 'report/detail',
      payload: parseInt(reportId, 10),
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

  handleDeleteField = (reportId, fieldId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/rmField',
      payload: {
        reportId,
        fieldId,
      },
    });
  }

  handleSetFields = () => {
    const { form: { validateFields }, detail, dispatch } = this.props;
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'report/setFields',
          payload: { reportId: detail.id, ...values },
        });
        setTimeout(() => {
          this.setState({ addField: false });
        }, 100);
      }
    });
  }

  handleAddItem = () => {
    this.setState({ addField: true });
  };

  renderFieldOptions = () => {
    const { detail, fields } = this.props;
    return fields.filter(field => !detail.fields.find(item => item.id === field.id))
      .map(field => <Option key={field.id} value={field.id}>{field.name}</Option>)
  }

  renderFieldTag = () => {
    const { detail, deleting } = this.props;
    return detail.fields.map(field =>
      (
        <Tag key={field.id}>
          {field.name}&nbsp;
          {
            deleting ? <Icon type="loading" /> : (
              <Popconfirm
                title="删除字段会导致已存在该字段数据也全部删除，确定？"
                onConfirm={() => this.handleDeleteField(detail.id, field.id)}
              >
                <Icon type="close" />
              </Popconfirm>
            )
          }
        </Tag>
      )
    )
  }

  render() {
    const { detail, loading, depts, form: { getFieldDecorator } } = this.props;
    const { addField } = this.state;
    const dept = depts.find(item => item.id === detail.deptId);
    let deadline = "";
    if (detail.deadline) {
      const s = detail.deadline.split("-");
      const { type: t } = detail;
      if (t === 'Daily') {
        deadline = `每天${s[3]}点${s[4]}分前`;
      }
      if (t === 'Weekly') {
        deadline = `每周${Week[s[1]]}${s[3]}点${s[4]}分前`;
      }
      if (t === 'Monthly') {
        deadline = `每月${s[2]}日${s[3]}点${s[4]}分前`;
      }
    }
    return (
      <PageHeaderWrapper title="报表详情">
        <Card loading={loading} bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
            <Description term="名称">{detail.name}</Description>
            <Description term="ID">{detail.id}</Description>
            <Description term="所属部门">{dept && dept.name}</Description>
            <Description term="类型">{Type[detail.type]}</Description>
            <Description term="填报期限">{deadline}</Description>
            <Description term="添加时间">{detail.addTime && moment(detail.addTime).format('YYYY-MM-DD')}</Description>
            <Description term="最近修改时间">{detail.modifyTime && moment(detail.modifyTime).format('YYYY-MM-DD')}</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div>
            <h4>报表字段</h4>
            {
              detail.fields &&
              this.renderFieldTag()
            }
            <Button size="small" onClick={this.handleAddItem} icon="plus" />
          </div>
          {
            detail.fields &&
            <Modal
              title="添加字段"
              visible={addField}
              destroyOnClose
              maskClosable={false}
              onOk={this.handleSetFields}
              onCancel={() => { this.setState({ addField: false }); }}
            >
              <Form>
                <FormItem label="字段">
                  {getFieldDecorator('fieldIds', {
                    rules: [
                      { required: true, message: '至少要选一个字段!', type: 'array' },
                    ],
                  })(
                    <Select
                      showSearch
                      mode="multiple"
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                      {this.renderFieldOptions()}
                    </Select>
                  )}
                </FormItem>
              </Form>
            </Modal>
          }
        </Card>

      </PageHeaderWrapper>
    );
  }
}

export default ReportDetail;
