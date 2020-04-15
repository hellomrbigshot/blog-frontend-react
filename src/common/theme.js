
import darkTheme from '../theme/antdTheme/dark'
import lightTheme from '../theme/antdTheme/light'

const toggleTheme = (theme) => {
  const themeColor = theme === 'light' ? lightTheme : darkTheme
  window.less.modifyVars(themeColor)
    .then(() => { 
      console.log('主题切换成功')
    })
    .catch(error => {
        console.error(`Failed to update theme`)
    });
}
export default toggleTheme
