import {
  ProFormMoney,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  StepsForm,
} from '@ant-design/pro-form';
import { Modal } from 'antd';
import React from 'react';
import { FileUploadPath, JwtToken } from '@/models/const-value';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.RuleListItem>;
};

const JobAddForm: React.FC<UpdateFormProps> = (props) => {
  // const columns: ProColumnType<ParameterItem>[] = [
  //   {
  //     title: '参数名',
  //     dataIndex: 'label',
  //     key: 'label',
  //     width: '20%',
  //   },
  //   {
  //     title: '参数英文',
  //     dataIndex: 'name',
  //     key: 'name',
  //     width: '20%',
  //   },
  //   {
  //     title: '参数必要性',
  //     dataIndex: 'required',
  //     key: 'required',
  //     width: '40%',
  //   },
  //   {
  //     title: '操作',
  //     key: 'action',
  //     valueType: 'option',
  //     render: (_, record: ParameterItem, index, action) => {
  //       return [
  //         <a
  //           key="eidit"
  //           onClick={() => {
  //             action?.startEditable(record.id);
  //           }}
  //         >
  //           编辑
  //         </a>,
  //       ];
  //     },
  //   },
  // ];

  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title="新建/更新算法"
            open={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          name: props.values.name,
          desc: props.values.desc,
        }}
        title="基本信息"
      >
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
        <ProFormUploadButton
          name="image"
          label="上传主图"
          max={1}
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            accept: '.jpeg,.jpg,.png',
            data: { fileType: 'IMAGE' },
            headers: { token: localStorage.getItem(JwtToken) || '' },
            className: 'upload-list-inline',
          }}
          action={FileUploadPath}
          extra="最大像素支持256*256"
        />
        <ProFormMoney
          name="price"
          label="分析定价"
          rules={[
            {
              required: true,
              message: '请输入分析定价！',
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          target: '0',
          template: '0',
        }}
        title="算法文档"
      >
        <ProFormTextArea name="document" label="算法文档" />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          type: '1',
          frequency: 'month',
        }}
        title="任务提交参数指定"
      />
      {/*<Card title="成员管理" bordered={false}>*/}
      {/*  <ProForm.Item name="members">*/}
      {/*    <EditableProTable<ParameterItem>*/}
      {/*      recordCreatorProps={{*/}
      {/*        record: () => {*/}
      {/*          return {*/}
      {/*            key: `0${Date.now()}`,*/}
      {/*          };*/}
      {/*        },*/}
      {/*      }}*/}
      {/*      columns={columns}*/}
      {/*      rowKey="id"*/}
      {/*    />*/}
      {/*  </ProForm.Item>*/}
      {/*</Card>*/}
    </StepsForm>
  );
};

export default JobAddForm;
