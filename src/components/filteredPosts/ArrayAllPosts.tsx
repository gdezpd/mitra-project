import { PostType } from "../../store/api";
import { useAppSelector } from "../../store/store";
import s from "../../pages/HomePage/HomePage.module.scss";
import Post from "../post/Post";
import React from "react";

type FilteredPostsType = {
    allPosts: PostType[],
    sortPosts: PostType[],
    searchValue: string,
    sort:boolean
}

export const ArrayAllPosts = ({
                                  allPosts,
                                  sortPosts,
                                  searchValue,
                                  sort
                              }: FilteredPostsType) => {
    const {
        comments,
        users,
    } = useAppSelector(state => ({
        comments: state.root.comments,
        users: state.root.users,
    }))
    return (
        <>
            {(sort ? sortPosts : allPosts).filter(search => {
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
            )}
        </>
    )

}