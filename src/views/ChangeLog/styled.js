import styled from 'styled-components'

export const LogItem = styled.div`
  padding: 24px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 6px #ebedf0;
  margin: 0 auto 24px;
  width: 90%;
`

export const LogItemHeader = styled.h3`
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 18px;
  color: #323233;
`

export const LogItemDate = styled.div`
  padding: 2px 5px;
  background-color: #f0f2f5;
  color: #58727e;
  font-weight: 400;
  line-height: 26px;
  border-radius: 4px;
  display: inline;
`

export const LogItemDescHeader =styled.strong`
  margin: 24px 0 12px;
  font-weight: 500;
  font-size: 15px;
  display: block;
`

export const LogItemDescItemWrapper = styled.ul`
  list-style: none;
`

export const LogItemDescItem = styled.li`
  position: relative;
  margin: 5px 0 5px 10px;
  padding-left: 15px;
  color: #34495e;
  font-size: 14px;
  line-height: 26px;
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 6px;
    height: 6px;
    margin-top: 10px;
    border: 1px solid #666;
    border-radius: 50%;
    content: '';
  }
`
