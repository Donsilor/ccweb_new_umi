import React, {useState} from 'react';
import {useDispatch, history} from 'umi';
import { message, Button, Form, Input } from 'antd';
import "./index.less"
import logo from '@/assets/logo-blue.png';
import { UserOutlined } from '@ant-design/icons';

const FormItem = Form.Item
function Login({ location }) {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const handleSubmit = async (values) => {
    setLoading(true)
    const res = await httpFormClient.formSubmit('/UserAction_login.action', 'user', values).catch(error => {})
    setLoading(false)
    if (typeof res.data === 'string') {
      const msg = res.data.match(/<div id="message" >(.+?)<\/div>/)
      if (msg) {
        message.warn(msg[1])
      } else {
        history.push(location.state ? location.state.from : '/')
      }
    } else {
      message.warn("系统异常，请稍后重试")
    }
  }
  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-wrapper">
        <div className="login-box">
          <div className="login-header">
            <a href="/">
              <img src={logo} alt="" />
              <span>北京车车网络技术有限公司</span>
            </a>
          </div>
          <div className="login-content">
            <Form
            onFinish={handleSubmit}
            className="login-form"
            >
              <FormItem name="accid" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input suffix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" size="large" />
              </FormItem>
              <FormItem name="accpwd" rules={[{ required: true, message: '请输入密码' }]}>
                <Input.Password placeholder="密码" size="large" />
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button" size="large" loading={loading}>
                  登录
                </Button>
              </FormItem>

            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
