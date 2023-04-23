import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Modal, Upload, message, Space, Spin } from 'antd';
import OperationArea from '@/layouts/OperationArea';
import CCStoreTable from '@/components/CCStoreTable';

const { confirm } = Modal;
function view(props) {
  const tableRef = useRef();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    tableRef.current && tableRef.current.reload();
  }, []);
  const columns = [
    { title: '批次号', dataIndex: 'batchno' },
    { title: '上传文件名', dataIndex: 'uploadFileName' },
    { title: '上传人', dataIndex: 'uploadUserName' },
    { title: '文件上传时间', dataIndex: 'uploadTime' },
    {
      title: '处理状态',
      dataIndex: 'status',
      render: (text) => {
        if (text == '1') {
          return '上传成功，待导入';
        } else if (text == '2') {
          return '导入成功';
        } else if (text == '10') {
          return '导入中';
        } else {
          return '导入失败';
        }
      },
    },
    { title: '最后处理时间', dataIndex: 'opTime' },
    {
      title: '操作',
      render: (text, record) => (
        <Space>
          {record.status == '1' && (
            <Space>
              <a onClick={() => importOper(record)}>导入</a>
              <a onClick={() => deleOper(record)}>删除</a>
            </Space>
          )}
          {record.status == '2' && (
            <Space>
              <a
                onClick={() => {
                  props.dispatch({
                    type: 'form/updateQuery',
                    payload: {
                      formKey: '/carChengType/detail',
                      value: {},
                    },
                  });
                  props.history.push(`/carChengType/detail/${record.batchno}`);
                }}
              >
                查看
              </a>
              <a href={record.file.absolutePath} download={record.file.fileName}>
                下载
              </a>
            </Space>
          )}
        </Space>
      ),
    },
  ];
  //导入
  const importOper = (record) => {
    confirm({
      title: '请确认是否导入该文件?',
      onOk() {
        setLoading(true);
        httpCommonClient
          .post(`/CarDataUploadAction_importData`, { uploadFileId: record.uploadFileId })
          .then(({ data = {} }) => {
            if (data.result === 0) {
              tableRef.current.reload();
              message.success(data.msg);
            } else {
              Modal.error({
                title: '提示信息：',
                content: data.msg,
              });
            }
            setLoading(false);
          })
          .catch(() => {
            message.error('系统异常');
            setLoading(false);
          });
      },
    });
  };
  //删除
  const deleOper = (record) => {
    confirm({
      title: '请确认是否删除该文件?',
      onOk() {
        httpCommonClient.post(`/CarDataUploadAction_del`, { uploadFileId: record.uploadFileId }).then(({ data = {} }) => {
          if (data.result === 0) {
            message.success(data.msg);
          } else {
            message.error(data.msg);
          }
          tableRef.current.reload();
        });
      },
    });
  };
  const uploadConfig = {
    name: 'file',
    showUploadList: false,
    action: '/api/CarDataUploadAction_uploadFile',
    data: { fileType: '1' },
    accept: '.xls',
    beforeUpload() {
      setLoading(true);
    },
    onChange(info) {
      if (info.file.status === 'done') {
        if (info.file && info.file.response) {
          if (info.file.response.result === 0) {
            message.success('上传成功');
            tableRef.current.reload();
          } else {
            message.error(info.file.response.msg);
          }
          setLoading(false);
        }
      } else if (info.file.status === 'error') {
        setLoading(false);
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };
  return (
    <Spin spinning={loading}>
      <OperationArea>
        <Button
          type="primary"
          onClick={() => {
            let a = document.createElement('a');
            a.href = `/resource/template/车辆导入模板.xls`;
            a.click();
          }}
        >
          下载模板
        </Button>
        &nbsp; &nbsp; &nbsp;
        <Upload {...uploadConfig}>
          <Button type="primary">请选择一个excel文件</Button>
        </Upload>
        &nbsp; &nbsp; &nbsp;
        <Button type="primary" onClick={() => tableRef.current.reload()}>
          刷新数据
        </Button>
      </OperationArea>
      <CCStoreTable
        tableKey={'/carChengType/upload'}
        rowKey={'batchno'}
        columns={columns}
        fetchFunc={(data, paging) => httpCommonClient.submit('/CarDataUploadAction_list', { fileType: '1', ...paging })}
        ref={tableRef}
      />
    </Spin>
  );
}
export default connect()(view);
