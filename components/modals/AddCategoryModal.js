import Modal from '@/components/Modal'
import { useState, useContext, useRef } from 'react';
import { pantryContext } from '@/lib/store/pantry-context';
import { v4 as uuidv4 } from 'uuid';

function AddCategoryModal({ show, onClose }) {
    const [categoryAmount, setCategoryAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showAddCategory, setShowAddCategory] = useState(false);

    const { category, addCategoryItem, addCategory } = useContext(pantryContext);

    const titleRef = useRef()
    const colorRef = useRef()

    const cat = category.find(e => {
        return e.id === selectedCategory
    })

    const addCategoryItemHandler = async () => {
        const newCategory = {
            color: cat.color,
            title: cat.title,
            total: cat.total + +categoryAmount,
            items: [
                ...cat.items, {
                    amount: +categoryAmount,
                    id: uuidv4(),
                }]
        }

        try {
            await addCategoryItem(selectedCategory, newCategory);

            setCategoryAmount("")
            setSelectedCategory(null)
            onClose();
        } catch (error) {
            console.log(error.message)
        }
    }

    const addCategoryHandler = async () => {
        const title = titleRef.current.value
        const color = colorRef.current.value

        try {
            await addCategory({ title, color, total: 0 })
            setShowAddCategory(false);
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Modal show={show} onClose={onClose}>
            <div className="flex flex-col gap-5">
                <label className="text-lime-400">No. of Items</label>
                <input
                    type='number'
                    min={1}
                    step={1}
                    placeholder='Enter no. of items'
                    value={categoryAmount}
                    onChange={(e) => {
                        setCategoryAmount(e.target.value);
                    }}
                />
            </div>

            {/* Expense Categories */}
            {categoryAmount > 0 && (
                <div className='flex flex-col gap-4 mt-6'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-2xl capitalize'>select category</h3>
                        <button onClick={() => {
                            setShowAddCategory(true);
                        }} className='text-lime-400'>+ New Category</button>
                    </div>

                    {showAddCategory && (
                        <div className='flex items-center justify-between'>
                            <input
                                type="text"
                                placeholder='Enter title'
                                ref={titleRef}
                            />
                            <label>Pick Colour</label>
                            <input
                                type='color'
                                className='w-24 h-10'
                                ref={colorRef}
                            />
                            <button onClick={addCategoryHandler} className='btn btn-primary-outline'>Create</button>
                            <button onClick={() => {
                                setShowAddCategory(false);
                            }} className='btn btn-danger'>Cancel</button>
                        </div>
                    )}

                    {category.map(category => {
                        return (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setSelectedCategory(category.id)
                                }}>
                                <div
                                    style={{
                                        boxShadow: category.id === selectedCategory ? "1px 1px 4px" : "none"
                                    }}
                                    className='flex items-center justify-between px-4 py-4 bg-slate-950 rounded-3xl'>
                                    <div className='flex items-center gap-2'>
                                        {/* Coloured circle */}
                                        <div
                                            className='w-[25px] h-[25px] rounded-full'
                                            style={{
                                                backgroundColor: category.color,
                                            }}
                                        />
                                        <h4 className='capitalize'>{category.title}</h4>
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            )}

            {categoryAmount > 0 && selectedCategory && (
                <div className='mt-6'>
                    <button onClick={addCategoryItemHandler} className='btn btn-primary'>
                        Add Category
                    </button>
                </div>
            )}

        </Modal>
    );
}

export default AddCategoryModal;