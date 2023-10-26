import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { MainLogoPNG } from '../images';
import { Color } from '../statics/Color';
import { Mobile, Tablet } from '../utils/CssUtil';
import { RoutePath } from "../RoutePath";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <NavContainer>
            <Nav>
                <Logo
                    src={MainLogoPNG}
                    onClick={() => {
                        navigate(RoutePath.회사소개.path)
                    }}
                />
                <NavItemsContainer>
                    <StyeldLink to="/">회사소개</StyeldLink>
                    <StyeldLink to="/views/team-culture">팀문화</StyeldLink>
                    <StyeldLink to="/views/careers">채용</StyeldLink>
                    <StyeldLink to="/views/welfare">복지몰</StyeldLink>
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
        padding: "0 65px",
    }),
    ...Mobile({
        padding: "0 20px",
        height: "65px",
    }),
})

const NavContainer = styled.div({
    position: "absolute",
    width: "100%",
    zIndex: 10,
    color: Color.Gray10,
})

const NavItemsContainer = styled.div({
    display: "flex",
    alignItems: "center",
});

const StyeldLink = styled(Link)({
    fontSize: "16px",
    fontWeight: "bold",
    marginLeft: "54px",
    cursor: "pointer",
    color: Color.Gray80,
    textDecorationLine: "none",
    ...Mobile({
        fontSize: "12px",
        marginLeft: "12px",
    })
});

const Logo = styled.img({
    width: "240px",
    height: "60px",
    alignSelf: "center",
    cursor: "pointer",
    ...Mobile({
        width: "130px",
        height: "32px",
    })
});

export default Navbar;