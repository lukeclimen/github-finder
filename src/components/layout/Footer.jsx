import { FaSlackHash } from "react-icons/fa";

function Footer() {
	const footerYear = new Date().getFullYear();
	return (
		<footer
			className='footer p-10 bg-gray-700 
			text-primary-content footer-center
			gap-y-0'
		>
			<FaSlackHash size={50} />
			<p>Copyright &copy; {footerYear}. All rights reserved.</p>
		</footer>
	);
}

export default Footer;
