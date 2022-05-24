import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AdminProvider } from '../../Contexts/AdminContext';
import SessionContext from '../../Contexts/SessionContext';
import CreateEditForm from './CreateEditForm/CreateEditForm';
import Header from './Header/Header';
import PostViewer from './PostViewer/PostViewer';

const Admin = () => {
    const {authenticated} = useContext(SessionContext);
    let navigate = useNavigate();
    useEffect(()=>{
        if(!authenticated.logged){
            navigate("/");
        }
    },[])
    return (
        <AdminProvider>
            <Header />
            <div className='flex flex-col h-screen md:flex-row'>
                <CreateEditForm />
                <PostViewer />
            </div>  
        </AdminProvider>
    );
}

export default Admin;