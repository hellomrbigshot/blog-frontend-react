import styled, { createGlobalStyle } from 'styled-components'
import Lato from './common/static/fonts/Lato-Regular.woff2'
import PingFangSC from './common/static/fonts/PingFangSC-Regular.woff2'
export const GlobalStyle = createGlobalStyle`
@font-face{
  font-family: 'Lato';
  src: url('${Lato}');
}
@font-face{
  font-family: 'PingFang SC';
  src: url('${PingFangSC}');
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
  vertical-align: baseline;
  font-family: Lato, "PingFang SC", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
a {
  text-decoration: none;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
div, span, applet, object, iframe, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary {
}
#root {
  padding-top: 1px;
}
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
`
export const AppWrapper = styled.div`
  padding-top: 37px;
  max-width: 800px;
  width: 80%;
  margin: 100px auto;
  @media (max-width: 600px) {
    width: 95%
  }
`
