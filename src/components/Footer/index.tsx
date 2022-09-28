import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '上海亿氪信息技术有限公司出品';

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          // key: 'Ant Design Pro',
          title: 'Nie-Bio',
          href: '#',
          blankTarget: true,
        },
        {
          // key: 'github',
          title: <GithubOutlined />,
          href: '#',
          blankTarget: true,
        },
        {
          // key: 'Ant Design',
          title: '逆耳生物',
          href: '#',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
