"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getForm } from "../../utils/api";
import { FormSection as FormSectionType } from "../../types/formTypes";
import FormSection  from "../../components/Formsection";

export default function FormPage() {
  const searchParams = useSearchParams();
  const rollNumber = searchParams.get("rollNumber");

  const [sections, setSections] = useState<FormSectionType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    async function fetchForm() {
      if (!rollNumber) return;
      const res = await getForm(rollNumber);
      setSections(res.form.sections);
    }
    fetchForm();
  }, [rollNumber]);

  if (sections.length === 0) return <p>Loading...</p>;

  const handleSectionData = (data: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = () => {
    console.log("Final Form Data:", formData);
  };

  return (
    <div className="p-6">
      <FormSection
        section={sections[currentIndex]}
        onNext={(data) => {
          handleSectionData(data);
          setCurrentIndex((i) => i + 1);
        }}
        onPrev={() => setCurrentIndex((i) => i - 1)}
        isFirst={currentIndex === 0}
        isLast={currentIndex === sections.length - 1}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
