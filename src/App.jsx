import './App.css';
import { DeteriorationContext } from './Context/Context';
import Desgastes from './pages/Desgastes';

function App() {
  return (
    <>
    <DeteriorationContext>
      <div className="App">
        <Desgastes/>
      </div>
    </DeteriorationContext>
    </>
  );
}

export default App;
