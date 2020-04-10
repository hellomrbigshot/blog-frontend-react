import styled from 'styled-components'

export const ArticleItem = styled.div`
    margin-bottom: 100px;
    font-family: Lato, PingFang SC, Microsoft YaHei, sans-serif;
    a {
        text-decoration: none;
    }
`

export const Header = styled.div`
    font-size: 30px;
    height: 45px;
    line-height: 45px;
    color: ${props => props.theme['mainColor']};
`

export const Header2 = styled.div`
    font-size: 14px;
    color: ${props => props.theme['mainColor']};
    margin-top: 10px;
    width: 70px;
    line-height: 30px;
    text-align: center;
    transition: all ease .5s;
    border-bottom: 2px solid ${props => props.theme['mainColor']};
    &:hover {
      border-bottom-color: ${props => props.theme['mainColorHover']};
      color: ${props => props.theme['mainColorHover']};
    }
`

export const Info = styled.div`
  color: ${props => props.theme['descColor']};
  font-size: 12px;
  margin-bottom: 20px;
  line-height: 18px;
  box-sizing: border-box;
  span {
    display:inline-block;
    border-right: 1px solid #
    padding-right: 5px;
    a {
      display: inline-block;
      padding: 0 2px;
      line-height: 20px;
      transition: all ease .5s;
      color: ${props => props.theme['mainColor']};
      border-bottom: 1px solid ${props => props.theme['mainColor']};
      &:hover {
        color: ${props => props.theme['mainColorHover']};
        border-bottom-color: ${props => props.theme['mainColorHover']};
      }
    }
  }
`

export const Article = styled.div`
    font-size: 15px;
`
