import { getToken } from '@/services/ant-design-pro/api';
import { message } from 'antd';
import React from 'react';
import { history, useIntl, useModel } from 'umi';
import { useRequest } from '@@/plugin-request/request';
import { JwtToken } from '@/models/const-value';
// import { JwtToken } from '@/models/const-value';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  console.log('>>>>>>>>>>>> come into login11111111');

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  useRequest<API.Token>(async () => {
    try {
      // 登录
      console.log('>>>>>>>>> query user info');
      if (!history) return;
      const { query } = history.location;
      const { code } = query as {
        code: string;
      };
      if (code == null) {
        return;
      }

      const msg = await getToken({ code });

      console.log('>>>>>>>> start login', msg);
      const res: API.LoginResult = msg.data;
      console.log('>>>>>>>> start login', res);
      if (res.access_token != '') {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        console.log('>>>>>>>  start set token token set successful');
        localStorage.setItem(JwtToken, res.access_token);
        console.log('>>>>>>> token set successful');

        await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        // const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      // setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  });

  return <div />;
};

export default Login;
