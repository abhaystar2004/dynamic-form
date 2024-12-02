"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

type Field = {
  name: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
};

type FormConfig = {
  fields: Field[];
};

const formConfigs: { [key: string]: FormConfig } = {
  "User Information": {
    fields: [
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
      { name: "age", type: "number", label: "Age", required: false },
    ],
  },
  "Address Information": {
    fields: [
      { name: "street", type: "text", label: "Street", required: true },
      { name: "city", type: "text", label: "City", required: true },
      {
        name: "state",
        type: "dropdown",
        label: "State",
        options: ["California", "Texas", "New York"],
        required: true,
      },
      { name: "zipCode", type: "text", label: "Zip Code", required: false },
    ],
  },
  "Payment Information": {
    fields: [
      {
        name: "cardNumber",
        type: "text",
        label: "Card Number",
        required: true,
      },
      {
        name: "expiryDate",
        type: "date",
        label: "Expiry Date",
        required: true,
      },
      { name: "cvv", type: "password", label: "CVV", required: true },
      {
        name: "cardholderName",
        type: "text",
        label: "Cardholder Name",
        required: true,
      },
    ],
  },
};

const Notification = ({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out 
      ${
        type === "success" ? "bg-green-500 opacity-70 text-white" : "bg-red-500 opacity-70 text-white"
      }`}
    >
      {message}
    </div>
  );
};

const DynamicForm = () => {
  const [selectedForm, setSelectedForm] = useState<string>("User Information");
  const [formFields, setFormFields] = useState<Field[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [submittedData, setSubmittedData] = useState<any[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [progress, setProgress] = useState<number>(0);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchFormConfig = () => {
      const config = formConfigs[selectedForm];
      setFormFields(config.fields);
      setFormData({});
      setErrors({});
      setProgress(0);
    };
    fetchFormConfig();
  }, [selectedForm]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    validateField(name, value);
    updateProgress(updatedFormData);
  };

  const validateField = (name: string, value: any) => {
    const field = formFields.find((f) => f.name === name);
    if (field?.required && !value) {
      setErrors((prev) => ({ ...prev, [name]: `${field.label} is required` }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const updateProgress = (data: { [key: string]: any }) => {
    const totalRequired = formFields.filter((f) => f.required).length;
    const completedRequired = formFields.filter(
      (f) => f.required && data[f.name]
    ).length;
    setProgress((completedRequired / totalRequired) * 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: { [key: string]: string } = {};
    formFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        validationErrors[field.name] = `${field.label} is required`;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setNotification({
        message: "Please fill in all required fields",
        type: "error",
      });
      return;
    }
    setSubmittedData([
      ...submittedData,
      { ...formData, formType: selectedForm },
    ]);
    setFormData({});
    setProgress(0);
    setNotification({
      message: "Form submitted successfully!",
      type: "success",
    });
  };

  const handleEdit = (index: number) => {
    const data = submittedData[index];
    setSelectedForm(data.formType);
    setFormData(data);
    setSubmittedData(submittedData.filter((_, i) => i !== index));
  };

  const handleDelete = (index: number) => {
    setSubmittedData(submittedData.filter((_, i) => i !== index));
    setNotification({ message: "Entry deleted successfully", type: "success" });
  };

  return (
    <main className="h-full w-full">
      <Navbar />
      <Image
        src="gradient-image.svg"
        alt="bg"
        height={2160}
        width={3840}
        className="bg-cover fixed -z-10 w-full h-full object-cover"
      />
      <div className="p-4 max-w-3xl mx-auto min-h-screen flex flex-col justify-center">
        <div className="bg-white/10 mt-[10%] text-black backdrop-filter backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Dynamic Form</h1>
          <div className="mb-4">
            <label className="block mb-2">Select Form Type:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
            >
              {Object.keys(formConfigs).map((formType) => (
                <option key={formType} value={formType}>
                  {formType}
                </option>
              ))}
            </select>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formFields.map((field) => {
                const value = formData[field.name] || "";
                return (
                  <div key={field.name}>
                    <label className="block mb-1">
                      {field.label}
                      {field.required && " *"}
                    </label>
                    {field.type === "dropdown" ? (
                      <select
                        name={field.name}
                        value={value}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={value}
                        onChange={handleInputChange}
                        className="w-full p-2 border bg-gray-200 shadow-inner border-gray-300 rounded"
                      />
                    )}
                    {errors[field.name] && (
                      <span className="text-red-500">{errors[field.name]}</span>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="w-full bg-gray-200 opacity-80 rounded-md h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-md"
                style={{ width: `${progress}%` }}
                ></div>
                
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
          {submittedData.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <h2 className="text-xl font-bold mb-4">Submitted Data</h2>
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  {submittedData.map((data, index) => (
                    <tr
                      key={index}
                      className="flex flex-col hover:bg-gray-100 border-b"
                    >
                      {Object.entries(data).map(([key, value]) => (
                        <td
                          key={key}
                          className="p-2 border-b border-gray-300 block"
                          data-label={key}
                        >
                          <span className="font-bold mr-2">{key}: </span>
                          {String(value)}
                        </td>
                      ))}
                      <td
                        className="p-2 border-b border-gray-300 block"
                        data-label="Actions"
                      >
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 w-full"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="p-1 bg-red-500 text-white rounded hover:bg-red-600 w-full"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
      <Footer />
    </main>
  );
};

export default DynamicForm;
