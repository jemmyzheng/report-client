import React, { PureComponent } from 'react';
import { Form, Button, Select, DatePicker, Row, Col } from 'antd';
import { stringify } from 'qs';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class ReportQueryForm extends PureComponent {
  handleSearch = (e) => {
    e.preventDefault();
    const { onSearch, form } = this.props;
    form.validateFieldsAndScroll((error, values) => {
      const createDateRange = values.createDateRange && values.createDateRange.length &&
        [values.createDateRange[0].format('YYYY-MM-DD'), values.createDateRange[1].format('YYYY-MM-DD')];
      const queryData = {};
      if (createDateRange) {
        queryData.beginDate = createDateRange[0]; // eslint-disable-line
        queryData.endDate = createDateRange[1]; // eslint-disable-line
      }
      Object.keys(values).forEach(item => {
        if (item !== 'createDateRange') {
          queryData[item] = values[item];
        }
      });
      if (!queryData.reportId) { queryData.reportId = [] }
      if (!queryData.airportId) { queryData.airportId = 0 }
      onSearch(queryData);
    });
  }

  handleFormReset = () => {
    const { form, onReset } = this.props;
    form.resetFields();
    onReset();
  }

  render() {
    const { form: { getFieldDecorator }, query, reports, airports} = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={16}>
          <Col span={10}>
            <FormItem label="录入日期(起始)">
              {getFieldDecorator('createDateRange')(
                <RangePicker />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="报表">
              {getFieldDecorator('reportId',{
                initialValue: query && query.reportId ? query.reportId : [],
              })(
                <Select
                  placeholder="请选择报表"
                  style={{ width: 180 }}
                  mode="multiple"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {
                    reports.map(d => <Option key={d.id} value={d.id}>{d.name}</Option>)
                  }
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="机场">
              {getFieldDecorator('airportId', {
                initialValue: query && query.airportId ? query.airportId : undefined,
              })(
                <Select style={{ width: 180 }} placeholder="请选择机场">
                  {
                    airports.map(d => <Option key={d.id} value={d.id}>{d.name}</Option>)
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="end">
          <Col>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Col>
          {
            query.beginDate && query.endDate
            &&
            <Col>
              <Button style={{ margin: '0 8px' }} href={`/api/reports/export?${stringify(query)}`} target="_blank">导出Excel</Button>
            </Col>
          }
          <Col>
            <Button style={{ margin: '0 8px' }} onClick={this.handleFormReset}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default ReportQueryForm;
