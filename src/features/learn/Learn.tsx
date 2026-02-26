
import { Link } from 'react-router-dom';


export const Learn = () => {

  return (
    <div>
      <div><Link to="problemsConcept" style={{color:"blue"}}>{"Problems And Concepts with Coding"}</Link></div>
      <div><Link to="jsconcept" style={{color:"blue"}}>{"JS Concepts with Console output"}</Link></div>
    </div>
  )
}
