import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
import axios from "axios";

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
	baseURL: GITHUB_URL,
	headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		highlightUser: {},
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
		const response = await github.get(
			`/search/users?${params}`
		);

		dispatch({
			type: "GET_USERS",
			payload: response.data.items,
		});
	};

	// Get search results
	const getHighlightUser = async (login) => {
		setLoading();

		const response = await github.get(
			`/users/${login}`
		);

		if (response.data.status === 404) {
			window.location = "/notfound";
		} else {
			dispatch({
				type: "GET_HIGHLIGHT_USER",
				payload: response.data,
			});
		}
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
				highlightUser: state.highlightUser,
				isLoading: state.isLoading,
				//Methods
				searchUsers,
				clearUsers,
				getHighlightUser,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
