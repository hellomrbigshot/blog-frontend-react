import styled from 'styled-components'

export const LoginWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${(props) => props.theme.mainBg};
`

export const LoginBox = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 400px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 8px ${(props) => props.theme['user/loginBoxShadow']};
  background-color: ${(props) => props.theme.mainBg};
  padding: 50px 50px 30px;
  .login-form {
    margin-top: 40px;
  }
  /deep/ input {
    background-color: transparent !important;
    &:-webkit-autofill {
      -webkit-transition: background-color 10000s cubic-bezier(1, -100, 1, -100) 0s;
    }
  }
`

export const LoginInfo = styled.div`
  margin: 0 auto;
  font-size: 0;
  text-align: center;
  b {
    font-size: 20px;
    color: ${(props) => props.theme['user/loginInfoColor']};
    padding: 10px;
    line-height: 20px;
    border-bottom: 2px solid ${(props) => props.theme.mainBg};
  }
  a {
    display: inline-block;
    text-align: center;
    font-size: 18px;
    color: ${(props) => props.theme['user/loginInfoColor']};
    padding: 10px;
    line-height: 20px;
    box-sizing: border-box;
    border-bottom: 2px solid ${(props) => props.theme.mainBg};
    &:hover {
      border-bottom-color: #3db922;
    }
    &.active {
      color: #3db922;
      border-bottom-color: #3db922;
    }
  }
`

export const Logo = styled.div`
  display: block;
  background: url(${(props) => props.theme.logo});
  position: absolute;
  left: 50px;
  top: 56px;
  width: 200px;
  height: 60px;
  background-size: contain;
`

export const DraftWrapper = styled.div`
  h2 {
    padding-bottom: 30px;
  }
`

export const DraftList = styled.div``
export const DraftItem = styled.div`
  padding: 10px 5px;
  overflow: hidden;
  border-bottom: 1px solid ${(props) => props.theme['mainBorderColor']};
  display: flex;
  flex-direction: row-reverse;
  .draft-title {
    flex: 1;
    a {
      line-height: 22px;
      color: ${(props) => props.theme['mainColor']};
      font-size: 15px;
      flex: 1;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .draft-time {
    line-height: 22px;
    color: ${(props) => props.theme['descColor']};
    font-size: 12px;
    text-align: right;
    width: 200px;
  }
`

export const ArticleWrapper = styled.div`
  h2 {
    padding-bottom: 30px;
  }
`

export const ArticleList = styled.div`
  margin-bottom: 20px;
`

export const TimelineDot = styled.div`
  width: 13px;
  height: 13px;
  border: 1.2px solid #aaa;
  border-radius: 50%;
  background: ${(props) => props.theme['mainBg']};
`

export const ArticleYear = styled.div`
  font-size: 22px;
  color: ${(props) => props.theme['descColor']};
`

export const ArticleItem = styled.div`
  a {
    color: ${(props) => props.theme['mainColor']};
    padding-bottom: 10px;
    display: block;
    border-bottom: 1px dashed ${(props) => props.theme['mainBorderColor']};
    overflow: hidden;
    line-height: 24px;
    display: flex;
    transition: all ease 0.5s;
  }
  a:hover {
    color: ${(props) => props.theme['mainColorHover']};
    border-bottom-color: ${(props) => props.theme['mainColorHover']};
  }
`

export const ArticleTime = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme['user/articleTime']};
`

export const ArticleTitle = styled.span`
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  text-overflow: ellipsis;
`

export const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  h2 {
    line-height: 36px;
  }
`

export const UserInfoDetailWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const BioWrapper = styled.div`
  flex: 1;
  margin-top: 5px;
  padding: 15px 30px 15px 20px;
  background: ${(props) => props.theme['user/bioBg']};
  border-radius: 5px;
  font-size: 15px;
  position: relative;
  .editIcon {
    position: absolute;
    display: none;
    top: 15px;
    right: 10px;
    font-size: 15px;
    &:hover {
      cursor: pointer;
      color: #008dff;
    }
  }
  &:hover {
    .editIcon {
      display: block;
    }
  }
`

export const UserAvatarWrapper = styled.div`
  margin-right: 40px;
  width: 150px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  &:hover {
    .avatar-select {
      height: 30px;
    }
  }
`

export const AvatarSelectButton = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 0;
  z-index: 2;
  line-height: 30px;
  text-align: center;
  bottom: 0;
  left: 0;
  background: ${(props) => props.theme['mainBg']};
  color: ${(props) => props.theme['mainColor']};
  opacity: 0.7;
  font-size: 12px;
  transition: all 0.3s ease-in;
  input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
    width: 100%;
    &:hover {
      cursor: pointer;
    }
  }
`

export const BioTextArea = styled.textarea.attrs(() => ({
  rows: 4,
}))`
  resize: none;
  padding: 10px 15px;
  border-radius: 5px;
  width: 100%;
  border: none;
  box-shadow: 0 0 5px ${(props) => props.theme['boxShadow']};
  background: ${(props) => props.theme['mainBg']};
  color: ${(props) => props.theme['mainColor']};
  outline: none;
  &:focus {
    border: none;
    box-shadow: 0 0 5px #008dff !important;
  }
`

export const LimitArticleList = styled.div`
  h2 {
    font-size: 20px;
  }
`

export const LimitArticleItem = styled.div`
  margin: 30px 0;
  position: relative;
  border-bottom: 1px dashed ${(props) => props.theme['mainBorderColor']};
  transition: all ease 0.5s;
  &:hover {
    a:before {
      background: ${(props) => props.theme['mainColorHover']};
    }
    border-bottom-color: ${(props) => props.theme['mainColorHover']};
  }
  .time {
    font-size: 12px;
    color: ${(props) => props.theme['descColor']};
    position: absolute;
    top: 5px;
    left: 20px;
    width: 40px;
    line-height: 2;
  }
  a {
    transition: all 0.2s ease-in-out;
    .title {
      font-size: 16px;
      color: ${(props) => props.theme['mainColor']};
      margin: 20px 0 10px 60px;
      line-height: 32px;
      font-weight: 350;
    }
    &:before {
      box-sizing: content-box;
      content: '';
      position: absolute;
      left: -3px;
      top: 12px;
      width: 6px;
      height: 6px;
      margin-left: -4px;
      background: ${(props) => props.theme['mainColor']};
      border-radius: 50%;
      border: 1px solid ${(props) => props.theme['mainBg']};
      transition: background 0.2s ease-in-out;
    }
  }
`
