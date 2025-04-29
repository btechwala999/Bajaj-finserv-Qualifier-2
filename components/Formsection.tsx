import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { FormSection } from "../types/formTypes";

export default function FormSectionComponent({
  section,
  onNext,
  onPrev,
  isFirst,
  isLast,
  onSubmit,
}: {
  section: FormSection;
  onNext: (data: Record<string, any>) => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  onSubmit: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleNext = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(isLast ? onSubmit : handleNext)}>
      <h2 className="text-lg font-bold mb-2">{section.title}</h2>
      <p className="mb-4">{section.description}</p>
      {section.fields.map((field) => (
        <InputField
          key={field.fieldId}
          field={field}
          register={register}
          errors={errors}
        />
      ))}
      <div className="flex gap-4 mt-4">
        {!isFirst && (
          <button type="button" onClick={onPrev}>
            Previous
          </button>
        )}
        <button type="submit">{isLast ? "Submit" : "Next"}</button>
      </div>
    </form>
  );
}
