import { useRef, useEffect, useContext } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import Modal from "@/components/Modal";
import { pantryContext } from '@/lib/store/pantry-context';
import { authContext } from '@/lib/store/auth-context';

function AddItemModal({ show, onClose }) {
    const amountRef = useRef()
    const descriptionRef = useRef()
    const { item, addItem, removeItem } = useContext(pantryContext)
    const { user } = useContext(authContext)

    const addHandler = async (e) => {
        e.preventDefault()

        const newItem = {
            amount: amountRef.current.value,
            description: descriptionRef.current.value,
            uid: user.uid,
        };

        try {
            await addItem(newItem)
            descriptionRef.current.value = "";
            amountRef.current.value = "";
        } catch (error) {
            console.log(error.message)
        }
    };

    // Handler Functions    
    const deleteItemEntryHandler = async (itemId) => {
        try {
            await removeItem(itemId)
        } catch (error) {
            console.log(error.message)
        }
    }



    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={addHandler} className="flex flex-col gap-5">
                <div className="input-group">
                    <label htmlFor="amount" className="text-lime-400">No. of Items</label>
                    <input
                        type="number"
                        name="amount"
                        ref={amountRef}
                        min={1}
                        step={1}
                        placeholder="Enter no. of items"
                        required />
                </div>

                <div className="input-group">
                    <label htmlFor="description" className="text-lime-400">Description</label>
                    <input
                        type="text"
                        name="description"
                        ref={descriptionRef}
                        placeholder="Enter pantry item"
                        required />
                </div>

                <button type="submit" className="btn btn-primary">Add Entry</button>
            </form>

            <div className="flex flex-col gap-5 mt-6">
                <h3 className="text-2xl font-bold">Pantry History</h3>

                {item.map((i) => {
                    return (
                        <div className="flex items-center justify-between" key={i.id}>
                            <div>
                                <p className="font-semibold">{i.description}</p>
                            </div>
                            <p className="flex items-center gap-2">
                                {i.amount}
                                <button onClick={() => { deleteItemEntryHandler(i.id) }} >
                                    <FaRegTrashAlt />
                                </button>
                            </p>
                        </div>
                    );
                })}
            </div>

        </Modal>
    )
}

export default AddItemModal;