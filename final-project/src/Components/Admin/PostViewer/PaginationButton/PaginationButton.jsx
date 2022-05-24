import React from 'react';

const PaginationButton = ( { actionText, onPagination = () => {} } ) => {
    return <button 
                onClick={ () => { onPagination(); } }
                className="bg-purple-600 hover:bg-purple-800 mx-2 px-4 py-1 rounded text-white text-xl">{ actionText }
            </button>;
}

export default PaginationButton;