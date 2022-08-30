import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCampuses } from "../store/campusesReducer";
import { fetchSingleStudent } from "../store/singleStudentReducer";
import { updateStudent } from "../store/studentsReducer";

const UpdateStudentForm = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const [form, setForm] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        imageUrl: '',
        gpa: '0.0'
    })
    const student = useSelector(state => state.singleStudent)
    const campuses = useSelector(state => state.campuses)

    React.useEffect(() => {
        //duplicating code with SingleStudent component; probably unneccessary
        //don't think I need to unmount though, since SingleStudent already taking care of that
        setForm(student);
    },[])

    React.useEffect(() => {
        dispatch(fetchCampuses());
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();
        let selectedCampus = getSelectedCampus();
        dispatch(updateStudent(form, selectedCampus))
        dispatch(fetchSingleStudent(params.id))
    }

    const getSelectedCampus = () => {
        let selectedCampusName = document.getElementById('campus-select').value
        if (selectedCampusName === 'Unenrolled') {
            return null;
        } else {
            return campuses.find(campus => campus.name === selectedCampusName)
        }
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

                <label htmlFor='campus'>Campus</label>
                <select id='campus-select' defaultValue={student.campus ? student.campus.name : 'Unenrolled'}>
                    {student.campus ? <></> : <option>Unenrolled</option>}
                    {campuses.map((campus,idx) => <option key={idx}>{campus.name}</option>)}
                </select>

                <button type='submit' disabled={checkDisabled()}>Update Student</button>

            </form>
        </div> 
        : <></>
    )
}

export default UpdateStudentForm;

