// utils/api.ts

import { FormResponse } from "@/types/formTypes";

export const createUser = async (rollNumber: string, name: string): Promise<any> => {
  const res = await fetch("https://dynamic-form-generator-9rl7.onrender.com/create-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ rollNumber, name })
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  return res.json();
};

export const getForm = async (rollNumber: string): Promise<FormResponse> => {
  const res = await fetch(`https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${rollNumber}`);

  if (!res.ok) {
    throw new Error("Failed to fetch form");
  }

  return res.json();
};
