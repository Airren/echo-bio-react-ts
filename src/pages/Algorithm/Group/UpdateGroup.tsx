import type { FC } from 'react';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import styles from './style.less';
import type { GroupItem } from '@/models/algorithm';
import { Button, Result } from 'antd';

type OperationModalProps = {
  done: boolean;
  visible: boolean;
  current: Partial<GroupItem> | undefined;
  onDone: () => void;
  onSubmit: (values: GroupItem, currentRow: GroupItem) => void;
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const { done, visible, current, onDone, onSubmit, children } = props;
  if (current === undefined) {
    return null;
  }
  if (!visible) {
    return null;
  }
  return (
    <ModalForm<GroupItem>
      visible={visible}
      title={done ? null : `任务${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={640}
      onFinish={async (values) => {
        onSubmit(values, current as GroupItem);
      }}
      initialValues={current}
      submitter={{
        render: (_, dom) => (done ? null : dom),
      }}
      trigger={<>{children}</>}
      modalProps={{
        onCancel: () => onDone(),
        destroyOnClose: true,
        bodyStyle: done ? { padding: '72px 0' } : {},
      }}
    >
      {!done ? (
        <>
          <ProFormText
            rules={[
              {
                required: true,
                message: '必填项',
              },
            ]}
            width="md"
            name="name"
            label="分类英文"
          />
          <ProFormText
            width="md"
            label="分类中文"
            name="label"
            rules={[
              {
                required: true,
                message: '必填项',
              },
            ]}
          />
        </>
      ) : (
        <Result
          status="success"
          title="更新成功"
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      )}
    </ModalForm>
  );
};
export default OperationModal;
