import React from 'react';
import SectionTitles from '../../../shared/components/SectionTitles';
import UsersPage from '../../../components/Users/UserDataTable';

function UserCrud() {
    return (
        <>
            <SectionTitles title={'User Management'} />
            <UsersPage />
        </>
    );
}

export default UserCrud;
