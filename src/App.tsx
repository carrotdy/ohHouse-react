import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Main from "./views/Main";
import { AuthProvider } from "./views/context/AuthProvider";
import { Layout } from "./views/layouts/Layout";
import { ScrollToTop } from "./views/components/Common";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1000,
});

const App: React.FC = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const minWidth = isMobile ? {} : { minWidth: 1440 };

  return (
    <BrowserRouter>
      <RecoilRoot>
        <AuthProvider>
          <Layout {...minWidth}>
            <ScrollToTop />
            <Main />
          </Layout>
        </AuthProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
