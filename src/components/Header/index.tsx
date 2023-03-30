import DarkModeToggle from "react-dark-mode-toggle";
import { useDispatch, useSelector } from "react-redux";

import { AppStore } from "@/store/store";
import { toggleDarkMode } from "@/store/reducers/appReducer";
import GithubIcon from "@/assets/github.svg";

import {
  HeaderContainer,
  Title,
  GithubLink,
  HeaderIconsContainer,
} from "./styled";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: AppStore) => state.app.darkMode);

  return (
    <HeaderContainer>
      <Title>WeatherX</Title>
      <HeaderIconsContainer>
        <DarkModeToggle
          checked={isDarkMode}
          onChange={() => dispatch(toggleDarkMode())}
          size={60}
        />
        <GithubLink
          target="_blank"
          href="https://github.com/code-blooded-developer/weatherx"
        >
          <GithubIcon />
        </GithubLink>
      </HeaderIconsContainer>
    </HeaderContainer>
  );
};

export default Header;
