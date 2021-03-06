import styled from 'styled-components'

export const CommentWrapper = styled.div`
    display: flex;
    margin-top: 15px;
    padding: 8px 14px;
    border-radius: 5px;
    position: relative;
    &.unread-comment {
      &:after {
        content: '';
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        background: #FF3333;
        right: 0;
        top: 10px;
      }
    }
`
export const CommentAvatar = styled.div`
    margin-right: 15px;
    a {
        display: block;
    }
`

export const CommentRight = styled.div`
    flex: 1;
`

export const CommentHeader = styled.div`
    flex-direction: row-reverse;
    font-size: 12px;
    color: ${props => props.theme['descColor']};
    line-height: 22px;
    display: flex;
    a {
        font-size: 14px;
    }
`

export const Time = styled.div`
    width: 100px;
    text-align: right;
`

export const CommentHeaderUser = styled.div`
    flex: 1;
`

export const CommentContent = styled.div`
    line-height: 21px;
    font-size: 14px;
    color: ${props => props.theme['descColor']};
`

export const ReplyContent = styled.div`
    margin: 10px 0;
    padding: 10px;
    color: #888;
    box-shadow: 0 1px 4px ${props => props.theme['boxShadow']};
    &:hover {
        cursor: pointer;
        .reply-article {
            color: ${props => props.theme['mainColor']};
        }
    }
`
