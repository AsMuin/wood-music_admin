interface ErrorProps {
    errorMessage?: string;
}
function Error({ errorMessage }: ErrorProps) {
    return (
        <p className={`transition-all duration-300 whitespace-pre-wrap ${errorMessage ? 'scale-100 text-red-500 visible' : 'scale-50 opcity-0 invisible'}`}>{errorMessage || ' '}</p>
    );
}

export default Error;
