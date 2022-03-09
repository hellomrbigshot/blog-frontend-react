import styled, { createGlobalStyle } from 'styled-components'
export const GlobalStyle = createGlobalStyle`
`
export const AppWrapper = styled.div`
  padding-top: 37px;
  max-width: 800px;
  width: 80%;
  margin: 100px auto;
  min-height: calc(100vh - 244px);
  @media (max-width: 600px) {
    width: 95%
  }
`
