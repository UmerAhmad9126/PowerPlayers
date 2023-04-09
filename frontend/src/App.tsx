import AllRoutes from './AllRoutes/AllRoutes';
import './App.css';
import Game from './Pages/Game';


interface Props {
  numPlayers: number;
}
function App() {
 
  
  return (
    <div className="App">

  

      <AllRoutes />

    </div>
  );
}

export default App;
