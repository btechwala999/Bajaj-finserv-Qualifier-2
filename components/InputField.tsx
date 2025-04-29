// components/InputField.tsx
import React from "react";
import { FormField } from "@/types/formTypes";

interface InputFieldProps {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ field, value, onChange, error }) => {
  const renderInput = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "date":
        return (
          <input
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            data-testid={field.dataTestId}
          />
        );
      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            data-testid={field.dataTestId}
          />
        );
      case "dropdown":
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            data-testid={field.dataTestId}
          >
            <option value="">Select...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value} data-testid={option.dataTestId}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "radio":
        return (
          <div>
            {field.options?.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={field.fieldId}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => onChange(option.value)}
                  data-testid={option.dataTestId}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div>
            {field.options?.map((option) => (
              <label key={option.value}>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={value?.includes(option.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange([...(value || []), option.value]);
                    } else {
                      onChange((value || []).filter((v: string) => v !== option.value));
                    }
                  }}
                  data-testid={option.dataTestId}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="field-container">
      <label>{field.label}{field.required && "*"}</label>
      {renderInput()}
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default InputField;
