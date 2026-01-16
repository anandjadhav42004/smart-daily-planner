import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { registerUser } from "../services/api";
import Button from "../components/Button";

export default function Signup() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerUser(formData);
            toast.success("Account created! Welcome.");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.msg || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[128px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-slate-400">Join Twomoory and organize your life</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-white/60 ml-1">Full Name</label>
                        <div className="relative group">
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:bg-slate-900/50 transition-all duration-300"
                                placeholder="John Doe"
                                required
                            />
                            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-white/60 ml-1">Email Address</label>
                        <div className="relative group">
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:bg-slate-900/50 transition-all duration-300"
                                placeholder="you@example.com"
                                required
                            />
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-white/60 ml-1">Password</label>
                        <div className="relative group">
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 focus:bg-slate-900/50 transition-all duration-300"
                                placeholder="Create a strong password"
                                required
                            />
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                        </div>
                    </div>

                    <Button type="submit" variant="primary" disabled={loading} className="w-full py-4 text-lg mt-4">
                        {loading ? <Loader2 className="animate-spin" /> : "Sign Up Free"}
                    </Button>
                </form>

                <p className="text-center mt-8 text-slate-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
                        Sign In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
