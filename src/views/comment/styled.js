import styled from 'styled-components'

export const CommentWrapper = styled.div`
    overflow: hidden;
    margin-top: 15px;
    padding: 8px 14px;
`
export const CommentAvatar = styled.div`
    float: left;
    margin-right: 16px;
    a {
        display: block;
    }
`

export const CommentRight = styled.div`
    float: left;
    width: calc(100% - 56px);
`

export const CommentHeader = styled.div`
    font-size: 12px;
    color: #999;
    line-height: 22px;
    position: relative;
    a {
        font-size: 14px;
        color: ##2d8cf0;
    }
`

export const Time = styled.div`
    position: absolute;
    right: 0;
    line-height: 22px;
    top: 0;
`

export const CommentContent = styled.div`
    line-height: 21px;
    font-size: 14px;
    color: #515a6e;
`

export const ReplyContent = styled.div`
    margin: 10px 0;
    padding: 10px;
    color: #888;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    &:hover {
        cursor: pointer;
        .reply-article {
            color: #5188a6;
        }
    }
`
