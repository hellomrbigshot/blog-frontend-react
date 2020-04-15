import blackLogo from '../statics/image/logo_black_transparent.png'
import whiteLogo from '../statics/image/logo_white_transparent.png'
import { light as headerLight, dark as headerDark } from './modules/header'
import { light as userLight, dark as userDark } from './modules/user'

export default {
  light: {
    logo: blackLogo,
    mainBg: '#fff',
    hColor: '#000000d',
    boxShadow: 'rgba(0, 0, 0, .1)',
    linkColor: '#1890ff',
    descColor: '#999',
    mainColor: '#666',
    mainColorHover: '#222',
    mainBorderColor: '#eee',
    ...headerLight,
    ...userLight
  },
  dark: {
    logo: whiteLogo,
    mainBg: '#2a2c33',
    hColor: '#fff',
    boxShadow: 'rgba(255, 255, 255, .1)',
    linkColor: '#1890ff',
    descColor: '#ddd',
    mainColor: '#e3e3e4',
    mainColorHover: '#f9f9f9',
    mainBorderColor: '#222',
    ...headerDark,
    ...userDark
  }
}
