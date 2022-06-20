import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const ProtectPrivate = ({children}) => {
 const {logged} = useSelector(state => state.auth);

 return logged 
       ?  children
       : <Navigate to="/" />
}

export default ProtectPrivate;