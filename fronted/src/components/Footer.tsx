const Footer = () => {
    return (
        <footer className="mt-12 text-center text-sm text-gray-500 pb-4">
            <p>© {new Date().getFullYear()} PicoCTF Challenge Predictor Genius | All Rights Reserved</p>
            <p className="mt-1">Predictions are based on collected data from picoCTF gaming platform.</p>
        </footer>
    );
};

export default Footer;