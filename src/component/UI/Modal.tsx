import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import StatusButton from './StatusButton';

interface IModalProps {
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
    isConfirm?: boolean;
    isCancel?: boolean;
}

type BtnStatus = 'default' | 'loading' | 'success' | 'error';
function Dialog(props: PropsWithChildren<IModalProps>) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [btnStatus, setBtnStatus] = useState<BtnStatus>('default');
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) {
            return;
        }
        dialog.showModal();
        dialog.addEventListener('close', () => {
            props.onClose?.();
        });
        return () => {
            dialog.removeEventListener('close', () => {
                props.onClose?.();
            });
            dialog.close();
        };
    }, [props]);
    async function onConfirm() {
        try {
            setBtnStatus('loading');
            await props.onConfirm?.();
        } catch (error: any) {
            console.error(error);
            setBtnStatus('error');
        }
    }
    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-box bg-muted/95">
                {typeof props.children === 'string' ? (
                    <p className="text-xl">{props.children}</p>
                ) : (
                    <>{props.children}</>
                )}
                <div className={`modal-action ${!props.isCancel && !props.isConfirm ? 'mt-0' : ''}`}>
                    <form method="dialog">
                        <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2 text-invert">
                            ✕
                        </button>
                    </form>
                    <StatusButton
                        defaultText="confirm"
                        errorText="出错了,点击重试"
                        status={btnStatus}
                        onClick={onConfirm}
                    />
                </div>
            </div>
        </dialog>
    );
}
export default Dialog;
