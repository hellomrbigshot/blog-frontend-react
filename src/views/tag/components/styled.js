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

export const TagItemWrapper = styled.div`
  padding: 12px 20px;
  width: 98%;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, .1);
  margin: 0 auto 10px;
`

export const TagItemHeader = styled.div`
  height: 23px;
  padding: 12px;
  width: 200px;
  background: ${prop => prop.theme['skeletonBg']}
`

export const TagItemDesc = styled.div`
  height: 12px;
  margin-top: 5px;
  background: ${prop => prop.theme['skeletonBg']}
`

export const TagItemFooter = styled.div`
  height: 18px;
  padding: 12px 0;
  width: 150px;
  margin-top: 12px;
  background: ${prop => prop.theme['skeletonBg']}
`
