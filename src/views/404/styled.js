import styled from 'styled-components'

export const Container = styled.div`
    width: 80%;
    max-width: 540px;
    min-width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const Box = styled.div`
    padding: 20px;
    background: ${props => props.theme['mainBg']};
    border-radius: 3px;
    box-shadow: 0 0 2px 2px ${props => props.theme['boxShadow']};
    h1 {
        font-size: 50px;
        color: ${props => props.theme['mainColor']};
        line-height: 50px;
        margin-top: 10px;
        text-align: center;
    }
    h2 {
        font-size: 1.5em;
        color: ${props => props.theme['mainColor']};
        text-align: center;
    }
    hr {
        border: none;
        border-bottom: 1px dashed ${props => props.theme['descColor']};
    }
    ul {
        padding-left: 40px;
        list-style-type: disc;
    }
    p, li {
      color: ${props => props.theme['descColor']}
    }
`
