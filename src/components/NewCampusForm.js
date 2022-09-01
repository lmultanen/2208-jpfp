import React from "react";
import { useDispatch } from "react-redux";
import { createCampus } from "../store/campusesReducer";

const NewCampusForm = () => {
    const dispatch = useDispatch()

    const blankForm = {
        name: '',
        imageUrl: '',
        description: '',
        address: ''
    }

    const [form, setForm] = React.useState(blankForm)

    const handleSubmit = (event) => {
        event.preventDefault();
        let submissionForm = removeEmptyProps()
        dispatch(createCampus(submissionForm))
        setForm(blankForm);
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

    const handleChange = props => event => {
        setForm({
          ...form,
          [props]: event.target.value
        })
    }

    const checkDisabled = () => {
        return (!form.address.length || !form.name.length);
    }
    
    return(
        <div id='form-container'>
            <h1>Add New Campus:</h1>
            <form id='campus-form' onSubmit={handleSubmit}>
                <label htmlFor='name'>
                    Campus Name
                    <span className='warning'>{form.name.length ? '' : 'Field required'}</span>
                </label>
                <input name='name' value={form.name} onChange={handleChange('name')}/>

                <label htmlFor='address'>
                    Address
                    <span className='warning'>{form.address.length ? '' : 'Field required'}</span>
                </label>
                <input name='address' value={form.address} onChange={handleChange('address')}/>

                <label htmlFor='imageUrl'>Campus Picture Url</label>
                <input name='imageUrl' value={form.imageUrl} type='url' onChange={handleChange('imageUrl')}/>

                <label htmlFor='description'>Description</label>
                <textarea rows='4' name='description' value={form.description} onChange={handleChange('description')}/>

                <button className="submit-button" type='submit' disabled={checkDisabled()}>Create New Campus</button>
            </form>
        </div>
    )
}

export default NewCampusForm;