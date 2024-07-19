import './App.css';
import Dashboard from './Dashboard';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
    </div>
  );
}

export default App;
