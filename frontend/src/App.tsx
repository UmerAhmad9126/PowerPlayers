import AllRoutes from "./AllRoutes/AllRoutes";
import "./App.css";
import Game from "./Pages/Game";
import io, { Socket } from "socket.io-client";
const socket = io("http://localhost:8080");

interface Props {
  numPlayers: number;
}
const App: React.FC = () => {
  return (
    <div className="App">
      <AllRoutes socket={socket} />
    </div>
  );
};

export default App;
