import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import { Icon, Upload, Button, Divider, message } from 'antd';
import { connect } from 'dva';
import styles from './BaseView.less';

const UploadAction = type => `/api/upload/rsa/${type}`;

@connect(({ user }) => ({
  currentUser: user.currentUser,
}))
class BaseView extends Component {
  componentDidMount() {

  }

  uploadProps = type => ({
    name: 'file',
    action: UploadAction(type),
    showUploadList: false,
    onChange: info => {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        const { dispatch } = this.props;
        dispatch({
          type: 'user/updateRSA',
          payload: type,
        });
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  })

  getViewDom = ref => {
    this.view = ref;
  };

  render() {
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Upload {...this.uploadProps('pre')}>
            <Button>
              <Icon type="upload" /> {formatMessage({ id: 'app.settings.rsa.pre' })}
            </Button>
          </Upload>
          <Divider />
          <Upload {...this.uploadProps('pub')}>
            <Button>
              <Icon type="upload" /> {formatMessage({ id: 'app.settings.rsa.pub' })}
            </Button>
          </Upload>
        </div>
        <div className={styles.right} />
      </div>
    );
  }
}

export default BaseView;
