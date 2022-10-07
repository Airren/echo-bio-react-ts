import { PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import type { TableListPagination } from './data';
import { addGroup, listGroup, removeGroup, updateGroup } from '@/pages/Algorithm/Group/service';
import type { GroupItem } from '@/models/algorithm';
import OperationModal from './UpdateGroup';

/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: GroupItem) => {
  const hide = message.loading('正在添加');

  try {
    await addGroup({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: GroupItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeGroup(selectedRows.map((row) => row.id));
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const [done, setDone] = useState<boolean>(false);

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<GroupItem>();
  const [selectedRowsState, setSelectedRows] = useState<GroupItem[]>([]);
  /** 国际化配置 */
  const handleDone = () => {
    setDone(false);
    handleUpdateModalVisible(false);
    setCurrentRow(undefined);
  };

  const handleUpdate = async (fields: GroupItem, current: GroupItem) => {
    const hide = message.loading('正在配置');
    fields.id = current.id;

    try {
      await updateGroup({
        ...fields,
      });
      hide();
      message.success('配置成功');
      setDone(true);
      if (actionRef.current) {
        actionRef.current.reload();
      }

      return true;
    } catch (error) {
      hide();
      message.error('配置失败请重试！');
      return false;
    }
  };
  const columns: ProColumns<GroupItem>[] = [
    // {
    //   title: 'Id',
    //   dataIndex: 'id',
    // },
    {
      title: '分类英文',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '分类名称',
      dataIndex: 'label',
      valueType: 'textarea',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          更新
        </a>,
        <a
          key="config2"
          onClick={() => {
            handleRemove([record]);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  // @ts-ignore
  return (
    <PageContainer>
      <ProTable<GroupItem, TableListPagination>
        headerTitle="算法分类"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={listGroup}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}

      <ModalForm
        title="新建分类"
        width="400px"
        open={createModalVisible}
        onOpenChange={handleModalVisible}
        onFinish={async (value: GroupItem) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
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
          initialValue={''}
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
          initialValue={''}
        />
      </ModalForm>

      <OperationModal
        done={done}
        visible={updateModalVisible}
        current={currentRow}
        onDone={handleDone}
        onSubmit={handleUpdate}
      />
    </PageContainer>
  );
};

export default TableList;
