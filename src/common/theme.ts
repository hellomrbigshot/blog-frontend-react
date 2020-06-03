
import darkTheme from '../theme/antdTheme/dark'
import lightTheme from '../theme/antdTheme/light'

interface ITheme {
  [x: string]: string
}
interface ILess {
  modifyVars: Function
}
interface ICustomWindow extends Window {
  less?: ILess
}
const toggleTheme = (theme: string): void => {
  const ThemeInfo: ITheme = theme === 'light' ? lightTheme : darkTheme
  // (window as ICustomWindow).less?.modifyVars(ThemeInfo)
  const less = (window as ICustomWindow).less
  less?.modifyVars(ThemeInfo)
    .then(() => {
      console.log('主题切换成功')
    })
    .catch(() => {
        console.error('主题切换失败')
    })
}
export default toggleTheme
