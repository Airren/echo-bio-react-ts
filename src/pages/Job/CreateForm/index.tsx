import { Card, Col, message, Row } from 'antd';
import ProForm, { ProFormText, ProFormTextArea, ProFormUploadDragger } from '@ant-design/pro-form';
import { history, useLocation, useRequest } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less';
import type { JobItem } from '@/models/job';
import { createJob } from '@/services/job';
import type { AlgorithmItem } from '@/models/algorithm';
import ReactMarkdown from 'react-markdown';
import { GridContent } from '@ant-design/pro-components';
import remarkGfm from 'remark-gfm';

const JobCreateForm: FC<JobItem> = () => {
  const { run } = useRequest(createJob, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
    },
  });

  const onFinish = async (values: JobItem) => {
    console.log('>>>>>>>>>>>>>>>> test', values.inputFile[0], '>>>>>>>>>>>>>>>> test');
    await run(values, '');
  };

  const location = useLocation();
  const algorithm: AlgorithmItem = location.state;
  if (!algorithm) {
    history.push({
      pathname: '/algo/list',
    });
  }

  const content = <ReactMarkdown remarkPlugins={[remarkGfm]}>{algorithm.document}</ReactMarkdown>;
  console.log('>>>>>>>>>>>> document', algorithm.document);

  const header = (
    <>
      <div>
        <h1>{algorithm.name}</h1>
      </div>
      {algorithm.description}
    </>
  );

  return (
    <PageContainer content={header}>
      <GridContent>
        <Row gutter={24}>
          <Col lg={10} md={24}>
            <Card bordered={false}>
              <ProForm
                style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
                name="basic"
                layout="vertical"
                initialValues={{ public: '1' }}
                onFinish={onFinish}
              >
                <ProFormText
                  width="md"
                  label="绘图方式"
                  name="algorithm"
                  initialValue={algorithm.name}
                  hidden={true}
                />
                <ProFormText
                  width="md"
                  label="任务名称"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: '请输入任务名称',
                    },
                  ]}
                  placeholder="给分析起个名字"
                />
                <ProFormUploadDragger
                  label="数据表格"
                  tooltip="文件应为txt格式，数据表必须包含行头和列头，如图1。数据与数据之间务必用制表符隔开（tab符），不能用空格"
                  name="inputFile"
                  fieldProps={{
                    name: 'file',
                    multiple: false,
                  }}
                  // action="http://localhost:8080/api/v1/file/upload"
                />

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

export default JobCreateForm;
