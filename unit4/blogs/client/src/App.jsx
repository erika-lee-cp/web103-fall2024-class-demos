import { useRoutes } from 'react-router-dom'
import NavBar from './components/NavBar'
import AllPosts from './pages/AllPosts'
import EditPost from './pages/EditPost'
import NewPost from './pages/NewPost'

const App = () => {
    let element = useRoutes([
        {
            path: '/',
            element: <AllPosts />
        },
        {
            path: '/edit/:id',
            element: <EditPost />
        },
        {
            path: '/create',
            element: <NewPost />
        }
    ])

    return (
        <div className='app-main'>
            <header>
                <NavBar />
            </header>

            {element}
        </div>
    )
}

export default App
