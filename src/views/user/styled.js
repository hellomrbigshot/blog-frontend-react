import styled from 'styled-components'
import logoPic from '../../statics/image/logo_black_transparent.png'

export const LoginWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

export const LoginBox = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 400px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 8px rgba(0, 0, 0, .1);
  background-color: #fff;
  padding: 50px 50px 30px;
  .login-form {
    margin-top: 40px;
  }
`

export const LoginInfo = styled.div`
  margin: 0 auto;
  font-size: 0;
  text-align: center;
  b {
    font-size: 20px;
    color: #969696;
    padding: 10px;
    line-height: 20px;
    border-bottom: 2px solid #fff;
  }
  a {
    display: inline-block;
    text-align: center;
    font-size: 18px;
    color: #969696;
    padding: 10px;
    line-height: 20px;
    box-sizing: border-box;
    border-bottom: 2px solid #fff;
    &:hover {
      border-bottom-color: #3db922;
    }
    &.active {
      color: #3db922;
      border-bottom-color: #3db922;
    }
  }
`

export const Input = styled.input`
  height: 50px;
  line-height: 20px;
  box-sizing: border-box;
  font-size: 14px;
  padding: 4px 12px 4px 30px;
  width: 100%;
  border-radius: 4px;
  outline: none;
  border: 1px solid #ddd;
  margin-top: 40px;
`

export const Button = styled.div`
  margin-top: 40px;
  height: 43px;
  box-sizing: border-box;
  text-align: center;
  padding: 9px 18px;
  line-height: 25px;
  border-radius: 25px;
  &:hover {
    cursor: pointer;
  }
  &.primary {
    background: #3194d0;
    color: #fff;
  } 
  &.active {
    background: #3db922;
    color: #fff;
  }
`

export const Logo = styled.div`
  display: block;
  background: url(${logoPic});
  position: absolute;
  left: 50px;
  top: 56px;
  width: 200px;
  height: 60px;
  background-size: contain;
`

export const DraftWrapper = styled.div`
  h2 {
    font-weight: normal;
    padding-bottom: 30px;
  }
`

export const DraftList = styled.div`

`
export const DraftItem = styled.div`
  padding: 10px 5px;
  overflow: hidden;
  border-bottom: 1px solid #eee;
  .draft-title a {
    float: left;
    line-height: 22px;
    color: #000;
    font-size: 15px;
    &:hover {
      text-decoration: underline;
    }
  }
  .draft-time {
    float: right;
    line-height: 22px;
    color: #999;
    font-size: 12px;
  }
`

export const ArticleWrapper = styled.div`
  h2 {
    font-weight: normal;
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
  background: #fff;
`

export const ArticleYear = styled.div`
  font-size: 22px;
  color: #555;
`

export const ArticleItem = styled.div`
  a {
    color: #666;
    padding-bottom: 10px;
    display: block;
    border-bottom: 1px dashed #ccc;
    overflow: hidden;
    line-height: 24px;
  }
  a:hover {
    color: #222;
    border-bottom-color: #222;
  }
`

export const ArticleTime = styled.span`
  font-size: 12px;
  float: left;
`

export const ArticleTitle = styled.span`
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  text-overflow: ellipsis;
  float: left;
`

export const UserInfoWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 30px;
  h2 {
    font-size: 26px;
    color: #555;
    line-height: 36px;
  }
`

export const BioWrapper = styled.div`
  margin-top: 5px;
  padding: 10px 20px 10px 10px;
  background: #eeeeef;
  width: 400px;
  height: 100px;
  border-radius: 5px;
`

export const UserAvatarWrapper = styled.div`
  float: left;
  margin-right: 20px;
  width: 150px; 
`

export const UserInfoDetailWrapper = styled.div`
  float: left;
  width: calc(100% - 170px);
`

export const LimitArticleList = styled.div`
  h2 {
    font-size: 20px;
    color: #555;
  }
`

export const LimitArticleItem = styled.div`
  a {
    position: relative;
    margin: 30px 0;
    padding: 0 0 10px 25px;
    display: block;
    overflow: hidden;
    line-height: 32px;
    border-bottom: 1px dashed #ccc;
    transition: all .2s ease-in-out;
    div {
      float: left;
      &.time {
        font-size: 12px;
        color: #555;
      }
      &.title {
        font-size: 16px;
        color: #666;
        margin-left: 10px;
      }
    }
    &:hover {
      &:before {
        background: #222;
      }
      border-bottom-color: #222;
    }
    &:before {
      box-sizing: content-box;
      content: '';
      position: absolute;
      left: 6px;
      top: 12px;
      width: 6px;
      height: 6px;
      margin-left: -4px;
      background: #bbb;
      border-radius: 50%;
      border: 1px solid #fff;
      transition: background .2s ease-in-out;
    }
  }
`
