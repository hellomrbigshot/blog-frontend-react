import styled from 'styled-components'

export const DetailWrapper = styled.div`
  font-family: Lato, PingFang SC, Microsoft YaHei, sans-serif;
`

export const Header = styled.div`
  text-align: center;
  font-size: 26px;
  line-height: 37px;
  margin-bottom: 10px;
  color: ${(props) => props.theme['mainColor']};
`

export const Info = styled.div`
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  color: ${(props) => props.theme['descColor']};
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  span {
    line-height: 18px;
    display: inline-block;
    padding-right: 5px;
  }
  a {
    color: ${(props) => props.theme['mainColor']};
    border-bottom: 1px solid ${(props) => props.theme['mainBorderColor']};
    &:hover {
      color: ${(props) => props.theme['mainColorHover']};
      border-bottom-color: ${(props) => props.theme['mainColorHover']};
    }
  }
`

export const Content = styled.div`
  font-size: 15px;
  margin-bottom: 120px;
  blockquote {
    background: #f8f8f8;
    color: #333;
  }
  pre {
    max-height: 300px;
    overflow-y: auto;
  }
`

export const CommentWrapper = styled.div`
  margin-bottom: 50px;
  h2 {
    font-size: 20px;
  }
`

export const CommentItem = styled.div`
  margin-top: 20px;
  padding: 8px 14px;
  display: flex;
`

export const CommentAvatar = styled.div`
  margin-right: 10px;
  width: 40px;
  a {
    display: block;
  }
`
export const CommentFloor = styled.div`
  font-size: 12px;
  color: ${(props) => props.theme['mainColor']};
  text-align: center;
  margin-top: 8px;
`

export const CommentContent = styled.div`
  flex: 1;
  a {
    color: ${(props) => props.theme['mainColor']};
    &:hover {
      color: ${(props) => props.theme['mainColorHover']};
    }
  }
`

export const CommentInfo = styled.div`
    line-height: 25px;
    font-size: 14px
    margin-bottom: 10px;
    display: flex;
    flex-direction: row-reverse;
    a {
      flex: 1;
    }
`
export const CommentContentDetail = styled.div`
  color: ${(props) => props.theme['descColor']};
`

export const CommentInfoTime = styled.div`
  width: 150px;
  text-align: right;
  font-size: 12px;
  color: ${(props) => props.theme['descColor']};
`

export const ReplyContent = styled.div`
  margin-bottom: 10px;
  padding: 15px 19px 25px;
  font-size: 14px;
  border-radius: 3px;
  box-shadow: 0 0 1px 1px ${(props) => props.theme['boxShadow']};
`

export const CommentAction = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row-reverse;
  div {
    color: ${(props) => props.theme['mainColor']};
    &:hover {
      cursor: pointer;
    }
  }
`

export const CommentReply = styled.div`
  margin-top: 5px;
`

export const CommentReplyBtn = styled.div`
  font-size: 12px;
  border-radius: 3px;
  background: #1890ff;
  width: 70px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  color: #fff;
  &:hover {
    cursor: pointer;
  }
`

export const NavWrapper = styled.ul`
  list-style: none;
  position: fixed;
  top: 30vh;
  right: 20px;
  max-height: 50vh;
  background: rgba(255, 255, 255, .8);
  box-sizing: border-box;
  box-shadow: rgba(64, 169, 255, .8) 0 0 2px;
  overflow: hidden auto;
  border-radius: 5px;
  width: 0;
  /* height: 0; */
  scrollbar-width: none;
  z-index: 999;
  opacity: 0;
  transition: opacity 400ms, width 300ms ease-in-out 100ms;
  &.show-nav-list {
    width: 250px;
    height: auto;
    opacity: 1;
    transition: width 300ms ease-in-out, opacity 500ms 200ms;
  }
  li:first-child {
    margin-top: 10px;
  }
  li:last-child {
    margin-bottom: 10px;
  }
`

export const NavItem = styled.li`
  margin-top: 8px;
  font-size: 14px;
  color: #000;
  font-weight: 500;
  width: 100%;
  padding: 0 10px;
  border-radius: 3px;
  &:hover {
    color: #1989fa;
    cursor: pointer;
    background: rgba(255, 255, 255, .5);
  }
  pre {
    display: block;
    text-overflow: ellipsis;
    line-height: 20px;
    overflow: hidden;
  }
  &.active {
    color: #1989fa;
    background: rgba(255, 255, 255, .5);
  }
`
export const NavHeader = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin-top: 10px;
  i {
    &:hover {
      cursor: pointer;
      color: #1989fa;
    }
  }
`

export const NavIcon = styled.i`
  position: fixed;
  right: 20px;
  top: 50%;
  font-size: 25px;
  margin-top: -12.5px;
  &:hover {
    cursor: pointer;
    color: #1989fa;
  }
`

export const SkeletonDiv = styled.div`
  height: 25px;
  background: ${props => props.theme['skeletonBg']};
  border-radius: 3px;
`

export const SkeletonHeader = styled(SkeletonDiv)`
  width: 60%;
  max-width: 300px;
  margin: 0 auto;
`

export const SkeletonDescWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
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
