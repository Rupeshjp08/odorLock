import { createContext, useContext, useReducer, useEffect } from 'react';
import { PRODUCT } from '../data/config';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Key by productId + variantId so each colour is a separate cart line
      const key = action.payload.cartKey;
      const existing = state.items.find(i => i.cartKey === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.cartKey === key ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.cartKey !== action.payload) };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.cartKey !== action.payload.cartKey) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.cartKey === action.payload.cartKey ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Restore cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('odorlock_cart');
      if (saved) dispatch({ type: 'SET_CART', payload: JSON.parse(saved) });
    } catch {}
  }, []);

  // Persist cart changes to localStorage
  useEffect(() => {
    localStorage.setItem('odorlock_cart', JSON.stringify(state.items));
  }, [state.items]);

  /**
   * addToCart(variantId, variantLabel)
   * variantId: 'white' | 'black'
   * Each colour/variant is a separate cart line.
   */
  const addToCart = (variantId = 'white', variantLabel = 'Arctic White') => {
    const variant = PRODUCT.variants?.find(v => v.id === variantId) || PRODUCT.variants?.[0];
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: PRODUCT.id,
        variantId: variant?.id || variantId,
        variantLabel: variant?.label || variantLabel,
        cartKey: `${PRODUCT.id}-${variant?.id || variantId}`,
        name: PRODUCT.name,
        variantName: `${PRODUCT.name} — ${variant?.label || variantLabel}`,
        image: variant?.image || PRODUCT.image,
        color: variant?.color || '#F8FAFC',
        colorBorder: variant?.border || '#CBD5E1',
      },
    });
  };

  const removeFromCart = (cartKey) => dispatch({ type: 'REMOVE_ITEM', payload: cartKey });

  const updateQuantity = (cartKey, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartKey, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
