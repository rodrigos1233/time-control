type ButtonProps = {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
}

export default function Button({ onClick, children, className }: ButtonProps) {

    return (
        <button
            onClick={onClick}
            className={`${className} bg-greenButtonBackground rounded-lg px-6 py-4 text-sm sm:text-base text-center cursor-pointer flex-grow-0 hover:brightness-105 border-selectorBorder border-4`}
        >
            {children}
        </button>
    );
}
