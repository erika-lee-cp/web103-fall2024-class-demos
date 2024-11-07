import '../css/DestinationBtn.css'

const DestinationBtn = (props) =>  {
  return (
    <button className='DestinationBtn' id={props.id}>{props.destination}</button>
  )
}

export default DestinationBtn
