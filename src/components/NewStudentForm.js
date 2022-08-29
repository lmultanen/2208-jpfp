import React from "react";
import { useDispatch } from "react-redux";
import { createStudent } from "../store/studentsReducer";

const NewStudentForm = () => {
    const dispatch = useDispatch();

    const blankForm = {
        firstName: '',
        lastName: '',
        imageUrl: '',
        email: '',
        gpa: 0.0
    }

    const [form, setForm] = React.useState(blankForm);

    const handleSubmit = (event) => {
        event.preventDefault();
        let submissionForm = removeEmptyProps();
        // may need to change this later
        submissionForm.gpa = Number(submissionForm.gpa)
        dispatch(createStudent(submissionForm));
        setForm(blankForm)
    }

    const handleChange = props => event => {
        setForm({
          ...form,
          [props]: event.target.value
        })
    }

    const removeEmptyProps = () => {
        let newForm = {};
        Object.keys(form).forEach(key => {
            if (form[key].length) {
                newForm[key] = form[key]
            }
        })
        return newForm;
    }

    const checkDisabled = () => {
        return (!form.lastName.length || !form.firstName.length || !form.email.length)
    }

    return(
        <div id='form-container'>
            <h1>Add New Student Below:</h1>
            <form id='student-form' onSubmit={(handleSubmit)}>
                <label htmlFor='firstName'>
                    First Name
                    <span className='warning'>{form.firstName.length ? '' : 'Field required'}</span>
                </label>
                <input name='firstName' value={form.firstName} onChange={handleChange('firstName')}/>

                <label htmlFor='lastName'>
                    Last Name
                    <span className='warning'>{form.lastName.length ? '' : 'Field required'}</span>
                </label>
                <input name='lastName' value={form.lastName} onChange={handleChange('lastName')}/>

                <label htmlFor='email'>
                    Email
                    <span className='warning'>{form.email.length ? '' : 'Field required'}</span>
                </label>
                <input name='email' value={form.email} type='email' onChange={handleChange('email')}/>

                <label htmlFor='imageUrl'>Student Picture Url</label>
                <input name='imageUrl' value ={form.imageUrl} type='url' onChange={handleChange('imageUrl')}/>

                <label htmlFor='gpa'>GPA</label>
                <input name='gpa' value={form.gpa} type='number' step='0.01' min='0.0' max='4.0' onChange={handleChange('gpa')}/>

                <button type='submit' disabled={checkDisabled()}>Create New Student</button>

            </form>
        </div>
    )

}

export default NewStudentForm;