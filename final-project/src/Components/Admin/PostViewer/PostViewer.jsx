import React, { useState, useEffect, useContext } from 'react';
import { useAdminContext } from '../../../Contexts/AdminContext';
import SessionContext from '../../../Contexts/SessionContext';
import { useAdminServices } from '../../../Services/Admin.services';
import Button from '../../Button/Button';
import PaginationButton from './PaginationButton/PaginationButton';
import Post from './Post/Post';
import SearchBar from './SearchBar/SearchBar';

const PostViewer = () => {
    const { formState, postState, clear, setClear, page, setPage } = useAdminContext();
    const [ adminPosts, setAdminPosts ] = useState([]);
    const { authenticated } = useContext(SessionContext);

    useEffect(() => {
        const fetchAdminPosts = async () => {
            try {
                const token = authenticated.token;

                const response = await useAdminServices.getAdminPosts( token, 10, page );

                setAdminPosts( response['data'] );
            } catch (error) {
                console.log(error);
            };
        }

        fetchAdminPosts();
    }, [ page, formState, postState, clear ]);

    const onPrevPagination = () => {
        let newPage = page;
        
        if ( newPage === 0 ) {
            return;
        } else {
            newPage -= 1;
            setPage( newPage );
        }
    }

    const onNextPagination = () => {
        let newPage = page;
        
        newPage += 1;
        setPage( newPage );
    }

    return (
        <div className='flex flex-col w-full md:w-1/2'>
            <SearchBar searchFunction={ setAdminPosts } clearFunction={ setClear } />
            
            { adminPosts.map(post => {
                return <Post
                key={post._id}
                id={post._id}
                title={post.title} 
                active={post.active} />
            })}

            
            {clear && 
                (
                    <div className='flex items-center justify-center mb-8 mt-6'>
                        <Button
                            localStyle='bg-pink-500 hover:bg-pink-700 mx-2 px-4 py-1 rounded text-white text-xl'
                            text='Clear search'
                            onClick={(e) => { e.preventDefault(); setPage(0); setClear(false) }} 
                        />
                    </div>
                )
            }

            {!clear &&
                (
                    <div className='flex items-center justify-center mb-8 mt-6'>
                        <PaginationButton actionText='Previous' onPagination={ onPrevPagination }/>
                        <PaginationButton actionText='Next' onPagination={ onNextPagination }/>
                    </div>
                )
            }
        </div>
    );
}

export default PostViewer;