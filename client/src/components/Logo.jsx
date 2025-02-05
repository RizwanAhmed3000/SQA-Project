import React from 'react'
import logo from "../assets/logo.png";

const Logo = () => {
    return (
        <div className="text-white text-2xl font-bold flex items-center">
            <img src={logo} alt="Logo" className="h-24 w-24  object-contain" />
        </div>
    )
}

export default Logo