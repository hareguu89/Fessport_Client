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
        padding-top: 100px;
        background-color: rgb(23,20,29);
    }
`;

export default globalStyles;
