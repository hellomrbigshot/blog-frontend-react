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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${(props) => props.theme['mainColor']};
`

export const Header2 = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme['mainColor']};
  margin-top: 10px;
  width: 70px;
  line-height: 30px;
  text-align: center;
  transition: all ease 0.5s;
  border-bottom: 2px solid ${(props) => props.theme['mainColor']};
  &:hover {
    border-bottom-color: ${(props) => props.theme['mainColorHover']};
    color: ${(props) => props.theme['mainColorHover']};
  }
`

export const Info = styled.div`
  color: ${(props) => props.theme['descColor']};
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
      color: ${(props) => props.theme['mainColor']};
      border-bottom: 1px solid ${(props) => props.theme['mainColor']};
      &:hover {
        color: ${(props) => props.theme['mainColorHover']};
        border-bottom-color: ${(props) => props.theme['mainColorHover']};
      }
    }
  }
`

export const Article = styled.div`
  font-size: 15px;
  blockquote {
    background: #f8f8f8;
    color: #333;
  }
`

export const SkeletonDiv = styled.div`
  height: 25px;
  background: ${props => props.theme['skeletonBg']};
  border-radius: 3px;
`

export const SkeletonWrapper = styled.div`
  margin-bottom: 100px;
`

export const SkeletonHeader = styled(SkeletonDiv)`
  width: 60%;
  max-width: 300px;
`

export const SkeletonDescWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: left;
`

export const SkeletonDesc = styled(SkeletonDiv)`
  width: 80px;
  margin-left: 20px;
  height: 20px;
  &:first-child {
    margin-left: 0;
  }
`

export const SkeletonContent = styled(SkeletonDiv)`
  width: 100%;
  margin-top: 20px;
`