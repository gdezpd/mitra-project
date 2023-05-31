import React from 'react';
import { useParams } from "react-router-dom";

import s from  './UserPage.module.scss'


const UserPage = () => {

    const dataUser = useParams()

    return (
        <div className={s.containerUser}>
            {dataUser.userId}
            User Page
        </div>
    );
};

export default UserPage;