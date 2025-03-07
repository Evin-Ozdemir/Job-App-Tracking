import { FaTrashAlt } from "react-icons/fa";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteJob } from "../../redux/slices/jobSlice";

const DeleteButton = ({ id }) => {
  const dispatch = useDispatch();

  // Buttona Tıklanınca
  const handleDelete = () => {
    if (!confirm("Silmek istediğiniz emin misiniz?")) return;

    api
      .delete(`/jobs/${id}`)
      .then(() => {
        // Kaldırılma olayını reducer'a haber ver
        dispatch(deleteJob(id));
        //Bildirim gönder
        toast.success("Başvuru listeden kaldırıldı");
      })
      .catch((err) => {
        //Bildirim gönder
        toast.error("Başvuru silinirken bir hata oluştu");
      });
  };
  return (
    <button className="delete" onClick={handleDelete}>
      <FaTrashAlt />
    </button>
  );
};

export default DeleteButton;
