import React, { useState } from 'react';
import './App.css';
import { Rowma } from 'rowma_js';
//import Rowma from './rowma.js';

function App() {

  const [rowma, setRowma] = useState('');
  const [selectedRobot, setSelectedRobot] = useState('');
  const [robotUuids, setRobotUuids] = useState('');
  const [rostopics, setRostopics] = useState('');


  const getRowmaConnectionList = async () => {
    const _rowma = new Rowma()
    setRowma(_rowma)

    const robotList = await rowma.currentConnectionList()

    console.log(robotList)
    //const robot = robotList.data[0] // Chose a connection
    setRobotUuids(robotList.data.map((robot) => robot.uuid));
    console.log(robotUuids)

    //const socket = await rowma.connect()

    //const command = 'my_utility rviz.launch'
    //rowma.runLaunch(socket, robot, command)
  }

  const printSelectedRobot = async (event) => {
    console.log(event.target.value)
    setSelectedRobot(event.target.value)
    await rowma.getRobotStatus(event.target.value).then((res) => {
      //setRobot(res.data)
      //setRosnodes(res.data.rosnodes)
      //setRosrunCommands(res.data.rosrunCommands);
      //setRoslaunchCommands(res.data.launchCommands);
      setRostopics(res.data.rostopics)
      console.log(res.data.rostopics)
      //setConnectButtonLoading(false);
    })
  }

  /*
  const consoleLogs = async () => {
    console.log(selectedRobot)
    console.log(rostopics)
  }
  */

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getRowmaConnectionList}>Rowma Connect</button>
        <br></br>
        <div>
          Select Your Robot{"'"}s UUID
        </div>
        {(!robotUuids || (robotUuids && robotUuids.length === 0)) &&
          <p>Robot not found...</p>
        }
        {robotUuids && robotUuids.map(uuid => {
          return (
            <div onChange={printSelectedRobot}>
              <input type="radio" name="robotname" value={uuid}></input>{uuid}
            </div>
          )
        })}
        <br></br>
        <div>Topic List of {selectedRobot}</div>
        {rostopics && rostopics.map(topic => {
          return (
            <div>
              {topic}
            </div>
          )
        })}
      </header>
    </div>
  );
}

export default App;
