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
                                                                <option value="+93">🇦🇫 Afghanistan +93</option>
                                                                <option value="+355">🇦🇱 Albania +355</option>
                                                                <option value="+213">🇩🇿 Algeria +213</option>
                                                                <option value="+376">🇦🇩 Andorra +376</option>
                                                                <option value="+244">🇦🇴 Angola +244</option>
                                                                <option value="+1">🇦🇬 Antigua and Barbuda +1</option>
                                                                <option value="+54">🇦🇷 Argentina +54</option>
                                                                <option value="+374">🇦🇲 Armenia +374</option>
<option value="+61">🇦🇺 Australia +61</option>
<option value="+43">🇦🇹 Austria +43</option>
<option value="+994">🇦🇿 Azerbaijan +994</option>
<option value="+1">🇧🇸 Bahamas +1</option>
<option value="+973">🇧🇭 Bahrain +973</option>
<option value="+880">🇧🇩 Bangladesh +880</option>
<option value="+1">🇧🇧 Barbados +1</option>
<option value="+375">🇧🇾 Belarus +375</option>
<option value="+32">🇧🇪 Belgium +32</option>
<option value="+501">🇧🇿 Belize +501</option>
<option value="+229">🇧🇯 Benin +229</option>
<option value="+975">🇧🇹 Bhutan +975</option>
<option value="+591">🇧🇴 Bolivia +591</option>
<option value="+387">🇧🇦 Bosnia and Herzegovina +387</option>
<option value="+267">🇧🇼 Botswana +267</option>
<option value="+55">🇧🇷 Brazil +55</option>
<option value="+673">🇧🇳 Brunei +673</option>
<option value="+359">🇧🇬 Bulgaria +359</option>
<option value="+226">🇧🇫 Burkina Faso +226</option>
<option value="+257">🇧🇮 Burundi +257</option>
<option value="+855">🇰🇭 Cambodia +855</option>
<option value="+237">🇨🇲 Cameroon +237</option>
<option value="+1">🇨🇦 Canada +1</option>
<option value="+238">🇨🇻 Cape Verde +238</option>
<option value="+236">🇨🇫 Central African Republic +236</option>
<option value="+235">🇹🇩 Chad +235</option>
<option value="+56">🇨🇱 Chile +56</option>
<option value="+86">🇨🇳 China +86</option>
<option value="+57">🇨🇴 Colombia +57</option>
<option value="+269">🇰🇲 Comoros +269</option>
<option value="+243">🇨🇩 Congo, Democratic Republic of the +243</option>
<option value="+242">🇨🇬 Congo, Republic of the +242</option>
<option value="+506">🇨🇷 Costa Rica +506</option>
<option value="+385">🇭🇷 Croatia +385</option>
<option value="+53">🇨🇺 Cuba +53</option>
<option value="+357">🇨🇾 Cyprus +357</option>
<option value="+420">🇨🇿 Czech Republic +420</option>
<option value="+45">🇩🇰 Denmark +45</option>
<option value="+253">🇩🇯 Djibouti +253</option>
<option value="+1">🇩🇲 Dominica +1</option>
<option value="+1">🇩🇴 Dominican Republic +1</option>
<option value="+670">🇹🇱 East Timor +670</option>
<option value="+593">🇪🇨 Ecuador +593</option>
<option value="+20">🇪🇬 Egypt +20</option>
<option value="+503">🇸🇻 El Salvador +503</option>
<option value="+240">🇬🇶 Equatorial Guinea +240</option>
<option value="+291">🇪🇷 Eritrea +291</option>
<option value="+372">🇪🇪 Estonia +372</option>
<option value="+251">🇪🇹 Ethiopia +251</option>
<option value="+679">🇫🇯 Fiji +679</option>
<option value="+358">🇫🇮 Finland +358</option>
<option value="+33">🇫🇷 France +33</option>
<option value="+241">🇬🇦 Gabon +241</option>
<option value="+220">🇬🇲 Gambia +220</option>
<option value="+995">🇬🇪 Georgia +995</option>
<option value="+49">🇩🇪 Germany +49</option>
<option value="+233">🇬🇭 Ghana +233</option>
<option value="+30">🇬🇷 Greece +30</option>
<option value="+1">🇬🇩 Grenada +1</option>
<option value="+502">🇬🇹 Guatemala +502</option>
<option value="+224">🇬🇳 Guinea +224</option>
<option value="+245">🇬🇼 Guinea-Bissau +245</option>
<option value="+592">🇬🇾 Guyana +592</option>
<option value="+509">🇭🇹 Haiti +509</option>
<option value="+504">🇭🇳 Honduras +504</option>
<option value="+852">🇭🇰 Hong Kong +852</option>
<option value="+36">🇭🇺 Hungary +36</option>
<option value="+354">🇮🇸 Iceland +354</option>
<option value="+91">🇮🇳 India +91</option>
<option value="+62">🇮🇩 Indonesia +62</option>
<option value="+98">🇮🇷 Iran +98</option>
<option value="+964">🇮🇶 Iraq +964</option>
<option value="+353">🇮🇪 Ireland +353</option>
<option value="+972">🇮🇱 Israel +972</option>
<option value="+39">🇮🇹 Italy +39</option>
<option value="+1">🇯🇲 Jamaica +1</option>
<option value="+81">🇯🇵 Japan +81</option>
<option value="+962">🇯🇴 Jordan +962</option>
<option value="+7">🇰🇿 Kazakhstan +7</option>
<option value="+254">🇰🇪 Kenya +254</option>
<option value="+686">🇰🇮 Kiribati +686</option>
<option value="+850">🇰🇵 Korea, North +850</option>
<option value="+82">🇰🇷 Korea, South +82</option>
<option value="+965">🇰🇼 Kuwait +965</option>
<option value="+996">🇰🇬 Kyrgyzstan +996</option>
<option value="+856">🇱🇦 Laos +856</option>
<option value="+371">🇱🇻 Latvia +371</option>
<option value="+961">🇱🇧 Lebanon +961</option>
<option value="+266">🇱🇸 Lesotho +266</option>
<option value="+231">🇱🇷 Liberia +231</option>
<option value="+218">🇱🇾 Libya +218</option>
<option value="+423">🇱🇮 Liechtenstein +423</option>
<option value="+370">🇱🇹 Lithuania +370</option>
<option value="+352">🇱🇺 Luxembourg +352</option>
<option value="+853">🇲🇴 Macau +853</option>
<option value="+389">🇲🇰 Macedonia +389</option>
<option value="+261">🇲🇬 Madagascar +261</option>
<option value="+265">🇲🇼 Malawi +265</option>
<option value="+60">🇲🇾 Malaysia +60</option>
<option value="+960">🇲🇻 Maldives +960</option>
<option value="+223">🇲🇱 Mali +223</option>
<option value="+356">🇲🇹 Malta +356</option>
<option value="+692">🇲🇭 Marshall Islands +692</option>
<option value="+222">🇲🇷 Mauritania +222</option>
<option value="+230">🇲🇺 Mauritius +230</option>
<option value="+52">🇲🇽 Mexico +52</option>
<option value="+691">🇫🇲 Micronesia +691</option>
<option value="+373">🇲🇩 Moldova +373</option>
<option value="+377">🇲🇨 Monaco +377</option>
<option value="+976">🇲🇳 Mongolia +976</option>
<option value="+382">🇲🇪 Montenegro +382</option>
<option value="+212">🇲🇦 Morocco +212</option>
<option value="+258">🇲🇿 Mozambique +258</option>
<option value="+95">🇲🇲 Myanmar +95</option>
<option value="+264">🇳🇦 Namibia +264</option>
<option value="+674">🇳🇷 Nauru +674</option>
<option value="+977">🇳🇵 Nepal +977</option>
<option value="+31">🇳🇱 Netherlands +31</option>
<option value="+64">🇳🇿 New Zealand +64</option>
<option value="+505">🇳🇮 Nicaragua +505</option>
<option value="+227">🇳🇪 Niger +227</option>
<option value="+234">🇳🇬 Nigeria +234</option>
<option value="+47">🇳🇴 Norway +47</option>
<option value="+968">🇴🇲 Oman +968</option>
<option value="+92">🇵🇰 Pakistan +92</option>
<option value="+680">🇵🇼 Palau +680</option>
<option value="+970">🇵🇸 Palestine +970</option>
<option value="+507">🇵🇦 Panama +507</option>
<option value="+675">🇵🇬 Papua New Guinea +675</option>
<option value="+595">🇵🇾 Paraguay +595</option>
<option value="+51">🇵🇪 Peru +51</option>
<option value="+63">🇵🇭 Philippines +63</option>
<option value="+48">🇵🇱 Poland +48</option>
<option value="+351">🇵🇹 Portugal +351</option>
<option value="+974">🇶🇦 Qatar +974</option>
<option value="+40">🇷🇴 Romania +40</option>
<option value="+7">🇷🇺 Russia +7</option>
<option value="+250">🇷🇼 Rwanda +250</option>
<option value="+1">🇰🇳 Saint Kitts and Nevis +1</option>
<option value="+1">🇱🇨 Saint Lucia +1</option>
<option value="+1">🇻🇨 Saint Vincent and the Grenadines +1</option>
<option value="+685">🇼🇸 Samoa +685</option>
<option value="+378">🇸🇲 San Marino +378</option>
<option value="+239">🇸🇹 Sao Tome and Principe +239</option>
<option value="+966">🇸🇦 Saudi Arabia +966</option>
<option value="+221">🇸🇳 Senegal +221</option>
<option value="+381">🇷🇸 Serbia +381</option>
<option value="+248">🇸🇨 Seychelles +248</option>
<option value="+232">🇸🇱 Sierra Leone +232</option>
<option value="+65">🇸🇬 Singapore +65</option>
<option value="+421">🇸🇰 Slovakia +421</option>
<option value="+386">🇸🇮 Slovenia +386</option>
<option value="+677">🇸🇧 Solomon Islands +677</option>
<option value="+252">🇸🇴 Somalia +252</option>
<option value="+27">🇿🇦 South Africa +27</option>
<option value="+211">🇸🇸 South Sudan +211</option>
<option value="+34">🇪🇸 Spain +34</option>
<option value="+94">🇱🇰 Sri Lanka +94</option>
<option value="+249">🇸🇩 Sudan +249</option>
<option value="+597">🇸🇷 Suriname +597</option>
<option value="+268">🇸🇿 Swaziland +268</option>
<option value="+46">🇸🇪 Sweden +46</option>
<option value="+41">🇨🇭 Switzerland +41</option>
<option value="+963">🇸🇾 Syria +963</option>
<option value="+886">🇹🇼 Taiwan +886</option>
<option value="+992">🇹🇯 Tajikistan +992</option>
<option value="+255">🇹🇿 Tanzania +255</option>
<option value="+66">🇹🇭 Thailand +66</option>
<option value="+228">🇹🇬 Togo +228</option>
<option value="+676">🇹🇴 Tonga +676</option>
<option value="+1">🇹🇹 Trinidad and Tobago +1</option>
<option value="+216">🇹🇳 Tunisia +216</option>
<option value="+90">🇹🇷 Turkey +90</option>
<option value="+993">🇹🇲 Turkmenistan +993</option>
<option value="+688">🇹🇻 Tuvalu +688</option>
<option value="+256">🇺🇬 Uganda +256</option>
<option value="+380">🇺🇦 Ukraine +380</option>
<option value="+971">🇦🇪 United Arab Emirates +971</option>
<option value="+44">🇬🇧 United Kingdom +44</option>
<option value="+1">🇺🇸 United States +1</option>
<option value="+598">🇺🇾 Uruguay +598</option>
<option value="+998">🇺🇿 Uzbekistan +998</option>
<option value="+678">🇻🇺 Vanuatu +678</option>
<option value="+58">🇻🇪 Venezuela +58</option>
<option value="+84">🇻🇳 Vietnam +84</option>
<option value="+967">🇾🇪 Yemen +967</option>
<option value="+260">🇿🇲 Zambia +260</option>
<option value="+263">🇿🇼 Zimbabwe +263</option>
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
