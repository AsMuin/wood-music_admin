interface ErrorProps {
    errorMessage?: string;
}
function Error({ errorMessage }: ErrorProps) {
    return (
        <p className={`transition-all duration-300 ${errorMessage ? 'scale-100 text-red-500' : 'scale-0 text-transparent'}`}>{errorMessage || ''}</p>
    );
}

export default Error;
