import styled from 'styled-components'


export const TagWrapper = styled.div`
  margin-bottom: 40px;
`

export const TagHeader = styled.div`
  width: 200px;
  height: 33px;
  margin-bottom 15px;
  background: ${prop => prop.theme['skeletonBg']};
`

export const TagDesc = styled.div`
  height: 20px;
  background: ${prop => prop.theme['skeletonBg']};
  margin-bottom: 10px;
`

export const ArticleWrapper = styled.div`
  margin-bottom: 40px;
`

export const ArticleItem = styled.div`
  width: 65%;
  height: 30px;
  margin: 20px 0 10px 0;
  background: ${prop => prop.theme['skeletonBg']};
`
