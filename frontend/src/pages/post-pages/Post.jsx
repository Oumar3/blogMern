import Sidebar from '../../components/sidebar/Sidebar';
import './post-pages.css'
import { posts, categories } from '../../dummyData'
import PostList from '../../components/posts/PostList';
import Pagination from '../../components/pagination/Pagination';
import { useEffect } from 'react';

// import PostList from '../../components/posts/PostList'
// import Sidebar from '../../components/Sidebar/Sidebar'
const Post = () => {
    useEffect(() => {
        window.scrollTo(0, 220)
    })
    return (
        <>
            <h5 className='post-page-title'>All Posts</h5>
            <section className="post-page">
                <PostList posts={posts} />
                <Sidebar categories={categories} />
            </section>
            <Pagination />
        </>
    );
}

export default Post;