import './App.css';
import Game from './Pages/Game';


interface Props {
  numPlayers: number;
}
function App() {
 
  
  return (
    <div className="App">
      <Game numPlayers={3} />
    </div>
  );
}

export default App;
