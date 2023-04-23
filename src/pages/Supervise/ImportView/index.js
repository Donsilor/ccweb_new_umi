import React, { useEffect } from 'react';
import { Upload, Button } from 'antd';
import { useTableRef } from '@/utils/hooks';
import CCStoreTable from '@/components/CCStoreTable';
import { importViewColumns } from '../columns';
import { UploadOutlined } from '@ant-design/icons';

function ImportView(props) {
  const [tableRef, handleSearch] = useTableRef();

  const uploadConfig = {
    name: 'file',
    action: '/SuperviseAction_upload2',
    accept:
      'application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.ms-works,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    headers: {
      'Content-Type': 'application/json',
    },
    beforeUpload(file) {
      console.log(file.name);
      // uploadConfig.headers['fileName'] = file.name;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully`);

        if (info.file && info.file.response) {
          if (info.file.response.result === 0) {
            message.success(info.file.response.msg);
            handleSearch();
          } else {
            message.error(info.file.response.msg);
          }
        }
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };
  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <>
      <div className="ccTableArea">
        <Upload {...uploadConfig}>
          <Button icon={<UploadOutlined />} size="middle">
            请选择一个excel文件
          </Button>
        </Upload>
      </div>
      <CCStoreTable
        columns={importViewColumns}
        tableKey={'supervise-importView'}
        fetchFunc={(data, paging) => httpCommonClient.post('/SuperviseAction_getImportRecord', paging)}
        ref={tableRef}
      />
    </>
  );
}

export default ImportView;
