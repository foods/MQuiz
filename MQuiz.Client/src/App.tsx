import './App.css';
import Router from './Router';
import { Provider } from 'react-redux';
import { store } from './shared/state/appStore';

const App = () => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
};

export default App;
