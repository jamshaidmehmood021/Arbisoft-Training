import './App.css';
import Dashboard from './Dashboard';
import ErrorBoundary from './ErrorBoundary';
import { Suspense } from 'react';


function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Suspense errorInfo= "Error occured in Dashboard">
          <Dashboard/>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
