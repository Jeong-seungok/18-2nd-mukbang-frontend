import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
const GlobalStyle = createGlobalStyle`
${reset}
*{
  box-sizing: border-box;
}
body{
  font-family: 'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';
}
a{
  text-decoration: none;
}
input, button{
  background-color: transparent;
  border: none;
  outline: none;
}
`;
export default GlobalStyle;
