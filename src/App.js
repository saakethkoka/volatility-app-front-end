import './App.css'
import MainDash from './components/MainDash/MainDash';
import Sidebar from './components/Sidebar';
import {get_data} from "./api";
import {useState, useEffect} from "react";


function App() {

    const [data, setData] = useState({});

    useEffect(() => {
        get_data(3000, 2000, 1000).then(
            new_data => {
                setData(new_data);
            }
        );
    }, []);



  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar props={setData}/>
        <MainDash props={data}/>
      </div>
    </div>
  );
}

export default App;
