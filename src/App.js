import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import SignUp from './pages/signUp/SignUp';
import { CartProvider } from './components/ContextReducer';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <CartProvider>
      <SnackbarProvider>
        <Router>
          <div>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signUp' element={<SignUp />} />
            </Routes>
          </div>
        </Router>
      </SnackbarProvider>
    </CartProvider>
  );
}

export default App;
