import './App.css';
import Topbar from './Topbar';
import Main from './Main/Main.js';
import Login from './Login.js'

function App() {
  return (
    <div className="Fullpage">
      <Topbar />
      <Main />
      <Login />
    </div>
  );
}

export default App;
