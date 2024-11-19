// src\components\Header.tsx
import React from "react";

const Header: React.FC = () => {
    return (
        <div className="text-center bg-gray-100 p-4 dark:bg-gray-800 mb-6">
            <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                Dynamic Form Builder
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300 mt-2">
                Create and customize forms effortlessly with JSON schema.
            </p>
        </div>
    );
};

export default Header;

