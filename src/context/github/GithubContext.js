import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		isLoading: false,
	};

	const [state, dispatch] = useReducer(
		githubReducer,
		initialState
	);

	// Get search results
	const searchUsers = async (text) => {
		setLoading();
		const params = new URLSearchParams({
			q: text,
		});
		const response = await fetch(
			`${GITHUB_URL}/search/users?${params}`
			// {
			// 	headers: {
			// 		Authorization: `token ${TOKEN}`,
			// 	},
			// }
		);
		const { items } = await response.json();

		dispatch({
			type: "GET_USERS",
			payload: items,
		});
	};

	// Clear the current users selection
	const clearUsers = () => {
		dispatch({
			type: "CLEAR_USERS",
		});
	};

	const setLoading = () =>
		dispatch({ type: "SET_LOADING" });

	return (
		<GithubContext.Provider
			value={{
				//Variables
				users: state.users,
				isLoading: state.isLoading,
				//Methods
				searchUsers,
				clearUsers,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
