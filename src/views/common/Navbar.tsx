import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RoutePath } from "../RoutePath";
import { Color } from "../constants/style/Color";
import { MainLogoPNG } from "../images/png";
import { Mobile, Tablet } from "../utils/CssUtil";

const Navbar = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
	  navigate(RoutePath.회사소개.path);
    } catch (error) {
      console.error("logout error:", error);
    }
  };

  return (
    <NavContainer>
      <Nav>
        <Logo
          src={MainLogoPNG}
          onClick={() => {
            navigate(RoutePath.회사소개.path);
          }}
        />
        <NavItemsContainer>
          <StyeldLink to="/">회사소개</StyeldLink>
          <StyeldLink to="/views/team-culture">팀문화</StyeldLink>
          <StyeldLink to="/views/careers">채용</StyeldLink>
          {user && (
            <>
              <StyeldLink to="/views/welfare">복지몰</StyeldLink>
              <StyeldLink to="/views/cart">장바구니</StyeldLink>
            </>
          )}
          {user ? (
            <Button type="button" onClick={handleSignOut}>
              로그아웃
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => {
                navigate(RoutePath.로그인.path);
              }}
            >
              로그인
            </Button>
          )}
        </NavItemsContainer>
      </Nav>
    </NavContainer>
  );
};

const Nav = styled.div({
  display: "flex",
  justifyContent: "space-between",
  height: "85px",
  maxWidth: "1400px",
  margin: "auto",
  padding: "0 100px",
  ...Tablet({
    padding: "0 45px",
  }),
  ...Mobile({
    padding: "0 20px",
    height: "65px",
  }),
});

const NavContainer = styled.div({
  position: "fixed",
  width: "100%",
  zIndex: 10,
  backgroundColor: Color.Gray10,
});

const NavItemsContainer = styled.div({
  display: "flex",
  alignItems: "center",
});

const StyeldLink = styled(Link)({
  fontSize: "16px",
  fontWeight: "bold",
  marginLeft: "26px",
  cursor: "pointer",
  color: Color.Gray80,
  textDecorationLine: "none",
  ...Mobile({
    fontSize: "10px",
    marginLeft: "12px",
  }),
});

const Logo = styled.img({
  width: "80px",
  height: "70px",
  alignSelf: "center",
  cursor: "pointer",
  ...Mobile({
    width: "56px",
    height: "50px",
  }),
});

const Button = styled.button`
  background: ${Color.MainClolor};
  color: ${Color.Gray10};
  border: none;
  padding: 12px 16px;
  border-radius: 5px;
  margin-left: 26px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.5s ease;

  &:hover {
    background: ${Color.Orange};
  }

  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 10px;
    margin-left: 12px;
  }
`;

export default Navbar;
