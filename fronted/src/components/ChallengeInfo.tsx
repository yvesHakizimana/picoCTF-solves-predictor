import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const ChallengeInfo = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="card-highlight">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-theme-purple">How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600">
                        Enter the details of your picoCTF challenge, including author name, difficulty, category, and points.
                        Our AI model will predict how many users are likely to solve your challenge.
                    </p>
                </CardContent>
            </Card>

            <Card className="card-highlight">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-theme-teal">picoCTF Data</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600">
                        Our prediction model is trained on real data from the picoCTF computer game competitions.
                        The model considers challenge difficulty, category complexity, and points value to make accurate predictions.
                    </p>
                </CardContent>
            </Card>

            <Card className="card-highlight">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-theme-orange">Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600">
                        For accurate predictions, specify realistic point values that match picoCTF standards.
                        Remember that categories like Reverse Engineering typically have fewer solvers in the competition.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChallengeInfo;
