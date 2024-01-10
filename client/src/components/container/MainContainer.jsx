import React from 'react';

const MainContainer = ({children}) => {
    return (
        <div className='container mx-auto'>
            {children}
        </div>
    );
};

export default MainContainer;