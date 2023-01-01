import { PageContainer } from '@ant-design/pro-layout';
import { queryJobsForTable } from '@/services/job';
import type { JobItem } from '@/models/job';
import { ProList } from '@ant-design/pro-components';
import type { ProListMetas } from '@ant-design/pro-list';
import { Progress, Tag } from 'antd';
import React, { useState } from 'react';
import JobDetail from '@/pages/Job/DetailDraw';

export function RenderStatus(val: any) {
  let state: '等待中' | '分析中' | '已完成' | '已取消' | '失败' = '等待中';
  let status: 'normal' | 'exception' | 'active' | 'success' = 'normal';
  let percent: number = 0;

  if (val != undefined && typeof val == 'string') {
    switch (val) {
      case 'PENDING':
        state = '等待中';
        status = 'normal';
        percent = 0;
        break;
      case 'PROGRESSING':
        state = '分析中';
        status = 'active';
        percent = 50;
        break;
      case 'COMPLETED':
        state = '已完成';
        status = 'success';
        percent = 100;
        break;
      case 'CANCELED':
        state = '已取消';
        status = 'exception';
        percent = 80;
        break;
      case 'FAILED':
        state = '失败';
        status = 'exception';
        percent = 80;
        break;
      default:
        state = '等待中';
        status = 'normal';
        percent = 0;
    }
  }

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div
        style={{
          width: 200,
        }}
      >
        <div>{state}</div>
        <Progress status={status} percent={percent} />
      </div>
    </div>
  );
}

const JobTableList: React.FC = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<JobItem>();

  const meta: ProListMetas<JobItem> = {
    title: {
      dataIndex: 'name',
      title: '任务名称',
      render: (_, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {entity.name}
          </a>
        );
      },
    },
    subTitle: {
      render: (val) => <Tag color="#5BD8A6">{val}</Tag>,
      search: false,
      dataIndex: 'algorithm',
      title: '算法类型',
    },
    type: {
      search: false,
    },
    avatar: {
      search: false,
      render: () => (
        <img
          src={'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg'}
          alt={''}
        />
      ),
    },
    content: {
      search: false,
      dataIndex: 'status',
      render: (val) => {
        return RenderStatus(val);
      },
    },
    description: {
      dataIndex: 'description',
      search: false,
      render: (val) => {
        return (
          <div>
            <div>{val}</div>
          </div>
        );
      },
    },

    actions: {
      search: false,
      render: (_m, entity) => {
        return [
          <a key="invite">取消</a>,
          <a key="operate">修改</a>,
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            详情
          </a>,
        ];
      },
    },
  };

  return (
    <PageContainer>
      <ProList<any>
        search={{}}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
        }}
        metas={meta}
        headerTitle="任务列表"
        request={queryJobsForTable}
        // actionRef={actionRef}
      />

      <JobDetail
        job={currentRow}
        showDetail={showDetail}
        setShowDetail={setShowDetail}
        setCurrentRow={setCurrentRow}
      />
    </PageContainer>
  );
};
export default JobTableList;
