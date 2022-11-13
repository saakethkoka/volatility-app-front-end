import './App.css'
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import {get_data} from "./api";
import {useEffect} from "react";

function App() {

    useEffect(() => {
        get_data(1000, 1000, 1000).then(
            res => {
                sessionStorage.setItem("data", JSON.stringify(res));
            }
        );
    }, []);



  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
      </div>
    </div>
  );
}

export default App;
