import styled from 'styled-components'
import logoPic from '../../statics/image/logo_black_transparent.png'

export const HeaderWrapper = styled.div`
    height: 56px;
    line-height: 56px;
    background: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background: #fff;
    z-index: 2;
    border-bottom: 1px solid #f0f0f0;
`

export const Logo = styled.div`
    position: absolute;
    left: 10px;
    width: 150px;
    height: 40px;
    top: 50%;
    transform: translateY(-50%);
    background: url(${logoPic});
    background-size: contain;
`

export const Nav = styled.div`
    width: 940px;
    margin: 0 auto;
    height: 56px;
    line-height: 56px;
    overflow: hidden;
`

export const SearchWrapper = styled.div`
    height: 56px;
    position: relative;
    float: left;
    .iconfont {
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        position: absolute;
        top: 13px;
        right: 5px;
        color: #969696;
        font-size: 17px;
        display: block;
        border-radius: 50%;
        &:hover {
            cursor: pointer;
        }
        &.focused {
            color: #fff;
            background: #969696;
        }
    }
`

export const NavSearch = styled.input`
    height: 38px;
    box-sizing: border-box;
    position: relative;
    display: block;
    top: 9px;
    padding: 0 35px 0 20px;
    border-radius: 19px;
    width: 160px;
    font-size: 14px;
    color: #777;
    outline: none;
    border: none;
    background: #eee;
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
    float: left;
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    margin-left: 15px;
    padding: 0 5px;
    &.first-nav {
        margin-left: 50px;
    }
    a {
        color: #666;
        &:hover {
            color: #222;
        }
    }
`

export const Addition = styled.div`
    position: absolute;
    right: 0;
    height: 56px;
    top: 0;
`

export const Button = styled.div`
    height: 24px;
    line-height: 24px;
    box-sizing: content-box;
    margin-top: 9px;
    padding: 6px 15px;
    border-radius: 19px;
    float: right;
    margin-right: 10px;
    &.write {
        background: #bbb;
        color: #fff;
        &:hover {
            background: #666;
        }
    }
    &.reg {
        color: #666;
        border: 1px solid #bbb;
        font-weight: 200;
        &:hover {
            border-color: #555;
        }
    }
    &.login {
        color: #555;
        font-weight: 400;
        margin-left: 20px;
        &:hover {
            color: #222;
        }
    }
    .iconfont {
        color: #fff;
    }
    &:hover {
        cursor: pointer;
    }
`

export const AvatarWrapper = styled.div`
    width: 80px;
    height: 56px;
    float: right;
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
        border-top: 6px solid #999;
    }
    &:hover {
        cursor: pointer;
        background: #f5f5f5;
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    top: 56px;
    left: 0;
    background: #fff;
    height: 0;
    overflow: hidden;
    &.fade-enter {
        height: 0;
        transition: all .4s ease-in-out;
    }
    &.fade-enter-active {
        height: 255px;
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
    a, div {
        padding: 10px 20px;
        line-height: 30px;
        font-size: 14px;
        color: #333;
        display: block;
        overflow: hidden;
        .iconfont {
            float: left;
            line-height: 30px;
        }
        span {
            float: left;
            margin-left: 15px;
        }
    }
    &:hover {
        background: #f5f5f5;
    }
`
