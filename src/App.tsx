import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './views/Main';
import { Layout } from './views/layouts/Layout';

const App: React.FC = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const minWidth = isMobile ? {} : { minWidth: 1440 }

  return (
    <BrowserRouter>
      <Layout {...minWidth}>
        <Main />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
