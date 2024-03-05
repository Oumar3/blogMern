import React from 'react';
import { Link } from 'react-router-dom'
const PostItem = ({ post }) => {
    return (
        <div className='post-item'>
            <div className="post-item-image-wrapper">
                <img src={post.image} alt="" />
            </div>
            <div className="post-item-info-wrapper">
                <div className="post-item-info">
                    <div className="post-item-author">
                        <strong>Author : </strong>
                        <Link className='post-item-username' to='/profile/1'>{post.user.username}</Link>
                    </div>
                    <div className="post-item-date">
                        {new Date(post.createdAt).toDateString()}
                    </div>
                </div>
                <div className="post-item-details">
                    <h4 className="post-item-title">{post.title}</h4>
                    <Link className='post-item-category' to={`/posts/categories/${post.category}`}>
                        {post.category}
                    </Link>
                </div>
                <p className='post-item--description'>
                    {post.description} <br /> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt provident
                    perspiciatis ullam voluptate fuga natus officia aperiam saepe reprehenderit!
                    Sequi sunt eveniet cupiditate magnam rem quidem natus deserunt libe delectus
                </p>
                <Link className='post-item-link' to={`/posts/detail/${post._id}`}>Lire plus</Link>
            </div>
        </div>
    );
}

export default PostItem;
