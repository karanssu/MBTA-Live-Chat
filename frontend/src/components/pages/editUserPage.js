import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import getUser from "../../utilities/decodeJwt";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const EditUserPage = () => {
    const [user, setUser] = useContext(UserContext);
    const url = REACT_APP_API_URL + "/user/editUser";
    const navigate = useNavigate();

    // form validation checks
    const [errors, setErrors] = useState({});
    const findFormErrors = () => {
        const { username, email, password } = form;
        const newErrors = {};
        // username validation checks
        if (!username || username === "")
            newErrors.name = "Input a valid username";
        else if (username.length < 6)
            newErrors.name = "Username must be at least 6 characters";
        // email validation checks
        if (!email || email === "")
            newErrors.email = "Input a valid email address";
        if (!/\S+@\S+\.\S+/.test(email))
            newErrors.email = "Input a valid email address";
        // password validation checks
        if (!password || password === "")
            newErrors.password = "Input a valid password";
        else if (password.length < 8)
            newErrors.password = "Password must be at least 8 characters";
        return newErrors;
    };

    // initialize form values and get userId on render
    const [form, setValues] = useState({
        userId: "",
        username: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        if (user) {
            setValues({
                userId: user.id,
                username: user.username,
                email: user.email,
            });
        }
    }, [user]);

    // handle form field changes
    const handleChange = ({ currentTarget: input }) => {
        setValues({ ...form, [input.id]: input.value });
        if (!!errors[input])
            setErrors({
                ...errors,
                [input]: null,
            });
    };

    // handle form submission with submit button
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            try {
                const { data: res } = await axios.post(url, form);
                const { accessToken } = res;
                //store token in localStorage
                localStorage.setItem("accessToken", accessToken);
                setUser(getUser());
                navigate("/");
            } catch (error) {
                if (
                    error.response &&
                    error.response.status != 409 &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    window.alert(error.response.data.message);
                }
                if (error.response && error.response.status === 409) {
                    setErrors({ name: "Username is taken, pick another" });
                }
            }
        }
    };

    // handle cancel button
    const handleReset = (async) => {
        navigate("/profile");
    };

    return (
        <div>
            <Card
                body
                outline
                color="success"
                className="mx-1 my-2"
                style={{ width: "30rem" }}
            >
                <Card.Title>Edit User Information</Card.Title>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter new username"
                                id="username"
                                value={form.username}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter new email address"
                                id="email"
                                value={form.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter new password"
                                id="password"
                                value={form.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Row>
                            <Col>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                                <Button
                                    variant="primary"
                                    type="cancel"
                                    onClick={handleReset}
                                >
                                    Reset
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default EditUserPage;
