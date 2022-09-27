import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function UserItem({
	user: { login, avatar_url },
}) {
	return (
		<div className='card shadow-md compact side bg-accent'>
			<div className='flex-row items-center space-x-4 card-body'>
				<div className=''>
					<div className='avatar'>
						<div className='rounded-full shadow w-14 h-14'>
							<img
								src={
									avatar_url
								}
								alt='Avatar'
							/>
						</div>
					</div>
				</div>
				<div className=''>
					<h2 className='card-title text-black'>
						{login}
					</h2>
					<Link
						className='text-black text-opactiy-40'
						to={`/users/${login}`}
					>
						Visit Profile
					</Link>
				</div>
			</div>
		</div>
	);
}

UserItem.propTypes = {
	user: PropTypes.object.isRequired,
};

export default UserItem;
