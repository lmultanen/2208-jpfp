import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleStudent, updateSingleStudent} from "../store/singleStudentReducer";
import { updateStudent } from "../store/studentsReducer";

const UpdateStudentForm = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const [form, setForm] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        gpa: 0
    })
    const student = useSelector(state => state.singleStudent)

    React.useEffect(() => {
        //duplicating code with SingleStudent component; probably unneccessary
        //don't think I need to unmount though, since SingleStudent already taking care of that
        dispatch(fetchSingleStudent(params.id));
        setForm(student);
    },[student.firstName])
    //maybe should look at the todos solution code for how to properly edit

    //does it make more sense to have updateStudent be in the singleStudentReducer?
    const handleSubmit = (event) => {
        event.preventDefault();
        let submissionForm = {...form};
        // may need to change this later
        submissionForm.gpa = Number(submissionForm.gpa)
        dispatch(updateSingleStudent(submissionForm));
        dispatch(updateStudent(submissionForm))
    }

    const handleChange = props => event => {
        setForm({
          ...form,
          [props]: event.target.value
        })
    }

    const checkDisabled = () => {
        return (!form.lastName.length || !form.firstName.length || !form.email.length)
    }
    
    return( student.firstName ?
        <div id='form-container'>
            <h1>Update Student Information:</h1>
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

                <button type='submit' disabled={checkDisabled()}>Update Student</button>

            </form>
        </div> 
        : <></>
    )
}

export default UpdateStudentForm;

