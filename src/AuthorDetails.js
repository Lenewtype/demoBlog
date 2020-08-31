import React from 'react';
import './AuthorDetails.css';


const AuthorDetails = ({email, website, company}) =>{
	
	return (
		<div className='author-details'>
			<div><label>Email:</label> {email}</div>
			<div><label>Website:</label> {website}</div>
			<div><label>Company:</label> {company.name}</div>
		</div>
	);
};

export default AuthorDetails;