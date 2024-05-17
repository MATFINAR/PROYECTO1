import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/components/loggin';
import Page404 from './page/pageCallback';
import { DashBoard } from './page/pageDashboard';

function App () {
  return(
    <Router>
      <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/dashboard' element={<DashBoard/>}/>
          <Route exact path='*' element={<Page404/>}/>
        </Routes>
    </Router>
  );
};

export default App;