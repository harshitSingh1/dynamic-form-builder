// src\components\FormGenerator.tsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { jsonError } from "../types/errors";
import { FormSchema } from "../types/formTypes";
import { FaUser, FaEnvelope, FaBuilding, FaIndustry, FaClock } from "react-icons/fa";

const FormGenerator: React.FC<{ schema: FormSchema, jsonError: jsonError }> = ({ schema, jsonError }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showData, setShowData] = useState(false);
    const [formData, setFormData] = useState<any>(null);

    useEffect(() => {
        reset();
    }, [schema, reset]);

    const onSubmit = (data: any) => {
        setFormData(data);
        setIsSubmitted(true);
        alert("Form submitted successfully!");
    };

    const handleEdit = () => {
        setIsSubmitted(false);
    };

    const handleDownload = () => {
        const dataStr = JSON.stringify(formData, null, 4);
        const blob = new Blob([dataStr], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "yourSubmission.json";
        link.click();
    };

    return (
        <div className="w-full h-full animate-fade-in">
            {jsonError.isError ? <>
                <div className="w-full h-full flex flex-col align-middle animate-fade-in">
                    <h2 className="text-xl font-bold dark:text-white">Kindly solve the following errors:</h2>
                    {jsonError.errorMessages?.map((error, index) => <p className="dark:text-white" key={index}>- {error}</p>)}
                </div>
            </> : <>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
                    <h2 className="text-xl font-bold dark:text-white text-center">{schema.formTitle}</h2>
                    <p className="dark:text-white text-center">{schema.formDescription}</p>
                    {schema.fields.map((field, index) => (
                        <div key={index}>
                            <label className="block text-sm font-medium dark:text-white flex items-center space-x-2">
                                {/* Add icons with labels */}
                                {field.id === "name" && <FaUser />}
                                {field.id === "email" && <FaEnvelope />}
                                {field.id === "companySize" && <FaBuilding />}
                                {field.id === "industry" && <FaIndustry />}
                                {field.id === "timeline" && <FaClock />}
                                <span>{field.label}</span>
                            </label>
                            {field.type === "text" || field.type === "email" ? (
                                <input
                                    {...register(field.id, {
                                        required: field.required,
                                        pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined,
                                    })}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-black dark:text-white border border-slate-600 px-3 py-3"
                                    readOnly={isSubmitted}
                                />
                            ) : field.type === "textarea" ? (
                                <textarea
                                    {...register(field.id, { required: field.required })}
                                    placeholder={field.placeholder}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-black dark:text-white border border-slate-600 px-3 py-3"
                                    readOnly={isSubmitted}
                                />
                            ) : field.type === "select" ? (
                                <select {...register(field.id, { required: field.required })} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-black dark:text-white border border-slate-600 px-3 py-3" disabled={isSubmitted}>
                                    {field.options?.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : field.type === "radio" ? (
                                <div className="space-y-2 w-full flex flex-wrap items-center justify-start">
                                    {field.options?.map((option) => (
                                        <div key={option.value} className="flex items-center mt-2 mr-2">
                                            <input
                                                {...register(field.id, { required: field.required })}
                                                type="radio"
                                                value={option.value}
                                                id={`${field.id}-${option.value}`}
                                                className="mr-2"
                                                disabled={isSubmitted}
                                            />
                                            <label htmlFor={`${field.id}-${option.value}`} className="text-sm dark:text-white">{option.label}</label>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            {errors[field.id] && (
                                <span className="text-red-500 text-sm">
                                    {field.validation?.message || "This field is required"}
                                </span>
                            )}
                        </div>
                    ))}
                    {!isSubmitted && (
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Submit
                        </button>
                    )}
                </form>
                {isSubmitted && (
                    <div className="mt-6">
                        <div className="flex space-x-4">
                            <button onClick={handleEdit} className="bg-yellow-500 text-white px-4 py-2 rounded">
                                Edit Form
                            </button>
                            <button onClick={() => setShowData(!showData)} className="bg-green-500 text-white px-4 py-2 rounded">
                                Show Data
                            </button>
                            <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded">
                                Download Data
                            </button>
                        </div>
                        {showData && (
                            <div className="mt-4 p-4 border border-slate-300 rounded bg-gray-100 dark:bg-gray-700">
                                <h3 className="text-lg font-semibold dark:text-white">Data Preview:</h3>
                                <pre className="text-sm text-gray-600 dark:text-white">{JSON.stringify(formData, null, 4)}</pre>
                            </div>
                        )}
                    </div>
                )}
            </>}
        </div>
    );
};

export default FormGenerator;
