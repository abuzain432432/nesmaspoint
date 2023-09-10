import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Modal, Select, Form } from "antd";
import { URL } from "@/config";
function AdminAdsStatusModal({
  loading,
  adStatusModel,
  onAdStatusModelCancel,
  setLoading,
  setRefetchSignal,
  user,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      adStatus: adStatusModel?.active ? "active" : "pending",
    });
  }, [adStatusModel]);
  const handleAdStatusChange = async (data) => {
    try {
      setLoading(true);
      await axios.patch(
        `${URL}/api/v1/ads/${adStatusModel._id}`,
        { active: data.adStatus === "pending" ? false : true },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      setRefetchSignal((preSignal) => !preSignal);

      toast.success("Ad status changed successfully", {
        autoClose: 5000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      onAdStatusModelCancel();
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
      onCancel={onAdStatusModelCancel}
      open={adStatusModel}
      footer={false}
      centered
      className=" admin-ad-status-model overflow-auto rounded-lg pb-6 relative bg-white"
    >
      <h3 className="mb-4 font-semibold text-2xl w-fit ">
        {adStatusModel?.title?.length > 35
          ? `${adStatusModel?.title?.slice(0, 35)}...`
          : adStatusModel?.title}
      </h3>
      <Form
        onFinish={handleAdStatusChange}
        form={form}
        initialValues={{
          adStatus: adStatusModel?.active ? "active" : "pending",
        }}
        layout="vertical"
      >
        <Form.Item
          required
          rules={[{ required: true, message: "Please select ad status" }]}
          label="Ad Status"
          name={"adStatus"}
        >
          <Select placeholder="ad status">
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="active">Active</Select.Option>
          </Select>
        </Form.Item>

        <div className="flex mt-6 justify-end w-full">
          <Button
            htmlType="submit"
            loading={loading}
            className="ad-status-btn w-full"
          >
            Change Status
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AdminAdsStatusModal;
