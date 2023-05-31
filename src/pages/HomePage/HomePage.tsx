import React, { useEffect } from 'react';
import Post from '../../components/post/Post';
import { useActions } from "../../hooks/useActions";
import { isFetchingStatus, rootThunks } from "../../store/rootSlice";
import { useAppDispatch, useAppSelector } from '../../store/store';
import s from './HomePage.module.scss'

const HomePage = () => {
    const dispatch = useAppDispatch()

    const { getPosts, getUsers } = useActions(rootThunks)
    const comments = useAppSelector(state => state.root.comments)
    const posts = useAppSelector(state => state.root.posts)
    const users = useAppSelector(state => state.root.users)
    const fetching = useAppSelector(state => state.root.fetching)
    const totalCount = useAppSelector(state => state.root.totalCount)

    useEffect(() => {
        if (fetching) {
            getPosts({})
            getUsers({})
        }
    }, [fetching])
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    },)

    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 &&
            posts.length < totalCount) {
            dispatch(isFetchingStatus(true))
        }
    }

    return (
        <div className={s.containerHome} >
            {posts.map((el, index) => {
                    const user = users.find(user => user.id === el.userId)
                    const commentsPost = comments.filter(post => post.postId === el.id)
                    if (user) {
                        return <div key={index} className={s.wrapperPost}>
                            <Post title={el.title} body={el.body} userName={user.username} userId={user.id} postId={el.id}
                                  commentsPost={commentsPost}/>
                        </div>
                    }
                }
            )}
        </div>
    );
};

export default HomePage;
