import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [forms, setForms] = useState([]);
  const [formId, setFormId] = useState(null);
  const [responses, setResponses] = useState([]);

  // Fetch forms from backend
  const fetchForms = async () => {
    try {
      const response = await axios.get(
        "https://dynamic-form-app-ashy.vercel.app/api/forms"
      );
      setForms(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch forms");
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  // Save a new form to backend
  const saveForm = async (formData) => {
    try {
      const response = await axios.post(
        "https://dynamic-form-app-ashy.vercel.app/api/forms",
        formData
      );
      setForms([...forms, response.data]);
      toast.success("Form saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save form");
    }
  };

  // Fetch form details based on form ID
  const fetchForm = async (id) => {
    try {
      const response = await axios.get(
        `https://dynamic-form-app-ashy.vercel.app/api/forms/${id}`
      );
      setFormId(id);
      // Initialize responses array with empty arrays based on number of questions
      setResponses(response.data.questions.map(() => []));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch form");
    }
  };

  // Delete a form from backend
  const deleteForm = async (id) => {
    try {
      await axios.delete(
        `https://dynamic-form-app-ashy.vercel.app/api/forms/${id}`
      );
      setForms(forms.filter((form) => form._id !== id));
      if (formId === id) {
        setFormId(null);
        setResponses([]);
      }
      toast.success("Form deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete form");
    }
  };

  // Submit responses for the current form
  const submitResponses = async () => {
    try {
      await axios.post(
        `https://dynamic-form-app-ashy.vercel.app/api/forms/${formId}/responses`,
        {
          responses: responses.map((res, index) => ({
            questionId: forms.find((form) => form._id === formId).questions[
              index
            ]._id,
            answer: res,
          })),
        }
      );
      // Clear responses array after submission
      setResponses(
        forms.find((form) => form._id === formId).questions.map(() => [])
      );
      toast.success("Responses submitted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit responses");
    }
  };

  return (
    <FormContext.Provider
      value={{
        forms,
        formId,
        responses,
        fetchForms,
        saveForm,
        fetchForm,
        deleteForm,
        submitResponses,
        setResponses,
        setFormId,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
