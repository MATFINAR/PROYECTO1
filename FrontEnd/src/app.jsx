import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loggin from './page/pageLoggin';
import Page404 from './page/pageCallback';
import { DashBoard } from './page/pageDashboard';

function App () {
  return(
    <Router>
      <Routes>
          <Route exact path='/' element={<Loggin/>}/>
          <Route exact path='/dashboard' element={<DashBoard/>}/>
          <Route exact path='*' element={<Page404/>}/>
        </Routes>
    </Router>
  );
};

export default App;