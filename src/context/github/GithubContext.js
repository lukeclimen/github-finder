import { createContext, useState } from "react";

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchUsers = async () => {
		const response = await fetch(`${GITHUB_URL}/users`);
		const data = await response.json();

		setUsers(data);
		setIsLoading(false);
	};

	return (
		<GithubContext.Provider
			value={{
				//Variables
				users,
				isLoading,
				//Methods
				fetchUsers,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
