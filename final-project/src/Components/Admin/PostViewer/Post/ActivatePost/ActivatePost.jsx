import React from 'react';
import { BiCommentDetail, BiEditAlt, AiOutlineEye } from 'react-icons/all';
import { useNavigate } from 'react-router';
import { useAdminContext } from '../../../../../Contexts/AdminContext';

const ActivatePost = ( { id, title, toggleActive = () => {} } ) => {
    const { setFormState, setPostId, setClear } = useAdminContext();
    let navigate = useNavigate();
    return (
        <div className='border-2 border-purple-900 flex h-12 items-center justify-between mx-4 mt-5 rounded'>
            <div className='ml-4 w-9/12'>
                <h2 className='font-round text-base'>{ title }</h2>
            </div>
            
            <div className='flex h-full justify-between text-white text-2xl w-3/12 '>
                <div onClick={ () => {navigate(`/posts/${id}`)} }
                    className='bg-blue-500 hover:bg-blue-700 cursor-pointer flex h-full items-center justify-center w-4/12 '>
                    <BiCommentDetail />
                </div>

                <div onClick={ () => { setFormState( 'edit' ); setPostId( id ); setClear( false ); } }
                    className='bg-yellow-500 hover:bg-yellow-600 cursor-pointer flex h-full justify-center items-center w-4/12'>
                    <BiEditAlt />
                </div>

                <div onClick={ () => { toggleActive(); } }
                    className='bg-green-600 hover:bg-green-700 cursor-pointer flex h-full items-center justify-center w-4/12'>
                    <AiOutlineEye />
                </div>
            </div>
        </div>
    );
}

export default ActivatePost;