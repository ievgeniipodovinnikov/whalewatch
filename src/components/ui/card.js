// src/components/ui/card.js
import React from "react";

export const Card = ({ children, className }) => {
    return (
        <div className={`shadow-md rounded-lg ${className}`}>
            {children}
        </div>
    );
};

export const CardContent = ({ children }) => {
    return (
        <div className="p-4">
            {children}
        </div>
    );
};
