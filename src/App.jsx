import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faBatteryThreeQuarters, faCar, faPlug, faBars, faCog, faSolarPanel } from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {
  const [alldata, setAlldata] = useState([]);
  const icons = [faSun, faPlug, faBatteryThreeQuarters, faCar];

  // Fetch data on initial render
  useEffect(()=> {
    fetchData();
  }, []);

  // Fetch data function
  async function fetchData() {
    try {
      const data = await getData();
      setAlldata(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Function to fetch data from API
  async function getData() {
    const getURL = "http://localhost:7000/api/getdata";
    const res = await fetch(getURL);
    return await res.json();
  }

  function calculateTotal(data) {
    const solarItem = data.find(item => item.name === 'Solar');
    
    if (!solarItem || typeof solarItem.power !== 'number') {
        return 0;
    }
    
    const consumptionData = data.filter(item => item.name !== 'Solar');
    
    const totalConsumption = consumptionData.reduce((total, item) => {
        if (typeof item.power === 'number') {
            return total + item.power;
        }
        return total;
    }, 0);
    
    const totalSolarPower = solarItem.power - totalConsumption;
    
    return totalSolarPower;
  }

  // Function to format datetime
  function formatDateTime(datetime) {
    const datePart = datetime.slice(0, 10); 
    const timePart = datetime.slice(10, 15); 

    const formattedDateTime = `${timePart} ${datePart}`;
    return formattedDateTime;
  }

  // Get datetime value
  const datetime = alldata.length > 0 ? alldata[0].datetime : '';

  return (
    <>
      <div className='menus'>
        <div className='menusButtons'> 
          <button><FontAwesomeIcon icon={faBars} /> MENU</button>
          <button> <FontAwesomeIcon icon={faCog} /> SETTING</button>  
        </div>
        <div className='right-aligned'>{formatDateTime(datetime)}</div>
      </div>
      
      <main>
        <div className='mainpanel'>
          <div className="arrowicon">
            <strong><span>&gt;&gt;&gt;</span></strong>
          </div>
          <div className="left-section">
            {alldata.slice(0, 1).map((item, index) => (
              <div key={index} className="icon-button orange-button">
                <div style={{display:'flex', justifyContent:'space-between', alignContent:'center'}}>
                  <FontAwesomeIcon icon={faSolarPanel} className="solar" />
                  <FontAwesomeIcon icon={icons[0]} className="icon" />
                  <p style={{fontSize: '36px'}}>{item.name}</p>
                </div>
                <p style={{fontSize: '36px'}}><span style={{fontSize: '120px'}}><strong>{item.power}</strong></span> kW</p>
              </div>
            ))}
            
          </div>
          <div className="right-section">
            <div className='consumers'>
              {alldata.slice(1).map((item, index) => (
                <div key={index} className="icon-button blue-button">
                  <div style={{display:'flex', justifyContent:'space-between', alignContent:'center'}}>
                    <FontAwesomeIcon icon={icons[index + 1]} className="icon" />
                    <p style={{fontSize: '28px'}}>{item.name}</p>
                  </div>
                  <p style={{fontSize: '18px'}}><span style={{fontSize: '70px'}}><strong>{item.power}</strong></span> kW</p>
                </div>
              ))}
            </div>
            <div className="summary icon-button">
              <p className='summaryData'><strong>Current Total Power is <span className='totalnum'>{calculateTotal(alldata)} kW.</span></strong></p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
