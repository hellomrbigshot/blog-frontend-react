import styled from 'styled-components'

export const Footer = styled.div`
  padding: 15px 0;
  border-top: 1px solid ${props => props.theme['boxShadow']};
  background: ${props => props.theme['mainBg']}
`

export const Content = styled.a`
  margin: 0 auto;
  font-size: 12px;
  display: block;
  text-align: center;
  color: ${props => props.theme['mainColor']};
`