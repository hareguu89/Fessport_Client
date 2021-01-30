import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
        font-size: 1rem;
        color: white;
        padding-top: 100px;
        background-color: rgb(21,21,31);
    }
    input{
        border: 0;
    }
    input:focus{
        outline: none;
    }
`;

export default globalStyles;
