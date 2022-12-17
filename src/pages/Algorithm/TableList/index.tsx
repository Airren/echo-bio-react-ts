import { removeRule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage } from 'umi';
import type { AlgorithmItem } from '@/models/algorithm';
import { queryAlgorithmsForTable } from '@/services/algorithm';
import type { FormValueType } from '@/pages/Algorithm/TableList/components/UpdateForm';
import JobAddForm from '@/pages/Algorithm/TableList/components/UpdateForm';
import AlgorithmDetail from './components/AlgorithmDetails';
import { history } from '@@/core/history';
import type { TableListPagination } from '@/models/data';

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.RuleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const AlgorithmList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<AlgorithmItem>();
  const [selectedRowsState, setSelectedRows] = useState<AlgorithmItem[]>([]);

  const columns: ProColumns<AlgorithmItem>[] = [
    {
      title: '算法名称',
      dataIndex: 'label',
      valueType: 'textarea',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {entity.label}
          </a>
        );
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      search: false,
    },
    {
      title: '更新时间',
      sorter: true,
      search: false,
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender }) => {
        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button
          type={'primary'}
          key="config"
          size={'small'}
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          更新
        </Button>,
        <Button
          type={'primary'}
          key="config"
          size={'small'}
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<AlgorithmItem, TableListPagination>
        headerTitle="分析算法"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          current: 1,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              history.push({
                pathname: '/algo/create',
                // state: { ...item },
              });
            }}
          >
            <PlusOutlined />
            {'新建算法'}
          </Button>,
        ]}
        request={queryAlgorithmsForTable}
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
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.favorite!, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
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
        </FooterToolbar>
      )}

      <JobAddForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
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
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      {/*算法详情*/}
      <AlgorithmDetail
        algorithm={currentRow}
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        setCurrentRow={setCurrentRow}
      />
    </PageContainer>
  );
};

export default AlgorithmList;
