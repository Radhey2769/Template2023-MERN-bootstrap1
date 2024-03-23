import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import React from 'react'
import toast from 'react-hot-toast';
import * as Yup from 'yup';




// SignUpForm.js




const Signup = () => {

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(5, 'Too Short!').required('Required')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a special character'),
    confirm: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Required')
  });



  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm: ''

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

        enqueueSnackbar('Registered Successfully', { variant: 'success' });
      }
      else {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      }

      // resetForm();
      // toast.success('Form Submitted Successfully');

    },
    validationSchema: SignupSchema

  });

  return (
    <section className="h-100 w-90 bg-dark signup-bg">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                    alt="Sample photo"
                    className="img-fluid"
                    style={{
                      borderTopLeftRadius: ".25rem",
                      borderBottomLeftRadius: ".25rem"
                    }}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">
                      Registration form
                    </h3>
                    <form onSubmit={signupForm.handleSubmit}>
                      <div className="row">
                        <div className="col-md-12 mb-4">
                          <div className="">
                            <label className="form-label" htmlFor="form3Example1m">
                              Full name
                            </label>
                            <input
                              type="text"
                              id="name"
                              onChange={signupForm.handleChange}
                              value={signupForm.values.name}
                              className="form-control form-control-lg"
                            />
                            {
                              signupForm.touched.name && (
                                <small className='text-danger'>{signupForm.errors.name}</small>
                              )
                            }
                          </div>
                        </div>

                      </div>
                      <div className="row">
                        <div className="col-md-12 mb-4">
                          <div className="">
                            <label className="form-label" htmlFor="form3Example1m1">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              onChange={signupForm.handleChange}
                              value={signupForm.values.email}
                              className="form-control form-control-lg"
                            />
                            {
                              signupForm.touched.email && (
                                <small className='text-danger'>{signupForm.errors.email}</small>
                              )
                            }
                          </div>
                        </div>
                        <div className="col-md-12 mb-4">
                          <div className="">
                            <label className="form-label" htmlFor="form3Example1n1">
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              onChange={signupForm.handleChange}
                              value={signupForm.values.password}
                              className="form-control form-control-lg"
                            />
                            {
                              signupForm.touched.password && (
                                <small className='text-danger'>{signupForm.errors.password}</small>
                              )
                            }
                          </div>
                        </div>
                        <div className="col-md-12 mb-4">
                          <div className="">
                            <label className="form-label" htmlFor="form3Example1n1">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              id="confirm"
                              onChange={signupForm.handleChange}
                              value={signupForm.values.confirm}
                              className="form-control form-control-lg"
                            />
                            {
                              signupForm.touched.confirm && (
                                <small className='text-danger'>{signupForm.errors.confirm}</small>
                              )
                            }
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end pt-3">
                        <button type="button" className="btn btn-light btn-lg">
                          Reset all
                        </button>
                        <button type="submit" className="btn btn-warning btn-lg ms-2">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Signup;
