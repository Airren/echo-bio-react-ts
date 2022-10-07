import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popover } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-form';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { file, addFile, updateFile, removeFile } from './service';
import type { TableListPagination } from './data';
import type { FileItem } from '@/models/job';
import { FileUploadPath } from '@/models/const-value';
import copy from 'copy-to-clipboard';

/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: FileItem) => {
  const hide = message.loading('正在添加');

  let firstImage = '';
  if (typeof fields.files !== 'string') {
    fields.files.forEach((val) => {
      firstImage = val.response.data.id;
    });
    fields.files = firstImage.toString();
  }

  fields.id = fields.files;
  // fields.id = BigInt(fields.files)

  console.log('>>> upload image', fields.id);
  console.log('>>> upload image', fields.files);
  try {
    await addFile({ ...fields });
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
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: FileItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateFile({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: FileItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeFile({
      id: selectedRows.map((row) => row.id),
    });
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

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<FileItem>();
  const [selectedRowsState, setSelectedRows] = useState<FileItem[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<FileItem>[] = [
    {
      title: '文件名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '链接',
      dataIndex: 'URLPath',
      valueType: 'text',
      render: (dom, entity) => {
        return (
          <Popover content="点击复制">
            <Button
              onClick={() => {
                copy(entity.URLPath);
              }}
            >
              {' '}
              {dom}
            </Button>
          </Popover>
        );
      },
    },
    {
      title: '缩略图',
      dataIndex: 'URLPath',
      valueType: 'image',
    },
    {
      title: '上传时间',
      sorter: true,
      dataIndex: 'updated_at',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      // dataIndex: 'option',
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
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<FileItem, TableListPagination>
        headerTitle="查询表格"
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
        request={file}
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
              <span>
                {/*服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万*/}
              </span>
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
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <ModalForm
        title="上传文件"
        width="400px"
        open={createModalVisible}
        onOpenChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as FileItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
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
        <ProFormUploadButton
          name="files"
          label="上传文件"
          max={1}
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
          }}
          action={FileUploadPath}
          rules={[
            {
              required: true,
              message: '请上传文件！',
            },
          ]}
        />
        <ProFormTextArea label="文件描述" width="md" name="description" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};
export default TableList;
