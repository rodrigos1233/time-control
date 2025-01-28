type ButtonProps = {
    onClick?: () => void;
    children?: React.ReactNode;
}

export default function Button({ onClick, children}: ButtonProps) {



    return (
        <button
            onClick={onClick}
            className="bg-greenButtonBackground rounded-lg px-6 py-4 text-sm sm:text-base text-center cursor-pointer flex-grow-0"
        >
            {children}
        </button>

    );
}
