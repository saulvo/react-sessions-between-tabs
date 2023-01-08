import './app.css';
import { useSharingSession } from './use-sharing-session';
declare global {
  interface Window {
    memoryStorage: any;
  }
}

function App() {
  const { session, refresh } = useSharingSession();

  return (
    <div className='app'>
      <div className='box'>
        <p className='title'>Memory Storage:</p>
        <code>{session || 'Empty'}</code>
        <button
          className='btn btn-info'
          onClick={() => {
            window.memoryStorage = {
              firstName: 'Saul',
              lastName: 'Vo',
            };
            refresh();
          }}>
          Set data
        </button>
        <button
          className='btn btn-danger'
          onClick={() => {
            window.memoryStorage = {};
            refresh();
          }}>
          Clear data
        </button>
      </div>
    </div>
  );
}

export default App;
