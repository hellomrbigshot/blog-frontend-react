import styled from 'styled-components'

export const DraftWrapper = styled.div`
  h2 {
    font-weight: normal;
    padding-bottom: 30px;
  }
`

export const DraftList = styled.div`

`
export const DraftItem = styled.div`
  padding: 10px 5px;
  overflow: hidden;
  border-bottom: 1px solid #eee;
  .draft-title a {
    float: left;
    line-height: 22px;
    color: #000;
    font-size: 15px;
    &:hover {
      text-decoration: underline;
    }
  }
  .draft-time {
    float: right;
    line-height: 22px;
    color: #999;
    font-size: 12px;
  }
`
