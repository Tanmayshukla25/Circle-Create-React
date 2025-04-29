import { useState } from 'react'
import colors from './BackGroundColor'
import { useEffect } from 'react';



function App() {

  const [circle,setCircle]=useState([]);
  const [undo,setUndo]=useState([]);
  const [redo,setRedo]=useState([]);

  function handelCircle(e) {
           const obj={
               id:Date.now(),
              x: e.clientX -9,
              y: e.clientY -56,
              backgroundColor:colors[Math.floor(Math.random()*colors.length)],
            };
            setCircle([...circle,obj]);
  }

  function UndoCircle() {
    if (circle.length === 0) return;
  
    const newCircles = [...circle];
    const lastCircle = newCircles.pop();
  
    setCircle(newCircles);
    setUndo([...undo, lastCircle]);
  }
  function RedoCircle() {
    if (undo.length === 0) return;
  
    const newUndo = [...undo];
    const circleToRedo = newUndo.pop();
  
    setUndo(newUndo);
    setCircle([...circle, circleToRedo]);
  }

  function resetCircle() {
    setCircle([])
    setUndo([])
    setRedo([])
  }

  useEffect(() => {
    function handleKeyDown (e){
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        UndoCircle();
      } else if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        RedoCircle();
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [circle, undo]);


  
  return (
    <>

    <div className='buttons'>
      <button disabled={!circle.length} id="btn"onClick={UndoCircle}>Undo</button>
      <button disabled={!undo.length} id="btn"onClick={RedoCircle}>Redo</button>
      <button disabled={!circle.length} id="btn"onClick={resetCircle}>Reset</button>

    </div>
    <div className='CircleDiv' onClick={handelCircle}>

      {
        circle.length>0 &&circle.map((obj)=>{
          return(
            <div key={obj.id}
            className='circle'
            style={{backgroundColor:obj.backgroundColor,
              left:obj.x,
              top:obj.y
            }}></div>
          )
        })
      }

    </div>
    </>
  )
}

export default App
