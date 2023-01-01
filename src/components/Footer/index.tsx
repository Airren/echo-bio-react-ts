import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = '易丂生物 All Right Reserved';

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`2020-${currentYear} ${defaultMessage}`}
      links={[
        {
          // key: 'Ant Design Pro',
          title: 'Echo Bio',
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
          title: '易丂生物',
          href: '#',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
