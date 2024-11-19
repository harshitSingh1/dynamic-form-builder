# Dynamic Form Builder

A versatile and interactive form builder that allows users to create and customize forms based on a JSON schema. The form supports various field types like text, email, select, textarea, and radio buttons, and includes features like form validation, JSON editor, and dark mode.

## Project Structure
```
📂 public
📂 src 
├── 📂 components 
│ ├── FormGenerator.tsx
│ ├── JSONEditor.tsx
│ ├── Layout.tsx
│ └── Header.tsx
├── 📂 config 
│ └── monacoConfig.ts
├── 📂 tests 
│ ├── 📂 tests 
│ │ └──form.spec.ts
│ ├── 📂 unit 
│ │ ├── FormGenerator.test.tsx
│ │ └── JSONEditor.test.tsx
├── 📂 types 
│ ├── editorTypes.ts
│ ├── errors.ts
│ └── formTypes.ts
├── 📂 utils 
│ └── sampleSchema.ts
├── 📂 validators 
│ └── jsonValidator.ts
├── App.css 
└── App.js
README.md 
tailwind.config.js

```


## Features

- **Dynamic Form Generation:** Create forms based on a JSON schema with various field types (text, email, radio, select, etc.).
- **Form Validation:** Built-in field validation with customizable error messages.
- **JSON Schema Editor:** An interactive editor that allows users to edit and validate JSON schema directly.
- **Data Preview & Download:** After form submission, view the submitted data in JSON format and download it.
- **Dark Mode:** Toggle between light and dark modes for improved readability.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/harshitSingh1/dynamic-form-builder.git
   cd dynamic-form-builder
   ```

### 2. Install dependencies
```
npm install
```

### 3. Run the development server
```
npm start
```

### 4. Visit http://localhost:3000 on your browser

## Testing

### Run unit tests with Jest (make sure the application is up and running on http://localhost:3000)
```
npm run test
```

### Run E2E tests with Playwright (make sure the application is up and running on http://localhost:3000)
```
npx playwright test
```

## Installation
- **JSON Schema:** To create a new form, provide a JSON schema that defines the form structure. For example:

```
{
    "formTitle": "User Information",
    "formDescription": "Please provide your details",
    "fields": [
        {
            "id": "name",
            "label": "Full Name",
            "type": "text",
            "required": true
        },
        {
            "id": "email",
            "label": "Email Address",
            "type": "email",
            "required": true
        }
    ]
}
```
- **Form Generation:** Once the schema is loaded, the form will be displayed based on the field types defined in the JSON.
- **Submit & Download Data:** After filling out the form, submit it, and view the preview of the data in JSON format. You can also download the submitted data.

## Technologies Used
- **React:** For building the UI components.
- **Tailwind CSS:** For utility-first CSS styling.
- **React Hook Form:** For managing form states and validation.
- **Monaco Editor:** For the JSON schema editor with syntax highlighting.
- **TypeScript:** For type safety and better developer experience.
- **Cypress:** For end-to-end testing.
