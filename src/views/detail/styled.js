import styled from 'styled-components'

export const DetailWrapper = styled.div`
    font-family: Lato, PingFang SC, Microsoft YaHei, sans-serif;
`

export const Header = styled.div`
    text-align: center;
    font-size: 26px;
    line-height: 37px;
    margin-bottom: 10px;
    color: #555;
`

export const Info = styled.div`
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    color: #999;
    margin-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
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
    font-size: 15px;
    margin-bottom: 120px;
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
    color: #999;
    text-align: center;
    margin-top: 8px;
`

export const CommentContent = styled.div`
    flex: 1;
    a {
        color: #333;
        &:hover {
          color: #5188a6;
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
    color #666;
`

export const CommentInfoTime = styled.div`
    width: 150px;
    text-align: right;
    font-size: 12px;
    color: #999;
`

export const ReplyContent = styled.div`
    margin-bottom: 10px;
    padding: 15px 19px 25px;
    font-size: 14px;
    border-radius: 3px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
`

export const CommentAction = styled.div`
    font-size: 12px;
    display: flex;
    flex-direction: row-reverse;
    div {
        color: #5188a6;
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
