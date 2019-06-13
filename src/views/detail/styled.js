import styled from 'styled-components'

export const DetailWrapper = styled.div`
  width: 800px;
  margin: 80px auto;
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
  font-weight: 350;
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
  font-weight: 300;
`