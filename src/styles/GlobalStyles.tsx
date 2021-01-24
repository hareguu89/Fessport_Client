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
        color: white;
        padding-top: 100px;
        background-color: rgb(23,20,29);
    }
    input{
        padding-left: 5px;
        border: 0;
        border-radius: 5px;
        background-color: rgb(244, 244, 244, 0.3);
    }
    input::placeholder {
        color:gray;
    }
    input:focus{
        outline: none;
    }
`;

export default globalStyles;
