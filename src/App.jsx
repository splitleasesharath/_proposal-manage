import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ProposalManagePage from './pages/ProposalManagePage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/_proposal-manage" element={<ProposalManagePage />} />
          <Route path="/" element={<ProposalManagePage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
