import { BrowserRouter } from "react-router-dom";
import Main from "./views/Main";
import { Layout } from "./views/layouts/Layout";
import "./views/styles/views/Index.scss";
import { RecoilRoot } from "recoil";

const App: React.FC = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const minWidth = isMobile ? {} : { minWidth: 1440 };

  return (
    <BrowserRouter>
      <RecoilRoot>
        <Layout {...minWidth}>
          <Main />
        </Layout>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
