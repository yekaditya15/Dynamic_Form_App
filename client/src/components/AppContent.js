import React, { useContext, useState } from "react";
import { FormContext } from "../context/FormContext";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Input, message, List } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function AppContent() {
  const {
    forms,
    formId,
    responses,
    saveForm,
    fetchForm: originalFetchForm,
    deleteForm,
    setResponses,
    setFormId,
    submitResponses, // Add submitResponses from context
  } = useContext(FormContext);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    questions: Yup.array()
      .of(
        Yup.object().shape({
          questionText: Yup.string().required("Question text is required"),
          questionType: Yup.string().required("Question type is required"),
          options: Yup.array()
            .of(Yup.string().required("Option is required"))
            .min(4, "At least 4 options are required"),
        })
      )
      .min(1, "At least one question is required"),
  });

  const handleResponseChange = (questionIndex, optionIndex) => {
    const newResponses = [...responses];
    const option = forms.find((form) => form._id === formId).questions[
      questionIndex
    ].options[optionIndex];
    if (
      forms.find((form) => form._id === formId).questions[questionIndex]
        .questionType === "single-choice"
    ) {
      newResponses[questionIndex] = [option];
    } else {
      // Toggle selection for multiple-choice questions
      const currentIndex = newResponses[questionIndex]?.indexOf(option);
      if (currentIndex === -1) {
        newResponses[questionIndex] = [
          ...(newResponses[questionIndex] || []),
          option,
        ];
      } else {
        newResponses[questionIndex] = newResponses[questionIndex].filter(
          (item, idx) => idx !== currentIndex
        );
      }
    }
    setResponses(newResponses);
  };

  const nextOrSubmit = () => {
    if (
      currentQuestionIndex ===
      forms.find((form) => form._id === formId).questions.length - 1
    ) {
      submitResponses();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const fetchForm = (id) => {
    if (formId === id) {
      setFormId(null); // Close the form if it's already open
    } else {
      setFormId(id);
      originalFetchForm(id);
      setCurrentQuestionIndex(0); // Reset question index when a new form is opened
    }
  };

  return (
    <div className="AppContent">
      <h1>Form Builder</h1>
      <Formik
        initialValues={{ title: "", questions: [] }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          saveForm(values);
          resetForm();
          message.success("Form saved successfully!");
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form>
            <div>
              <label htmlFor="title">Form Title</label>
              <Input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>
            <div>
              <label>Questions</label>
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <div>
                    {values.questions.map((question, index) => (
                      <div key={index} className="question-block">
                        <div>
                          <label htmlFor={`questions.${index}.questionText`}>
                            Question Text
                          </label>
                          <Input
                            type="text"
                            id={`questions.${index}.questionText`}
                            name={`questions.${index}.questionText`}
                            value={question.questionText}
                            onChange={handleChange}
                          />
                          <ErrorMessage
                            name={`questions.${index}.questionText`}
                            component="div"
                            className="error"
                          />
                        </div>
                        <div>
                          <label htmlFor={`questions.${index}.questionType`}>
                            Question Type
                          </label>
                          <select
                            id={`questions.${index}.questionType`}
                            name={`questions.${index}.questionType`}
                            value={question.questionType}
                            onChange={handleChange}
                            className="question-type-select"
                          >
                            <option value="single-choice">Single Choice</option>
                            <option value="multiple-choice">
                              Multiple Choice
                            </option>
                          </select>
                          <ErrorMessage
                            name={`questions.${index}.questionType`}
                            component="div"
                            className="error"
                          />
                        </div>
                        <div>
                          <label>Options</label>
                          <FieldArray name={`questions.${index}.options`}>
                            {({ push: pushOption, remove: removeOption }) => (
                              <div>
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex}>
                                    <Input
                                      type="text"
                                      name={`questions.${index}.options.${optionIndex}`}
                                      value={option}
                                      onChange={handleChange}
                                    />
                                    <ErrorMessage
                                      name={`questions.${index}.options.${optionIndex}`}
                                      component="div"
                                      className="error"
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          </FieldArray>
                        </div>
                        <Button
                          type="primary"
                          onClick={() => remove(index)}
                          danger
                        >
                          Remove Question
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="dashed"
                      onClick={() =>
                        push({
                          questionText: "",
                          questionType: "single-choice",
                          options: ["", "", "", ""],
                        })
                      }
                      style={{ marginTop: "10px" }}
                    >
                      Add Question
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save Form
            </Button>
          </Form>
        )}
      </Formik>
      <h2>Forms</h2>
      <p>Click on a form title to give response:</p>
      <List
        dataSource={forms}
        renderItem={(form) => (
          <List.Item key={form._id}>
            <span
              onClick={() => fetchForm(form._id)}
              className="saved-form-title"
            >
              {form.title}
            </span>
            <Button
              onClick={() => deleteForm(form._id)}
              style={{ border: "none", background: "none", cursor: "pointer" }}
              icon={<FontAwesomeIcon icon={faTrash} />}
            />
          </List.Item>
        )}
      />
      {formId && (
        <div className="question-container">
          <h2>{forms.find((form) => form._id === formId).title}</h2>
          <div className="question-box">
            {forms
              .find((form) => form._id === formId)
              .questions.map((question, questionIndex) =>
                questionIndex === currentQuestionIndex ? (
                  <div key={questionIndex}>
                    <div className="question-header">
                      <h3 className="question-text">{question.questionText}</h3>
                      <div className="question-number">
                        {`Question ${questionIndex + 1}/${
                          forms.find((form) => form._id === formId).questions
                            .length
                        }`}
                      </div>
                    </div>
                    <ul>
                      {question.options.map((option, optionIndex) => (
                        <li key={optionIndex}>
                          <label>
                            <input
                              type={
                                question.questionType === "single-choice"
                                  ? "radio"
                                  : "checkbox"
                              }
                              name={question.questionText}
                              value={option}
                              checked={responses[questionIndex]?.includes(
                                option
                              )}
                              onChange={() =>
                                handleResponseChange(questionIndex, optionIndex)
                              }
                            />
                            {option}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              )}
          </div>
          <div className="navigation-buttons">
            <Button type="primary" onClick={prevQuestion}>
              Previous
            </Button>
            <Button type="primary" onClick={nextOrSubmit}>
              {currentQuestionIndex ===
              forms.find((form) => form._id === formId).questions.length - 1
                ? "Submit"
                : "Next"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppContent;
