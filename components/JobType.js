import { useState } from "react";
import EditingContainer from "./EditingContainer";
import JobInfoFields from "./JobInfoFields";
import { useFormContext } from "@/contexts/FormContext";

const JobType = ({
  country,
  description,
  positionRef,
  jobTypeRef,
  descriptionRef,
  cityRef,
  countryRef,
  setPosition,
  setCity,
  setCountry,
  setJobtype,
  setDescription,
  customQuestions,
  setCustomQuestions
}) => {
 

  const addQuestion = () => {
    setCustomQuestions([...customQuestions, ""]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = customQuestions.filter((_, i) => i !== index);
    setCustomQuestions(updatedQuestions);
  };

  const updateQuestion = (index, value) => {
    const updatedQuestions = [...customQuestions];
    updatedQuestions[index] = value;
    setCustomQuestions(updatedQuestions);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <JobInfoFields
          country={country}
          positionRef={positionRef}
          jobTypeRef={jobTypeRef}
          cityRef={cityRef}
          countryRef={countryRef}
          setPosition={setPosition}
          setCity={setCity}
          setCountry={setCountry}
          setJobtype={setJobtype}
        />
        <EditingContainer
          description={description}
          descriptionRef={descriptionRef}
          setDescription={setDescription}
        />
        <div
          style={{
            background: "#f8f7fc",
            padding: "1.5rem",
            borderRadius: "2rem",
            marginTop: "2rem",
          }}
        >
          {customQuestions.map((question, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <input
                type="text"
                value={question}
                onChange={(e) => updateQuestion(index, e.target.value)}
                placeholder={`Custom Question ${index + 1}`}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "1px solid #ccc",
                  borderRadius: "400px",
                  backgroundColor: "#f8f7fc",
                }}
              />
              <button
                onClick={() => removeQuestion(index)}
                style={{
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "400px",
                  cursor: "pointer",
                  background: "#ff4d4d",
                  color: "white",
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addQuestion}
            style={{
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "400px",
              cursor: "pointer",
              background: "#6137db",
              color: "white",
            }}
          >
            Add Question
          </button>
        </div>
      </div>
    </>
  );
};

export default JobType;
