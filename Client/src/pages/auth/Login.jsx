import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API_ROUTES from "../../common";
import { toast } from "react-toastify";
import Context from '../../context/index';
import Logo from "../../Components/Logo";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataResponse = await fetch(API_ROUTES.signIn.url, {
            method: API_ROUTES.signIn.method,
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        });

        const response = await dataResponse.json();
        if (dataResponse.ok) {
            toast.success(response.message);
            navigate("/");
            fetchUserDetails();
            fetchUserAddToCart();
        } else {
            toast.error(response.message || "Login failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-premium-gradient px-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="w-full max-w-md dark-glass p-10 rounded-3xl premium-shadow relative z-10 border border-white/10">
                <div className="flex flex-col items-center mb-8">
                    <div className="invert grayscale brightness-200 mb-4 scale-125">
                        <Logo />
                    </div>
                    <h2 className="text-3xl font-bold text-white mt-4">Welcome Back</h2>
                    <p className="text-slate-400 text-sm mt-2">Elite access to A&A Store</p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                        <input
                            required
                            type="email"
                            placeholder="name@example.com"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 text-white transition-all placeholder:text-slate-600"
                        />
                    </div>
                    
                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Secure Password</label>
                        <div className="relative">
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 text-white transition-all placeholder:text-slate-600"
                            />
                            <span 
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer transition-colors" 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900" />
                            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">Remember me</span>
                        </label>
                        <Link to="/forgot-password" size={20} className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                            Forgot?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-200 hover:-translate-y-0.5 active:translate-y-0 transition-all premium-shadow"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-sm text-slate-400">
                        New to the elite?{" "}
                        <Link to="/signup" className="text-white font-bold hover:underline decoration-blue-500 decoration-2 underline-offset-4">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
