import styled from 'styled-components'

export const TagWrapper = styled.div`
  width: 800px;
  margin: 100px auto;
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