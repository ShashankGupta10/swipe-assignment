import React from 'react'

const Button = ({ type, children, onClick, className, variant = 'primary' }) => {
    return (
        <button
            className={`flex justify-center items-center gap-4 px-4 py-2 text-white rounded-xl shadow hover:bg-indigo-600 transition ${variant === 'primary' ? 'bg-indigo-600' : 'bg-black'} ${className}`}
            type={type}
            onClick={onClick}
        >   
            {children}
        </button>
    )
}

export default Button