import { Card, Col, Row, message } from 'antd';

import type { FC } from 'react';
import ProForm, {
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import type { ProColumnType } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import styles from './style.less';

import { FileUploadPath, JwtToken } from '@/models/const-value';
import type { AlgorithmItem, ParameterItem } from '@/models/algorithm';
import { createAlgorithm } from '@/services/algorithm';
import { listGroup } from '@/pages/Algorithm/Group/service';
import { useRequest } from 'umi';

const initialParameterItems: ParameterItem[] = [
  {
    id: `0${Date.now()}`,
    label: '任务名',
    name: 'name',
    required: true,
    type: 'string',
  },
];

const AlgorithmCreateForm: FC<AlgorithmItem> = () => {
  const onFinish = async (value: AlgorithmItem) => {
    value.parameters.forEach((val) => {
      if (typeof val.required === 'string') {
        val.required = 'true' === val.required;
      }
      val.id = 0;
    });
    let firstImage = '';
    if (typeof value.image !== 'string') {
      value.image.forEach((val) => {
        firstImage = val.response.data.id;
      });
      value.image = firstImage.toString();
    }

    try {
      await createAlgorithm(value);
      message.success('提交成功');
    } catch {
      message.error('提交失败');
      // console.log
    }
  };

  const { data: listData } = useRequest(() => {
    return listGroup({}, {});
  });

  const groups = listData || [];

  const optionsVal = groups.map((val) => {
    return { value: val.id, label: val.label };
  });

  const columns: ProColumnType<ParameterItem>[] = [
    {
      title: '参数名',
      dataIndex: 'label',
      key: 'label',
      width: '15%',
    },
    {
      title: '参数英文',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: '参数类型',
      key: 'type',
      width: '15%',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        string: { text: '字符串', status: 'Default' },
        file: {
          text: '文件',
          status: 'Error',
        },
        radio: {
          text: '单选',
          status: 'Success',
        },
        select: {
          text: '多选',
          status: 'Success',
        },
      },
    },
    {
      title: '参数选项',
      key: 'value_list',
      dataIndex: 'value_list',
      width: '15%',
    },
    {
      title: '必要性',
      dataIndex: 'required',
      key: 'required',
      width: '15%',
      valueEnum: {
        true: {
          text: '必选',
          status: 'Error',
        },
        false: {
          text: '可选',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      key: 'description',
      dataIndex: 'description',
      width: '15%',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record: ParameterItem, index, action) => {
        return [
          <a
            key="edit"
            onClick={() => {
              action?.startEditable(record.id);
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];

  return (
    <ProForm
      layout="vertical"
      requiredMark
      submitter={{
        render: (props, dom) => {
          return (
            <FooterToolbar>
              {/*{getErrorInfo(error)}*/}
              {dom}
            </FooterToolbar>
          );
        },
      }}
      initialValues={{ parameters: initialParameterItems }}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      <PageContainer content="构建提交一个新的算法">
        <Card title="基本信息" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Row>
                <ProFormText
                  name="name"
                  label="英文名称"
                  tooltip="英文名称必须唯且不包含空格"
                  placeholder="请输入英文名称"
                  width="md"
                  rules={[
                    {
                      required: true,
                      message: '请输入英文名称！',
                    },
                  ]}
                />
              </Row>
              <Row>
                <ProFormSelect
                  name="group"
                  label="算法分类"
                  width="md"
                  rules={[
                    {
                      required: true,
                      message: '请输选择分类！',
                    },
                  ]}
                  // onMetaChange={onChange}

                  options={optionsVal}
                />
              </Row>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Row>
                <ProFormText
                  name="label"
                  width="md"
                  label="中文名称"
                  placeholder="请输入中文名称"
                  rules={[
                    {
                      required: true,
                      message: '请输入中文名称！',
                    },
                  ]}
                />
              </Row>
              <Row>
                <ProFormMoney
                  name="point"
                  width="md"
                  label="分析定价"
                  placeholder="请输入分析定价"
                  rules={[
                    {
                      required: true,
                      message: '请输入分析定价！',
                    },
                  ]}
                />
              </Row>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <ProFormUploadButton
                name="image"
                label="上传主图"
                max={1}
                action={FileUploadPath}
                fieldProps={{
                  name: 'file',
                  listType: 'picture-card',
                  // accept: '.jpeg,.jpg,.png',
                  data: { fileType: 'IMAGE', visibility: 'public' },
                  headers: { token: localStorage.getItem(JwtToken) || '' },
                  className: 'upload-list-inline',
                }}
                rules={[
                  {
                    required: true,
                    message: '请上传主图！',
                  },
                ]}
                extra="最大像素支持256*256"
              />
            </Col>
          </Row>

          <ProFormTextArea
            name="description"
            label="算法简介"
            placeholder="请输入简短的算法简介"
            rules={[
              {
                required: true,
                message: '请输入简短的算法简介！',
              },
            ]}
          />
        </Card>
        <Card title="说明文档" className={styles.card} bordered={false}>
          {/*<Row gutter={16}>*/}
          <ProFormTextArea
            name="document"
            label="算法文档"
            rules={[{ required: true, message: '请填写算法文档' }]}
          />

          {/*</Row>*/}
        </Card>
        <Card title="参数管理" className={styles.card} bordered={false}>
          <ProForm.Item name="parameters">
            <EditableProTable<ParameterItem>
              recordCreatorProps={{
                record: () => {
                  return {
                    id: `0${Date.now()}`,
                  };
                },
              }}
              columns={columns}
              rowKey="id"
            />
          </ProForm.Item>
        </Card>

        <Card title="容器模板" className={styles.card} bordered={false}>
          <ProFormText
            name="docker_image"
            label="容器镜像"
            placeholder="请输入容器镜像"
            rules={[
              {
                required: true,
                message: '请输入容器镜像！',
              },
            ]}
          />
          <ProFormTextArea
            name="command"
            label="命令模板"
            placeholder="请输入命令模板"
            rules={[
              {
                required: true,
                message: '请输入命令模板！',
              },
            ]}
          />
        </Card>
      </PageContainer>
    </ProForm>
  );
};

export default AlgorithmCreateForm;
