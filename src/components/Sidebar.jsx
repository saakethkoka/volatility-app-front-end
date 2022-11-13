import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material/'
import {get_data} from "../api";



function Sidebar(props){

  let [cash, setCash] = useState("");
  let [bonds, setBonds] = useState("");
  let [stocks, setStocks] = useState("");
  let [error, setError] = useState(false);

  useEffect(() => {

  });

  const handleSubmit = (e) => {
      // cast integer to cash:
      get_data(parseInt(cash), parseInt(bonds), parseInt(stocks)).then(
          new_data => {
              props.props(new_data);
              setCash("");
              setBonds("");
              setStocks("");
          }
      );
  }

  const formStyle = {padding: 20, height: '50vh', width: 290, margin: "20px auto"}
  const textStyle = {margin: "10px auto"}



  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  //const [cash, setCash] = useState(0);

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        {/*<img src={Logo} alt="logo" />*/}
        <span className="logoFont">
          {/*N<span>I</span>LE*/}
        </span>
      </div>

      <div className="UserForm" style={formStyle}>
        <h5 className="FormDesc">Provide Your Desired Portfolio Allocation For Each Type of Investment:</h5>
                <TextField
                    label = "Cash"
                    value={cash}
                    error={error}
                    fullWidth required
                    onChange={ e => setCash(e.target.value) }
                    style = {textStyle}
                />
                <TextField
                    label = "Treasury Bonds"
                    value={bonds}
                    error={error}
                    fullWidth required
                    onChange={ e => setBonds(e.target.value) }
                    style = {textStyle}
                />
                <TextField
                    label = "Stocks"
                    value={stocks}
                    error={error}
                    fullWidth required
                    onChange={ e => setStocks(e.target.value) }
                    style = {textStyle}
                />
                
                <Button
                    type = "submit"
                    color = "primary"
                    variant='contained'
                    fullWidth
                    onClick={e => handleSubmit(e)}
                >
                    Analyse Risk
                </Button>
      </div>

      
    </motion.div>
    </>
  );
};

export default Sidebar;
