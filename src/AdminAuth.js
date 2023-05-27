import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminAuth = ({children}) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('admin')));


    if(currentUser!==null && currentUser.role==='admin'){
        return children;
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please login first!',
        });
        
        return <Navigate to="/login" />
    }
}

export default AdminAuth