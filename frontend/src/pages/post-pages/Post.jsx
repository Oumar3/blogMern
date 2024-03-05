import Sidebar from '../../components/sidebar/Sidebar';
import './post-pages.css'
import { posts, categories } from '../../dummyData'
import PostList from '../../components/posts/PostList';

// import PostList from '../../components/posts/PostList'
// import Sidebar from '../../components/Sidebar/Sidebar'
const Post = () => {
    return (
        <>
            <h5 className='post-page-title'>All Posts</h5>
            <section className="post-page">
                <PostList posts={posts} />
                <Sidebar categories={categories} />
            </section>
        </>
    );
}

export default Post;