interface StatusButtonProps {
    status: 'loading' | 'success' | 'error' | 'default';
    defaultText: string;
    loadingText?: string;
    successText?: string;
    errorText?: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}
function StatusButton(props: StatusButtonProps) {
    switch (props.status) {
        case 'loading':
            return (
                <button type={props.type} className={`btn transition-all duration-500 ${props.className}`} disabled={props.disabled}>
                    {props.loadingText || ''}
                    <span className="loading loading-spinner loading-md"></span>
                </button>
            );
        case 'success':
            return (
                <button type={props.type} className={`btn btn-success transition-all duration-500 ${props.className}`} disabled={props.disabled}>
                    {props.successText || ''}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            );
        case 'error':
            return (
                <button
                    type={props.type}
                    className={`btn btn-error transition-all duration-500 ${props.className}`}
                    onClick={props.onClick}
                    disabled={props.disabled}>
                    {props.errorText || ''}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            );
        default:
            return (
                <button
                    type={props.type}
                    className={`btn transition-all duration-500 ${props.className}`}
                    onClick={props.onClick}
                    disabled={props.disabled}>
                    {props.defaultText}
                </button>
            );
    }
}

export default StatusButton;
