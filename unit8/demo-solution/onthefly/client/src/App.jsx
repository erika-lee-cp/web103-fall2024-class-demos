import { useState, useEffect } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import ReadTrips from './pages/ReadTrips'
import CreateTrip from './pages/CreateTrip'
import EditTrip from './pages/EditTrip'
import CreateDestination from './pages/CreateDestination'
import ReadDestinations from './pages/ReadDestinations'
import TripDetails from './pages/TripDetails'
import CreateActivity from './pages/CreateActivity'
import AddToTrip from './pages/AddToTrip'
import Login from './pages/Login'
import './App.css'

const App = () => {
  
  const [trips, setTrips] = useState([])
  const [destinations, setDestinations] = useState([])
  const [user, setUser] = useState([])
  const API_URL = 'http://localhost:3001'

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${API_URL}/auth/login/success`, { credentials: 'include' } )
      const json = await response.json()
      setUser(json.user)
    }

    const fetchTrips = async () => {
      const response = await fetch(`${API_URL}/api/trips`)
      const data = await response.json()
      setTrips(data)
    }

    const fetchDestinations = async () => {
      const response = await fetch(`${API_URL}/api/destinations`)
      const data = await response.json()
      setDestinations(data)
    }

    getUser()
    fetchTrips()
    fetchDestinations()
  }, [])

  const logout = async () => {
    const url = `${API_URL}/auth/logout`
    const response = await fetch(url, { credentials: 'include' })
    const json = await response.json()
    window.location.href = '/'
  }

  let element = useRoutes([
    {
      path: '/',
      element: user && user.id ?
        <ReadTrips user={user} data={trips} /> : <Login api_url={API_URL} />
    },
    {
      path: '/trip/new',
      element: user && user.id ?
        <CreateTrip user={user} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: '/edit/:id',
      element: user && user.id ?
        <EditTrip user={user} data={trips} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: '/destinations',
      element: user && user.id ?
        <ReadDestinations user={user} data={destinations} /> : <Login api_url={API_URL} />
    },
    {
      path: '/trip/get/:id',
      element: user && user.id ?
        <TripDetails user={user} data={trips} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: '/destination/new/:trip_id',
      element: user && user.id ?
        <CreateDestination user={user} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: '/activity/create/:trip_id',
      element: user && user.id ?
        <CreateActivity user={user} api_url={API_URL} /> : <Login api_url={API_URL} />
    },
    {
      path: '/destinations/add/:destination_id',
      element: user && user.id ?
        <AddToTrip user={user} data={trips} api_url={API_URL} /> : <Login api_url={API_URL} />
    }
  ])

  return ( 
    <div className='App'>
      {
          user && user.id ?
              <div className='header'>
                  <h1>On The Fly ✈️</h1>
                  <Link to='/'><button className='headerBtn'>Explore Trips</button></Link>
                  <Link to='/destinations'><button className='headerBtn'>Explore Destinations</button></Link>
                  <Link to='/trip/new'><button className='headerBtn'> + Add Trip </button></Link>
                  <button onClick={logout} className='headerBtn'>Logout</button>
              </div>
          : <></>
      }

      {element}
    </div>
  )
}

export default App
