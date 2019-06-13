import styled from 'styled-components'

export const ArticleItem = styled.div`
  margin-bottom: 100px;
  font-family: Lato,PingFang SC,Microsoft YaHei,sans-serif;
  a {
    text-decoration: none;
  }
`

export const Header = styled.div`
  font-size: 26px;
  height: 41px;
  line-height: 41px;
  font-weight: 350;
  color: #333;
`

export const Info = styled.div`
  color: #999;
  font-size: 12px;
  margin-bottom: 20px;
  line-height: 18px;
  box-sizing: border-box;
  span {
    font-weight: 350;
    display:inline-block;
    border-right: 1px solid #
    padding-right: 5px;
    a {
      display: inline-block;
      padding: 0 2px;
      line-height: 20px;
      color: #555;
      border-bottom: 1px solid #ccc;
      &:hover {
        color: #222;
        border-bottom-color: #222;
      }
    }
  }
`

export const Article = styled.div`
  font-weight: 300;
`