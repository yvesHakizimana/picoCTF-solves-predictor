
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = "http://localhost:8080";

interface FormData {
    author: string;
    difficulty: number; // Changed to number to match API expectations
    category: string;
    event_points: number; // Renamed from points to match API expectations
}

interface PredictionResponse {
    predicted_users_solved: number;
}

const PredictionForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        author: '',
        difficulty: 1, // Changed to number
        category: 'General Skills',
        event_points: 100, // Renamed to match API expectations
    });
    const [predictedUsers, setPredictedUsers] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const categories = [
        'General Skills',
        'Binary Exploitation',
        'Web Exploitation',
        'Forensics',
        'Cryptography',
        'Reverse Engineering',
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string | number }
    ) => {
        const { name, value } = 'target' in e ? e.target : e;

        // Convert string values to numbers where needed
        const processedValue = name === 'event_points' ?
            (typeof value === 'string' ? parseInt(value) || 0 : value) :
            value;

        setFormData((prev) => ({ ...prev, [name]: processedValue }));
    };

    const handleDifficultyChange = (value: string) => {
        const numericValue = parseInt(value);
        setFormData((prev) => ({ ...prev, difficulty: numericValue }));
    };

    const handleCategoryChange = (value: string) => {
        setFormData((prev) => ({ ...prev, category: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.author.trim()) {
            toast({
                title: "Author name required",
                description: "Please enter the author's name",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        setPredictedUsers(null);

        try {
            // Send data to the predict API endpoint
            const response = await fetch(`${API_BASE_URL}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data: PredictionResponse = await response.json();
            setPredictedUsers(data.predicted_users_solved);

            toast({
                title: "Prediction complete!",
                description: `We've predicted that ${data.predicted_users_solved} users will solve this challenge.`,
            });
        } catch (error) {
            console.error('Prediction error:', error);
            toast({
                title: "Prediction failed",
                description: "There was an error getting your prediction. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center">
                        <Label htmlFor="author" className="form-label">Author Name</Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="ml-1 text-gray-400 cursor-help text-sm">ⓘ</span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>The person who created the challenge</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input
                        id="author"
                        name="author"
                        placeholder="Enter author's name"
                        value={formData.author}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex items-center">
                        <Label htmlFor="difficulty" className="form-label">Difficulty Level</Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="ml-1 text-gray-400 cursor-help text-sm">ⓘ</span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>How difficult is the challenge to solve</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <RadioGroup
                        value={formData.difficulty.toString()}
                        onValueChange={handleDifficultyChange}
                        className="flex space-x-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1" id="easy" />
                            <Label htmlFor="easy" className="cursor-pointer">Easy (1)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2" id="medium" />
                            <Label htmlFor="medium" className="cursor-pointer">Medium (2)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3" id="hard" />
                            <Label htmlFor="hard" className="cursor-pointer">Hard (3)</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center">
                        <Label htmlFor="category" className="form-label">Category</Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="ml-1 text-gray-400 cursor-help text-sm">ⓘ</span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>The type of challenge</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Select
                        value={formData.category}
                        onValueChange={handleCategoryChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center">
                        <Label htmlFor="event_points" className="form-label">Event Points</Label>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <span className="ml-1 text-gray-400 cursor-help text-sm">ⓘ</span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Score assigned when solving the challenge</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <Input
                        id="event_points"
                        name="event_points"
                        type="number"
                        min="0"
                        placeholder="Enter points"
                        value={formData.event_points}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full py-6 text-lg font-medium bg-gradient-primary hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader className="mr-2 h-5 w-5 animate-spin" />
                            Predicting...
                        </>
                    ) : (
                        'Predict Results'
                    )}
                </Button>
            </form>

            {predictedUsers !== null && !isLoading && (
                <div className="mt-8 text-center animate-fade-in">
                    <h3 className="text-lg font-medium mb-2">Prediction Result</h3>
                    <div className="prediction-result">{predictedUsers}</div>
                    <p className="mt-2 text-gray-600">
                        estimated users will solve this challenge
                    </p>
                </div>
            )}
        </div>
    );
};

export default PredictionForm;