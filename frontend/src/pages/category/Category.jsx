import React from 'react';
import './category.css'
import { useParams } from 'react-router-dom';
import PostList from '../../components/posts/PostList';
import { posts } from '../../dummyData';
const Category = () => {
    const { category } = useParams()
    return (
        <section className='category'>
            <h1 className='category-title'>category {category}</h1>
            <PostList posts={posts} />
        </section>
    );
}

export default Category;
