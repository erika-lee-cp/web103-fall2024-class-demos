import {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import ActivityBtn from '../components/ActivityBtn'
import DestinationBtn from '../components/DestinationBtn'
import '../css/TripDetails.css'

const TripDetails = ( { data } ) => {

    const { id } = useParams()
    const [activities, setActivities] = useState([])
    const [destinations, setDestinations] = useState([])
    const [trip, setTrip] = useState({
        id: 0,
        title: '',
        description: '',
        img_url: '',
        num_days: 0,
        start_date: '',
        end_date: '',
        total_cost: 0.0
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
                end_date: result.end_date.slice(0,10),
                total_cost: result.total_cost
            })
        }
    }, [data, id])

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await fetch('/api/activities/' + id)
            const data = await response.json()
            setActivities(data)
        }

        const fetchDestinations = async () => {
            const response = await fetch('/api/trips-destinations/destinations/' + id)
            const data = await response.json()
            setDestinations(data)
        }

        fetchActivities()
        fetchDestinations()
    }, [data, id])

    return (
        <div className='out'>
            <div className='flex-container'>

                <div className='left-side'>
                    <h3>{trip.title}</h3>
                    <p>{'🗓️ Duration: ' + trip.num_days + ' days'}</p>
                    <p>{'🛫 Depart: ' + trip.start_date}</p>
                    <p>{'🛬 Return: ' + trip.end_date}</p>
                    <p>{trip.description}</p>
                </div>

                <div className='right-side' style={{ backgroundImage:`url(${trip.img_url})`}}>
                </div>
            </div>

            <div className='flex-container'>
                <div className='activities'>
                    {
                        activities && activities.length > 0 ?
                        activities.map((activity, index) => 
                            <ActivityBtn
                                key={activity.id}
                                id={activity.id}
                                activity={activity.activity}
                                num_votes={activity.num_votes}
                            />
                        ) : ''
                    }
                    <br/>
                    <Link to={'../../activity/create/' + id}><button className='addActivityBtn'>+ Add Activity</button></Link>
                </div>

                <div className='destinations'>
                    {
                        destinations && destinations.length > 0 ?
                        destinations.map((destination, index) => 
                            <DestinationBtn
                                key={destination.id}
                                id={destination.id}
                                destination={destination.destination}
                            />
                        ) : ''
                    }
                    <br/>
                    <Link to={'../../destination/new/' + id}><button className='addDestinationBtn'>+ Add Destination</button></Link>
                </div>
            </div>
            
        </div>
            


    )
}

export default TripDetails
