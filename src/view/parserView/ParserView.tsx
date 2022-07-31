import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {postParserSend} from "../../shared/request/gumtree.req";
import {Loader} from "../../components/loader/Loader";
import excelFile from "../../shared/excelFile/excelFile";
import {Formik} from "formik";
import {validationFileSchema} from "../../modules/validation/schema";
import {ErrText} from "../../components/errText/ErrText";
import "./style.scss";
import {ErrModal} from "../../components/errModal/ErrModal";

const initialValue = {
    path: "",
    filename: ""
}

export const ParserView = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [showErr, setShoeErr] = useState(false);
    const [errorText, setErrorText] = useState("");

    const showLoaderHandle = React.useCallback((show: boolean) => setShowLoader(show), [])
    const showErrHandle = React.useCallback((show: boolean) => setShoeErr(show), [])
    const errTextHandle = React.useCallback((text: string) => setErrorText(text), [])


    const onSubmit = React.useCallback(({path, filename}: typeof initialValue) => {
        showLoaderHandle(true);

        postParserSend({path})
            .then((data) => excelFile(data.data.users, filename))
            .catch((err) => {
                showErrHandle(true);
                errTextHandle(err.response.data.err);
            })
            .finally(() => showLoaderHandle(false))
    }, [showLoaderHandle, showErrHandle, errTextHandle]);

    return (
        <>
            <div className="parser">
                <Formik
                    validationSchema={validationFileSchema}
                    onSubmit={onSubmit}
                    initialValues={initialValue}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          values,
                          handleBlur,
                          errors,
                          isValid,
                          touched
                      }) => (
                        <Form onSubmit={handleSubmit} className="parser__formContainer">
                            <div className="parser__inputContainer">
                                <Form.Label className="parser__inputLabel">Path</Form.Label>
                                <InputGroup
                                    className={`mb-3 ${errors.path && touched.path ? `parser__errInput` : ""}`}>
                                    <InputGroup.Text id="basic-addon3">https://www.gumtree.com</InputGroup.Text>
                                    <Form.Control id="urlPath"
                                                  aria-describedby="basic-addon3"
                                                  type="text"
                                                  name="path"
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  value={values.path}
                                                  required
                                    />
                                </InputGroup>
                                {errors.path && touched.path && <ErrText text={errors.path}/>}
                            </div>
                            <div className="parser__inputContainer">
                                <Form.Label className="parser__inputLabel">File name</Form.Label>
                                <InputGroup
                                    className={`mb-3 ${errors.filename && touched.filename ? `parser__errInput` : ""}`}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Specify file name"
                                        name="filename"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.filename}/>
                                </InputGroup>
                                {errors.filename && touched.filename && <ErrText text={errors.filename}/>}
                            </div>
                            <button
                                className="parser__submitBtn"
                                disabled={!isValid}
                                type="submit">Start
                            </button>
                        </Form>)}
                </Formik>
            </div>
            <Loader showSpinner={showLoader}/>
            <ErrModal text={errorText} showModal={showErr} closeModal={() => showErrHandle(false)}/>
        </>
    );
};
