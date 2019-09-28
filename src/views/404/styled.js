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
    background: #fbfbfb;
    border-radius: 3px;
    box-shadow: 0px 2px 2px #aaa;
    h1 {
        font-size: 50px;
        color: #666;
        line-height: 50px;
        margin-top: 10px;
        text-align: center;
    }
    h2 {
        font-size: 1.5em;
        color: #666;
        text-align: center;
    }
    hr {
        border: none;
        border-bottom: 1px dashed #ccc;
    }
    ul {
        padding-left: 40px;
        list-style-type: disc;
    }
`
