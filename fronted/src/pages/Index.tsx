import Header from '@/components/Header';
import ChallengeInfo from '@/components/ChallengeInfo';
import PredictionForm from '@/components/PredictionForm';
import Footer from '@/components/Footer';

const Index = () => {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
                <Header />
                <ChallengeInfo />
                <div className="py-6 px-4 md:py-8 md:px-12 bg-gradient-to-br from-slate-100 to-white rounded-xl border border-slate-200">
                    <PredictionForm />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Index;