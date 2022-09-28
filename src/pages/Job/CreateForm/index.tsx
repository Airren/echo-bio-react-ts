import { Card, Col, message, Row } from 'antd';
import ProForm, { ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-form';
import { useLocation, useRequest } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import { GridContent } from '@ant-design/pro-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { AlgorithmItem } from '@/models/algorithm';
import { history } from '@@/core/history';
import { FileUploadPath } from '@/models/const-value';
import styles from './style.less';
import cardStyles from '../../Algorithm/CardList/style.less';
import Paragraph from 'antd/lib/typography/Paragraph';

const BasicForm: FC<Record<string, any>> = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    console.log('>>>>>>>>> this is the value', values);
    await run(values);
  };

  const location = useLocation();
  const algorithm: AlgorithmItem = location.state;
  if (!algorithm) {
    history.push({
      pathname: '/algo/list',
    });
  }

  const parameterForm = (
    <>
      {algorithm.parameters.map((x) => {
        switch (x.type) {
          case 'string':
            return (
              <ProFormText
                width="md"
                label={x.label}
                name={x.name}
                rules={[
                  {
                    required: true,
                    message: '请输入',
                  },
                ]}
                placeholder={'请输入' + x.label}
              />
            );
          case 'file':
            return (
              <ProFormUploadButton
                label={x.label}
                // tooltip="文件应为txt格式，数据表必须包含行头和列头，如图1。数据与数据之间务必用制表符隔开（tab符），不能用空格"
                tooltip={x.description}
                name={x.name}
                width={'md'}
                max={1}
                fieldProps={{
                  name: 'file',
                  multiple: false,
                }}
                action={FileUploadPath}
              />
            );
          case 'select':
            return <></>;
          case 'radio':
            return <></>;
          default:
            return <></>;
        }
      })}
    </>
  );
  const content = <ReactMarkdown remarkPlugins={[remarkGfm]}>{algorithm.document}</ReactMarkdown>;

  const header = (
    <Card className={cardStyles.card} bordered={false}>
      <Card.Meta
        avatar={
          <img
            alt=""
            className={cardStyles.cardAvatar}
            src={typeof algorithm.image === 'string' ? algorithm.image : ''}
          />
        }
        title={<a>{algorithm.name}</a>}
        description={
          <Paragraph className={cardStyles.item} ellipsis={{ rows: 3 }}>
            {algorithm.description}
          </Paragraph>
        }
      />
    </Card>
  );

  return (
    <PageContainer content={header}>
      <GridContent>
        <Row gutter={24}>
          <Col lg={10} md={24}>
            <Card bordered={false}>
              <ProForm
                requiredMark
                style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
                name="basic"
                layout="vertical"
                onFinish={onFinish}
              >
                <ProFormText
                  width="md"
                  label="绘图方式"
                  name="algorithm"
                  initialValue={algorithm.name}
                  hidden={true}
                />

                {parameterForm}
                <ProFormTextArea
                  label={
                    <span>
                      备注
                      <em className={styles.optional}>（选填）</em>
                    </span>
                  }
                  tooltip="备注信息"
                  name="standard"
                  width="xl"
                  placeholder="请输入备注"
                />
              </ProForm>
            </Card>
          </Col>
          <Col lg={14} md={24}>
            <Card>{content}</Card>
          </Col>
        </Row>
      </GridContent>
    </PageContainer>
  );
};

export default BasicForm;
