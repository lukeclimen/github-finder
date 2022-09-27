import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		isLoading: true,
	};

	const [state, dispatch] = useReducer(
		githubReducer,
		initialState
	);

	const fetchUsers = async () => {
		const response = await fetch(
			`${GITHUB_URL}/users`
			// {
			// 	headers: {
			// 		Authorization: `token ${TOKEN}`,
			// 	},
			// }
		);
		const data = await response.json();

		dispatch({
			type: "GET_USERS",
			payload: data,
		});
	};

	return (
		<GithubContext.Provider
			value={{
				//Variables
				users: state.users,
				isLoading: state.isLoading,
				//Methods
				fetchUsers,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
