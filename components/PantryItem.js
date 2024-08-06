import { useState } from 'react';
import ViewCategoryModal from './modals/ViewCategoryModal';

function PantryItem({ item }) {
    const [showViewCategoryModal, setViewCategoryModal] = useState(false);

    return (
        <>
            <ViewCategoryModal
                show={showViewCategoryModal}
                onClose={setViewCategoryModal}
                item={item}
            />
            <button onClick={() => {
                setViewCategoryModal(true);
            }}>
                <div className="flex items-center justify-between px-4 py-4 bg-slate-800 rounded-2xl">
                    <div className="flex items-center gap-2">
                        <div className="w-[25px] h-[25px] rounded-full" style={{ backgroundColor: item.color }} />
                        <h4 className="capitalize">{item.title}</h4>
                    </div>
                    <p>{item.total}</p>          {/* Amount */}
                </div>
            </button>
        </>
    );
}

export default PantryItem;