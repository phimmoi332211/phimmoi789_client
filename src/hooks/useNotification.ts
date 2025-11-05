import { toast } from "react-toastify";
const useNotification = () => {
  const notice = (type = "", message = "", description = "") => {
    toast[type](message);
  };
  return { notice };
};
export default useNotification;
