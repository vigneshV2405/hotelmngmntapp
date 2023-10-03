import logo from './logo.svg';
import './App.css';
import Navbar from './shared/Navbar';
import { Provider } from 'react-redux';
import { store } from './store';
import Hotels from './features/hotels/Hotels';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from './shared/firebase';
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

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
