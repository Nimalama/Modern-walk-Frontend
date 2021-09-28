
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Header from './Header/Header';
import Body from './Body/Body';
import Footer from './Footer/Footer';
import {BrowserRouter as Router} from 'react-router-dom';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import './style.css'




function App() {
  return (
    <ToastProvider placement="top-center">
      <Router>
        <div className="App">
      
          <Header></Header>
          <Body></Body>

          <Footer></Footer>
        </div>
      </Router>
    </ToastProvider>
   

  );
}

export default App;
