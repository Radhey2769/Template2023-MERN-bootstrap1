import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { toast } from 'react-hot-toast';
import { enqueueSnackbar } from 'notistack';
import  { MDBInput } from 'mdb-react-ui-kit';

// create tournament form.js


const CreateTournament = () => {

    const CreateTournamentSchema = Yup.object().shape({
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


    const createtournamentForm = useFormik({
        initialValues: {
            name: '',
            cover: '',
            location: '',
            schedule: ''

        },

        onSubmit: async (values, { resetForm }) => {
            // alert(JSON.stringify(values));
            console.log(values);


            // send request to backend/REST API
            const response = await fetch('http://localhost:5000/tournament/add', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'

                }

            });

            console.log(response.status);
            console.log(response.statusText);

            if (response.status === 200) {

                enqueueSnackbar('Tournament Created Successfully', { variant: 'success' });
            }
            else {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            }

            // resetForm();
            // toast.success('Form Submitted Successfully');

        },
        validationSchema: CreateTournamentSchema

    });

    return (
        <div>
            <div className="container mt-4 mb-4" onSubmit={createtournamentForm.handleSubmit}>
                <div className="card">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card-body">
                                <form className='new-bg mt-4 vh-80'>
                                    {/* 2 column grid layout with text inputs for the first and last names */}
                                    <div className="row mb-4">
                                        <div className="col fw-bold">
                                            <div data-mdb-input-init="" className="form-outline">
                                                <MDBInput label='Title' id='title' type='text' />
                                                onChange={createtournamentForm.handleChange}
                                                values={createtournamentForm.values.title}
                                            </div>
                                        </div>

                                    </div>
                                    {/* Text input */}
                                    <div>
                                    <div data-mdb-input-init="" className="form-outline mb-4">
                                            {/* onChange={createtournamentForm.handleChange}
                                            // values={createtournamentForm.values.name} */}
                                        
                                    <MDBInput label='Create Tournament' id='tournament' type='text' />
                                        
                                          onChange={createtournamentForm.handleChange}
                                          values={createtournamentForm.values.CreateTournament}  
                                        </div>
                                    </div>
                                    {/* Text input */}

                                    <div>
                                    <div data-mdb-input-init="" className="form-outline mb-4">
                                    <MDBInput label='Players' id='players' type='text' />
                                    onChange={createtournamentForm.handleChange}
                                    values={createtournamentForm.values.players}
                                        </div>
                                    </div>

                                    {/* Email input */}
                                    <div data-mdb-input-init="" className="form-outline mb-4">
                                        <div>
                                        <MDBInput label='Location' id='location' type='text' />
                                        onChange={createtournamentForm.handleChange}
                                        values={createtournamentForm.values.location}
                                        </div>
                                    </div>

                                    {/* Number input */}
                                    <div data-mdb-input-init="" className="form-outline mb-4">
                                       <div>
                                        <MDBInput label='Schedule' id='schedule' type='number' />
                                        onchange={createtournamentForm.handleChange}
                                        values={createtournamentForm.values.schedule}
                                       </div>
                                    </div>

                                    {/* Message input */}
                                    <div data-mdb-input-init="" className="form-outline mb-4">
                                        <div>
                                        <MDBInput label='Description' id='description' type='text' />
                                        onchange={createtournamentForm.handleChange}
                                        values={createtournamentForm}
                                        </div>
                                    </div>
                                    
                                    {/* Checkbox */}
                                    <div className="form-check d-flex justify-content-center mb-4">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            defaultValue=""
                                            id="form6Example8"
                                            defaultChecked=""
                                        />
                                        <label className="form-check-label" htmlFor="form6Example8">
                                            {" "}
                                            Create an account?{" "}
                                        </label>

                                    </div>
                                    {/* Submit button */}
                                    <button
                                        data-mdb-ripple-init=""
                                        type="button"
                                        className="btn btn-primary mb-4 text-center"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 create-tour-bg"></div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default CreateTournament;
