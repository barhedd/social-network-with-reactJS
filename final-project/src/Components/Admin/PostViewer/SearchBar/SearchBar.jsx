import React, { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/all'
import { useAdminContext } from '../../../../Contexts/AdminContext';
import { useAdminServices } from '../../../../Services/Admin.services';

const SearchBar = ( { searchFunction = () => { }, clearFunction = () => { } } ) => {
    const { setHelpMessage, setClear, page, formState } = useAdminContext();
    const [ search, setSearch ] = useState('');

    //function created to find one specific post, according to user input
    const searchPost = async ( searchText, setter = () => {} ) => {
        try {
            clearFunction(true); 
            setSearch('');

            //token shall be added when login is incorporated
            //const token = 
            let found = false;

            //number of page to query
            let flagPage = 0;
            let response;
            const loginInfo = await useAdminServices.tempLogin();

            const token = loginInfo['token'];

            do {
                response = await useAdminServices.getAdminPosts( token, 100, flagPage );

                if (!response) {
                    console.log(response['error']);
                }
                else if (response['data'].length == 0) {
                    //If no data came back from the server, we go out of the loop, since we'd gone over everypost
                    const helpMessageContainer = document.querySelector('#help-message');
                    
                    setHelpMessage( 'No se encontró ningún post con ese título' );
                    
                    helpMessageContainer.classList.remove('hidden');

                    setTimeout(() => {
                        helpMessageContainer.classList.add('hidden');
                    }, 4000);

                    break;
                }
                else {
                    if (response['data'].some(post => post.title === searchText))
                        found = true;
                    else
                        flagPage += 1;
                }
            } while (found === false);

            if (found) {   //retriving the post needed 
                const searchedPost = response['data'].filter(post => post.title === searchText)
                setter( searchedPost );
            } else {
                setClear( false );
                const response = await useAdminServices.getAdminPosts( token, 10, page );
                setter( response['data'] );
            }
        } catch (error) {
            console.log(error);
        }
    }

    const validateFormStatus = () => {
        if ( formState === 'edit' ) {
            setSearch('');
            const helpMessageContainer = document.querySelector('#help-message');
            setHelpMessage( 'No puedes buscar un post mientras estás editando otro' );
            helpMessageContainer.classList.remove('hidden');
                    
            setTimeout(() => {
                helpMessageContainer.classList.add('hidden');
            }, 4000);
        } else {
            searchPost( search, searchFunction );
        }
    }


    return (
        <div className='flex justify-center mt-5'>
            <input 
                type='text' 
                placeholder='Search a post by its title here' 
                className='border-2 border-gray-300 font-normal px-3 py-1 rounded-l-lg text-base w-1/2'
                onChange={ (e) => { setSearch(e.target.value) } }
                value={ search }
            />
            <div 
                onClick={ (e) => { e.preventDefault(); validateFormStatus();  } }
                className='bg-purple-600 hover:bg-purple-800 border-2 border-gray-400 cursor-pointer flex items-center justify-center px-3 py-1 rounded-r-lg text-lg text-white'>
                <BiSearchAlt2 />
            </div>
        </div>
    );
}

export default SearchBar;