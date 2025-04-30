// src/components/ui/input.js
import React from "react";

export const Input = (props) => {
    return (
        <input
            {...props}
            className="w-full p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
    );
};
