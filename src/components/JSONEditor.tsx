// src\components\JSONEditor.tsx
import React, { useState } from "react";
import { JSONEditorProps } from "../types/editorTypes";
import { formSchema } from "../validators/jsonValidator";
import { FaClipboard } from "react-icons/fa";

const JSONEditor: React.FC<JSONEditorProps> = ({ schema, setSchema, setJsonError }) => {
    const [jsonValue, setJsonValue] = useState<string>(JSON.stringify(schema, null, 2));
    const [buttonText, setButtonText] = useState("Copy JSON");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        setJsonValue(input);
        try {
            const parsed = JSON.parse(input);
            const validationResult = formSchema.safeParse(parsed);
            if (!validationResult.success) {
                const errorMessages = validationResult.error.errors.map((err) => {
                    const path = err.path.join(".");
                    const message = err.message;
                    return `Error in '${path}': ${message}`;
                });
                setJsonError({ isError: true, errorMessages });
                return;
            }
            setSchema(validationResult.data);
            setJsonError({ isError: false });
        } catch (err) {
            console.log(err);
            if (err instanceof SyntaxError) { // catching syntax errors in JSON
                setJsonError({ isError: true, errorMessages: [err.message] });
            } else {
                setJsonError({ isError: true, errorMessages: ["Something went wrong"] });
            }
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(jsonValue);
            setButtonText("JSON Copied");
            setTimeout(() => setButtonText("Copy JSON"), 1000);
        } catch (err) {
            console.error("Failed to copy: ", err);
            alert("Failed to copy JSON.");
        }
    };

    return (
        <div className="h-full w-full flex flex-col max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold dark:text-white">JSON Editor</h2>
                <button onClick={handleCopy} className="bg-blue-500 px-4 py-2 rounded text-white flex items-center">
                    <FaClipboard className="mr-2" />
                    {buttonText}
                </button>
            </div>
            <textarea
                data-testid={"json-editor"}
                className="w-full h-full border p-2 rounded mt-2 dark:bg-black dark:text-white border-slate-500 focus:border"
                value={jsonValue}
                onChange={handleChange}
            />
        </div>
    );
};
export default JSONEditor;
