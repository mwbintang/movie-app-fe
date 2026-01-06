import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(-1)}
            className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 font-medium rounded hover:bg-blue-100 hover:text-blue-700 transition"
        >
            <ArrowLeft className="w-6 h-6" />
        </button>
    );
};
