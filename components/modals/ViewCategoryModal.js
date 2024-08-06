import { useContext } from "react";
import Modal from "../Modal"
import { pantryContext } from "@/lib/store/pantry-context";

function ViewCategoryModal({ show, onClose, item }) {

    const { deleteCategory } = useContext(pantryContext)

    const deleteCategoryHandler = async () => {
        try {
            await deleteCategory(item.id)
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex items-center justify-between">
                <h2 className="text-4xl">{item.title}</h2>
                <button onClick={deleteCategoryHandler} className="btn btn-danger">Delete</button>
            </div>
        </Modal>
    );
}

export default ViewCategoryModal