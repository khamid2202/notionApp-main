import './App.css'
import Department1 from './DepartmentComponents/Department1'
import Department2 from './DepartmentComponents/Department2'
import Department3 from './DepartmentComponents/Department3'
function App() {
  return (
    <div className='flex flex-col space-y-4'>
      <Department1 />
      <Department2 />
      <Department3 />
    </div>
  )
}

export default App
