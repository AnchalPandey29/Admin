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
            text: 'You are not authorized to access this page!',
        });
        
        return <Navigate to="/login" />
    }
}

export default AdminAuth