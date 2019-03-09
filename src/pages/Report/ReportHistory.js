import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Table, Card, Row, Col, Checkbox } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ReportHistory.less';
import ReportQueryForm from './ReportQueryForm';

const CheckboxGroup = Checkbox.Group;

@connect(({ report, field, airport, loading }) => ({
  query: report.query,
  reports: report.currentReports,
  pagination: report.pagination,
  history: report.history,
  fields: field.current,
  fieldMap: field.map,
  airports: airport.list,
  loading: loading.effects['report/queryCurrent'] || loading.effects['field/queryCurrent'] || loading.effects['airport/queryAll'],
}))
class ReportHistory extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      selectedFields: [],
    }
  }

  componentDidMount() {
    const { pagination, reports, query, airports, fields, dispatch } = this.props;
    if (!reports.length) {
      dispatch({
        type: 'report/queryCurrent',
      });
    }
    if (!airports.length) {
      dispatch({
        type: 'airport/queryAll',
      });
    }
    if (!fields.length) {
      dispatch({
        type: 'field/queryCurrent',
      });
    }
    dispatch({
      type: 'report/queryHistory',
      payload: {
        query,
        pagination: {
          ...pagination,
          current: 1,
        },
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    if ('query' in nextProps && nextProps.query.reportId && nextProps.query.reportId.length) {
      const fields = [];
      const selectedFields = [];
      nextProps.query.reportId.forEach(reportId => {
        const report = nextProps.reports.find(r => r.id === reportId);
        if (report) {
          nextProps.fields
            .filter(f => report.fields.find(id => f.id === id) && !fields.find( s => s.id === f.id))
            .forEach(f => {
              fields.push({ ...f, label: f.name, value: f.id});
              selectedFields.push(f.id);
            });
        }
      });
      this.setState({
        fields,
        selectedFields,
      })
    } else if ('fields' in nextProps) {
      let fields = [];
      const selectedFields = [];
      fields = nextProps.fields.map(f => {
        selectedFields.push(f.id);
        return ({ ...f, label: f.name, value: f.id});
      });
      this.setState({
        fields,
        selectedFields,
      });
    }
  }

  pageDispatch = (key, value) => {
    const { pagination, query, dispatch } = this.props;
    dispatch({
      type: 'report/queryHistory',
      payload: {
        query: {
          ...query,
        },
        pagination: {
          ...pagination,
          [key]: value,
        },
      },
    });
  }

  handlePageChange = (current) => {
    this.pageDispatch('current', current);
  }

  handlePageSizeChange = (_, size) => {
    this.pageDispatch('pageSize', size);
  }

  handleSearch = (queryData) => {
    const { dispatch, pagination } = this.props;
    dispatch({
      type: 'report/queryHistory',
      payload: {
        query: {
          ...queryData,
        },
        pagination: {
          ...pagination,
          current: 1,
        },
      },
    });
  }

  handleFormReset = () => {
    const { pagination, dispatch } = this.props;
    dispatch({
      type: 'report/queryHistory',
      payload: {
        query: {
          airportId: 0,
          reportId: [],
          beginDate: null,
          endDate: null,
        },
        pagination: {
          ...pagination,
          current: 1,
        },
      },
    });
  }

  handleEditItem = (item) => {
    const { dispatch, query } = this.props;
    if (query.reportId && query.airportId) {
      dispatch({
        type: 'report/jump2editValue',
        payload: {
          origin: { ...item },
          reportId: query.reportId,
          airportId: query.airportId,
        }
      });
    }
  };

  fileterFields = (values) => {
    this.setState({
      selectedFields: values,
    })
  };

  renderFieldValue = (val) => val ? <span style={{ color: val.state === 'Timeout' ? '#ceb311':''}}>{val.value}</span> : 0;

  render() {
    const { history, pagination, loading, query, reports, airports } = this.props;
    const { fields, selectedFields } = this.state;
    const paginationProps = {
      onShowSizeChange: this.handlePageSizeChange,
      onChange: this.handlePageChange,
      ...pagination,
    };
    let formMaxWidth = 0;
    let columns = [
      {
        title: '录入日期',
        dataIndex: 'addDay',
        width: 120,
        fixed: selectedFields.length > 11 ? 'left': false,
        render: val => val && <span>{moment(val).format('YYYY-MM-DD')}</span>
      },
    ];
    formMaxWidth += 100;
    columns = columns.concat(selectedFields.map(fieldId => {
      const field = fields.find(f => f.id === fieldId);
      let width = field.name.length * 15;
      width = width < 80 ? 80 : width;
      formMaxWidth += width;
      return {
        title: field.name,
        dataIndex: field.id,
        width,
        render: this.renderFieldValue,
      }
    }));

    if (query && query.reportId && query.reportId.length === 1 && query.airportId) {
      columns.push({
        title: '操作',
        width: 80,
        fixed: selectedFields.length > 11 ? 'right': false,
        render: val => <a style={{ marginRight: '10px' }} onClick={() => { this.handleEditItem(val); }}>修改</a>
      });
      formMaxWidth += 80;
    }
    const source = history.map(item => {
      const { addDay, values } = item;
      const result = {
        addDay,
      };
      values.forEach(v => {
        if (result[v.fieldId]) {
          result[v.fieldId].value += v.value;
          result[v.fieldId].no += 1
        } else {
          result[v.fieldId] = {...v};
          result[v.fieldId].no = 0;
        }
      });
      return result;
    });
    return (
      <PageHeaderWrapper
        content={<ReportQueryForm query={query} reports={reports} airports={airports} onSearch={this.handleSearch} onReset={this.handleFormReset} />}
      >
        <Card loading={loading}>
          <CheckboxGroup value={selectedFields} onChange={this.fileterFields}>
            <Row>
              {fields.map(f => <Col span={4} key={f.id}><Checkbox key={f.id} value={f.id}>{f.name}</Checkbox></Col>)}
            </Row>
          </CheckboxGroup>
        </Card>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table
              size="middle"
              bordered
              scroll={selectedFields.length > 11 ? { x: formMaxWidth } : {}}
              rowKey='addDay'
              loading={loading}
              pagination={paginationProps}
              columns={columns}
              dataSource={source}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ReportHistory;
