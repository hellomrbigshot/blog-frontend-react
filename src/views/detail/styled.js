import styled from 'styled-components'

export const DetailWrapper = styled.div`
  width: 800px;
  font-family: Lato, PingFang SC, Microsoft YaHei, sans-serif;
`

export const Header = styled.div`
  text-align: center;
  font-size: 26px;
  line-height: 37px;
  margin-bottom: 10px;
  font-weight: 380;
  color: #555;
`

export const Info = styled.div`
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  color: #999;
  font-weight: 349;
  margin-bottom: 10px;
  span {
    line-height: 18px;
    display: inline-block;
    padding-right: 5px;
  }
  a {
    color: #555;
    border-bottom: 1px solid #ccc;
    &:hover {
      color: #222;
      border-bottom-color: #222;
    }
  }
`

export const Content = styled.div`
  margin-bottom: 120px;
`

export const CommentWrapper = styled.div`
  margin-bottom: 50px;
  h2 {
    font-weight: normal;
    font-size: 20px; 
  }
`

export const CommentItem = styled.div`
  margin-top: 15px;
  padding: 8px 14px;
  overflow: hidden;
`

export const CommentAvatar = styled.div`
  float: left;
  margin-right: 10px;
  a {
    display: block;
  }
  img {
    display: block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`
export const CommentFloor = styled.div`
  font-size: 12px;
  color: #999;
  text-align: center;
  margin-top: 3px;
`

export const CommentContent = styled.div`
  float: left;
  width: calc(100% - 42px);
  a {
    color: #000000a6;
    &:hover {
      color: #000000a6;
    }
  }
`

export const CommentInfo = styled.div`
  line-height: 25px;
  font-size: 12px;
  overflow: hidden;
  margin-bottom: 10px;
  a {
    float: left; 
  }
  div {
    float: right;
  }
`

export const ReplyContent = styled.div`
  margin-bottom: 10px;
  padding: 15px 19px;
  font-size: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .1);
`
