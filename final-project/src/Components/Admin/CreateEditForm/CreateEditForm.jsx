import React from 'react';
import { useAdminContext } from '../../../Contexts/AdminContext';
import CreateForm from './CreateForm/CreateForm';
import EditForm from './EditForm/EditForm';

const CreateEditForm = () => {
    const { formState } = useAdminContext();

    if ( formState === 'create' ) {
        return <CreateForm />
    } else {
        return <EditForm />
    }
}

export default CreateEditForm;