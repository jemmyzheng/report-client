import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Card, List, Avatar } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import avatar from '../../assets/avatar.gif';
import styles from './Workplace.less';

const Week = {
  '01': '一',
  '02': '二',
  '03': '三',
  '04': '四',
  '05': '五',
  '06': '六',
  '07': '日',
};

@connect(({ user, report, loading }) => ({
  currentUser: user.currentUser,
  reports: report.currentReports,
  // currentUserLoading: loading.effects['user/fetchCurrent'],
  reportLoading: loading.effects['report/queryCurrent'],
  historyLoading: loading.effects['report/historyLoad'],
}))
class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch, reports } = this.props;
    if (!reports.length) {
      dispatch({
        type: 'report/queryCurrent',
      });
    }
  }

  deadline = (deadline, type) => {
    if (deadline) {
      const s = deadline.split("-");
      if (type === 'Daily') {
        return `每天${s[3]}点${s[4]}分前`;
      }
      if (type === 'Weekly') {
        return `每周${Week[s[1]]}${s[3]}点${s[4]}分前`;
      }
      if (type === 'Monthly') {
        return `每月${s[2]}日${s[3]}点${s[4]}分前`;
      }
    }
    return "";
  };

  go2history = (reportId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/jump2history',
      payload: reportId,
    });
  };

  render() {
    const {
      currentUser,
      currentUserLoading,
      reports,
      reportLoading,
    } = this.props;

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              早安，
              {currentUser.name}
              ，祝你开心每一天！
            </div>
            <div>
              {currentUser.deptName}
            </div>
          </div>
        </div>
      ) : null;

    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
        hiddenBreadcrumb
      >
        <Card
          className={styles.projectList}
          style={{ marginBottom: 24 }}
          title="可录入的报表"
          bordered={false}
          loading={reportLoading}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
        >
          <List
            size="large"
            rowKey="id"
            loading={reportLoading}
            dataSource={reports}
            renderItem={item => (
              <List.Item
                actions={[
                  <Link to={`/input/${item.id}`} key={item.id}>录入</Link>,
                  <a onClick={() => this.go2history(item.id)} key="history">历史</a>,
                ]}
              >
                <List.Item.Meta
                  title={item.name}
                  description={`上报截止时间:${this.deadline(item.deadline, item.type)}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
