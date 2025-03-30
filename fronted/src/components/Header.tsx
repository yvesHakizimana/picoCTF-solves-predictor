const Header = () => {
    return (
        <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-primary">
                Number Of Solves Predictor.
            </h1>
            <p className="max-w-md mx-auto text-gray-600">
                Predict how many users will solve your picoCTF challenge based on its properties
            </p>
        </header>
    );
};

export default Header;