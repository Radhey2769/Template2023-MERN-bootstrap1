import React from 'react'
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';



// Sign In form.js 
// Yup is used for validation in forms 




const SignIn = () => {

  const SigninSchema = Yup.object().shape({
    // name: Yup.string()
    //   .min(2, 'Too Short!')
    //   .max(50, 'Too Long!')
    //   .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(5, 'Too Short!').required('Required')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a special character'),
    //   confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Required')
  });


  const signinForm = useFormik({
    initialValues: {
      email: '',
      password: '',


    },

    onSubmit: async (values, { resetForm }) => {
      // alert(JSON.stringify(values));
      console.log(values);


      // send request to backend/REST API
      const response = await fetch('http://localhost:5000/user/add', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'

        }

      });

      console.log(response.status);
      console.log(response.statusText);

      if (response.status === 200) {

        enqueueSnackbar('Signed In Successfully', { variant: 'success' });
      }
      else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }

      // resetForm();
      // toast.success('Form Submitted Successfully');

    },
    validationSchema: SigninSchema

  });


  return (
    <section className=" sign-bg vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 mb-5 mx-1 mx-md-4 mt-4">
                      Sign In
                    </p>
                    <form className="mx-1 mx-md-4" onSubmit={signinForm.handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            onChange={signinForm.handleChange}
                            value={signinForm.values.email}
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="form3Example3c">
                            Your Email
                          </label>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            onChange={signinForm.handleChange}
                            value={signinForm.values.password}
                            className="form-control"
                          />
                          <label className="form-label" htmlFor="form3Example4c">
                            Password
                          </label>
                        </div>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          defaultValue=""
                          id="form2Example3c"
                        />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
};
export default SignIn;
