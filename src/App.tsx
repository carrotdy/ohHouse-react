import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Main from "./Main";
import { ScrollToTop } from "./components/Common";
import { AuthProvider } from "./context/AuthProvider";
import { Layout } from "./layouts/Layout";

AOS.init({
  duration: 1000,
});

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <AuthProvider>
          <Layout>
            <ScrollToTop />
            <Main />
          </Layout>
        </AuthProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
