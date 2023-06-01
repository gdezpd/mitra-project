import React, { useEffect } from 'react';
import Post from '../../components/post/Post';
import { useActions } from "../../hooks/useActions";
import { getAllPosts, isFetchingStatus, rootThunks } from "../../store/rootSlice";
import { useAppDispatch, useAppSelector } from '../../store/store';
import s from './HomePage.module.scss'
import { SearchForm } from "../../components/searchForm/SearchForm";

const HomePage = () => {
    const dispatch = useAppDispatch()

    const { getPosts, getUsers, getAllPosts } = useActions(rootThunks)
    const comments = useAppSelector(state => state.root.comments)
    const postsPage = useAppSelector(state => state.root.posts)
    const allPosts = useAppSelector(state => state.root.allPosts)
    const users = useAppSelector(state => state.root.users)
    const fetching = useAppSelector(state => state.root.fetching)
    const totalCount = useAppSelector(state => state.root.totalCount)
    const searchValue = useAppSelector(state => state.root.searchValue)

    useEffect(() => {
        if (fetching) {
            getPosts({})
            getUsers({})
            getAllPosts({})
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    },)

    const scrollHandler = () => {
        if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100 &&
            postsPage.length < totalCount) {
            dispatch(isFetchingStatus(true))
        }
    }
    const filteredPosts = allPosts.filter(search => {
        return search.title.toLowerCase().includes(searchValue)
    })


    return (
        <div className={s.containerHome}>
            <SearchForm/>
            {
                searchValue === '' ?
                    (postsPage.map((el, index) => {
                            const user = users.find(user => user.id === el.userId)
                            const commentsPost = comments.filter(post => post.postId === el.id)
                            if (user) {
                                return <div key={index} className={s.wrapperPost}>
                                    <Post title={el.title} body={el.body} userName={user.username} userId={user.id}
                                          postId={el.id}
                                          commentsPost={commentsPost}/>
                                </div>
                            }
                        }
                    )) : (allPosts.filter(search => {
                        return search.title.toLowerCase().includes(searchValue.toLowerCase())
                    }).map((el, index) => {
                            const user = users.find(user => user.id === el.userId)
                            const commentsPost = comments.filter(post => post.postId === el.id)
                            if (user) {
                                return <div key={index} className={s.wrapperPost}>
                                    <Post title={el.title} body={el.body} userName={user.username} userId={user.id}
                                          postId={el.id}
                                          commentsPost={commentsPost}/>
                                </div>
                            }
                        }
                    ))
            }

        </div>
    );
};

export default HomePage;
