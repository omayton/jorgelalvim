
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Scale, 
  FileText, 
  User, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  X,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  ChevronDown,
  MessageSquare,
  Activity,
  Award,
  Calendar
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

// --- Types ---
interface FAQItem {
  question: string;
  answer: string;
}

// --- Constants ---
const PRIMARY_COLOR = '#30455E';

// --- Helper Components ---

const GlassCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <div className={`glass rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const Button: React.FC<{ 
  variant?: 'primary' | 'secondary' | 'outline' | 'green', 
  children: React.ReactNode,
  className?: string,
  onClick?: () => void
}> = ({ variant = 'primary', children, className = "", onClick }) => {
  const base = "px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2";
  const styles = {
    primary: "bg-[#30455E] text-white hover:bg-[#3d5776] shadow-lg shadow-[#30455E]/20",
    secondary: "bg-white text-[#30455E] hover:bg-gray-100",
    outline: "border-2 border-[#30455E] text-[#30455E] hover:bg-[#30455E] hover:text-white",
    green: "bg-[#10B981] text-white hover:bg-[#059669] shadow-lg shadow-[#10B981]/20"
  };
  
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode, subtitle?: string, centered?: boolean }> = ({ children, subtitle, centered = false }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wider">{children}</h2>
    {subtitle && <p className="text-[#30455E] font-medium tracking-widest uppercase text-sm">{subtitle}</p>}
    <div className={`h-1 w-20 bg-[#30455E] mt-4 ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0F172A]/90 backdrop-blur-md py-4 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#30455E] flex items-center justify-center rounded-lg shadow-inner">
            <Shield className="text-white" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tighter text-white">JORGE ALVIM</span>
            <span className="text-[10px] tracking-[0.2em] text-[#30455E] font-bold uppercase">Direito Médico</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#inicio" className="text-sm font-medium hover:text-[#30455E] transition-colors">Início</a>
          <a href="#sobre" className="text-sm font-medium hover:text-[#30455E] transition-colors">Sobre</a>
          <a href="#solucoes" className="text-sm font-medium hover:text-[#30455E] transition-colors">Soluções</a>
          <a href="#areas" className="text-sm font-medium hover:text-[#30455E] transition-colors">Áreas</a>
          <Button variant="outline" className="py-2 px-6 text-sm">Agendar Consulta</Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0F172A] border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 md:hidden">
          <a href="#inicio" onClick={() => setIsOpen(false)} className="text-lg">Início</a>
          <a href="#sobre" onClick={() => setIsOpen(false)} className="text-lg">Sobre</a>
          <a href="#solucoes" onClick={() => setIsOpen(false)} className="text-lg">Soluções</a>
          <a href="#areas" onClick={() => setIsOpen(false)} className="text-lg">Áreas</a>
          <Button variant="primary">Agendar Consulta</Button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#30455E]/20 rounded-full blur-[120px] -mr-64 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#30455E]/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6 animate-pulse">
            <Shield size={16} className="text-[#30455E]" />
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Proteção Jurídica de Elite</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-[1.1]">
            Defesa jurídica e <br />
            <span className="text-gradient">preventivo estratégico</span> <br />
            para médicos.
          </h1>

          <div className="space-y-4 mb-10 text-lg text-gray-300 border-l-4 border-[#30455E] pl-6 py-2">
            <p className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-[#30455E]" />
              <span>Atuação especializada focada na proteção da carreira médica.</span>
            </p>
            <p className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-[#30455E]" />
              <span>Prevenção de riscos e defesa técnica em processos judiciais e éticos.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" className="text-lg">
              📅 AGENDAR CONSULTA JURÍDICA
            </Button>
            <Button variant="outline" className="text-lg border-white/20 text-white hover:bg-white/5">
              CONHECER ATUAÇÃO
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl animate-float">
            <img 
              src="https://www.rkdigital.co/wp-content/uploads/2026/01/WhatsApp-Image-2025-12-29-at-19.10.12-2.jpeg" 
              alt="Dr. Jorge Alvim - Direito Médico" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60"></div>
          </div>
          
          {/* Mockup Overlay Cards */}
          <div className="absolute -bottom-6 -left-6 md:-left-12 max-w-[280px]">
            <GlassCard className="!p-4 border-[#30455E]/30">
              <div className="flex items-center gap-3 mb-2">
                <Activity size={20} className="text-[#30455E]" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status de Risco</span>
              </div>
              <p className="text-sm font-medium">Prevenção ativa contra erros de documentação.</p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContextSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0F172A] to-[#1e293b]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="relative group">
            <div className="absolute -inset-1 bg-[#30455E] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src="https://www.rkdigital.co/wp-content/uploads/2026/01/WhatsApp-Image-2025-12-29-at-19.10.11.jpeg" 
              alt="Prontuário Médico e Segurança Jurídica" 
              className="relative rounded-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionTitle subtitle="CONEXÃO IMEDIATA">SEGURANÇA ALÉM DA TÉCNICA</SectionTitle>
          <div className="space-y-6 text-xl leading-relaxed text-gray-300">
            <p>
              “A medicina é uma atividade de obrigação de meio. 
              Mas, no processo, o que costuma ser julgado não é apenas a técnica — é a <span className="text-white font-bold">comunicação</span>, o registro e a forma como a conduta foi documentada.”
            </p>
            <p className="bg-white/5 border-l-4 border-[#30455E] p-6 italic">
              “É nesse ponto que muitos médicos são surpreendidos. E é exatamente aí que começa a minha atuação.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionTitle subtitle="AUTORIDADE CONSTRUÍDA">JORGE ALVIM</SectionTitle>
          <div className="space-y-6 text-gray-300 text-lg">
            <p>
              Advogado especialista em Direito Médico, Odontológico e da Saúde, com <span className="text-white font-bold underline decoration-[#30455E]">mais de 70 mil horas (8 anos)</span> dedicadas à defesa médica.
            </p>
            <p>
              Minha formação é conectada à prática médica e à gestão em saúde, com pós-graduação em Direito Processual Civil e atuação como professor e membro da OAB.
            </p>
            <p className="text-white font-medium italic">
              “Essa formação não é decorativa: ela define como atuo — entendendo a lógica da medicina, a rotina clínica e a realidade assistencial antes de levar qualquer discussão ao Judiciário.”
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="border-l-2 border-[#30455E]/50 pl-6">
              <h4 className="text-3xl font-bold text-white">8+ ANOS</h4>
              <p className="text-xs uppercase tracking-widest text-[#30455E]">Experiência</p>
            </div>
            <div className="border-l-2 border-[#30455E]/50 pl-6">
              <h4 className="text-3xl font-bold text-white">70K HS</h4>
              <p className="text-xs uppercase tracking-widest text-[#30455E]">Dedicação</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square rounded-full border-2 border-dashed border-[#30455E]/30 p-8 animate-spin-slow">
            <div className="w-full h-full rounded-full border-2 border-[#30455E] opacity-20"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4/5 h-4/5 rounded-full overflow-hidden border-4 border-[#30455E] shadow-2xl shadow-[#30455E]/40">
              <img 
                src="https://www.rkdigital.co/wp-content/uploads/2026/01/WhatsApp-Image-2025-12-29-at-19.10.12-1.jpeg" 
                alt="Jorge Alvim - Excelência" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Badge */}
          <div className="absolute top-10 right-10 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 transform rotate-6 border border-gray-100">
            <Award className="text-[#30455E]" size={32} />
            <div className="leading-tight">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Selo de Excelência</p>
              <p className="text-sm font-bold text-[#0F172A]">DIREITO MÉDICO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PainPointsSection = () => {
  const points = [
    { icon: <MessageSquare />, title: "Explicação Mal Compreendida", desc: "O paciente alega que não foi informado adequadamente." },
    { icon: <FileText />, title: "Prontuário Juridicamente Frágil", desc: "Clinicamente correto, mas sem proteção legal." },
    { icon: <Scale />, title: "Interpretação Fora do Contexto", desc: "Condutas corretas julgadas sem o olhar clínico." },
    { icon: <AlertTriangle />, title: "Denúncia por Insatisfação", desc: "Processos que nascem da raiva, não do erro real." },
  ];

  return (
    <section className="py-24 bg-gradient-premium">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle centered subtitle="RISCOS REAIS">VOCÊ PODE SER UM EXCELENTE MÉDICO E AINDA ASSIM ENFRENTAR UM PROCESSO</SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {points.map((p, i) => (
            <GlassCard key={i} className="group hover:bg-[#30455E]/20 transition-all border-[#30455E]/20">
              <div className="w-12 h-12 bg-[#30455E]/20 flex items-center justify-center rounded-lg text-[#30455E] mb-6 group-hover:bg-[#30455E] group-hover:text-white transition-colors">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl font-bold text-white mb-8 italic">“Quando isso acontece, improvisar não é option.”</p>
          <Button variant="secondary" className="mx-auto">
            PROTEGER MINHA CARREIRA AGORA
          </Button>
        </div>
      </div>
    </section>
  );
};

const SolutionsSection = id => {
  const solutions = [
    "Antecipar riscos antes que se tornem processos",
    "Traduzir a conduta médica com clareza técnica e segurança",
    "Defender com estratégia — não com modelos genéricos",
    "Reduzir exposição ética, administrativa e judicial"
  ];

  return (
    <section id="solucoes" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#1e293b] rounded-[3rem] p-8 md:p-16 border border-white/5 relative overflow-hidden">
          {/* Subtle logo bg */}
          <Shield className="absolute -right-20 -bottom-20 text-[#30455E]/10" size={400} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle subtitle="O DIFERENCIAL">COMPREENDER A MEDICINA POR DENTRO</SectionTitle>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                No Direito Médico, não basta conhecer a lei. É preciso viver a realidade assistencial para traduzi-la ao Direito.
              </p>
              
              <div className="space-y-4">
                {solutions.map((s, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#30455E]/50 transition-all">
                    <CheckCircle2 className="text-[#30455E] mt-1 flex-shrink-0" />
                    <span className="text-lg font-medium">{s}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Button variant="primary">FALAR COM ESPECIALISTA</Button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://www.rkdigital.co/wp-content/uploads/2026/01/WhatsApp-Image-2025-12-29-at-19.10.11-1.jpeg" className="rounded-2xl mt-8 w-full object-cover aspect-[4/5]" alt="Medical and Legal approach" />
                <img src="https://www.rkdigital.co/wp-content/uploads/2026/01/WhatsApp-Image-2025-12-29-at-19.10.12-3.jpeg" className="rounded-2xl w-full object-cover aspect-[4/5]" alt="Legal expertise in medicine" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PracticeAreas = () => {
  return (
    <section id="areas" className="py-24 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle centered subtitle="ESPECIALIDADES">ÁREAS DE ATUAÇÃO</SectionTitle>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-gray-400 leading-relaxed">
            Atuação em ações de <span className="text-white font-bold">responsabilidade civil médica</span>, defesa em processos judiciais envolvendo alegações de erro médico, sindicâncias e processos ético-profissionais perante <span className="text-white font-bold">Conselhos de Medicina</span>, orientação preventiva sobre prontuário, dever de informação e consentimento, além de assessoria jurídica contínua para médicos, hospitais e clínicas.
          </p>
        </div>
      </div>
    </section>
  );
};

const OfferSection = () => {
  const benefits = [
    "Clareza sobre riscos reais da sua rotina assistencial",
    "Orientação preventiva aplicável ao consultório/hospital",
    "Fortalecimento jurídico do prontuário e consentimento",
    "Estratégia de defesa técnica em denúncias e processos",
    "Tranquilidade para exercer a medicina com segurança"
  ];

  return (
    <section className="py-24 relative bg-[#0F172A]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="glass rounded-[2rem] p-10 md:p-16 border-2 border-[#30455E]/40 shadow-2xl relative overflow-hidden text-center flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#30455E] to-transparent opacity-50"></div>
          
          <Shield size={48} className="text-[#30455E]/60 mb-8" />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-10 max-w-2xl leading-tight">
            Agende uma consulta jurídica especializada.
          </h2>
          
          <div className="space-y-5 mb-12 w-full max-w-md mx-auto">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-4 text-left group">
                <CheckCircle2 className="text-[#10B981] group-hover:scale-110 transition-transform flex-shrink-0" size={24} />
                <span className="font-medium text-gray-200 text-lg">{b}</span>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center">
            <Button variant="green" className="py-5 px-10 text-lg uppercase tracking-wider flex items-center gap-3">
              <Calendar size={20} />
              AGENDAR CONSULTA AGORA
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-gray-500 font-medium tracking-widest uppercase">
            Sua carreira merece a melhor defesa técnica.
          </p>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs: FAQItem[] = [
    { question: "Consulta jurídica é só quando já existe processo?", answer: "Não. A consultoria preventiva é a ferramenta mais poderosa para evitar que o processo sequer aconteça, blindando sua documentação e rotina." },
    { question: "Vocês atuam em sindicância no CRM?", answer: "Sim. A defesa em fase de sindicância é crucial, pois é onde se pode arquivar o caso antes que ele se torne um Processo Ético-Profissional (PEP)." },
    { question: "O que muda na prática com uma consultoria preventiva?", answer: "Você terá modelos de termos de consentimento personalizados, auditoria de prontuários e protocolos de comunicação que reduzem drasticamente o risco de processos." },
    { question: "Como funciona a análise de prontuário e consentimento?", answer: "Fazemos um diagnóstico jurídico da sua documentação atual e implementamos as melhorias necessárias para que seu prontuário seja sua melhor defesa." },
    { question: "Atende médicos de qualquer especialidade e região?", answer: "Sim, atendemos todas as especialidades médicas com atuação nacional, adaptando a estratégia à realidade de cada região e CRM." },
    { question: "Como é o formato: online ou presencial?", answer: "Oferecemos ambas as modalidades. A consulta online permite agilidade e atendimento em todo o Brasil, com a mesma segurança e sigilo do presencial." },
  ];

  return (
    <section className="py-24 bg-[#0F172A]/50">
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle centered subtitle="DÚVIDAS">PERGUNTAS FREQUENTES</SectionTitle>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden border-white/5">
              <button 
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-lg font-bold">{faq.question}</span>
                <ChevronDown className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openIndex === i ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Gemini Integration ---

const AIConsultant = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleAsk = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: {
          systemInstruction: "Você é um assistente virtual especializado em Direito Médico para o escritório de Jorge Alvim. Responda de forma profissional, sóbria e ética. Não forneça aconselhamento jurídico final, mas sim orientações iniciais e explique a importância de uma consulta personalizada com Jorge Alvim. Use português do Brasil.",
          temperature: 0.7,
        }
      });
      setResponse(result.text || "Desculpe, não consegui processar sua dúvida agora.");
    } catch (e) {
      setResponse("Erro ao conectar com o assistente. Por favor, tente agendar uma consulta direta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!showChat ? (
        <button 
          onClick={() => setShowChat(true)}
          className="w-16 h-16 bg-[#30455E] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
        >
          <MessageSquare size={28} />
          <span className="absolute right-full mr-4 bg-white text-[#30455E] px-4 py-2 rounded-lg text-sm font-bold shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Dúvida Rápida?
          </span>
        </button>
      ) : (
        <div className="w-[350px] md:w-[400px] h-[500px] bg-[#1e293b] rounded-3xl shadow-2xl flex flex-col border border-white/10 overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="bg-[#30455E] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-white" />
              <span className="font-bold text-white text-sm uppercase tracking-widest">Assistente IA</span>
            </div>
            <button onClick={() => setShowChat(false)}><X size={20} /></button>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {response ? (
              <div className="bg-white/5 p-4 rounded-2xl text-sm leading-relaxed text-gray-300">
                {response}
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm italic mt-10">
                Olá, sou o assistente virtual do Dr. Jorge Alvim. Em que posso ajudar com sua segurança jurídica hoje?
              </div>
            )}
            {loading && <div className="text-center text-[#30455E] animate-pulse">Analisando cenário médico...</div>}
          </div>

          <div className="p-4 bg-[#0F172A] border-t border-white/5">
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: Risco de erro em prontuário..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#30455E]"
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              />
              <button 
                onClick={handleAsk}
                disabled={loading}
                className="bg-[#30455E] p-2 rounded-xl"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-[#30455E]" size={32} />
            <span className="font-bold text-2xl tracking-tighter">JORGE ALVIM</span>
          </div>
          <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
            Advocacia premium especializada em Direito Médico e da Saúde. Atuação ética, técnica e estratégica para a proteção da sua carreira médica.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#30455E] transition-all"><Instagram size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#30455E] transition-all"><Linkedin size={20} /></a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#30455E] transition-all"><Mail size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Links Úteis</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
            <li><a href="#sobre" className="hover:text-white transition-colors">Sobre o Dr. Jorge</a></li>
            <li><a href="#solucoes" className="hover:text-white transition-colors">Soluções Preventivas</a></li>
            <li><a href="#areas" className="hover:text-white transition-colors">Áreas de Atuação</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Contato</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center gap-3"><Phone size={16} /> (XX) XXXXX-XXXX</li>
            <li className="flex items-center gap-3"><Mail size={16} /> contato@jorgealvim.adv.br</li>
            <li className="flex items-start gap-3"><FileText size={16} className="mt-1" /> OAB/XX XXX.XXX</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium tracking-widest uppercase">
        <p>© {new Date().getFullYear()} JORGE ALVIM - TODOS OS DIREITOS RESERVADOS.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Políticas de Privacidade</a>
          <a href="#" className="hover:text-white transition-colors">Ética OAB</a>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ContextSection />
      <AboutSection />
      <PainPointsSection />
      <SolutionsSection />
      <PracticeAreas />
      <OfferSection />
      <FAQ />
      <Footer />
      <AIConsultant />
      
      {/* Global Grainy Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
}
