import {
	FaCodepen,
	FaStore,
	FaUserFriends,
	FaUsers,
} from "react-icons/fa";
import { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import GithubContext from "../context/github/GithubContext";

function User() {
	const { getHighlightUser, highlightUser, isLoading } =
		useContext(GithubContext);

	const params = useParams();

	useEffect(() => {
		getHighlightUser(params.login);
	}, []);

	const {
		name,
		type,
		avatar_url,
		location,
		bio,
		blog,
		twitter_username,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable,
	} = highlightUser;

	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			{/* Main container */}
			<div className='w-full mx-auto lg:w-10/12'>
				{/* Back to search button */}
				<div className='mb-4'>
					<Link
						to='/'
						className='btn btn-ghost'
					>
						Back To Search
					</Link>
				</div>
				{/* Main wrapper div */}
				<div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
					{/* Avatar Image Container */}
					<div className='custom-card-image mb-6 md:mb-0'>
						<div className='rounded-lg shadow-xl card image-full'>
							<figure>
								<img
									src={avatar_url}
									alt='Avatar Image'
								/>
							</figure>
							{/* Card title and body (Name and login) */}
							<div className='flex card-body justify-end'>
								<h2 className='card-title mb-0'>
									{name}
								</h2>
								<p className='flex grow-0'>
									{login}
								</p>
							</div>
						</div>
					</div>
					{/* Name and bio section */}
					<div className='col-span-2'>
						<div className='mb-6'>
							{/* Name (Large) and bio */}
							<h1 className='text-3xl card-title'>
								{name}
								{/* Badges for user type and whether or not they're hireable */}
								<div className='ml-2 mr-1 badge badge-success'>
									{type}
								</div>
								{hireable && (
									<div className='mx-1 badge badge-info'>
										Hireable
									</div>
								)}
							</h1>
							<p>{bio}</p>
							{/* Go to GitHub profile button */}
							<div className='mt-4 card-actions'>
								<a
									href={html_url}
									target='_blank'
									rel='noreferrer'
									className='btn btn-outline'
								>
									Visit Github Profile
								</a>
							</div>
						</div>
						{/* Location, Website and Twitter Links (if applicable) */}
						<div className='w-full rounded-lg shadow-md bg-base-100 stats'>
							{location && (
								// Stat is a DaisyUI class
								<div className='stat'>
									<div className='stat-title td-md'>
										Location
									</div>
									<div className='text-lg stat-value'>
										{location}
									</div>
								</div>
							)}
							{blog && (
								<div className='stat'>
									<div className='stat-title td-md'>
										Website
									</div>
									<div className='text-lg stat-value'>
										<a
											href={`https://${blog}`}
											target='_blank'
											rel='noreferrer'
										>
											{blog}
										</a>
									</div>
								</div>
							)}
							{twitter_username && (
								<div className='stat'>
									<div className='stat-title td-md'>
										Twitter
									</div>
									<div className='text-lg stat-value'>
										<a
											href={`https://twitter.com/${twitter_username}`}
											target='_blank'
											rel='noreferrer'
										>
											{
												twitter_username
											}
										</a>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
					{/* Followers and purple 3 users icon */}
					<div className='stat'>
						<div className='stat-figure text-secondary'>
							<FaUsers className='text-3xl md:texl-5xl' />
						</div>
						<div className='stat-title pr-5'>
							Followers
						</div>
						<div className='stat-value pr-5 text-3xl md:text-4xl'>
							{followers}
						</div>
					</div>
					{/* Following and purple 2 users icon  */}
					<div className='stat'>
						<div className='stat-figure text-secondary'>
							<FaUserFriends className='text-3xl md:texl-5xl' />
						</div>
						<div className='stat-title pr-5'>
							Following
						</div>
						<div className='stat-value pr-5 text-3xl md:text-4xl'>
							{following}
						</div>
					</div>
					{/* Public repos and purple prism icon  */}
					<div className='stat'>
						<div className='stat-figure text-secondary'>
							<FaCodepen className='text-3xl md:texl-5xl' />
						</div>
						<div className='stat-title pr-5'>
							Public Repos
						</div>
						<div className='stat-value pr-5 text-3xl md:text-4xl'>
							{public_repos}
						</div>
					</div>
					{/* Public gists and purple store icon  */}
					<div className='stat'>
						<div className='stat-figure text-secondary'>
							<FaStore className='text-3xl md:texl-5xl' />
						</div>
						<div className='stat-title pr-5'>
							Public Gists
						</div>
						<div className='stat-value pr-5 text-3xl md:text-4xl'>
							{public_gists}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default User;
