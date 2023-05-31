import React from 'react';
import { useParams } from "react-router-dom";


const UserPage = () => {

    const dataUser = useParams()

    return (
        <div>
            {dataUser.userId}
            User Page
        </div>
    );
};

export default UserPage;