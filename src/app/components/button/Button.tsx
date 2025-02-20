type ButtonProps = {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
    buttonType?: 'primary' | 'secondary';
    color?: 'green' | 'red';
}

const buttonColor = {
    primary: {
        green: 'bg-greenButtonBackground border-selectorBorder',
        red: 'bg-redButtonBackground border-selectorBorder',
    },
    secondary: {
        green: 'border-greenButtonBackground bg-background',
        red: 'border-redButtonBackground bg-background',
    }
}

export default function Button({ onClick, children, className, buttonType = 'primary', color = 'green' }: ButtonProps) {

    return (
        <button
            onClick={onClick}
            className={`${className} ${buttonColor[buttonType][color]} rounded-lg px-6 py-4 text-sm sm:text-base text-center cursor-pointer flex-grow-0 hover:brightness-105 border-4`}
        >
            {children}
        </button>
    );
}
