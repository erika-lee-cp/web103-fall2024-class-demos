import { Link } from 'react-router-dom'
import '../css/DestinationCard.css'

const DestinationCard = (props) =>  {
  return (
      <div className='DestinationCard' style={{ backgroundImage:`url(${props.img_url})`}}>
        <div className='card-info'>
          <h2 className='destination'>{props.destination}</h2>
          <p className='description'>{props.description}</p>
         <Link to={'add/'+ props.id}><button className='addToTripBtn'>+ Add to Trip</button></Link>
        </div>
      </div>
  )
}

export default DestinationCard
