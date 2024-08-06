function Modal({show, onClose, children}) {
    return (
        <div style={{
            transform: show ? "translateX(0%)" : "translateX(-200%)"
        }}
            className="absolute top-5 left-0 w-full h-full z-10 transition-all duration-500 overflow-hidden">
            <div className="container mx-auto max-w-2xl h-[90vh] rounded-2xl bg-slate-800 py-6 px-4 overflow-y-auto">
                <button
                    onClick={() => {
                        onClose(false)
                    }}
                    className="w-10 h-10 mb-4 font-bold rounded-full bg-slate-700">
                    X
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;