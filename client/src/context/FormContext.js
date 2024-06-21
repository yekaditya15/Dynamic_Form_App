import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [forms, setForms] = useState([]);
  const [formId, setFormId] = useState(null);
  const [responses, setResponses] = useState([]);

  const fetchForms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/forms");
      setForms(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const saveForm = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/forms",
        formData
      );
      setForms([...forms, response.data]);
      toast.success("Form saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save form");
    }
  };

  const fetchForm = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/forms/${id}`);
      setFormId(id);
      setResponses(response.data.questions.map(() => []));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch form");
    }
  };

  const deleteForm = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/forms/${id}`);
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

  const submitResponses = async () => {
    try {
      await axios.post(`http://localhost:8000/api/forms/${formId}/responses`, {
        responses: responses.map((res, index) => ({
          questionId: forms.find((form) => form._id === formId).questions[index]
            ._id,
          answer: res,
        })),
      });
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
        setResponses, // Add setResponses to the context
        setFormId,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
