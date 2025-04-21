import logo from './logo.svg';
import './App.css';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import StarCanvas from './components/StarCanvas';
import StarCanvasContainer from './components/StarCanvasContainer';

function App() {

  return (
    <div className="App">
      <Topbar />
      <StarCanvasContainer />
      <Footer />
    </div>
  );
}

export default App;
