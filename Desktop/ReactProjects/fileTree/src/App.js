import React, {useState} from 'react';

function App() {
  return <div>
    <Folder name="Desktop">
        <Folder name="Music">
          <File name="Rapgod.mp3"/>
          <File name="Till I collapse.mp3"/> 
          </Folder> 
          <Folder name="Travel in 2021">
          <Places name="US"/>
          <Places name="Germany"/> 
          </Folder> 
        <File name="App.js"/>
        <File name="hasan.jpg"/>
    </Folder>

    <Folder name="Applications"/>
    <Folder name="Goals"/>

  </div>
}


const Folder = (props) => {
 // {/*Destructiring the array js  */}
  const [isOpen, setIsOpen] = useState(true);
  const {name, children} = props;
  const borderStyle = {border: '2px solid blue'};
  const direction = isOpen ? 'down' : 'right';
  const folderState= isOpen ? 'open' : '';

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return <div style = {borderStyle}>    
   {/* if handleClick() called it'll call the return value of the function*/}
  <span onClick={handleClick}>
    <i className={`folder ${folderState} icon`}></i>
    <i className={`caret ${direction} icon`}></i>
    </span> 
  {name}

  {/* (if isOpen true show children which is files on desktop, if not)null */}
  <div style  = {{margin: '15px'}}>
  {isOpen ? children : null}
  </div>
  </div>

};
const File = (props) => {
  const {name} = props;
  const fileExt = name.split('.')[1];
  const fileStyle = {border: '2px solid black', margin: '18px'};
  //mappings
  const fileIcons = {
    jpg: 'file image', 
    mp3: 'headphones'
  };

  return <div style = {fileStyle}>
    <i className={`${fileIcons[fileExt]} icon`}></i>
    {name}
    </div>
};

const Places = (props) => {
  const {name} = props;
   return <div style = {{margin: '15px'}}>
    <i className="globe icon"></i>
    {name}
    </div>
}

export default App;
