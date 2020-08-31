import React from 'react';
import logo from './logo.svg';
import './Blog.css';
import globals from './globals.js';
import Post from './Post.js';

const useEffect = React.useEffect;
const useState = React.useState;

function Blog() {
  const [isLoading, updateIsLoading] = useState(true);
  const [blogPosts, updateBlogPosts] = useState([]);
  const [comments, updateComments] = useState({});

  useEffect( ()=> {
    //on page load
    fetch(`${globals.baseUrl}/posts`).then(response=> response.json()).then( 
      (data) => {
        if(Array.isArray(data)) {
          updateBlogPosts(data);
          getAuthorData();
        }
      }
    );
  }, []);

  const getAuthorData = () => {
    fetch(`${globals.baseUrl}/users`).then(response=> response.json()).then(
      (data) => {
        if(Array.isArray(data)) {
          globals.userData = data;
          getCommentData();
        }
      }
    );
  };

  const getCommentData = () => {
    fetch(`${globals.baseUrl}/comments`).then(response=> response.json()).then(
      (data) => {
        if(Array.isArray(data)) {
          //turn comment data into a map by ID
          let dataMap = {};

          data.forEach(item => {
            if(dataMap[item.postId]) {
              dataMap[item.postId].push(item);
            }
            else {
              dataMap[item.postId] = [item];
            }
          });
          updateComments(dataMap);
          updateIsLoading(false);
        }
      }
    );
  }

  const mainContent = (
    <main className='blog__posts'>
      {blogPosts.map( (post, index) => {
        return (
          <Post 
            {...post}
            comments={comments[post.id]}
            key={`post-${index}`}
          />
        );
      })}
    </main>
  );


  return (
    <div className="blog">
      <h1>My Super Cool Blog</h1>
      {isLoading? (
        <p>Loading Blog Posts...</p>
      ): mainContent }
    </div>
  );
}

export default Blog;
