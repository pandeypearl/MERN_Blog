import { useEffect } from 'react';
import Post from '../components/Post';

export default function HomePage() {
	useEffect(() => {
		fetch('/post').then(response => {
			response.json().then(posts => {
				console.log(posts);
			})
		})

	}, []);
	return (
		<>
			<Post />
			<Post />
			<Post />
		</>
	);
}