import { Select, Form, Modal, Button } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "@/config";

function AdminUserRoleModal({
  onUserRoleModalCancel,
  userRoleModal,
  setRefetchSignal,
  setLoading,
  loading,
  user,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      userRole: userRoleModal?.role,
    });
  }, [userRoleModal]);

  const handleAdRoleChange = async (data) => {
    try {
      setLoading(true);
      await axios.patch(
        `${URL}/api/v1/users/${userRoleModal._id}`,
        { role: data.userRole },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      setRefetchSignal((preSignal) => !preSignal);

      toast.success("User role changed successfully", {
        autoClose: 5000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      onUserRoleModalCancel();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      onCancel={onUserRoleModalCancel}
      open={userRoleModal}
      footer={false}
      centered
      className="admin-user-role-model overflow-auto rounded-lg pb-6 relative bg-white"
    >
      <h3 className="mb-2 font-semibold text-2xl w-fit ">
        {`${userRoleModal?.firstName} ${userRoleModal?.lastName}`}
      </h3>
      <Form
        form={form}
        initialValues={{ userRole: userRoleModal?.role }}
        layout="vertical"
        onFinish={handleAdRoleChange}
      >
        <Form.Item
          required
          label="User Role"
          name={"userRole"}
          rules={[{ required: true, message: "Please select user role" }]}
        >
          <Select placeholder="User Role">
            <Select.Option value="admin">Make admin</Select.Option>
            <Select.Option value="guide">Make guide</Select.Option>
            <Select.Option value="user">Make user</Select.Option>
          </Select>
        </Form.Item>

        <div className="flex mt-6 justify-end w-full">
          <Button
            htmlType="submit"
            loading={loading}
            className="user-role-btn w-full"
          >
            Change Status
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AdminUserRoleModal;
