import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Divider, Select, Row, Col, Button, Form, Input, Modal  } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import NumericInput from './NumericInput';

const { Description } = DescriptionList;
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
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 13 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 7,
    },
  },
};

@connect(({ report, airport, field, loading }) => ({
  detail: report.target,
  editData: report.editData,
  fields: field.current,
  airports: airport.list,
  loading: loading.effects['report/detail'] || loading.effects['airport/queryAll'] || loading.effects['field/queryCurrent'],
  reporting: loading.effects['report/inputData'] || loading.effects['report/editData'] ,
}))
@Form.create()
class ReportInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      showAirport: !props.editData,
      airportId: props.editData ? props.editData.airportId : 0,
    };
  }

  componentDidMount() {
    const { dispatch, match, editData, fields, airports } = this.props;
    const { reportId } = match.params;
    dispatch({
      type: 'report/detail',
      payload: parseInt(reportId, 10),
    });
    if (!airports.length) {
      dispatch({
        type: 'airport/queryAll',
      });
    }
    if (editData && !fields.length) {
      dispatch({
        type: 'field/queryCurrent',
      });
    }
  }

  handleInput = () => {
    const { form: { validateFields }, editData, dispatch, detail } = this.props;
    const { airportId } = this.state;
    validateFields((err, values) => {
      if (!err) {
        const payload = {
          reportId : detail.id,
          airportId : editData ? editData.airportId : airportId,
        };
        const fieldValues = [];
        if (editData) {
          Object.keys(values).forEach(v => {
            const r = v.split("_");
            fieldValues.push({
              id: parseInt(r[1], 10),
              fieldId: parseInt(r[0], 10),
              value: values[v],
            })
          });
        } else {
          Object.keys(values).forEach(v => {
            fieldValues.push({
              fieldId: v,
              value: values[v],
            })
          });
        }
        payload.values = fieldValues;
        dispatch({
          type: editData ? 'report/editData' : 'report/inputData',
          payload,
        });
      }
    });
  }

  renderFormItem = () => {
    const { detail: { fields }, fields: allFields, editData, form: { getFieldDecorator } } = this.props;
    if (editData && allFields.length) {
      return Object.keys(editData.origin).filter(i => i !== 'addDay').map((fieldId) => {
        const field = allFields.find(f => f.id === parseInt(fieldId, 10));
        const origin = editData.origin[fieldId];
        const options = {
          initialValue: origin.value,
          rules: [{ required: field.required, message: '必填项' }],
        };
        let ctrl;
        if (field.type === 'Integers' || field.type === 'Float') {
          ctrl = getFieldDecorator(`${field.id}_${origin.id}`, options)(<NumericInput type={field.type === 'Integers' ? 'int' : ''} />)
        } else {
          ctrl = getFieldDecorator(`${field.id}_${origin.id}`, options)(<Input />)
        }
        return (
          <Col xs={24} sm={12} md={8} key={field.id}>
            <FormItem label={field.name}>
              {ctrl}
            </FormItem>
          </Col>
        );
      })
    }
    return fields.map((field) => {
      const options = {
        rules: [{ required: field.required, message: '必填项' }],
      };
      let ctrl;
      if (field.type === 'Integers' || field.type === 'Float') {
        ctrl = getFieldDecorator(`${field.id}`, options)(<NumericInput type={field.type === 'Integers' ? 'int' : ''} />)
      } else {
        ctrl = getFieldDecorator(`${field.id}`, options)(<Input />)
      }
      return (
        <Col xs={24} sm={12} md={8} key={field.id}>
          <FormItem label={field.name}>
            {ctrl}
          </FormItem>
        </Col>
      );
    })
  }

  handleGo2ChangeAirport = () => {
    this.setState({
      showAirport: true,
    });
  }

  handleAirportChange = (value) => {
    this.setState({
      showAirport: false,
      airportId: value,
    });
  }

  render() {
    const { detail, loading, airports, reporting } = this.props;
    const { airportId, showAirport } = this.state;
    const airportName = airports.length && airportId && airports.find(a => a.id === airportId).name;
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
      <PageHeaderWrapper>
        <Card loading={loading} bordered={false}>
          <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
            <Description term="名称">{detail.name}</Description>
            <Description term="填报期限">{deadline}</Description>
            <Description term="填报机场">{airportName || '未选择'} <Button size="small" onClick={this.handleGo2ChangeAirport}>切换</Button></Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          {
            detail.fields &&
            <div>
              <Form>
                <Row gutter={16}>
                  {this.renderFormItem()}
                </Row>
                <div style={{ textAlign: 'right' }}>
                  <Button style={{ width: 150, margin: '0 auto' }} loading={reporting} type="primary" onClick={this.handleInput}>提交</Button>
                </div>
              </Form>
            </div>
          }
        </Card>
        <Modal
          visible={showAirport}
          closable={false}
          maskClosable={false}
          footer={null}
        >
          <Select style={{ width: '100%' }} placeholder="请先选择机场" size="large" onChange={this.handleAirportChange}>
            {
              airports.map(d => <Option key={d.id} value={d.id}>{d.name}</Option>)
            }
          </Select>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default ReportInput;
