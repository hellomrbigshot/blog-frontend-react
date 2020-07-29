import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  height: 56px;
  line-height: 56px;
  background: ${(props) => props.theme['mainBg']};
  color: ${(props) => props.theme['mainColor']};
  position: fixed;
  display: flex;
  left: 0;
  right: 0;
  top: 0;
  z-index: 3;
  box-shadow: 0 1px 0 ${(props) => props.theme['header/boxShadowColor']};
  justify-content: center;
`

export const Logo = styled.div`
  position: absolute;
  left: 10px;
  width: 150px;
  height: 40px;
  top: 50%;
  transform: translateY(-50%);
  background: url(${(props) => props.theme['logo']});
  background-size: contain;
`

export const Nav = styled.div`
  width: 60%;
  height: 56px;
  line-height: 56px;
  display: flex;
  overflow: hidden;
`

export const SearchWrapper = styled.div`
  height: 56px;
  position: relative;
  @media (max-width: 750px) {
    display: none;
  }
  .iconfont {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    position: absolute;
    top: 13px;
    right: 5px;
    color: ${(props) => props.theme['header/searchIconColor']};
    font-size: 17px;
    display: block;
    border-radius: 50%;
    &:hover {
      cursor: pointer;
    }
    &.focused {
      color: ${(props) => props.theme['header/searchIconFocusColor']};
      background: ${(props) => props.theme['header/searchIconFocusBg']};
    }
  }
`

export const NavSearch = styled.input`
  height: 38px;
  line-height: 18px;
  box-sizing: border-box;
  position: relative;
  display: block;
  top: 9px;
  padding: 10px 35px 10px 20px;
  border-radius: 19px;
  width: 160px;
  font-size: 14px;
  color: ${(props) => props.theme['header/searchColor']};
  outline: none;
  border: none;
  background: ${(props) => props.theme['header/searchBg']};
  &.slide-enter {
    width: 160px;
    transition: all 0.4s ease-in;
  }
  &.slide-enter-active {
    width: 240px;
  }
  &.slide-exit {
    transition: all 0.4s ease-in;
  }
  &.slide-exit-active {
    width: 160px;
  }
  &.focused {
    width: 240px;
  }
`

export const NavItem = styled.div`
  height: 56px;
  line-height: 56px;
  font-size: 16px;
  min-width: 42px;
  margin-left: 15px;
  padding: 0 5px;
  @media (max-width: 750px) {
    display: none;
  }
  &.first-nav {
    margin-left: 50px;
  }
  a {
    color: ${(props) => props.theme['mainColor']};
    &:hover {
      color: ${(props) => props.theme['header/linkColorHover']};
    }
  }
`

export const Addition = styled.div`
  position: absolute;
  right: 0;
  height: 56px;
  top: 0;
  display: flex;
  flex-direction: row-reverse;
  @media (max-width: 750px) {
    display: none;
  }
`

export const Button = styled.div`
  height: 24px;
  line-height: 24px;
  box-sizing: content-box;
  margin-top: 9px;
  padding: 6px 15px;
  border-radius: 19px;
  margin-right: 10px;
  &.write {
    background: ${(props) => props.theme['header/btnWriteBg']};
    color: ${(props) => props.theme['mainBg']};
    &:hover {
      background: ${(props) => props.theme['header/btnWriteHoverBg']};
    }
  }
  &.reg {
    color: ${(props) => props.theme['header/btnRegColor']};
    border: 1px solid ${(props) => props.theme['header/btnRegBorder']};
    &:hover {
      border-color: ${(props) => props.theme['header/btnRegHoverBorder']};
    }
  }
  &.login {
    color: ${(props) => props.theme['header/btnLoginColor']};
    margin-left: 20px;
    &:hover {
      color: ${(props) => props.theme['header/btnLoginHoverColor']};
    }
  }
  .iconfont {
    color: ${(props) => props.theme['mainBg']};
  }
  &:hover {
    cursor: pointer;
  }
`

export const AvatarWrapper = styled.div`
  width: 80px;
  height: 56px;
  position: relative;
  margin-right: 12px;
  padding: 8px 24px 8px 16px;
  box-sizing: border-box;
  &:before {
    content: '';
    position: absolute;
    top: 25px;
    right: 7px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid ${(props) => props.theme['header/linkColor']};
  }
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme['header/avatarHoverBg']};
  }
`

export const AvatarContent = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: none;
  outline: none;
  position: relative;
`

export const DropdownWrapper = styled.div`
  position: absolute;
  width: 160px;
  box-sizing: border-box;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 8px ${(props) => props.theme['header/boxShadowColor']};
  top: 56px;
  left: 0;
  background: ${(props) => props.theme.mainBg};
  height: 0;
  overflow: hidden;
  &.fade-enter {
    height: 0;
    transition: all 0.4s ease-in-out;
  }
  &.fade-enter-active {
  }
  &.fade-exit {
    transition: all 0.4s ease-in-out;
    height: 255px;
  }
  &.fade-exit-active {
    height: 0;
  }
  &.mouse-in {
    height: 255px;
  }
`

export const DropdownItem = styled.div`
  a,
  div {
    padding: 10px 20px;
    line-height: 30px;
    font-size: 14px;
    color: ${(props) => props.theme['mainColor']};
    display: block;
    overflow: hidden;
    display: flex .iconfont {
      line-height: 30px;
    }
    span {
      margin-left: 15px;
    }
  }
  &:hover {
    background: ${(props) => props.theme['header/avatarHoverBg']};
  }
`
