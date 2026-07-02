import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react'
import { api, setTokens, clearTokens, loadTokens } from '../lib/api'

interface User { id: number; username: string; email: string }

interface AuthState { user: User | null; loading: boolean }
type AuthAction = { type: 'LOGIN'; user: User } | { type: 'LOGOUT' } | { type: 'SET_LOADING'; loading: boolean }

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN': return { user: action.user, loading: false }
    case 'LOGOUT': return { user: null, loading: false }
    case 'SET_LOADING': return { ...state, loading: action.loading }
    default: return state
  }
}

interface AuthContextType {
  state: AuthState
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, { user: null, loading: true })

  useEffect(() => {
    loadTokens()
    const access = localStorage.getItem('access_token')
    if (access) {
      api.get<User>('/users/me')
        .then((user) => dispatch({ type: 'LOGIN', user }))
        .catch(() => dispatch({ type: 'SET_LOADING', loading: false }))
    } else {
      dispatch({ type: 'SET_LOADING', loading: false })
    }
  }, [])

  const login = async (username: string, password: string) => {
    const data = await api.post<{ access_token: string; refresh_token: string }>('/auth/login', { username, password })
    setTokens(data.access_token, data.refresh_token)
    const user = await api.get<User>('/users/me')
    dispatch({ type: 'LOGIN', user })
  }

  const register = async (username: string, email: string, password: string) => {
    const data = await api.post<{ access_token: string; refresh_token: string }>('/auth/register', { username, email, password })
    setTokens(data.access_token, data.refresh_token)
    const user = await api.get<User>('/users/me')
    dispatch({ type: 'LOGIN', user })
  }

  const logout = () => { clearTokens(); dispatch({ type: 'LOGOUT' }) }

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
