import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/homepage'
import TaskForm from './pages/TaskForm'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <div className='container mx-auto px-10'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App