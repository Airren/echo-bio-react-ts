import type { Dispatch } from 'react';
import React from 'react';
import { Button, Drawer, Space } from 'antd';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions, ProList } from '@ant-design/pro-components';
import type { JobItem } from '@/models/job';
import type { ProListMetas } from '@ant-design/pro-list';
import { queryFileByIds } from '@/services/file';
import { DownloadFileButton } from '@/pages/File';
import type { FileItem } from '@/models/file';
import { RenderStatus } from '@/pages/Job';

interface JobDetailsProps {
  job: JobItem | undefined;
  showDetail: boolean;
  setCurrentRow: Dispatch<JobItem | undefined>;
  setShowDetail: Dispatch<boolean>;
}

const meta: ProListMetas<FileItem> = {
  title: {
    dataIndex: 'name',
    title: '任务名称',
    render: (val, entity) => {
      return DownloadFileButton(val, entity);
    },
  },
};

const JobDetail: React.FC<JobDetailsProps> = ({
  job,
  showDetail,
  setCurrentRow,
  setShowDetail,
}) => {
  const columns: ProDescriptionsItemProps<JobItem>[] = [
    {
      title: '任务名称',
      dataIndex: 'name',
    },
    {
      title: '分析算法',
      dataIndex: 'algorithm',
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (val) => {
        return RenderStatus(val);
      },
    },

    {
      title: '分析结果',
      dataIndex: 'outputs',
      render: (val) => {
        if (typeof val === 'string' && val.length > 0) {
          return (
            <ProList<any>
              metas={meta}
              // headerTitle="文件列表"
              request={() => {
                return queryFileByIds(val);
              }}
              // actionRef={actionRef}
            />
          );
        } else {
          return '暂无数据';
        }
      },
    },
  ];

  return (
    <Drawer
      title={'分析详情'}
      visible={showDetail}
      onClose={() => {
        setCurrentRow(undefined);
        setShowDetail(false);
      }}
      closable={false}
      extra={
        <Space>
          <Button
            onClick={() => {
              setCurrentRow(undefined);
              setShowDetail(false);
            }}
          >
            取消
          </Button>
        </Space>
      }
    >
      {job?.name && (
        <ProDescriptions<JobItem>
          bordered
          column={1}
          title={job?.name}
          request={async () => ({
            data: job || {},
          })}
          params={{
            id: job?.name,
          }}
          columns={columns as ProDescriptionsItemProps<JobItem>[]}
        />
      )}
    </Drawer>
  );
};
export default JobDetail;
