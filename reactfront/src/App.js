import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompShowProducts from './components/ShowProducts';
import CompShowHeader from './components/ShowHeader';
import CompShowFooter from './components/ShowFooter';
import CompShowLogin from './components/ShowLogin';
import CompShowRegister from './components/ShowRegister';
import Admin from './components/Admin';
import { StoreContextProvider } from './context/store-context';

function App() {

  return (
    <StoreContextProvider>
      <div className='App'>

        <BrowserRouter>
          <Routes>

            <Route path='/' element={  
              <>
              <header>
                <CompShowHeader />         
              </header>

              <div className='main-container'>
                <CompShowProducts />
              </div>
              <CompShowFooter />
              </> 
      
            } />

            <Route path='/login' element= { <CompShowLogin /> } />

            <Route path='/register' element= { <CompShowRegister /> } />

            <Route path='/admin' element= { <Admin /> }/>

          </Routes>
        </BrowserRouter>
      </div>
    </StoreContextProvider>
  );
}

export default App;
