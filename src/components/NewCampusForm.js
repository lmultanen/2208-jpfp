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
        let sumbissionForm = removeEmptyProps()
        dispatch(createCampus(sumbissionForm))
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
            <h1>Add New Campus Below:</h1>
            <form id='campus-form' onSubmit={handleSubmit}>
                <label htmlFor='name'>Campus Name</label>
                <input name='name' value={form.name} onChange={handleChange('name')}/>

                <label htmlFor='imageUrl'>Campus Picture Url</label>
                <input name='imageUrl' value={form.imageUrl} type='url' onChange={handleChange('imageUrl')}/>

                <label htmlFor='description'>Description</label>
                <input name='description' value={form.description} onChange={handleChange('description')}/>

                <label htmlFor='address'>Address</label>
                <input name='address' value={form.address} onChange={handleChange('address')}/>

                <button type='submit' disabled={checkDisabled()}>Create New Campus</button>
            </form>
        </div>
    )
        // add checks to button to disable it if name or address empty
}

export default NewCampusForm;