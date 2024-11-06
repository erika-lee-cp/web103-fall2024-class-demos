import { useState, useEffect } from 'react'
import Card from '../components/Card'

const ReadTrips = (props) => {

    const [trips, setTrips] = useState([])
    
    useEffect(() => {
        setTrips(props.data)
    }, [props])
    
    return (
        <div className='ReadTrips'>
            {
                trips && trips.length > 0 ?
                trips.map((trip, index) => 
                   <Card
                        key={trip.id} 
                        id={trip.id} 
                        title={trip.title} 
                        description={trip.description} 
                        img_url={trip.img_url} 
                        num_days={trip.num_days}
                        start_date={trip.start_date}
                        end_date={trip.end_date}
                        total_cost={trip.total_cost}
                    />
                ) : <h3 className='noResults'>{'No Trips Yet 😞'}</h3>
            }
        </div>  
    )
}

export default ReadTrips
