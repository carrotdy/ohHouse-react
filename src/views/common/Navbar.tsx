import { Link } from "react-router-dom";
import styled from 'styled-components';
import { MainLogoPNG } from '../images';
import { Color } from '../statics/Color';
import { Mobile, Tablet } from '../utils/CssUtil';

const Navbar = () => {
    return (
        <NavContainer>
            <Nav>
                <Logo src={MainLogoPNG} />
                <NavItemsContainer>
                    <StyeldLink to="/views/ceoGreeting">회사소개</StyeldLink>
                    <StyeldLink to="/views/ceoGreeting">팀문화</StyeldLink>
                    <StyeldLink to="/views/ceoGreeting">채용</StyeldLink>
                    <StyeldLink to="/views/ceoGreeting">사람들</StyeldLink>
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
    padding: "0 135px",
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
    fontSize: "15px",
    fontWeight: "700",
    marginLeft: "60px",
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