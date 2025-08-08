import SectionTitles from '../../../shared/components/SectionTitles';
import RolesData from '../../../components/Roles/RoleDataTable';

function RolesCrud() {
    return (
        <>
            <SectionTitles title={'Roles Management'} />
            <RolesData />
        </>
    );
}

export default RolesCrud;
