import React from 'react'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { useQuery } from '../../../common'
import LogoBlack from '../../../statics/image/logo_black_transparent.png'

function SignWrapper ({ type, children }) {
  const user = useSelector(state => state.getIn(['user', 'user']))
  console.log('user', user)
  const queryRedirect = useQuery('redirect')
  const redirectUrl = queryRedirect ? decodeURIComponent(queryRedirect) : null
  console.log(redirectUrl)
  const signupPath = queryRedirect ? `/signup?redirect=${encodeURIComponent(redirectUrl)}` : '/signup'
  const signinPath = queryRedirect ? `/signin?redirect=${encodeURIComponent(redirectUrl)}` : '/signin'
  return user ? (
    <Redirect to={redirectUrl ? redirectUrl : '/'} />
  ) : (
    <div className='fixed top-0 left-0 right-0 bottom-0 overflow-hidden  bg-white flex items-center justify-center'>
      <Link className='absolute left-12 top-12 block' to="/">
        <img src={LogoBlack} width="200px" alt="网站 logo" />
      </Link>
      <div className='p-12 rounded-md shadow w-96'>
        <div className='text-center text-xl font-medium text-gray-500 flex items-center justify-center'>
          <Link className={classnames('p-2 border-b-3 border-solid hover:text-blue-500', { 'border-blue-500 text-blue-500': type === 'SIGNIN', 'border-white': type !== 'SIGNIN' })} to={signinPath}>
            登录
          </Link>
          <b className='p-2 border-b-3 border-solid border-white text-blue-500'>·</b>
          <Link className={classnames('p-2 border-b-3 border-solid hover:text-blue-500', { 'border-blue-500 text-blue-500': type === 'SIGNUP', 'border-white': type !== 'SIGNUP' })} to={signupPath}>注册</Link>
        </div>
        { children }
      </div>
    </div>
  )
}
export default SignWrapper
