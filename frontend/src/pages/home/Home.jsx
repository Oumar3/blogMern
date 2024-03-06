import React from 'react';
import './home.css'
import PostList from '../../components/header/posts/PostList';
import { posts, categories } from '../../dummyData'
const Home = () => {
    return (
        <section className="home">
            <div className="home-hero-header">
                <div className="home-hero-header-layout">
                    <h1 className="home-title">Bienvenue sur BlogNa </h1>
                </div>
            </div>
            <div className="home-latest-post">Latest Post</div>
            <div className="home-container">
                <PostList posts={posts} />
                <div className="post-sidebar">Side bar</div>
            </div>
        </section>
    )
}

export default Home;
