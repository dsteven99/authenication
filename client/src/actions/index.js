import { AUTH_USER, AUTH_ERROR } from './types';
import authenticate from '../apis/authenticate'

export const signup = (formValues, callback) => async dispatch => {
    try {
        const response = await authenticate.post('/signup', { ...formValues });
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({type: AUTH_ERROR, payload: 'Email in use'})
    }
};

export const signin = (formValues, callback) => async dispatch => {
    try {
        const response = await authenticate.post('/signin', { ...formValues });
        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({type: AUTH_ERROR, payload: 'Invalid login credentials'})
    }
};

export const signout = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH_USER,
        payload: ''
    }
};