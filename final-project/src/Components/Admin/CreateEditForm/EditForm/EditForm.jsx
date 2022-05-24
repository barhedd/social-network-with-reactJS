import React, { useState, useEffect, useContext } from 'react';
import { useAdminContext } from '../../../../Contexts/AdminContext';
import { useAdminServices } from '../../../../Services/Admin.services';
import SessionContext from '../../../../Contexts/SessionContext';
const EditForm = () => {
    const { postId, setFormState, setPostId, helpMessage, setHelpMessage } = useAdminContext();
    const { authenticated } = useContext(SessionContext);
    const [ data, setData ] = useState({
        title: '',
        description: '',
        image: '',
    });

    useEffect(() => {
        const getAPost = async () => {
            try {
                const token = authenticated.token;
    
                const response = await useAdminServices.getOnePost( token, postId );
            
                const newData = {
                    title: response.title,
                    description: response.description,
                    image: response.image,
                }
                
                setData( newData );
            } catch ( error ) {
                console.log( error );
            }
        }

        getAPost();
    }, [ postId ]);

    const handleInputChange = ( e ) => {
        setData({
            ...data, [ e.target.name ]: e.target.value
        });
    }

    const validateData = ( e ) => {
        let allOk = true;

        const { title, description, image } = { ...data };

        const helpMessageContainer = document.querySelector('#help-message-edit');
        
        if ( title.trim() === '' ) {
            setHelpMessage( 'Debes ingresar un titulo' ); 
            allOk = false;
        } else if ( description.trim() === '' ) {
            setHelpMessage( 'Debes ingresar una descripción' );
            allOk = false;
        } else if ( image.trim() === '' ) {
            setHelpMessage( 'Debes ingresar una URL como imagen' ); 
            allOk = false;
        } else {
            if( title.trim().length < 8 ) {
                setHelpMessage( 'El titulo debe tener entre 8 y 32 caracteres' );
                allOk = false;
            } else if ( description.trim().length < 8 ) {
                setHelpMessage( 'La descripción debe tener como mínimo 8 caracteres' );
                allOk = false;
            }
        }

        if ( allOk ) {
            const token = authenticated.token;
            editPost( token, postId, title, description, image );
        }
        else {
            e.preventDefault();
            helpMessageContainer.classList.remove('hidden');

            setTimeout(() => {
                helpMessageContainer.classList.add('hidden');
            }, 3500);
        }
    }

    const editPost = async ( token, postId, title, description, image ) => {
        try {
            const response = await useAdminServices.updatePost( token, postId, title, description, image );
            
            if( response ) {
                console.log( response );
                setFormState('create'); 
                setPostId( undefined );
            } else {
                console.log('Ha ocurrido un error');
            }  
        } catch ( error ) {
            console.log( error );
        }
    }

    return (
        <div className='bg-green-600 flex flex-col items-center w-full min-h-690 md:w-1/2 md:h-screen'>
            <form className='bg-gray-100 flex flex-col mt-5 p-5 rounded-lg w-4/5'>
                <h2 className='font-normal font-bold text-center text-3xl'>Edit post</h2>

                <label htmlFor='title-input' className='mt-2'>Title</label>
                <input 
                    type='text' 
                    id='title-input' 
                    name='title' 
                    placeholder='f.e. The benefits of exercise' 
                    className='border-2 border-gray-300 mt-1 px-3 py-1 rounded' 
                    value={ data.title }
                    onChange={ handleInputChange }
                />

                <label htmlFor='description-text-area' className='mt-4'>Description</label>
                <textarea 
                    id='description-text-area' 
                    name='description' 
                    cols='40' 
                    rows='5' 
                    placeholder='f.e. The health benefits of regular physical activity and exercise cannot be ignored. Everyone benefits from exercise, regardless of age, gender, or physical ability' 
                    className='border-2 border-gray-300 mt-1 px-3 py-1 rounded'
                    value={ data.description }
                    onChange={ handleInputChange }
                />

                <label htmlFor='image-input' className='mt-4'>Image</label>
                <input 
                    type='text' 
                    id='image-input' 
                    name='image' 
                    placeholder='f.e. https://health.clevelandclinic.org/wp-content/uploads/sites/3/2013/09/inexpensiveExercise-1277759983-770x533-1.jpg' 
                    className='border-2 border-gray-300 mt-1 px-3 py-1 rounded'
                    value={ data.image }
                    onChange={ handleInputChange }
                />

                <div className='flex flex-col justify-evenly w-full mt-2 lg:flex-row'>
                    <button 
                        id='clear-all' 
                        className='bg-gray-300 hover:bg-gray-400 mt-5 px-2 py-2 rounded self-center text-center w-full lg:w-2/6'
                        onClick={ () => { setFormState('create'); setPostId( undefined ) } }
                    >Cancel</button>

                    <button 
                        id='update' 
                        className='bg-purple-600 hover:bg-purple-800 mt-5 px-2 py-2  rounded self-center text-center text-white w-full lg:w-2/6'
                        onClick={ validateData }
                    >Edit post</button>
                </div>
            </form>
            
            <p id='help-message-edit' className='bg-orange hidden mt-8 py-2 rounded text-center text-xl text-white w-3/4'>{ helpMessage }</p>
        </div>
    );
}

export default EditForm;