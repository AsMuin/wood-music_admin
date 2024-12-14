import { useEffect, useRef } from 'react';

function Dialog({ visible, setVisible, children }: { visible: boolean; setVisible: (visible: boolean) => void; children?: React.ReactNode }) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) {
            return;
        }
        if (visible) {
            dialog.showModal();
        } else {
            dialog.close();
        }
    }, [visible]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) {
            return;
        }
        function onClose() {
            setVisible(false);
        }
        function onShow() {
            setVisible(true);
        }
        dialog.addEventListener('close', onClose);
        dialog.addEventListener('show', onShow);
        return () => {
            dialog.removeEventListener('close', onClose);
            dialog.removeEventListener('show', onShow);
        };
    }, [setVisible]);

    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-box bg-muted/95">
                {children}
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 text-invert">✕</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
export default Dialog;
