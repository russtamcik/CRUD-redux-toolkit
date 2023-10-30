import { Fragment, useState } from "react";
import { Button, Form, Input, Modal, Pagination, Space, Table } from "antd";
import {
  useAddPortfolioMutation,
  useDeletePortfolioMutation,
  useGetPortfolioMutation,
  useGetPortfoliosQuery,
  useUpdatePortfolioMutation,
} from "../../redux/services/skillService";

const SkillsPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, refetch } = useGetPortfoliosQuery(page);

  const [addPortfolio] = useAddPortfolioMutation();
  const [getPortfolio] = useGetPortfolioMutation();
  const [updatePortfolio] = useUpdatePortfolioMutation();
  const [deletePortfolio] = useDeletePortfolioMutation();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Percent",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Action",
      render: (_, row) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => editPortfolio(row._id)}>
              Edit
            </Button>
            <Button
              danger
              type="primary"
              onClick={async () => {
                await deletePortfolio(row._id);
                refetch();
              }}
            >
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setSelected(null);
    form.resetFields();
  };

  console.log(data);

  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      if (selected === null) {
        await addPortfolio(values);
      } else {
        await updatePortfolio({ id: selected, body: values });
      }
      closeModal();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  async function editPortfolio(id) {
    try {
      setSelected(id);
      setIsModalOpen(true);
      const { data } = await getPortfolio(id);
      console.log(data);
      form.setFieldsValue(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      <Table
        loading={isLoading}
        bordered
        title={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1>Users ({data?.pagination.total})</h1>
            <Button onClick={openModal} type="primary">
              Add users
            </Button>
          </div>
        )}
        columns={columns}
        dataSource={data?.data}
        rowKey="_id"
        pagination={false}
        scroll={{ x: 800 }}
      />
      <Pagination
        total={data?.pagination.total}
        current={page}
        onChange={(page) => setPage(page)}
      />
      <Modal
        title="Users data"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        okText={selected ? "Save user" : "Add user"}
      >
        <Form
          form={form}
          name="users"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Skill Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please fill !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Percents"
            name="percent"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SkillsPage;
