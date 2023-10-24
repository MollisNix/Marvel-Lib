import './App.scss';
import { Home } from '../assets/Home/Home';
import { ComicsPage } from '../assets/Comics/ComicsPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  return (
   <>

  <Router>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='comics' Component={ComicsPage} />
      </Routes>
    </Router>
   

   </>
  )
}

export default App;
