import { React, useState } from "react";
import styled from "@emotion/styled";
// import axios from "axios";
import Cookies from "js-cookie";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  margin-top: 1rem;
  background: #e91e63;
  color: #fff;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: #d81c60;
    transform: scale(1.1);
  }

  &[disabled] {
    opacity: 0.7;
    pointer-events: none;
  }
`;
const inquirynow = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    groupName: "",
    email: "",
    phone: "",
    groupType: "",
    preferredDate: "",
    startTime: "",
    numGuests: "",
    howHeard: "",
    eventDetails: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const validateForm = () => {
    const errors = {};

    // Regular expressions for validation
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    } else if (!namePattern.test(formData.firstName)) {
      errors.firstName = "Invalid First Name";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    } else if (!namePattern.test(formData.lastName)) {
      errors.lastName = "Invalid Last Name";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      errors.email = "Invalid Email";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!phonePattern.test(formData.phone)) {
      errors.phone = "Invalid Phone number (10 digits)";
    }
    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const isValid = validateForm();
    if (isValid) {
      try {
        const token = Cookies.get("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        let res = await fetch("/api/inquiry", {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        let resJson = await res.json();

        if (res.status === 201 && resJson.message === "Inquiry submitted successfully!") {
          setSubmissionStatus("success");
          resetForm();
        } else {
          setSubmissionStatus("error");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmissionStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    setFormData(initialFormData);
    setFormErrors({});
  };
  return (
    <Container>
      <h1>Inquiry Form</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>First Name</Label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          {formErrors.firstName && <div>{formErrors.firstName}</div>}
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          {formErrors.lastName && <div>{formErrors.lastName}</div>}
        </FormGroup>
        <FormGroup>
          <Label>Group Name</Label>
          <Input
            type="text"
            name="groupName"
            value={formData.groupName}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email address</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {formErrors.email && <div>{formErrors.email}</div>}
        </FormGroup>
        <FormGroup>
          <Label>Phone</Label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          {formErrors.phone && <div>{formErrors.phone}</div>}
        </FormGroup>
        <FormGroup>
          <Label>Group Type</Label>
          <Input
            type="text"
            name="groupType"
            value={formData.groupType}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Preferred Date</Label>
          <Input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Start Time</Label>
          <Input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Number of Guests</Label>
          <Input
            type="number"
            name="numGuests"
            value={formData.numGuests}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>How did you hear about us?</Label>
          <Input
            type="text"
            name="howHeard"
            value={formData.howHeard}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Tell us more about your event</Label>
          <TextArea
            rows={5}
            name="eventDetails"
            value={formData.eventDetails}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <SubmitButton type="submit" disabled={isSubmitting}>
          Submit
        </SubmitButton>
        {submissionStatus === "success" && <div>Message Sent.</div>}
        {submissionStatus === "error" && <div>Message failed to send.</div>}
      </Form>
    </Container>
  );
};

export default inquirynow;
