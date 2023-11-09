import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RoutePath } from "../RoutePath";
import { Color } from "../constants/style/Color";
import { MainLogoPNG } from "../assets/images/png";
import { NavbarModel } from "../constants/model/NavbarModel";
import { Mobile, Tablet } from "../utils/CssUtil";

const Navbar = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const Pages: Array<NavbarModel.INavbar> = [
    {
      key: "/",
      label: "회사소개",
    },
    {
      key: "/team-culture",
      label: "팀문화",
    },
    {
      key: "/careers",
      label: "채용",
    },
    {
      key: "/welfare",
      label: "복지몰",
    },
    {
      key: "/cart",
      label: "장바구니",
    },
  ];

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate(RoutePath.IntroCompany.path);
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
            navigate(RoutePath.IntroCompany.path);
          }}
        />
        <NavItemsContainer>
          {Pages.map((menu: NavbarModel.INavbar) => {
            if (!user && (menu.key === "/welfare" || menu.key === "/cart")) {
              return null;
            }

            return (
              <StyledLink key={menu.key} to={menu.key}>
                {menu.label}
              </StyledLink>
            );
          })}
          {user ? (
            <Button type="button" onClick={handleSignOut}>
              로그아웃
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => {
                navigate(RoutePath.Login.path);
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

const NavContainer = styled.div({
  position: "fixed",
  width: "100%",
  zIndex: 10,
  backgroundColor: Color.Gray10,
});

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  height: 85px;
  max-width: 1400px;
  margin: auto;
  padding: 0 100px;

  ${Tablet({
    padding: "0 45px",
  })}
  ${Mobile({
    padding: "0 20px",
    height: "65px",
  })}
`;

const NavItemsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  font-size: 16px;
  font-weight: bold;
  margin-left: 26px;
  cursor: pointer;
  color: ${Color.Gray80};
  text-decoration: none;

  ${Mobile({
    fontSize: "10px",
    marginLeft: "12px",
  })}
`;

export const Logo = styled.img`
  width: 80px;
  height: 70px;
  align-self: center;
  cursor: pointer;

  ${Mobile({
    width: "56px",
    height: "50px",
  })}
`;

export const Button = styled.button`
  background: ${Color.MainColor};
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
    font-size: 9px;
    margin-left: 10px;
  }
`;

export default Navbar;
