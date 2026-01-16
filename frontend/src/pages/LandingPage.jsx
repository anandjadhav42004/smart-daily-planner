import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Shield, Zap, Sparkles } from "lucide-react";
import Button from "../components/Button";
import GlassCard from "../components/GlassCard";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 relative overflow-hidden font-sans text-white">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-600/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[128px]" />
            </div>

            {/* Navbar */}
            <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <span className="text-xl font-bold text-white">Tw</span>
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Twomoory
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-white/70 hover:text-white transition-colors font-medium">Log In</Link>
                    <Link to="/signup">
                        <Button variant="primary" className="px-6 py-2.5 rounded-full">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-20 pb-32 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                        <Sparkles size={16} className="text-primary-400" />
                        <span className="text-sm font-medium text-white/80">The Future of Productivity is Here</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                        Organize your life <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">
                            with aesthetic precision.
                        </span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Twomoory combines powerful task management with stunning design.
                        Stop fighting with clunky tools and start enjoying your daily planning.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/signup">
                            <Button variant="primary" className="h-14 px-8 text-lg rounded-full">
                                Start for Free <ArrowRight size={20} />
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="secondary" className="h-14 px-8 text-lg rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                                Live Demo
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full">
                    <GlassCard className="text-left" hoverEffect>
                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-400">
                            <CheckCircle2 size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Smart Tracking</h3>
                        <p className="text-white/60">Visualize your daily progress with beautiful charts and completions.</p>
                    </GlassCard>

                    <GlassCard className="text-left" hoverEffect>
                        <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4 text-primary-400">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Instant Sync</h3>
                        <p className="text-white/60">Your tasks are saved instantly and accessible from anywhere securely.</p>
                    </GlassCard>

                    <GlassCard className="text-left" hoverEffect>
                        <div className="w-12 h-12 rounded-lg bg-rose-500/10 flex items-center justify-center mb-4 text-rose-400">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
                        <p className="text-white/60">Built with standard encryption to keep your personal plans private.</p>
                    </GlassCard>
                </div>
            </main>
        </div>
    );
}
