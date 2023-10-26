import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LoginOutlined,
  BookOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";

import "./style.scss";

import { Layout, Menu, Button, theme } from "antd";
import Cookies from "js-cookie";
import { TOKEN } from "../../../constants";
import { useDispatch } from "react-redux";
import { controlAuthenticated } from "../../../redux/slices/authSlice";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = () => {
    Cookies.remove(TOKEN);
    dispatch(controlAuthenticated(false));
    navigate("/");
  };

  return (
    <Layout className="admin-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="admin-logo">Portfolio Admin</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/skills",
              icon: <VideoCameraOutlined />,
              label: <Link to="/skills">Skills</Link>,
            },
            {
              key: "/users",
              icon: <UploadOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: "/portfolios",
              icon: <BookOutlined />,
              label: <Link to="/portfolios">Portfolios</Link>,
            },
            {
              key: "/education",
              icon: <FontSizeOutlined />,
              label: <Link to="/education">Education</Link>,
            },
            {
              key: "/experiences",
              icon: <FontSizeOutlined />,
              label: <Link to="/experiences">Experiences</Link>,
            },

            {
              icon: <LoginOutlined />,
              label: (
                <Button danger type="primary" onClick={logout}>
                  Logout
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
