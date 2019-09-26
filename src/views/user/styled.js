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
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
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
        padding-bottom: 30px;
    }
`

export const DraftList = styled.div``
export const DraftItem = styled.div`
    padding: 10px 5px;
    overflow: hidden;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: row-reverse;
    .draft-title {
        flex: 1;
        a {
            line-height: 22px;
            color: #000;
            font-size: 15px;
            flex: 1;
            &:hover {
                text-decoration: underline;
            }
        } 
    }
    .draft-time {
        line-height: 22px;
        color: #999;
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
        display: flex;
    }
    a:hover {
        color: #222;
        border-bottom-color: #222;
    }
`

export const ArticleTime = styled.span`
    font-size: 12px;
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
      font-size: 26px;
      line-height: 36px;
      color: #555;
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
    background: #eeeeef;
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
    background: #f5f5f5cc;
    opacity: .5;
    font-size: 12px;
    transition: all .3s ease-in;
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
  rows: 4
}))`
    resize: none;
    padding: 10px 15px;
    border-radius: 5px;
    width: 100%;
    border: none;
    box-shadow: 0 0 5px #bbb;
    outline: none;
    &:focus {
      border: none;
      box-shadow: 0 0 5px #008dff !important;
    }
`

export const LimitArticleList = styled.div`
    h2 {
        font-size: 20px;
        color: #555;
    }
`

export const LimitArticleItem = styled.div`
    margin: 30px 0;
    position: relative;
    border-bottom: 1px dashed #ccc;
    &:hover {
        a:before {
            background: #222;
        }
        border-bottom-color: #222;
    }
    .time {
        font-size: 12px;
        color: #555;
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
            color: #666;
            margin: 20px 0 10px 60px
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
            background: #bbb;
            border-radius: 50%;
            border: 1px solid #fff;
            transition: background 0.2s ease-in-out;
        }
    }
`
