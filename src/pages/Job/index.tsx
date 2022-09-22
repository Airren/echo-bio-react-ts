import { Card, Col, Divider, message, Row } from 'antd';
// import ReactMarkdown from "react-markdown";
import ProForm, { ProFormText, ProFormTextArea, ProFormUploadDragger } from '@ant-design/pro-form';
import { useRequest } from 'umi';
import type { Dispatch, FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { createJob } from '@/services/job';
import styles from './style.less';
import type { RouteComponentProps } from 'react-router';

interface InstanceProps extends RouteComponentProps {
  // @ts-ignore
  dispatch: Dispatch;
}

const FormBasicForm: FC<InstanceProps> = () => {
  const { run } = useRequest(createJob, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
    },
  });

  console.log('>>>>>> list value >>>>>>>>>>');
  // var algo = this.props.location.state;

  const onFinish = async (values: any) => {
    console.log('>>>>> this is the in put value ');
    console.log(values);
    const formData = new FormData();
    const file = values.upload[0];
    console.log(file);

    formData.append('file', file);
    console.log('1');

    formData.append('key1', 'va1');
    console.log('2');
    await run(formData, { algorithm: values.algorithm, name: values.name });
  };

  //   const makedown = `
  // #### This is a value
  // `
  return (
    <PageContainer content="Pie 饼状图用于比例分析">
      <Row gutter={[26, 26]}>
        <Col span={12}>
          <Row>
            <Card bordered={false}>
              <ProForm
                hideRequiredMark
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
                  initialValue={'pie'}
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
                  name="upload"
                  fieldProps={{
                    name: 'file',
                    listType: 'picture-card',
                    multiple: false,
                  }}

                  // action="/upload.do"
                  // extra="longgggggggggggggggggggggggggggggggggg"
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
          </Row>

          <Divider> </Divider>
          <Row></Row>

          <Divider> </Divider>
        </Col>
        <Col span={12}>
          {' '}
          <Card>{/*<ReactMarkdown children={makedown}></ReactMarkdown>*/}</Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default FormBasicForm;
