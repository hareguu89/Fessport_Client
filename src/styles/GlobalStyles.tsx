import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body{
        font-size: 15px;
        color: black;
        padding-top: 0px;
        background-color: #151515;
    }
    input{
        padding-left: 5px;
        border: 0;
        border-radius: 5px;
        background-color: rgb(244, 244, 244, 0.3);
    }
    input::placeholder {
        color:grey;
    }
    input:focus{
        outline: none;
    }
`;

export default globalStyles;
