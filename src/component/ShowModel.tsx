import Modal from './UI/Modal';
import { createRoot } from 'react-dom/client';

function ShowDialog(
    content: React.ReactNode,
    {
        confirmCallback,
        cancelCallback,
        closeCallback,
        isConfirm = true,
        isCancel = true
    }: {
        confirmCallback?: () => void | Promise<any>;
        cancelCallback?: () => void;
        closeCallback?: () => void;
        isConfirm?: boolean;
        isCancel?: boolean;
    } = {}
) {
    const dialogContainer = document.createElement('div');
    document.body.appendChild(dialogContainer);
    createRoot(dialogContainer).render(
        <Modal onConfirm={confirm} onCancel={cancel} onClose={close} isCancel={isCancel} isConfirm={isConfirm}>
            {content}
        </Modal>
    );

    async function confirm() {
        console.log('confirm');
        try {
            if (confirmCallback) {
                await confirmCallback();
                dialogContainer.remove();
            } else {
                dialogContainer.remove();
            }
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
    function cancel() {
        console.log('cancel');
        dialogContainer.remove();
        if (cancelCallback) {
            cancelCallback();
        }
    }
    function close() {
        console.log('close');
        dialogContainer.remove();
        if (closeCallback) {
            closeCallback();
        }
    }
}

export default ShowDialog;
