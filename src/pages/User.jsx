import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import GithubContext from "../context/github/GithubContext";

function User() {
	const { getHighlightUser, highlightUser } =
		useContext(GithubContext);

	const params = useParams();

	useEffect(() => {
		getHighlightUser(params.login);
	}, []);

	return <div>{highlightUser.login}</div>;
}

export default User;
