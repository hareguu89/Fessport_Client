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
        background-color: white;
        color: black;
        padding-top: 50px;
    }
`;

export default globalStyles;
