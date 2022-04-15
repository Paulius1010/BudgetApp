
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';

function App() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className='row'>
        <div className='row col-8 ps-4'>
          <div className='col-12 mt-4'><Navbar /></div>
          <p>Some content</p>
        </div>
          <div className='col-4'>
          <SideBar />
          </div>
      </div>
      
    </>
  );
}

export default App;
