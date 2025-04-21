import logo from './logo.svg';
import './App.css';
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import StarCanvas from './components/StarCanvas';

function App() {
  return (
    <div className="App">
      <Topbar />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <StarCanvas />
      <Footer />
    </div>
  );
}

export default App;
