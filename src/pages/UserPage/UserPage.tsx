import React from 'react';
import { useParams } from "react-router-dom";

import s from  './UserPage.module.scss'
import { useAppSelector } from "../../store/store";


const UserPage = () => {

    const dataUser = useParams()

    const {
        comments,
        postsPage,
        allPosts,
        sortPosts,
        users,
        fetching,
        totalCount,
        searchValue
    } = useAppSelector(state => ({
        postsPage: state.root.posts,
        comments: state.root.comments,
        allPosts: state.root.allPosts,
        sortPosts: state.root.sortPosts,
        users: state.root.users,
        fetching: state.root.fetching,
        totalCount: state.root.totalCount,
        searchValue: state.root.searchValue,
    }))

    return (
        <div className={s.containerUser}>
            {dataUser.userId}
            User Page
        </div>
    );
};

export default UserPage;