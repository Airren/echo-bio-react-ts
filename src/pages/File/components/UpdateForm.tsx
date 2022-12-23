import React, { useEffect } from 'react';
import { Form } from 'antd';
import { ProFormText, ProFormTextArea, ProFormRadio, ModalForm } from '@ant-design/pro-form';
import type { FileItem } from '@/models/file';

export type UpdateFormProps = {
  onCancel: () => void;
  onSubmit: (values: FileItem) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<FileItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  console.log('props value', props.values);
  const [form] = Form.useForm<FileItem>();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(props.values);
  });
  return (
    <ModalForm<FileItem>
      title="更新文件"
      form={form}
      autoFocusFirstInput
      open={props.updateModalVisible}
      modalProps={{
        destroyOnClose: true,
        onCancel: props.onCancel,
      }}
      submitTimeout={2000}
      initialValues={props.values}
      onFinish={props.onSubmit}
      width="400px"
    >
      <ProFormText
        label="文件名称"
        rules={[
          {
            required: true,
            message: '文件名称为必填项',
          },
        ]}
        width="md"
        name="name"
      />

      <ProFormRadio.Group
        initialValue={false}
        options={[
          {
            label: '私有',
            value: 2,
          },
          {
            label: '公开',
            value: 1,
          },
        ]}
        label="是否公开"
        name="visibility"
      />
      <ProFormTextArea label="文件描述" width="md" name="description" />
    </ModalForm>
  );
};

export default UpdateForm;
