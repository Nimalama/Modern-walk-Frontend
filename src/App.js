
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Header from './Header/Header';
import Body from './Body/Body';
import Footer from './Footer/Footer';
import {BrowserRouter as Router} from 'react-router-dom';
import './style.css'




function App() {
  return (
    <Router>
       <div className="App">
    
    <Header></Header>
    <Body></Body>

    <Footer></Footer>
  </div>
    </Router>
   

  );
}

export default App;
