import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import '../css/EditTrip.css'

const EditTrip = ( { data } ) => {

    const { id } = useParams()
    const [trip, setTrip] = useState({
        id: 0,
        title: '',
        description: '',
        img_url: '',
        num_days: 0,
        start_date: '',
        end_date: '', total_cost: 0.0
    })

    useEffect(() => {
        const result = data.filter(item => item.id === parseInt(id))[0]

        if (result) {
            setTrip({
                id: parseInt(result.id),
                title: result.title,
                description: result.description,
                img_url: result.img_url,
                num_days: parseInt(result.num_days),
                start_date: result.start_date.slice(0, 10),
                end_date: result.end_date.slice(0, 10),
                total_cost: result.total_cost
            })
        }
    }, [data, id])

    const handleChange = (event) => {
        const { name, value } = event.target

        setTrip((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    
    const updateTrip = (event) => {
        event.preventDefault()

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trip)
        }

        fetch('/api/trips/' + id, options)
        window.location.href = '/'
    }

    const deleteTrip = (event) => {
        event.preventDefault()

        const options = {
            method: 'DELETE'
        }

        fetch('/api/trips/' + id, options)
        window.location.href = '/'
    }

    return (
        <form>
            <label>Title</label> <br />
            <input type='text' id='title' name='title' value={trip.title} onChange={handleChange}/><br />
            <br/>

            <label>Description</label><br />
            <textarea rows='5' cols='50' id='description' name='description' value={trip.description} onChange={handleChange}></textarea>
            <br/>

            <label>Image URL</label><br />
            <input type='text' id='img_url' name='img_url' value={trip.img_url} onChange={handleChange}/><br />
            <br/>

            <label>Number of Days</label><br />
            <input type='number' id='num_days' name='num_days' value={trip.num_days} onChange={handleChange}/><br />
            <br/>

            <label>Start Date</label><br />
            <input type='text' id='start_date' name='start_date' value={trip.start_date} onChange={handleChange}/><br />
            <br/>

            <label>End Date</label><br />
            <input type='text' id='end_date' name='end_date' value={trip.end_date} onChange={handleChange}/><br />
            <br/>

            <label>Total Cost</label><br />
            <input type='text' id='total_cost' name='total_cost' value={trip.total_cost} onChange={handleChange}/><br />
            <br/>

            <input type='submit' value='Submit' onClick={updateTrip} />
            <button className='deleteButton' onClick={deleteTrip}>Delete</button>
        </form>
    )
}

export default EditTrip
