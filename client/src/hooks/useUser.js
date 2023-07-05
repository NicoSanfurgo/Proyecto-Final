import { useState, useCallback } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import Actions from '../store/actions'
import { 
    login as apiLogin,
    register as apiRegister,
    getUser as apiGetUser,
  } from '../api/auth'



export default function useUser() {
    const [ state, setState ] = useState({
        loading: false,
        error: false
        })
    const user = useSelector(state => state.User)

    const getUser = async () => {
      try{
        const data = await apiGetUser()

        if(!data.user) throw err
        dispatch(Actions.User.save(data.user))
      }catch(err){
        console.error(err)
      }
    }
    const dispatch = useDispatch()

    const login = useCallback(
      async ({ email, password }) => {
          try{
            setState({ loading: true, error:false })
            const data = await apiLogin({ email,password })

            dispatch(Actions.User.save(data.user))
            
            localStorage.setItem('token',data.user.token)

            setState({ loading: false, error:false })
          }catch(err){
            setState({ loading: false, error: 'Credenciales invalidas' })
            console.error(err)
          }
      },
      [dispatch]
    )

    const register = useCallback(
      async (formData) => {
          try{
            setState({ loading: true, error:false })
            
            const data = await apiRegister(formData)

            dispatch(Actions.User.save(data.user))

            localStorage.setItem('token',data.user.token)
            
            setState({ loading: false, error:false })
          }catch(err){
            setState({ loading: false, error: 'Ha ocurrido un error' })
            console.error(err)
          }
      },
      [dispatch]
    )
  
    const logout = useCallback(
      async () => {
        try{
          setState({ loading: true, error: false })

          localStorage.removeItem('token')
          dispatch(Actions.User.logout())
          dispatch(Actions.Cart.removeAll())

          setState({ loading: false, error:false })
        }catch(err){
          setState({ loading: false, error: 'Ha ocurrido un error' })
          console.error(err)
        }
      },
      [dispatch])
  
    return {
      isLogged: Boolean(user.isLogged),
      login,
      logout,
      user,
      register,
      getUser,
      ...state,
    }
}