import type { Dispatch } from 'react';
import React from 'react';
import { Drawer } from 'antd';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { ProDescriptions } from '@ant-design/pro-components';
import type { AlgorithmItem } from '@/models/algorithm';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AlgorithmDetailsProps {
  algorithm: AlgorithmItem | undefined;
  showDetail: boolean;
  setCurrentRow: Dispatch<AlgorithmItem | undefined>;
  setShowDetail: Dispatch<boolean>;
}

const AlgorithmDetail: React.FC<AlgorithmDetailsProps> = ({
  algorithm,
  showDetail,
  setCurrentRow,
  setShowDetail,
}) => {
  const columns: ProDescriptionsItemProps<AlgorithmItem>[] = [
    {
      title: '算法名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender }) => {
        return defaultRender(item);
      },
    },
    {
      title: '说明文档',
      valueType: 'text',
      render: (_, record) => {
        return (
          <div>
            <br />
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img(props) {
                  return <img {...props} style={{ maxWidth: '100%' }} />;
                },
              }}
            >
              {record.document}
            </ReactMarkdown>
          </div>
        );
      },
    },
  ];

  return (
    <Drawer
      // width={600}
      visible={showDetail}
      onClose={() => {
        setCurrentRow(undefined);
        setShowDetail(false);
      }}
      closable={false}
    >
      {algorithm?.name && (
        <ProDescriptions<AlgorithmItem>
          bordered
          column={1}
          title={algorithm?.label}
          request={async () => ({
            data: algorithm || {},
          })}
          params={{
            id: algorithm?.name,
          }}
          columns={columns as ProDescriptionsItemProps<AlgorithmItem>[]}
        />
      )}
    </Drawer>
  );
};
export default AlgorithmDetail;
