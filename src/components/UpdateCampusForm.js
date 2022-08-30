import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateCampus } from "../store/campusesReducer";
import { fetchSingleCampus } from "../store/singleCampusReducer";

const UpdateCampusForm = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const [form, setForm] = React.useState({
        name: '',
        imageUrl: '',
        description: '',
        address: ''
    });
    const campus = useSelector(state => state.singleCampus);

    React.useEffect(() => {
        setForm(campus);
    },[]);

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateCampus(form))
        dispatch(fetchSingleCampus(params.id))
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

    return( campus.name ?
        <div id='form-container'>
            <h3>Edit Campus Info Below:</h3>
            <form id='campus-form' onSubmit={handleSubmit}>
                <label htmlFor='name'>
                    Campus Name
                    <span className='warning'>{form.name.length ? '' : 'Field required'}</span>
                </label>
                <input name='name' value={form.name} onChange={handleChange('name')}/>

                <label htmlFor='imageUrl'>Campus Picture Url</label>
                <input name='imageUrl' value={form.imageUrl} type='url' onChange={handleChange('imageUrl')}/>

                <label htmlFor='description'>Description</label>
                <input name='description' value={form.description} onChange={handleChange('description')}/>

                <label htmlFor='address'>
                    Address
                    <span className='warning'>{form.address.length ? '' : 'Field required'}</span>
                </label>
                <input name='address' value={form.address} onChange={handleChange('address')}/>

                <button className="submit-button" type='submit' disabled={checkDisabled()}>Update Campus</button>
            </form>
        </div>
        : <></>
    )

}

export default UpdateCampusForm;