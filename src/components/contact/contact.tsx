import React, { useState, useEffect } from 'react';
import { Send, Mail, MessageCircle, ArrowRight, Phone, User, Camera } from 'lucide-react';

const ContactUs: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        countryCode: '+1'
    });

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number; color: string }>>([]);
    const [isVisible, setIsVisible] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    useEffect(() => {
        const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];
        const newParticles = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 4,
            size: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));
        setParticles(newParticles);
        setTimeout(() => setIsVisible(true), 100);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFocus = (fieldName: string) => {
        setFocusedField(fieldName);
    };

    const handleBlur = () => {
        setFocusedField(null);
    };

    const validateForm = () => {
        const newErrors = { name: '', phone: '', email: '' };
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (form.phone && !/^[\+]?[\d\s\-\(\)]{10,}$/.test(form.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }
        return newErrors;
    };

    const handleSubmit = async () => {
        const newErrors = validateForm();
        if (Object.values(newErrors).some(err => err !== '')) {
            setErrors(newErrors);
            return;
        }
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2500));
            console.log('Form submitted:', form);
            console.log('Send to: sales@snix.ai');
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setForm({ name: '', phone: '', email: '', countryCode: '+1' });
            }, 4000);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes gradient-x {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                
                @keyframes success-bounce {
                    0% { opacity: 0; transform: scale(0.5); }
                    50% { transform: scale(1.1); }
                    100% { opacity: 1; transform: scale(1); }
                }

                @keyframes tilt {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(1deg); }
                    75% { transform: rotate(-1deg); }
                }

                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
                }

                .animate-float { animation: float 3s ease-in-out infinite; }
                .animate-gradient-x { 
                    background-size: 300% 300%; 
                    animation: gradient-x 4s ease infinite; 
                }
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out both; }
                .animate-shake { animation: shake 0.5s ease-in-out; }
                .animate-success-bounce { animation: success-bounce 0.6s ease-out; }
                .animate-tilt { animation: tilt 6s ease-in-out infinite; }
                .animate-glow { animation: glow 3s ease-in-out infinite; }

                .glass-effect {
                    backdrop-filter: blur(20px);
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .image-float {
                    animation: float 4s ease-in-out infinite;
                }

                .image-float:nth-child(2) {
                    animation-delay: -1s;
                }

                .image-float:nth-child(3) {
                    animation-delay: -2s;
                }
            `}</style>

            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-100/30 to-pink-100/30" />
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                                        radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)`
                    }} />
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="absolute animate-float opacity-30"
                            style={{
                                left: `${particle.x}%`,
                                top: `${particle.y}%`,
                                animationDelay: `${particle.delay}s`,
                                animationDuration: `${4 + Math.random() * 2}s`
                            }}
                        >
                            <div
                                className="rounded-full blur-sm"
                                style={{
                                    width: `${particle.size}px`,
                                    height: `${particle.size}px`,
                                    backgroundColor: particle.color,
                                    boxShadow: `0 0 ${particle.size * 3}px ${particle.color}40`
                                }}
                            />
                        </div>
                    ))}
                </div>

                <div className="relative z-10 pt-12 pb-12 px-4">
                    <div className="w-full max-w-7xl mx-auto">
                        {/* Header */}
                        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight mt-8">
                                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Let's Connect
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light">
                                Ready to transform your vision into stunning AI-powered photography?
                            </p>
                        </div>

                        {/* Stylish Images Section */}
                        <div className={`mb-16 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <div className="relative">
                                {/* Main showcase area */}
                                <div className="flex justify-center items-center relative h-64 md:h-80">
                                    {/* Floating Image Cards */}
                                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl">
                                        <div className="relative">
                                            {/* Center Main Image */}
                                            <div className="image-float absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                                                <img src='/aishoot/editorial.png' className='w-48 h-64 md:h-80 md:w-60 rounded-2xl' alt="Editorial" />
                                            </div>

                                            {/* Left Floating Image */}
                                            <div className="image-float absolute left-0 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
                                                <img src='/models/7.png' className='w-40 h-48 rounded-2xl' alt="Gallery" />
                                            </div>

                                            {/* Right Floating Image */}
                                            <div className="image-float absolute right-0 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
                                                <img src='/aishoot/accesories.png' className='w-40 h-48 rounded-2xl' alt="Accessories" />
                                            </div>

                                            {/* Top Small Image */}
                                            <div className="image-float absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
                                                <div className="w-32 h-24 rounded-xl shadow-lg overflow-hidden">
                                                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                                                        <MessageCircle className="w-8 h-8 text-white" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bottom Small Image */}
                                            <div className="image-float absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-10 hidden lg:block">
                                                <div className="w-32 h-24 rounded-xl shadow-lg overflow-hidden">
                                                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                                                        <ArrowRight className="w-8 h-8 text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form - TRUE HORIZONTAL */}
                        <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <div className="max-w-5xl mx-auto">
                                <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border-2 border-purple-400/70 shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl" />

                                    {submitted ? (
                                        <div className="text-center py-16 animate-success-bounce relative z-10">
                                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                                <Camera className="w-10 h-10 text-white" />
                                            </div>
                                            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-4">
                                                Message Sent Successfully!
                                            </h3>
                                            <p className="text-gray-600 text-lg">Our team will contact you within 24 hours.</p>
                                        </div>
                                    ) : (
                                        <div className="relative z-10">
                                            <div className="text-center mb-10">
                                                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                                                    Get Started Today
                                                </h2>
                                                <p className="text-gray-600 text-lg">Fill out the form below and let's create something amazing together</p>
                                            </div>

                                            {/* TRUE HORIZONTAL FORM */}
                                            <div className="space-y-8">
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                                                    {/* Name Field */}
                                                    <div className="group">
                                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                                                            <User className="w-4 h-4 text-purple-500" />
                                                            Your Name *
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                name="name"
                                                                value={form.name}
                                                                onChange={handleChange}
                                                                onFocus={() => handleFocus('name')}
                                                                onBlur={handleBlur}
                                                                className={`w-full px-5 py-4 bg-white/60 backdrop-blur-sm border-2 ${errors.name ? 'border-red-400 animate-shake' :
                                                                    focusedField === 'name' ? 'border-purple-400' : 'border-gray-200'
                                                                    } rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-300 font-medium text-lg`}
                                                                placeholder="John Doe"
                                                            />
                                                            {focusedField === 'name' && (
                                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-2xl animate-pulse pointer-events-none" />
                                                            )}
                                                        </div>
                                                        {errors.name && <p className="text-red-500 text-sm mt-2 font-medium">{errors.name}</p>}
                                                    </div>

                                                    {/* Phone Field */}
                                                    <div className="group">
                                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                                                            <Phone className="w-4 h-4 text-purple-500" />
                                                            Phone Number
                                                        </label>
                                                        <div className="relative flex">
                                                            {/* Country Code Dropdown */}
                                                            <select
                                                                name="countryCode"
                                                                value={form.countryCode}
                                                                onChange={handleChange}
                                                                className="px-4 py-4 bg-white/60 backdrop-blur-sm border-2 border-gray-200 cursor-pointer rounded-l-2xl text-gray-800 focus:outline-none text-lg font-medium"
                                                            >
                                                                <option value="+93">🇦🇫 +93</option>
                                                                <option value="+355">🇦🇱 +355</option>
                                                                <option value="+213">🇩🇿 +213</option>
                                                                <option value="+376">🇦🇩 +376</option>
                                                                <option value="+244">🇦🇴 +244</option>
                                                                <option value="+1">🇦🇬 +1</option>
                                                                <option value="+54">🇦🇷 +54</option>
                                                                <option value="+374">🇦🇲 +374</option>
                                                                <option value="+61">🇦🇺 +61</option>
                                                                <option value="+43">🇦🇹 +43</option>
                                                                <option value="+994">🇦🇿 +994</option>
                                                                <option value="+1">🇧🇸 +1</option>
                                                                <option value="+973">🇧🇭 +973</option>
                                                                <option value="+880">🇧🇩 +880</option>
                                                                <option value="+1">🇧🇧 +1</option>
                                                                <option value="+375">🇧🇾 +375</option>
                                                                <option value="+32">🇧🇪 +32</option>
                                                                <option value="+501">🇧🇿 +501</option>
                                                                <option value="+229">🇧🇯 +229</option>
                                                                <option value="+975">🇧🇹 +975</option>
                                                                <option value="+591">🇧🇴 +591</option>
                                                                <option value="+387">🇧🇦 +387</option>
                                                                <option value="+267">🇧🇼 +267</option>
                                                                <option value="+55">🇧🇷 +55</option>
                                                                <option value="+673">🇧🇳 +673</option>
                                                                <option value="+359">🇧🇬 +359</option>
                                                                <option value="+226">🇧🇫 +226</option>
                                                                <option value="+257">🇧🇮 +257</option>
                                                                <option value="+855">🇰🇭 +855</option>
                                                                <option value="+237">🇨🇲 +237</option>
                                                                <option value="+1">🇨🇦 +1</option>
                                                                <option value="+238">🇨🇻 +238</option>
                                                                <option value="+236">🇨🇫 +236</option>
                                                                <option value="+235">🇹🇩 +235</option>
                                                                <option value="+56">🇨🇱 +56</option>
                                                                <option value="+86">🇨🇳 +86</option>
                                                                <option value="+57">🇨🇴 +57</option>
                                                                <option value="+269">🇰🇲 +269</option>
                                                                <option value="+243">🇨🇩 +243</option>
                                                                <option value="+242">🇨🇬 +242</option>
                                                                <option value="+506">🇨🇷 +506</option>
                                                                <option value="+385">🇭🇷 +385</option>
                                                                <option value="+53">🇨🇺 +53</option>
                                                                <option value="+357">🇨🇾 +357</option>
                                                                <option value="+420">🇨🇿 +420</option>
                                                                <option value="+45">🇩🇰 +45</option>
                                                                <option value="+253">🇩🇯 +253</option>
                                                                <option value="+1">🇩🇲 +1</option>
                                                                <option value="+1">🇩🇴 +1</option>
                                                                <option value="+670">🇹🇱 +670</option>
                                                                <option value="+593">🇪🇨 +593</option>
                                                                <option value="+20">🇪🇬 +20</option>
                                                                <option value="+503">🇸🇻 +503</option>
                                                                <option value="+240">🇬🇶 +240</option>
                                                                <option value="+291">🇪🇷 +291</option>
                                                                <option value="+372">🇪🇪 +372</option>
                                                                <option value="+251">🇪🇹 +251</option>
                                                                <option value="+679">🇫🇯 +679</option>
                                                                <option value="+358">🇫🇮 +358</option>
                                                                <option value="+33">🇫🇷 +33</option>
                                                                <option value="+241">🇬🇦 +241</option>
                                                                <option value="+220">🇬🇲 +220</option>
                                                                <option value="+995">🇬🇪 +995</option>
                                                                <option value="+49">🇩🇪 +49</option>
                                                                <option value="+233">🇬🇭 +233</option>
                                                                <option value="+30">🇬🇷 +30</option>
                                                                <option value="+1">🇬🇩 +1</option>
                                                                <option value="+502">🇬🇹 +502</option>
                                                                <option value="+224">🇬🇳 +224</option>
                                                                <option value="+245">🇬🇼 +245</option>
                                                                <option value="+592">🇬🇾 +592</option>
                                                                <option value="+509">🇭🇹 +509</option>
                                                                <option value="+504">🇭🇳 +504</option>
                                                                <option value="+852">🇭🇰 +852</option>
                                                                <option value="+36">🇭🇺 +36</option>
                                                                <option value="+354">🇮🇸 +354</option>
                                                                <option value="+91">🇮🇳 +91</option>
                                                                <option value="+62">🇮🇩 +62</option>
                                                                <option value="+98">🇮🇷 +98</option>
                                                                <option value="+964">🇮🇶 +964</option>
                                                                <option value="+353">🇮🇪 +353</option>
                                                                <option value="+972">🇮🇱 +972</option>
                                                                <option value="+39">🇮🇹 +39</option>
                                                                <option value="+1">🇯🇲 +1</option>
                                                                <option value="+81">🇯🇵 +81</option>
                                                                <option value="+962">🇯🇴 +962</option>
                                                                <option value="+7">🇰🇿 +7</option>
                                                                <option value="+254">🇰🇪 +254</option>
                                                                <option value="+686">🇰🇮 +686</option>
                                                                <option value="+850">🇰🇵 +850</option>
                                                                <option value="+82">🇰🇷 +82</option>
                                                                <option value="+965">🇰🇼 +965</option>
                                                                <option value="+996">🇰🇬 +996</option>
                                                                <option value="+856">🇱🇦 +856</option>
                                                                <option value="+371">🇱🇻 +371</option>
                                                                <option value="+961">🇱🇧 +961</option>
                                                                <option value="+266">🇱🇸 +266</option>
                                                                <option value="+231">🇱🇷 +231</option>
                                                                <option value="+218">🇱🇾 +218</option>
                                                                <option value="+423">🇱🇮 +423</option>
                                                                <option value="+370">🇱🇹 +370</option>
                                                                <option value="+352">🇱🇺 +352</option>
                                                                <option value="+853">🇲🇴 +853</option>
                                                                <option value="+389">🇲🇰 +389</option>
                                                                <option value="+261">🇲🇬 +261</option>
                                                                <option value="+265">🇲🇼 +265</option>
                                                                <option value="+60">🇲🇾 +60</option>
                                                                <option value="+960">🇲🇻 +960</option>
                                                                <option value="+223">🇲🇱 +223</option>
                                                                <option value="+356">🇲🇹 +356</option>
                                                                <option value="+692">🇲🇭 +692</option>
                                                                <option value="+222">🇲🇷 +222</option>
                                                                <option value="+230">🇲🇺 +230</option>
                                                                <option value="+52">🇲🇽 +52</option>
                                                                <option value="+691">🇫🇲 +691</option>
                                                                <option value="+373">🇲🇩 +373</option>
                                                                <option value="+377">🇲🇨 +377</option>
                                                                <option value="+976">🇲🇳 +976</option>
                                                                <option value="+382">🇲🇪 +382</option>
                                                                <option value="+212">🇲🇦 +212</option>
                                                                <option value="+258">🇲🇿 +258</option>
                                                                <option value="+95">🇲🇲 +95</option>
                                                                <option value="+264">🇳🇦 +264</option>
                                                                <option value="+674">🇳🇷 +674</option>
                                                                <option value="+977">🇳🇵 +977</option>
                                                                <option value="+31">🇳🇱 +31</option>
                                                                <option value="+64">🇳🇿 +64</option>
                                                                <option value="+505">🇳🇮 +505</option>
                                                                <option value="+227">🇳🇪 +227</option>
                                                                <option value="+234">🇳🇬 +234</option>
                                                                <option value="+47">🇳🇴 +47</option>
                                                                <option value="+968">🇴🇲 +968</option>
                                                                <option value="+92">🇵🇰 +92</option>
                                                                <option value="+680">🇵🇼 +680</option>
                                                                <option value="+970">🇵🇸 +970</option>
                                                                <option value="+507">🇵🇦 +507</option>
                                                                <option value="+675">🇵🇬 +675</option>
                                                                <option value="+595">🇵🇾 +595</option>
                                                                <option value="+51">🇵🇪 +51</option>
                                                                <option value="+63">🇵🇭 +63</option>
                                                                <option value="+48">🇵🇱 +48</option>
                                                                <option value="+351">🇵🇹 +351</option>
                                                                <option value="+974">🇶🇦 +974</option>
                                                                <option value="+40">🇷🇴 +40</option>
                                                                <option value="+7">🇷🇺 +7</option>
                                                                <option value="+250">🇷🇼 +250</option>
                                                                <option value="+1">🇰🇳 +1</option>
                                                                <option value="+1">🇱🇨 +1</option>
                                                                <option value="+1">🇻🇨 +1</option>
                                                                <option value="+685">🇼🇸 +685</option>
                                                                <option value="+378">🇸🇲 +378</option>
                                                                <option value="+239">🇸🇹 +239</option>
                                                                <option value="+966">🇸🇦 +966</option>
                                                                <option value="+221">🇸🇳 +221</option>
                                                                <option value="+381">🇷🇸 +381</option>
                                                                <option value="+248">🇸🇨 +248</option>
                                                                <option value="+232">🇸🇱 +232</option>
                                                                <option value="+65">🇸🇬 +65</option>
                                                                <option value="+421">🇸🇰 +421</option>
                                                                <option value="+386">🇸🇮 +386</option>
                                                                <option value="+677">🇸🇧 +677</option>
                                                                <option value="+252">🇸🇴 +252</option>
                                                                <option value="+27">🇿🇦 +27</option>
                                                                <option value="+211">🇸🇸 +211</option>
                                                                <option value="+34">🇪🇸 +34</option>
                                                                <option value="+94">🇱🇰 +94</option>
                                                                <option value="+249">🇸🇩 +249</option>
                                                                <option value="+597">🇸🇷 +597</option>
                                                                <option value="+268">🇸🇿 +268</option>
                                                                <option value="+46">🇸🇪 +46</option>
                                                                <option value="+41">🇨🇭 +41</option>
                                                                <option value="+963">🇸🇾 +963</option>
                                                                <option value="+886">🇹🇼 +886</option>
                                                                <option value="+992">🇹🇯 +992</option>
                                                                <option value="+255">🇹🇿 +255</option>
                                                                <option value="+66">🇹🇭 +66</option>
                                                                <option value="+228">🇹🇬 +228</option>
                                                                <option value="+676">🇹🇴 +676</option>
                                                                <option value="+1">🇹🇹 +1</option>
                                                                <option value="+216">🇹🇳 +216</option>
                                                                <option value="+90">🇹🇷 +90</option>
                                                                <option value="+993">🇹🇲 +993</option>
                                                                <option value="+688">🇹🇻 +688</option>
                                                                <option value="+256">🇺🇬 +256</option>
                                                                <option value="+380">🇺🇦 +380</option>
                                                                <option value="+971">🇦🇪 +971</option>
                                                                <option value="+44">🇬🇧 +44</option>
                                                                <option value="+1">🇺🇸 +1</option>
                                                                <option value="+598">🇺🇾 +598</option>
                                                                <option value="+998">🇺🇿 +998</option>
                                                                <option value="+678">🇻🇺 +678</option>
                                                                <option value="+58">🇻🇪 +58</option>
                                                                <option value="+84">🇻🇳 +84</option>
                                                                <option value="+967">🇾🇪 +967</option>
                                                                <option value="+260">🇿🇲 +260</option>
                                                                <option value="+263">🇿🇼 +263</option>
                                                            </select>

                                                            {/* Phone Input */}
                                                            <input
                                                                name="phone"
                                                                type="tel"
                                                                value={form.phone}
                                                                onChange={handleChange}
                                                                onFocus={() => handleFocus('phone')}
                                                                onBlur={handleBlur}
                                                                className={`w-full px-5 py-4 bg-white/60 backdrop-blur-sm border-2 ${errors.phone ? 'border-red-400 animate-shake' :
                                                                        focusedField === 'phone' ? 'border-purple-400' : 'border-gray-200'
                                                                    } rounded-r-2xl text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-300 font-medium text-lg`}
                                                                placeholder="123-456-7890"
                                                            />
                                                            {focusedField === 'phone' && (
                                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-2xl animate-pulse pointer-events-none" />
                                                            )}
                                                        </div>
                                                        {errors.phone && (
                                                            <p className="text-red-500 text-sm mt-2 font-medium">{errors.phone}</p>
                                                        )}
                                                    </div>

                                                    {/* Email Field */}
                                                    <div className="group">
                                                        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                                                            <Mail className="w-4 h-4 text-purple-500" />
                                                            Email Address *
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                name="email"
                                                                type="email"
                                                                value={form.email}
                                                                onChange={handleChange}
                                                                onFocus={() => handleFocus('email')}
                                                                onBlur={handleBlur}
                                                                className={`w-full px-5 py-4 bg-white/60 backdrop-blur-sm border-2 ${errors.email ? 'border-red-400 animate-shake' :
                                                                    focusedField === 'email' ? 'border-purple-400' : 'border-gray-200'
                                                                    } rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-300 font-medium text-lg`}
                                                                placeholder="john@company.com"
                                                            />
                                                            {focusedField === 'email' && (
                                                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-2xl animate-pulse pointer-events-none" />
                                                            )}
                                                        </div>
                                                        {errors.email && <p className="text-red-500 text-sm mt-2 font-medium">{errors.email}</p>}
                                                    </div>
                                                </div>

                                                {/* Submit Button */}
                                                <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                                    <button
                                                        onClick={handleSubmit}
                                                        disabled={isSubmitting}
                                                        className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white py-5 px-12 rounded-2xl font-bold text-xl transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:shadow-purple-500/40 overflow-hidden transform hover:scale-105 min-w-[280px]"
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                                        <div className="relative flex items-center justify-center gap-4">
                                                            {isSubmitting ? (
                                                                <>
                                                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                                    <span>Sending Message...</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Send className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                                                                    <span>Send Message</span>
                                                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                                                                </>
                                                            )}
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
