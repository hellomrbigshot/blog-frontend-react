import styled from 'styled-components'
import logoPic from '../../statics/image/logo_black_transparent.png'

export const LoginWrapper = styled.div`
  postion: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

export const LoginBox = styled.form`
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
