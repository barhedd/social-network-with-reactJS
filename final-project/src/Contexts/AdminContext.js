import {
    createContext,
    useContext,
    useState,
} from 'react';

const AdminContext = createContext();

export const AdminProvider = ( props ) => {
    const [ formState, setFormState ] = useState( 'create' );
    const [ postState, setPostState ] = useState(0);
    const [ helpMessage, setHelpMessage ] = useState('Hola');
    const [ postId, setPostId ] = useState(undefined);
    const [ page, setPage ] = useState(0);
    const [ clear, setClear ] = useState(false);

    const providerValue = {
        formState: formState,
        setFormState: setFormState,
        postState: postState,
        setPostState: setPostState,
        helpMessage: helpMessage,
        setHelpMessage: setHelpMessage,
        postId: postId,
        setPostId: setPostId,
        page: page,
        setPage: setPage,
        clear: clear,
        setClear: setClear,
    }
        
    return (
        <AdminContext.Provider value={ providerValue }>
            { props.children }
        </AdminContext.Provider>
    );
}

export const useAdminContext = () => {
    const context = useContext( AdminContext );

    if( !context ) {
        throw new Error( 'No estás dentro del Admin Context' );
    }

    return context;
}