import { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isAuthenticated: true, loading: false };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('odorlock_user');
      if (saved) {
        const user = JSON.parse(saved);
        dispatch({ type: 'LOGIN', payload: user });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    await new Promise(r => setTimeout(r, 1000));
    // Demo auth — replace with real backend
    const users = JSON.parse(localStorage.getItem('odorlock_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      localStorage.setItem('odorlock_user', JSON.stringify(safeUser));
      dispatch({ type: 'LOGIN', payload: safeUser });
      return { success: true };
    }
    dispatch({ type: 'SET_LOADING', payload: false });
    return { success: false, error: 'Invalid email or password.' };
  };

  const signup = async (data) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    await new Promise(r => setTimeout(r, 1000));
    const users = JSON.parse(localStorage.getItem('odorlock_users') || '[]');
    if (users.find(u => u.email === data.email)) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser = { ...data, id: `USR-${Date.now()}`, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('odorlock_users', JSON.stringify(users));
    const { password: _, ...safeUser } = newUser;
    localStorage.setItem('odorlock_user', JSON.stringify(safeUser));
    dispatch({ type: 'LOGIN', payload: safeUser });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('odorlock_user');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (updates) => {
    const updated = { ...state.user, ...updates };
    localStorage.setItem('odorlock_user', JSON.stringify(updated));
    // Also update in users list
    const users = JSON.parse(localStorage.getItem('odorlock_users') || '[]');
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx !== -1) { users[idx] = { ...users[idx], ...updates }; localStorage.setItem('odorlock_users', JSON.stringify(users)); }
    dispatch({ type: 'UPDATE_USER', payload: updates });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, signup, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
