import blackLogo from '../statics/image/logo_black_transparent.png'
import whiteLogo from '../statics/image/logo_white_transparent.png'
import { light as headerLight, dark as headerDark } from './modules/header'
import { light as userLight, dark as userDark } from './modules/user'

console.log(headerLight)
export default {
  light: {
    'logo': blackLogo,
    mainBg: '#fff',
    boxShadow: 'rgba(0, 0, 0, .1)',
    ...headerLight,
    ...userLight
  },
  dark: {
    'logo': whiteLogo,
    mainBg: '#2a2c33',
    boxShadow: 'rgba(255, 255, 255, .1)',
    ...headerDark,
    ...userDark
  }
}
