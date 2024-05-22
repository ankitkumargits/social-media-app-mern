import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";


const Form = () => {

    const registerSchema = yup.object().shape({
        firstName: yup.string().required("required."),
        lastName: yup.string().required("required."),
        email: yup.string().email("invalid email.").required("required."),
        password: yup.string().required("required."),
        location: yup.string().required("required."),
        occupation: yup.string().required("required."),
        picture: yup.string().required("required."),
    });

    const loginSchema = yup.object().shape({
        email: yup.string().email("invalid email.").required("required."),
        password: yup.string().required("required."),
    });

    const [registerData, setRegisterData] = useState({ register: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        location: "",
        occupation: "",
        picture: "",
    } });


    const [loginData, setLoginData] = useState({ login: {
        email: "",
        password: ""
    } });

    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async(values, onSubmitProps) => {
        // this allow us to send form info with image
        const formData = new FormData();
        for (let value in values){
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);

        try{
            const savedUserResponse = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                body: formData
            });

            const savedUser = await savedUserResponse.json();
            if (savedUser.error) {
                throw new Error(savedUser.error || "Something went wrong.");
            }
            onSubmitProps.resetForm();
            if (savedUser) {
                setPageType("login");
            }
        }catch(err){
            alert(err.message);
        }
    }

    const login = async(values, onSubmitProps) => {
        try {
            const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            });

            if (!loggedInResponse.ok) {
                const errorResponse = await loggedInResponse.json();
                throw new Error(errorResponse.error || "Something went wrong.");
            }

            const loggedIn = await loggedInResponse.json();
            onSubmitProps.resetForm();
            if (loggedIn) {
                dispatch(setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                }));
                navigate("/home");
            }
        } catch (err) {
            alert(err.message);
        }
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if( isLogin ) await login(values, onSubmitProps);
        if( isRegister ) await register(values, onSubmitProps);
    }

    return (
        <>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={isLogin ? loginData.login : registerData.register}
                validationSchema={isLogin ? loginSchema : registerSchema}
            >
                {({ 
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm
                }) => (
                    <form
                        onSubmit={handleSubmit}
                    >
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": {
                                    gridColumn: isNonMobile ? undefined : "span 4"
                                }
                            }}
                        >
                            {
                                isRegister && (
                                    <>
                                        <TextField
                                            label="First Name"
                                            name="firstName"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.firstName}
                                            error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                            helperText={touched.firstName && errors.firstName}
                                            sx={{
                                                gridColumn: "span 2"
                                            }}
                                        />
                                        <TextField
                                            label="last Name"
                                            name="lastName"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lastName}
                                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                            sx={{
                                                gridColumn: "span 2"
                                            }}
                                        />
                                        <TextField
                                            label="Location"
                                            name="location"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.location}
                                            error={Boolean(touched.location) && Boolean(errors.location)}
                                            helperText={touched.location && errors.location}
                                            sx={{
                                                gridColumn: "span 4"
                                            }}
                                        />
                                        <TextField
                                            label="Occupation"
                                            name="occupation"
                                            type="text"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.occupation}
                                            error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                            helperText={touched.occupation && errors.occupation}
                                            sx={{
                                                gridColumn: "span 4"
                                            }}
                                        />
                                        <Box
                                            gridColumn="span 4"
                                            border={`1px solid ${palette.neutral.medium}`}
                                            borderRadius="5px"
                                            p="1rem"
                                        >
                                            <Dropzone
                                                acceptFiles=".jpg,.jpeg,.png"
                                                multiple={false}
                                                onDrop={(acceptFiles) => 
                                                    setFieldValue("picture", acceptFiles[0])
                                                }
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <Box
                                                        {...getRootProps()}
                                                        border={`2px dashed ${palette.primary.main}`}
                                                        p="1rem"
                                                        sx={{
                                                            "&:hover":{
                                                                cursor: "pointer"
                                                            }
                                                        }}
                                                    >
                                                        <input
                                                            {...getInputProps()}
                                                        />
                                                        {!values.picture ? (
                                                            <p>Add Picture Here</p>
                                                        ) : (
                                                            <FlexBetween>
                                                                <Typography>{values.picture.name}</Typography>
                                                                <EditOutlined/>
                                                            </FlexBetween>
                                                        )}
                                                    </Box>
                                                )}
                                            </Dropzone>
                                        </Box>
                                    </>
                                )
                            }
                            <TextField
                                label="Email"
                                name="email"
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                error={Boolean(touched.email) && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                sx={{
                                    gridColumn: "span 4"
                                }}
                            />
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                sx={{
                                    gridColumn: "span 4"
                                }}
                            />
                        </Box>

                        {/* BUTTONS SECTION */}
                        <Box>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": {
                                        color: palette.primary.main
                                    }
                                }}
                            >
                                { isLogin ? "LOGIN" : "REGISTER"}
                            </Button>
                            <Typography
                                onClick={() => {
                                    setPageType(isLogin ? "register" : "login");
                                    resetForm();
                                }}
                                sx={{
                                    textDecoration: "underline",
                                    color: palette.primary.main,
                                    "&:hover": {
                                        cursor: "pointer",
                                        color: palette.primary.light
                                    }
                                }}
                            >
                                { isLogin ? "Don't have an account? Sign up here.": "Already have an account? Login here."}
                            </Typography>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default Form;