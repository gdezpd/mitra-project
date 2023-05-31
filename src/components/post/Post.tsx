import React, { useEffect, useState } from 'react';
import { ReactComponent as Icon } from "../../assets/icon/user.svg";
import Button from 'react-bootstrap/Button';

import s from './Posrt.module.scss'
import { Link } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { rootThunks } from "../../store/rootSlice";
import { CommentsType } from "../../store/api";
import { Tab, Tabs } from 'react-bootstrap';

type PostType = {
    title: string
    body: string
    userName: string
    userId: number
    postId: number
    commentsPost: CommentsType[]
}

const Post = ({ title, body, userName, userId, postId, commentsPost }: PostType) => {

    const { getComments } = useActions(rootThunks)

    const [fetchingComments, setFetchingComments] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (fetchingComments) {
            getComments({ postId })
        }
    }, [fetchingComments])

    const getCommentsForPost = () => {
        setFetchingComments(true)
        setIsOpen(!isOpen)
    }

    return (
        <div className={s.container}>
            <Link to={`/user/${userId}`} className={s.iconLink}>
                <Icon className={s.icon}/>
                <h5 className={s.userName}>{userName}</h5>
            </Link>

            <h5 className={s.titlePost}>{title}</h5>

            <div className={s.body}>{body}</div>

            <Button variant='secondary' size='sm' className={s.button} onClick={getCommentsForPost}>
                Comments
            </Button>


            {/*<button onClick={getCommentsForPost} className={s.button}>Comments</button>*/}
            {isOpen && <>
                {commentsPost.map((el, index) => (<div key={index} className={s.comment}>
                        <h5 className={s.emailComment}>{el.email}</h5>
                        <div className={s.textComment}>{el.body}</div>
                    </div>)
                )}
            </>}
        </div>
    );
};

export default Post;