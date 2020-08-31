import React from 'react';
import './Post.css';
import globals from './globals.js';
import PropTypes from 'prop-types';
import AuthorDetails from './AuthorDetails';

const useState = React.useState;

const propTypes = {
	userId: PropTypes.number,
	id: PropTypes.number,
	title: PropTypes.string,
	body: PropTypes.string,
	comments: PropTypes.array
};

const Post = ({title, id, userId, body, comments=[]}) => {

	const [showAuthorDetails, updateShowAuthorDetails] = useState(false);
	const [showComments, updateShowCommments] = useState(false);
	let userDetails= globals.userData.find( user => user.id === userId);

	const onDetailClick = () => {
		updateShowAuthorDetails(!showAuthorDetails);
	};

	const onCommentBtnClick = () => {
		updateShowCommments(!showComments);
	};

	return (
		<section className='post'>
			<h2>{title}</h2>
			<button className='btn--text post__author' onClick={onDetailClick}>
				By {userDetails.name} 
				<span className={`arrow ${showAuthorDetails? 'arrow--active': ''}`}/>
			</button>
			{showAuthorDetails? (
				<AuthorDetails {...userDetails}/>
			): null}
			<p className='post__body'>{body}</p>
			<button className='btn' onClick={onCommentBtnClick}>
				{comments.length} Comment{comments.length > 1? 's' : ''} <span className={`arrow ${showComments? 'arrow--active': ''}`}/>
			</button>
			{showComments? (
				<div className='post__comments'>
					{comments.map( (comment, index) => (
						<div className='post__comment' key={`comment-${index}`}>
						<div className='post__comment__author'>{comment.name} says:</div>
							<div className='post__comment_body'>{comment.body}</div>
						</div>
					)
				)}
				</div>
			): null}
		</section>
	);
};

Post.propTypes = propTypes;
export default Post;