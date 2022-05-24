import React, {useContext} from 'react';
import { useAdminContext } from '../../../../Contexts/AdminContext';
import { useAdminServices } from '../../../../Services/Admin.services';
import ActivatePost from './ActivatePost/ActivatePost';
import DeactivePost from './DeactivePost/DeactivePost';
import SessionContext from '../../../../Contexts/SessionContext';

const Post = ( { id, title, active } ) => {
    const { setPostState } = useAdminContext();
    const { authenticated } = useContext(SessionContext);
    const getDate = () => {
        const date = new Date().getTime() / 10;
        return date;
    }

    const toggleActive = async () => {
        try {
            //const loginInfo = await useAdminServices.tempLogin();
            const token = authenticated.token;

            const response = await useAdminServices.toggleActive( token, id );
            
            if( response ) {
                console.log( response );
                setPostState( getDate() );
            } else {
                console.log('Ha ocurrido un error');
            }
        } catch ( error ) {
            console.log( error );
        }
    }

    if ( active ) {
        return <ActivatePost id={id} title={title} toggleActive={toggleActive} />
    } else {
        return <DeactivePost id={id} title={title} toggleActive={toggleActive} />
    }
}

export default Post;
