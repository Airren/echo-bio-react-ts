import { Card, Form, List, Typography } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { history, useRequest } from 'umi';
import styles from './style.less';
import type { AlgorithmItem } from '@/models/algorithm';
import { queryAlgorithmList } from '@/services/algorithm';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import { listGroup } from '@/pages/Algorithm/Group/service';

const { Paragraph } = Typography;

const { Option } = TagSelect;

const AlgorithmCardList = () => {
  const { data, loading, run } = useRequest((values: any) => {
    console.log('form data', values);
    let groupsIds;
    if (values != undefined) {
      groupsIds = values.category;
    } else {
    }
    return queryAlgorithmList({ groupIds: groupsIds });
  });

  const { data: listData } = useRequest(() => {
    return listGroup({}, {});
  });

  const groups = listData || [];

  const optionsVal = groups.map((val) => {
    return <Option value={val.id}>{val.label}</Option>;
  });

  const list = data || [];

  const content = (
    <div className={styles.pageHeaderContent}>
      <p>
        逆耳生物云分析平台，开箱即用，一站式生物数据分析，提供跨越生物与数据科学的体验解决方案。
      </p>
    </div>
  );

  return (
    <PageContainer content={content}>
      <Card bordered={false}>
        <Form
          onValuesChange={(_, values) => {
            run(values);
          }}
        >
          <StandardFormRow title="算分分类">
            <Form.Item name="category">
              <TagSelect expandable>{optionsVal}</TagSelect>
            </Form.Item>
          </StandardFormRow>
        </Form>
      </Card>
      <br />
      <div className={styles.cardList}>
        <List<AlgorithmItem>
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
                    <a key="option1">￥({item.point}/100)</a>,
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
                    avatar={
                      <img
                        alt=""
                        className={styles.cardAvatar}
                        src={typeof item.image === 'string' ? item.image : ''}
                      />
                    }
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
