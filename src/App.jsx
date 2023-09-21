import logo from './logo.svg';
import './App.css';
import Navbar from './shared/Navbar';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Navbar></Navbar>
      </div>
    </Provider>
  );
}

export default App;
