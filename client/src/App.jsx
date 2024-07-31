import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './Create';
import Read from './Read';
import Edit from './Edit';

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Home/>} exact/>
        <Route path='/create' element ={<Create/>}/>
        <Route path='/read/:id' element ={<Read/>}/>
        <Route path='/edit/:id' element ={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
