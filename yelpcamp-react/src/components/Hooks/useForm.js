import { useState } from "react";

const useForm = (logicToServer, initialValues) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitData = async (userData) => {
    const response = await logicToServer(userData);
    setSubmitting(false);
    if (response === 500) {
      setSubmitError(response.data);
    }
    return response;
  };

  return {
    submitting,
    setSubmitting,
    submitError,
    setSubmitError,
    submitData,
    values,
    setValues,
    handleInputChange,
  };
};

export default useForm;
