import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";

function UserSearch() {
	// State for the search bar's text field
	const [text, setText] = useState("");

	// Handle the event for the text in the search bar being changed
	const handleChange = (event) => {
		setText(event.target.value);
	};

	// Github Context
	const { users, searchUsers, clearUsers } =
		useContext(GithubContext);

	//Alert Context
	const { setAlert } = useContext(AlertContext);

	// Handle the event that the user clicks on the submit butotn
	const handleSubmit = (event) => {
		event.preventDefault();

		if (text === "") {
			setAlert("Please enter something in", "error");
		} else {
			searchUsers(text);
		}
		setText("");
	};

	return (
		<div
			className='grid grid-cols-1 xl:grid-cols-2 
                        lg:grid-cols-2 md:grid-cols-2 mb-8 
                        gap-8 '
		>
			<div className=''>
				<form
					action=''
					className=''
					onSubmit={handleSubmit}
				>
					<div className='form-control'>
						<div className='relative'>
							<input
								type='text'
								className='w-full pr-40 bg-gray-200 input input-lg text-black'
								placeholder='Search'
								value={text}
								onChange={handleChange}
							/>
							<button
								type='submit'
								className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
							>
								Go
							</button>
						</div>
					</div>
				</form>
			</div>
			{users.length > 0 && (
				<div className=''>
					<button
						className='btn btn-ghost btn-lg'
						onClick={clearUsers}
					>
						Clear
					</button>
				</div>
			)}
		</div>
	);
}

export default UserSearch;
