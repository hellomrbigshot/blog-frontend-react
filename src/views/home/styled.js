import styled from 'styled-components'

export const HomeWrapper = styled.div`
  width: 800px;
  margin: 100px auto;
  overflow: hidden;
  position: relative;
`

export const BackTop = styled.div`
  width: 52px;
  height: 52px;
  text-align: center;
  position: fixed;
  right: 40px;
  bottom: 40px;
  color: #333;
  border: 1px solid #dcdcdc;
  .iconfont {
    font-size: 20px;
    line-height: 52px;
  }
  &:hover {
    background: hsla(0, 0%, 71%, .1);
    cursor: pointer;
  }
`