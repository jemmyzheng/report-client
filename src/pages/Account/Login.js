import React, { Component } from 'react';
import { connect } from 'dva';
import { Alert } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';

const { UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
        },
      });
    }
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <div key="account">
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage("账户或密码错误")}
            <UserName
              name="phone"
              placeholder="手机号"
              rules={[
                {
                  required: true,
                },
              ]}
            />
            <Password
              name="password"
              placeholder="登录密码"
              rules={[
                {
                  required: true,
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
            <Submit loading={submitting}>
              登录
            </Submit>
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
