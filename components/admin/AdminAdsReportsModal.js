import { Button, Modal } from "antd";
import { URL } from "@/config";
import axios from "axios";
import { toast } from "react-toastify";
function AdminAdsReportsModal({
  onReportsModalCancel,
  loading,
  setLoading,
  user,
  setRefetchSignal,
  reportModal,
}) {
  const handleAdDelte = async () => {
    try {
      setLoading(true);

      await axios.delete(`${URL}/api/v1/ads/${reportModal._id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      onReportsModalCancel();
      setRefetchSignal((preSignal) => !preSignal);
      toast.success("ad deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
      onCancel={onReportsModalCancel}
      open={reportModal}
      footer={false}
      centered
      className=" admin-reports-model overflow-auto rounded-lg pb-6 relative bg-white"
    >
      <h3 className="mb-2 font-semibold text-2xl w-fit ">Ad Reports</h3>
      <ul className="flex flex-col  ">
        {!Boolean(reportModal?.reports?.length) && (
          <p className="">No report recieved for this ad</p>
        )}

        {Boolean(reportModal?.reports?.length) &&
          adsReport?.map((report) => (
            <li
              className="border-b flex flex-col  border-b-gray-300 py-2"
              key={report}
            >
              <span className="font-semibold text-base">Message:</span>
              <span className="text-sm">{report}</span>
            </li>
          ))}
      </ul>
      <div className="flex mt-6 justify-end w-full">
        <Button
          loading={loading}
          onClick={handleAdDelte}
          className="delete-Ad-btn w-full"
        >
          Delete Ad
        </Button>
      </div>
    </Modal>
  );
}

export default AdminAdsReportsModal;
