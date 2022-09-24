import { Card, List, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { history, useRequest } from 'umi';
import styles from './style.less';
import type { AlgorithmItem } from '@/models/algorithm';
import { queryAlgorithmList } from '@/services/algorithm';

const { Paragraph } = Typography;

const AlgorithmCardList = () => {
  const { data, loading } = useRequest(() => {
    return queryAlgorithmList({
      count: 8,
    });
  });

  console.log('>>>>>>>>>>>', data);

  const list = data || [];

  const content = (
    <div className={styles.pageHeaderContent}>
      <p>
        逆耳生物云分析平台，开箱即用，一站式生物数据分析，提供跨越生物与数据科学的体验解决方案。
      </p>
    </div>
  );

  const extraContent = (
    <div className={styles.extraImg}>
      <img
        alt="这是一个标题"
        src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
      />
    </div>
  );
  return (
    <PageContainer content={content} extraContent={extraContent}>
      <div className={styles.cardList}>
        <List<Partial<AlgorithmItem>>
          rowKey="id"
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={[...list]}
          renderItem={(item) => {
            return (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  className={styles.card}
                  actions={[
                    <a key="option1">￥({item.price}/100)</a>,
                    <a key="option2">{item.favorite}</a>,
                  ]}
                  onClick={() =>
                    history.push({
                      pathname: '/job/create',
                      state: { ...item },
                    })
                  }
                >
                  <Card.Meta
                    avatar={<img alt="" className={styles.cardAvatar} src={item.image} />}
                    title={<a>{item.name}</a>}
                    description={
                      <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                        {item.description}
                      </Paragraph>
                    }
                  />
                </Card>
              </List.Item>
            );
          }}
        />
      </div>
    </PageContainer>
  );
};

export default AlgorithmCardList;
