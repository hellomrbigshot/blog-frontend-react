import styled from 'styled-components'

export const TagWrapper = styled.div`
  position: relative;
  overflow: hidden;
`

export const Header = styled.h2`
  font-size: 14px;
  font-weight: normal;
`

export const ListWrapper = styled.div`
  margin: 26px 0;
`

export const TagItem = styled.div`
  margin-bottom: 26px;
`

export const TagHeader = styled.div`
  overflow: hidden;
  a {
    display: block;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 400;
    color: #333;
    line-height: 20px;
    border-bottom: 1.5px solid #fff;
    float: left;
    &:hover {
      color: #333;
      border-bottom-color: #333;
    }
  }
`

export const TagDesc = styled.div`
  font-size: 13px;
  word-wrap: break-word;
  line-height: 1.4;
  margin-bottom: 3px;
  font-weight: normal;
  color: #555;
`

export const TagBottom = styled.div`
  line-height: 1.4;
  color: #222;
  font-size: 12px;
`

export const TagDetailWrapper = styled.div`
  margin-bottom: 40px;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 12px;
    width: 8px;
    height: 8px;
    margin-left: -4px;
    background: #bbb;
    border-radius: 50%;
  }
  h2 {
    margin: 0 0 10px 20px;
    font-size: 22px;
    color: #555;
    small {
      color: #bbb;
    }
  }
  div {
    margin-left: 20px;
    font-size: 12px;
  }
`

export const ArticleListWrapper = styled.div`
  margin-bottom: 40px;
  position: relative;
  font-size: 0;
  span, h2 {
    display: inline-block;
    line-height: 32px;
  }
  article {
    position: relative;
    padding: 20px 0 10px;
    border-bottom: 1px dashed #ccc;
    transition: border .2s ease-in-out;
    &:before {
      box-sizing: content-box;
      content: "";
      position: absolute;
      left: 0;
      top: 34px;
      width: 6px;
      height: 6px;
      margin-left: -4px;
      background: #bbb;
      border-radius: 50%;
      border: 1px solid #fff;
      transition: background .2s ease-in-out;
    }
    &:hover {
      border-bottom-color: #666;
      &:before {
        background: #666;
      }  
    }
  }
  
  h2 {
    font-size: 16px;
    color: #666;
    font-weight: 400;
    margin-bottom: 0;
    margin-left: 5px;
  }
  span {
    font-size: 12px;
    margin-left: 20px;
    color: #555;
  }
`
