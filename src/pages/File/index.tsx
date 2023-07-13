import {
  CheckCircleOutlined,
  DownSquareOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Card, message, Modal, Popover, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import {
  ModalForm,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { FileUploadPath, JwtToken } from '@/models/const-value';
import copy from 'copy-to-clipboard';
import type { FileItem } from '@/models/file';
import { downloadFile, fileInfo, queryFilesForTable, removeFile } from '@/services/file';
import UpdateForm from '@/pages/File/components/UpdateForm';
import type { TableListPagination } from '@/models/data';

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

  try {
    await fileInfo({ ...fields });
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
 * @param current
 */

const handleUpdate = async (fields: FileItem, current: FileItem | undefined) => {
  const hide = message.loading('正在更新');
  console.log('>>>>>>', fields, current);

  try {
    await fileInfo({
      ...current,
      ...fields,
    });
    hide();
    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: FileItem[]): Promise<any> => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  Modal.confirm({
    title: '删除文件',
    content: '确定删除个' + selectedRows.length + '文件吗？',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      try {
        await removeFile({
          ids: selectedRows.map((row) => row.id),
        });
        hide();
        message.success('删除成功，即将刷新');
        return true;
      } catch (error) {
        hide();
        message.error('删除失败，请重试');
        return false;
      }
    },
  });
};

export const handleDownload = async (url: string, name: string) => {
  try {
    const res = await downloadFile(url);
    const FileSaver = require('file-saver');
    FileSaver.saveAs(res, name);
    console.log('>>>>>>>>>>>>>', res, name);
    message.success('下载成功');
    return true;
  } catch (error) {
    message.error('下载失败请重试！');
    return false;
  } finally {
  }
};

export function DownloadFileButton(val: React.ReactNode, entity: FileItem) {
  return (
    <span style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
      <a
        onClick={async () => {
          await handleDownload(entity.URLPath, val + '.' + entity.file_type);
        }}
        href={'#'}
      >
        {val + '.' + entity.file_type || '--'}
      </a>
    </span>
  );
}

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<FileItem>();
  const [selectedRowsState, setSelectedRows] = useState<FileItem[]>([]);

  const columns: ProColumns<FileItem>[] = [
    {
      title: '文件名称',
      dataIndex: 'name',
      render: (val, entity) => {
        return DownloadFileButton(val, entity);
      },
    },
    {
      title: '权限',
      dataIndex: 'visibility',
      render: (val, entity) => {
        if (entity.visibility == 1) {
          return (
            <Tag icon={<CheckCircleOutlined />} color="success">
              公开
            </Tag>
          );
        } else {
          return (
            <Tag icon={<ExclamationCircleOutlined />} color="warning">
              私有
            </Tag>
          );
        }
      },
      valueType: 'select',
      valueEnum: {
        all: {
          text: '全部',
        },
        public: {
          text: '公开',
        },
        private: {
          text: '私有',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: true,
      valueType: 'textarea',
      search: false,
    },
    {
      title: '链接',
      hideInTable: true,
      search: false,
      valueType: 'text',
      render: (val, entity) => {
        return (
          <Popover content="点击复制链接">
            <Card
              onClick={() => {
                copy(entity.URLPath);
              }}
            >
              <span style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>{val || '--'}</span>
            </Card>
          </Popover>
        );
      },
    },
    {
      title: '缩略图',
      search: false,
      dataIndex: 'URLPath',
      valueType: 'image',
    },
    {
      title: '上传时间',
      search: false,
      sorter: true,
      dataIndex: 'created_at',
      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      search: false,
      sorter: true,
      dataIndex: 'updated_at',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (val, entity, _, action) => [
        <Popover key={'copy_url'} content={entity.visibility == 1 ? '点击复制链接' : ''}>
          <Button
            size={'small'}
            type={'link'}
            disabled={entity.visibility == 2}
            onClick={() => {
              copy(window.location.host + entity.URLPath);
            }}
          >
            复制
          </Button>
        </Popover>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            {
              key: 'edit',
              name: (
                <Button
                  key={'update'}
                  size={'small'}
                  type={'link'}
                  onClick={() => {
                    setCurrentRow(entity);
                    handleUpdateModalVisible(true);
                  }}
                >
                  编辑
                </Button>
              ),
            },
            {
              key: 'delete',
              name: (
                <Button
                  size={'small'}
                  type={'link'}
                  onClick={async () => {
                    await handleRemove([entity]);
                    setSelectedRows([]);
                    actionRef.current?.reloadAndRest?.();
                  }}
                >
                  删除
                </Button>
              ),
            },
          ]}
        >
          <DownSquareOutlined />
        </TableDropdown>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<FileItem, TableListPagination>
        headerTitle="文件列表"
        actionRef={actionRef}
        rowKey={(record) => parseInt(record.id)}
        search={{
          labelWidth: 0,
        }}
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            size={'small'}
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 上传文件
          </Button>,
        ]}
        request={queryFilesForTable}
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
            size={'small'}
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
            // accept: '.jpeg,.jpg,.png',
            data: { fileType: 'IMAGE' },
            headers: { token: localStorage.getItem(JwtToken) || '' },
            className: 'upload-list-inline',
          }}
          action={FileUploadPath}
          rules={[
            {
              required: true,
              message: '请上传文件！',
            },
          ]}
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
