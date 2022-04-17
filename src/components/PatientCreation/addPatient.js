import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, InputNumber } from "antd";
const { TextArea } = Input;

function AddPatient() {
  let history = useHistory();
  

  if (!localStorage.getItem("login")){
    history.push("/login");
  }
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    diagnosis: "",
    exercises: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });


  const onFinish = async (values) => {
    let item = {
      diagnosis: [],
      exercises: []
    };
    item.diagnosis = values.diagnosis.split(',');
    item.exercises = values.exercises.split(',');
    item["email"] = values.email;
    item["password"] = "healthcare";
    item["firstName"] = values.firstName;
    item["lastName"] = values.lastName;
    item["phone"] = values.phone;
    item["address"] = values.address;
    item["city"] = values.city;
    item["state"] = values.state;
    item["country"] = values.country;
    item["pincode"] = values.pincode;
    setUser(item);
    
    await axios.post("http://localhost:3003/patient", item);
    history.push("/dashboard/doctor");

  };

  return (
    <div id="contact" className="block contactBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Add Patient to your Portal</h2>
          <p>Authorize the creation of New Patient Account</p>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Email Address" />
          </Form.Item>
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please enter your first name!",
              },
            ]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please enter your last name!",
              },
            ]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter your phone number!",
              },
              {
                pattern: /^(?:\d*)$/,
                message: "Value should contain just number"
              },
              {
                pattern: /^.{10,10}$/,
                message: "Phone should be 10 character long"
              },
            ]}
          >
            <Input maxLength="10" placeholder="Phone" />
          </Form.Item>
          <Form.Item
            name="diagnosis"
            rules={[
              {
                required: true,
                message: "Please enter your diagnosis name with comma separated!",
              },
            ]}
          >
            <Input placeholder="Diagnosis with comma separated" />
          </Form.Item>
          <Form.Item
            name="exercises"
            rules={[
              {
                required: true,
                message: "Please enter your recommended exercises with comma separated!",
              },
            ]}
          >
            <Input placeholder="Recommended exercises with comma separated" />
          </Form.Item>
          <Form.Item name="address">
            <TextArea placeholder="Address" />
          </Form.Item>
          <Form.Item name="city">
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item name="state">
            <Input placeholder="State" />
          </Form.Item>
          <Form.Item name="country">
            <Input placeholder="Country" />
          </Form.Item>
          <Form.Item
            name="pincode"
            rules={[
              {
                required: true,
                message: "Please enter your pincode!",
              },
              {
                pattern: /^(?:\d*)$/,
                message: "Value should contain just number"
              },
              {
                pattern: /^.{6,6}$/,
                message: "Pincode should be 6 character long"
              },
            ]}
          >
            <Input maxLength="6" placeholder="Pincode" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default AddPatient;
