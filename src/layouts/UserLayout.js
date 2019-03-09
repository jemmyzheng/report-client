import React, { Fragment } from 'react';
import { Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import styles from './UserLayout.less';

const copyright = (
  <Fragment>
    Copyright <Icon type="copyright" /> 2019 湖南空港实业股份有限公司
  </Fragment>
);

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return title;
  // }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.innerWapper}>
              <div className={styles.inner}>
                <div className={styles.top}>
                  <div className={styles.header}>
                    <span className={styles.title}>生产数据报送系统</span>
                  </div>
                </div>
                {children}
              </div>
            </div>
          </div>
          <GlobalFooter isDark copyright={copyright} />
        </div>
      </div>
    );
  }
}

export default UserLayout;
