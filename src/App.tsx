import { useState } from 'react';
import { ArrowRight, Check, Star, X } from 'lucide-react';

const QuizModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  if (!isOpen) return null;

  const questions = [
    {
      title: "What best describes you?",
      options: ["Beginner", "Intermediate", "Advanced"]
    },
    {
      title: "What are you trying to achieve?",
      options: ["Learn something new", "Grow my business", "Solve a specific problem", "Just exploring"]
    },
    {
      title: "How soon do you want results?",
      options: ["Immediately", "Within a month", "Just researching"]
    },
    {
      title: "What matters most to you?",
      options: ["Speed", "Simplicity", "Cost", "Performance"]
    }
  ];

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [step]: answer });
    setTimeout(() => {
      setStep(step + 1);
    }, 300);
  };

  const isLastStep = step === questions.length;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#F5F2EB] border-2 border-black w-full max-w-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative flex flex-col max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-[#C0392B] text-white border-2 border-black w-10 h-10 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all z-10"
        >
          <X strokeWidth={3} />
        </button>

        <div className="p-6 md:p-10 overflow-y-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2">
              <span>Step {step + 1} of {questions.length + 1}</span>
              <span>{Math.round((step / (questions.length + 1)) * 100)}%</span>
            </div>
            <div className="h-4 w-full bg-white border-2 border-black">
              <div 
                className="h-full bg-[#D4FF00] border-r-2 border-black transition-all duration-300"
                style={{ width: `${((step + 1) / (questions.length + 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          {!isLastStep ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h2 className="font-serif font-black text-3xl md:text-4xl uppercase leading-tight mb-8">
                {questions[step].title}
              </h2>
              <div className="flex flex-col gap-4">
                {questions[step].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    className={`text-left font-bold text-lg md:text-xl p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-out ${
                      answers[step] === option ? 'bg-[#D4FF00]' : 'bg-white hover:bg-[#FFD5C2]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {step > 0 && (
                <div className="mt-8 flex justify-start">
                  <button
                    onClick={() => setStep(step - 1)}
                    className="bg-white border-2 border-black px-6 py-3 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                  >
                    <ArrowRight className="w-4 h-4 rotate-180" strokeWidth={3} /> Previous
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 text-center">
              <div className="inline-block bg-[#D4FF00] border-2 border-black px-4 py-1 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-sm uppercase tracking-widest transform -rotate-2">
                Almost Done!
              </div>
              <h2 className="font-serif font-black text-4xl uppercase leading-tight mb-4">
                Get your personalized result
              </h2>
              <p className="font-medium mb-8">Enter your details below to see how Opinion Cash CA can help you achieve your goals.</p>
              
              <form className="flex flex-col gap-4 text-left" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                <div>
                  <label className="block font-black uppercase text-xs tracking-widest mb-2">Name (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="Your Name"
                    className="w-full bg-white border-2 border-black p-4 font-medium focus:outline-none focus:bg-[#FFD5C2] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
                <div>
                  <label className="block font-black uppercase text-xs tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="you@example.com"
                    className="w-full bg-white border-2 border-black p-4 font-medium focus:outline-none focus:bg-[#FFD5C2] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="bg-white text-black border-2 border-black px-6 py-4 font-black uppercase text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" strokeWidth={3} /> Back
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-[#C0392B] text-white border-2 border-black px-8 py-4 font-black uppercase text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2"
                  >
                    Show My Results <ArrowRight strokeWidth={3} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ onOpenQuiz }: { onOpenQuiz: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F2EB] border-b-2 border-black px-6 py-4 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-[#C0392B] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
      <div>
        <div className="font-sans font-black text-xl leading-none tracking-tighter uppercase">Opinion Cash</div>
        <div className="font-sans text-[10px] font-bold tracking-widest uppercase">CA</div>
      </div>
    </div>
    <div className="hidden md:flex items-center gap-8 font-bold uppercase tracking-wide text-sm">
      <a href="#" className="hover:underline decoration-2 underline-offset-4">How it Works</a>
      <a href="#" className="hover:underline decoration-2 underline-offset-4">Rewards</a>
      <a href="#" className="hover:underline decoration-2 underline-offset-4">About</a>
    </div>
    <div className="flex items-center gap-4">
      <button className="hidden md:block font-bold uppercase text-sm hover:underline decoration-2 underline-offset-4">Log In</button>
      <button onClick={onOpenQuiz} className="bg-[#D4FF00] border-2 border-black px-6 py-2 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
        Join Free
      </button>
    </div>
  </nav>
);

const Hero = ({ onOpenQuiz }: { onOpenQuiz: () => void }) => (
  <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    <div>
      <div className="inline-flex items-center gap-2 bg-[#FFD5C2] border-2 border-black px-4 py-1 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-sm uppercase tracking-wide">
        <div className="w-2 h-2 bg-[#C0392B] border border-black rounded-full animate-pulse"></div>
        Live Now: +10% Bonus Points
      </div>
      <h1 className="font-serif font-black text-5xl md:text-7xl leading-[0.9] mb-6 uppercase">
        Your Opinion.<br />
        <span className="text-[#C0392B] relative inline-block">
          Real Canadian
          <svg className="absolute w-full h-4 -bottom-2 left-0 text-black" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0 10 Q 50 20 100 10" stroke="currentColor" strokeWidth="4" fill="none" />
          </svg>
        </span><br />
        Rewards.
      </h1>
      <p className="font-medium text-lg mb-8 max-w-md border-l-4 border-black pl-4">
        Join 100,000+ Canadians earning PayPal cash, Amazon gift cards, and Starbucks rewards just for sharing what you think.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button onClick={onOpenQuiz} className="bg-[#D4FF00] border-2 border-black px-8 py-4 font-black uppercase text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2">
          Join Free & Get 500 Pts <ArrowRight className="w-6 h-6" strokeWidth={3} />
        </button>
      </div>
      <div className="flex flex-wrap gap-4 font-bold text-sm uppercase tracking-wide">
        <div className="flex items-center gap-2"><Check className="w-5 h-5 border-2 border-black rounded-full p-0.5" strokeWidth={3} /> Free to join</div>
        <div className="flex items-center gap-2"><Check className="w-5 h-5 border-2 border-black rounded-full p-0.5" strokeWidth={3} /> No credit card</div>
        <div className="flex items-center gap-2"><Check className="w-5 h-5 border-2 border-black rounded-full p-0.5" strokeWidth={3} /> CA Residents 18+</div>
      </div>
    </div>
    
    <div className="relative flex justify-center items-center mt-12 md:mt-0">
      <div className="absolute inset-0 bg-[#FFD5C2] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-3 rounded-2xl"></div>
      <div className="relative bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md rounded-2xl z-10">
        <div className="absolute -top-4 -right-4 bg-[#C0392B] text-white border-2 border-black px-4 py-1 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-6">
          Canada Only
        </div>
        <div className="font-bold uppercase text-xs tracking-widest mb-2 border-b-2 border-black pb-2">Total awarded in Jan</div>
        <div className="font-serif font-black text-6xl mb-1">$88,949</div>
        <div className="font-medium text-sm mb-6">to Opinion Cash CA members</div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 border-2 border-black bg-[#F5F2EB] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center font-black text-xl">P</div>
            <div>
              <div className="font-black uppercase text-sm">PayPal Cash</div>
              <div className="text-xs font-medium">Direct to your account</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 border-2 border-black bg-[#F5F2EB] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center font-black text-xl">A</div>
            <div>
              <div className="font-black uppercase text-sm">Amazon Cards</div>
              <div className="text-xs font-medium">Shop anything, anytime</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-6 -left-6 bg-[#D4FF00] border-2 border-black px-4 py-2 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 animate-bounce">
        +250 pts earned today
      </div>
    </div>
  </section>
);

const SocialProof = () => (
  <div className="border-y-2 border-black bg-white py-8 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between gap-8 text-center">
      <div className="flex-1 min-w-[200px]">
        <div className="font-serif font-black text-4xl mb-1">$88,949</div>
        <div className="font-bold uppercase text-xs tracking-widest">Awarded in Jan</div>
      </div>
      <div className="hidden md:block w-0.5 bg-black"></div>
      <div className="flex-1 min-w-[200px]">
        <div className="font-serif font-black text-4xl mb-1">500</div>
        <div className="font-bold uppercase text-xs tracking-widest">Free Welcome Pts</div>
      </div>
      <div className="hidden md:block w-0.5 bg-black"></div>
      <div className="flex-1 min-w-[200px]">
        <div className="font-serif font-black text-4xl mb-1">100K+</div>
        <div className="font-bold uppercase text-xs tracking-widest">Canadian Members</div>
      </div>
      <div className="hidden md:block w-0.5 bg-black"></div>
      <div className="flex-1 min-w-[200px]">
        <div className="font-serif font-black text-4xl mb-1">1,400+</div>
        <div className="font-bold uppercase text-xs tracking-widest">Live Surveys</div>
      </div>
    </div>
  </div>
);

const HowItWorks = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="mb-16">
      <div className="inline-block bg-black text-white font-black uppercase text-xs tracking-widest px-3 py-1 mb-4">Simple Process</div>
      <h2 className="font-serif font-black text-4xl md:text-5xl uppercase leading-none mb-6">Three steps to<br/>start earning</h2>
      <p className="font-medium text-lg max-w-2xl border-l-4 border-[#C0392B] pl-4">No experience needed. Sign up in under a minute and start earning rewards right away.</p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { num: '1', title: 'Answer Simple Questions', desc: 'Sign up free and become a valued member of Canada\'s leading survey community. Takes less than 60 seconds.' },
        { num: '2', title: 'Match Your Profile', desc: 'Get surveys matched to your interests and demographics. The more you complete, the more you qualify for.' },
        { num: '3', title: 'Earn & Redeem Rewards', desc: 'Cash out via PayPal, Amazon, or Starbucks gift cards. Real money, real brands — no catch.' }
      ].map((step, i) => (
        <div key={i} className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative group hover:-translate-y-2 transition-transform">
          <div className="w-12 h-12 bg-[#D4FF00] border-2 border-black flex items-center justify-center font-black text-xl mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[#C0392B] group-hover:text-white transition-colors">
            {step.num}
          </div>
          <h3 className="font-serif font-black text-2xl uppercase mb-4 leading-tight">{step.title}</h3>
          <p className="font-medium">{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const WhyJoin = () => (
  <section className="py-24 px-6 bg-[#FFD5C2] border-y-2 border-black">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <div className="inline-block bg-white border-2 border-black font-black uppercase text-xs tracking-widest px-3 py-1 mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Why Opinion Cash CA</div>
        <h2 className="font-serif font-black text-4xl md:text-5xl uppercase leading-none mb-6">Built for real Canadians</h2>
        <p className="font-medium text-lg max-w-2xl mx-auto">Not just another survey site. We're Canada's most trusted opinion panel — backed by real research firms.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Rewards & Incentives', desc: 'Earn gift cards from Amazon and Starbucks, and PayPal cash for every survey you complete.' },
          { title: 'Influence Tomorrow', desc: 'Major brands, researchers, and media outlets want to hear from you. Your insights directly shape decisions.' },
          { title: 'Diverse Surveys', desc: 'From product feedback to social issues — we cover topics that matter to you.' },
          { title: 'Privacy Protected', desc: 'We never sell your personal data. All responses are anonymized and used strictly for research.' },
          { title: 'Bonus Opportunities', desc: 'Flash Weeks, Daily Streaks, Weekend Bonuses — earn up to 10% extra points.' },
          { title: 'Proudly Canadian', desc: '100% focused on Canada. Every survey, every reward, every insight — built for Canadians.' }
        ].map((feature, i) => (
          <div key={i} className="bg-[#F5F2EB] border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-colors">
            <h3 className="font-sans font-black text-xl uppercase mb-3">{feature.title}</h3>
            <p className="font-medium text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto">
    <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div>
        <div className="inline-block bg-black text-white font-black uppercase text-xs tracking-widest px-3 py-1 mb-4">Real Members</div>
        <h2 className="font-serif font-black text-4xl md:text-5xl uppercase leading-none">What Canadians<br/>are saying</h2>
      </div>
      <p className="font-medium text-lg max-w-md border-l-4 border-[#D4FF00] pl-4">Thousands of Canadians earn rewards every month. Here's what they have to say.</p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { text: "A great and relatively easy way to earn some quick cash. By completing easy but thought-provoking surveys you can earn some great gifts for your own personal opinions — give it a try!", author: "E.B.", loc: "Canada" },
        { text: "I always enjoy taking surveys by Maru Canada. They are interesting, easy to follow, and make me feel like part of a community whose opinion is valued. You will not regret it!", author: "G.H.", loc: "Canada" },
        { text: "Interesting surveys regularly sent out. Ease of getting rewards earned. I've redeemed multiple Amazon gift cards — it's completely legitimate and I recommend it to everyone.", author: "D.G.", loc: "Canada" }
      ].map((testi, i) => (
        <div key={i} className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          <div className="flex gap-1 mb-6">
            {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-[#C0392B] text-[#C0392B]" />)}
          </div>
          <p className="font-medium flex-1 mb-8">"{testi.text}"</p>
          <div className="flex items-center gap-4 pt-6 border-t-2 border-black">
            <div className="w-12 h-12 bg-[#D4FF00] border-2 border-black flex items-center justify-center font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {testi.author[0]}
            </div>
            <div>
              <div className="font-black uppercase">{testi.author}</div>
              <div className="text-xs font-bold tracking-widest uppercase">{testi.loc}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const PayoutBanner = () => (
  <section className="bg-[#C0392B] border-y-2 border-black py-20 px-6 text-center text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
    <div className="relative z-10 max-w-4xl mx-auto">
      <p className="font-bold uppercase tracking-widest mb-4">Total value awarded in January 2026</p>
      <div className="font-serif font-black text-6xl md:text-8xl mb-6 drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">$88,949.70</div>
      <p className="font-medium text-xl border-2 border-white inline-block px-6 py-2 bg-black text-[#D4FF00] shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">Real payouts. Real Canadians. Every single month.</p>
    </div>
  </section>
);

const CTA = ({ onOpenQuiz }: { onOpenQuiz: () => void }) => (
  <section className="py-32 px-6 bg-[#F5F2EB] text-center">
    <div className="max-w-3xl mx-auto">
      <h2 className="font-serif font-black text-5xl md:text-7xl uppercase leading-none mb-8">
        Ready to earn <span className="text-[#C0392B] bg-[#D4FF00] px-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block transform -rotate-2">real</span> rewards?
      </h2>
      <p className="font-medium text-xl mb-12">Join free today and get 500 bonus welcome points the moment you sign up. No credit card. No catch.</p>
      
      <div className="flex flex-wrap justify-center gap-4 mb-12 font-bold uppercase text-sm tracking-wide">
        <div className="bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Free to join</div>
        <div className="bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">500 welcome points</div>
        <div className="bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">PayPal, Amazon & Starbucks</div>
      </div>
      
      <button onClick={onOpenQuiz} className="bg-[#D4FF00] border-2 border-black px-10 py-5 font-black uppercase text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 mx-auto w-full md:w-auto">
        Join Opinion Cash CA Free <ArrowRight className="w-8 h-8" strokeWidth={3} />
      </button>
      
      <p className="mt-8 font-bold text-xs uppercase tracking-widest text-gray-500">Canadian residents 18+ only · Double opt-in required · No spam, ever</p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black text-white py-12 px-6 border-t-4 border-[#C0392B]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div>
        <div className="font-sans font-black text-2xl leading-none tracking-tighter uppercase mb-2">Opinion Cash <span className="text-[#C0392B]">CA</span></div>
        <p className="font-medium text-sm text-gray-400">© 2026 Opinion Cash CA. All rights reserved.</p>
        <p className="font-medium text-sm text-gray-400">A Maru Group Company · Canada's Trusted Opinion Panel</p>
      </div>
      <div className="flex flex-wrap gap-6 font-bold uppercase text-sm tracking-widest">
        <a href="#" className="hover:text-[#D4FF00] transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-[#D4FF00] transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-[#D4FF00] transition-colors">Contact</a>
        <a href="#" className="hover:text-[#D4FF00] transition-colors">FAQ</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-black font-sans selection:bg-[#D4FF00] selection:text-black">
      <Navbar onOpenQuiz={() => setIsQuizOpen(true)} />
      <Hero onOpenQuiz={() => setIsQuizOpen(true)} />
      <SocialProof />
      <HowItWorks />
      <WhyJoin />
      <Testimonials />
      <PayoutBanner />
      <CTA onOpenQuiz={() => setIsQuizOpen(true)} />
      <Footer />
      <QuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
    </div>
  );
}
