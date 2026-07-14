
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

// --- WhatsApp Integration Link ---
const WHATSAPP_URL = "https://wa.me/5534997712222?text=Olá,%20gostaria%20de%20conversar%20com%20o%20Dr.%20Jorge%20Alvim%20sobre%20assessoria%20jurídica%20especializada%20para%20minha%20atuação%20médica.";

// --- Safe API Key Access ---
const getApiKey = () => {
  try {
    return process.env.API_KEY || '';
  } catch (e) {
    return '';
  }
};

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
  const base = "px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base";
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
    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 uppercase tracking-wider">{children}</h2>
    {subtitle && <p className="text-[#30455E] font-semibold tracking-widest uppercase text-xs md:text-sm">{subtitle}</p>}
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
            <span className="font-bold text-lg md:text-xl tracking-tighter text-white">JORGE ALVIM</span>
            <span className="text-[9px] tracking-[0.2em] text-[#30455E] font-bold uppercase">Direito Médico & Saúde</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#inicio" className="text-sm font-medium hover:text-[#3d5776] transition-colors text-white/80">Início</a>
          <a href="#sobre" className="text-sm font-medium hover:text-[#3d5776] transition-colors text-white/80">Sobre</a>
          <a href="#solucoes" className="text-sm font-medium hover:text-[#3d5776] transition-colors text-white/80">Diferencial</a>
          <a href="#areas" className="text-sm font-medium hover:text-[#3d5776] transition-colors text-white/80">Áreas de Atuação</a>
          <a href="#faq" className="text-sm font-medium hover:text-[#3d5776] transition-colors text-white/80">Dúvidas</a>
          <Button variant="outline" className="py-2 px-6 text-xs border-white/20 text-white hover:bg-white/5" onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}>
            Agendar Consulta
          </Button>
        </div>

        <button className="md:hidden text-white hover:text-gray-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0F172A] border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 md:hidden shadow-2xl">
          <a href="#inicio" onClick={() => setIsOpen(false)} className="text-lg text-white hover:text-gray-300">Início</a>
          <a href="#sobre" onClick={() => setIsOpen(false)} className="text-lg text-white hover:text-gray-300">Sobre</a>
          <a href="#solucoes" onClick={() => setIsOpen(false)} className="text-lg text-white hover:text-gray-300">Diferencial</a>
          <a href="#areas" onClick={() => setIsOpen(false)} className="text-lg text-white hover:text-gray-300">Áreas de Atuação</a>
          <a href="#faq" onClick={() => setIsOpen(false)} className="text-lg text-white hover:text-gray-300">Dúvidas</a>
          <Button variant="primary" className="mt-2" onClick={() => { setIsOpen(false); window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer'); }}>
            Agendar Consulta
          </Button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#30455E]/20 rounded-full blur-[120px] -mr-64 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#30455E]/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
            <Shield size={16} className="text-[#30455E]" />
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Proteção Jurídica de Elite</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.15] text-white">
            Defesa jurídica e <br />
            <span className="text-gradient font-extrabold text-[#30455E]">preventivo estratégico</span> <br />
            para médicos.
          </h1>

          <div className="space-y-4 mb-10 text-base md:text-lg text-gray-300 border-l-4 border-[#30455E] pl-6 py-2">
            <p className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-[#10B981] flex-shrink-0" />
              <span>Atuação especializada focada na proteção integral da carreira médica.</span>
            </p>
            <p className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-[#10B981] flex-shrink-0" />
              <span>Prevenção técnica de riscos e defesa segura perante os Conselhos de Medicina e Justiça.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" className="text-base font-bold px-8 py-5" onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}>
              📅 AGENDAR CONSULTA JURÍDICA
            </Button>
            <Button variant="outline" className="text-base border-white/20 text-white hover:bg-white/5 px-8 py-5" onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}>
              CONHECER ATUAÇÃO
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative group">
            <img 
              src="https://www.rkdigital.co/wp-content/uploads/2026/01/WhatsApp-Image-2025-12-29-at-19.10.12-2.jpeg" 
              alt="Dr. Jorge Alvim - Direito Médico" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60"></div>
          </div>
          <div className="absolute -bottom-6 -left-6 md:-left-12 max-w-[280px]">
            <GlassCard className="!p-4 border-[#30455E]/30 bg-[#0F172A]/90 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <Activity size={20} className="text-[#10B981]" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Segurança Ativa</span>
              </div>
              <p className="text-xs font-semibold text-white/90">Gestão e blindagem documental contra erros de prontuário e contratos.</p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContextSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0F172A] to-[#1e293b] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="relative group">
            <div className="absolute -inset-1 bg-[#30455E] rounded-3xl blur opacity-25 group-hover:opacity-45 transition duration-1000"></div>
            <img 
              src="https://www.rkdigital.co/wp-content/uploads/2026/01/WhatsApp-Image-2025-12-29-at-19.10.11.jpeg" 
              alt="Prontuário Médico e Segurança Jurídica" 
              className="relative rounded-3xl w-full h-[500px] object-cover shadow-2xl"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionTitle subtitle="ATUAÇÃO INTEGRAL">SEGURANÇA ALÉM DA TÉCNICA</SectionTitle>
          <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-300">
            <p>
              “A medicina é uma atividade de obrigação de meio. 
              No entanto, em um eventual processo, o que costuma ser analisado não é unicamente a técnica cirúrgica ou diagnóstica, mas sim a <span className="text-white font-bold underline decoration-[#30455E]">comunicação</span>, os registros e a forma como a conduta foi documentada.”
            </p>
            <p className="bg-white/5 border-l-4 border-emerald-500 p-6 italic rounded-r-2xl">
              “É nesse ponto que muitos excelentes profissionais da saúde são surpreendidos. E é exatamente aí que começa a minha assessoria técnica especializada.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="sobre" className="py-24 relative overflow-hidden bg-[#0F172A] border-t border-white/5">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#30455E]/10 rounded-full blur-[100px] -ml-48"></div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Column - Image & Quick Badges */}
        <div className="lg:col-span-5 relative order-2 lg:order-1">
          <div className="aspect-square rounded-full border border-white/10 p-4 max-w-[400px] mx-auto relative bg-white/5">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#30455E] shadow-2xl relative">
              <img 
                src="https://www.rkdigital.co/wp-content/uploads/2026/01/WhatsApp-Image-2025-12-29-at-19.10.12-1.jpeg" 
                alt="Jorge Alvim - Advogado" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            {/* Absolute Badges */}
            <div className="absolute -top-4 -right-4 bg-[#0F172A]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-[#30455E]/30 text-white shadow-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
              <Award className="text-emerald-400 animate-pulse" size={16} />
              <span>FMRP / USP</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#30455E] px-4 py-2 rounded-xl border border-white/10 text-white shadow-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
              <Shield className="text-emerald-400" size={16} />
              <span>OAB/MG 180.926</span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 text-center max-w-[450px] mx-auto">
            <div className="glass p-4 rounded-xl border-white/5">
              <h4 className="text-2xl font-bold text-white">USP</h4>
              <p className="text-[10px] uppercase tracking-widest text-[#30455E] font-bold mt-1">FMRP</p>
            </div>
            <div className="glass p-4 rounded-xl border-white/5">
              <h4 className="text-2xl font-bold text-white">IPEBJ</h4>
              <p className="text-[10px] uppercase tracking-widest text-[#30455E] font-bold mt-1">Especialista</p>
            </div>
            <div className="glass p-4 rounded-xl border-white/5">
              <h4 className="text-2xl font-bold text-white">OAB/MG</h4>
              <p className="text-[10px] uppercase tracking-widest text-[#30455E] font-bold mt-1">Comissões</p>
            </div>
          </div>
        </div>

        {/* Right Column - Full Professional Copy */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <SectionTitle subtitle="AUTORIDADE JURÍDICA">JORGE ALVIM</SectionTitle>
          <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed">
            <p className="font-semibold text-white text-xl md:text-2xl border-l-4 border-[#30455E] pl-4">
              Jorge Alvim dedica sua atuação especializada à proteção jurídica de médicos, clínicas e profissionais de saúde em todo o Brasil.
            </p>
            
            <p>
              Especialista em Direito Civil, Médico, Odontológico e da Saúde, conta com formação certificada pelo <span className="text-white font-semibold">IPEBJ</span> e pela prestigiada <span className="text-white font-semibold">Faculdade de Medicina de Ribeirão Preto da Universidade de São Paulo (FMRP/USP)</span>. Além disso, é pós-graduado em Direito Processual Civil.
            </p>

            <p>
              Sua atuação concentra-se tanto na prevenção quanto na solução estratégica de conflitos envolvendo o exercício da Medicina. Atua diretamente na elaboração e revisão técnica de termos de consentimento, prontuários, contratos médicos, pareceres jurídicos, consultoria preventiva completa, além da defesa sólida em sindicâncias e Processos Ético-Profissionais perante os Conselhos de Medicina e ações judiciais de alta complexidade.
            </p>

            <p>
              Com intensa atividade institucional e acadêmica, foi <span className="text-white font-semibold">Secretário-Geral da Comissão Estadual de Direito Médico da OAB Minas Gerais</span>, foi também <span className="text-white font-semibold">Presidente da Comissão de Direito Médico e da Saúde da 14ª Subseção da OAB/MG</span>, professor e palestrante convidado para ministrar sobre responsabilidade profissional e judicialização da saúde.
            </p>

            <p className="italic text-gray-400 bg-white/5 p-4 rounded-xl border-l-2 border-[#30455E]">
              “Oferecemos uma assessoria técnica altamente personalizada, preventiva e estratégica. Sempre guiada pela ética absoluta, precisão técnica e compromisso irrestrito com os princípios que regem a carreira médica.”
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

const PainPointsSection = () => {
  const points = [
    { icon: <MessageSquare className="text-[#10B981]" />, title: "Explicação Mal Compreendida", desc: "Casos em que o paciente alega que não foi devidamente orientado sobre procedimentos, gerando quebras de confiança." },
    { icon: <FileText className="text-[#10B981]" />, title: "Prontuário Frágil ou Incompleto", desc: "Embora clinicamente correto, o registro carece de termos protetivos e segurança jurídica ativa contra processos." },
    { icon: <Scale className="text-[#10B981]" />, title: "CRM e Sindicâncias Inesperadas", desc: "A necessidade de apresentar defesas técnicas em investigações abertas perante o Conselho de Medicina." },
    { icon: <AlertTriangle className="text-[#10B981]" />, title: "Denúncia por Insatisfação Comercial", desc: "Ações civis e pedidos de indenização motivados puramente por insatisfação subjetiva de resultados." },
  ];

  return (
    <section className="py-24 bg-gradient-premium border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle centered subtitle="GESTÃO DE RISCOS">VOCÊ PODE SER UM EXCELENTE MÉDICO E AINDA ASSIM SER SURPREENDIDO</SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {points.map((p, i) => (
            <GlassCard key={i} className="group hover:bg-[#30455E]/25 transition-all border-[#30455E]/10">
              <div className="w-12 h-12 bg-[#30455E]/20 flex items-center justify-center rounded-lg mb-6 group-hover:bg-[#30455E] transition-colors">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl md:text-2xl font-semibold text-white mb-8 italic">“Identificar vulnerabilidades na documentação é a base de uma defesa robusta.”</p>
          <Button variant="secondary" className="mx-auto" onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}>
            PROTEGER MINHA CARREIRA AGORA
          </Button>
        </div>
      </div>
    </section>
  );
};

const SolutionsSection = () => {
  const solutionsList = [
    "Identificar riscos proativamente antes que se transformem em processos",
    "Orientação de prontuários, adequações éticas e conformidade",
    "Defesa técnica perante conselhos e tribunais de forma personalizada",
    "Elaboração sob medida de TCLE e contratos, sem modelos genéricos"
  ];

  return (
    <section id="solucoes" className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#1e293b] rounded-[3rem] p-8 md:p-16 border border-white/5 relative overflow-hidden shadow-2xl">
          <Shield className="absolute -right-20 -bottom-20 text-[#30455E]/10" size={400} />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle subtitle="NOSSO DIFERENCIAL">ENTENDER A MEDICINA POR DENTRO</SectionTitle>
              <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
                No Direito Médico, não basta apenas dominar a legislação. É essencial conhecer a rotina do médico, a realidade do consultório e a dinâmica dos hospitais para estruturar defesas realmente técnicas.
              </p>
              
              <div className="space-y-4">
                {solutionsList.map((s, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#30455E]/40 transition-all">
                    <CheckCircle2 className="text-[#10B981] mt-1 flex-shrink-0" />
                    <span className="text-base md:text-lg font-medium text-white">{s}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Button variant="primary" onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}>
                  FALAR COM O DR. JORGE ALVIM
                </Button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://www.rkdigital.co/wp-content/uploads/2026/01/WhatsApp-Image-2025-12-29-at-19.10.11-1.jpeg" className="rounded-2xl mt-8 w-full object-cover aspect-[4/5] shadow-lg border border-white/5" alt="Atendimento Médico de Excelência" />
                <img src="https://www.rkdigital.co/wp-content/uploads/2026/01/WhatsApp-Image-2025-12-29-at-19.10.12-3.jpeg" className="rounded-2xl w-full object-cover aspect-[4/5] shadow-lg border border-white/5" alt="Reunião de Alinhamento de Defesa" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PracticeAreas = () => {
  const areas = [
    {
      title: "Defesa CRM (Sindicâncias e PEP)",
      desc: "Análise estratégica técnica dos fatos, organização robusta de provas e representação personalizada em sindicâncias e Processos Ético-Profissionais."
    },
    {
      title: "Consultoria Preventiva Ativa",
      desc: "Diagnósticos proativos para clínicas e consultórios médicos. Redução integral de passivos éticos e blindagem das atividades profissionais."
    },
    {
      title: "Documentação Personalizada",
      desc: "Elaboração sob medida de Termos de Consentimento (TCLE), Contratos Médicos estruturados, Prontuários e Pareceres jurídicos especializados."
    },
    {
      title: "Defesa Civil Judicial",
      desc: "Representação em ações cíveis de responsabilidade civil médica envolvendo pedidos indenizatórios por suposto erro profissional."
    }
  ];

  return (
    <section id="areas" className="py-24 bg-[#0F172A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle centered subtitle="ESPECIALIDADES">ÁREAS DE ATUAÇÃO E SOLUÇÕES JURÍDICAS</SectionTitle>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Oferecemos suporte jurídico integral para médicos de todo o país. Conheça as principais frentes de atuação profissional do Dr. Jorge Alvim:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((area, i) => (
            <GlassCard key={i} className="bg-white/5 border border-white/5 hover:border-[#30455E]/50 hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 bg-[#30455E] flex items-center justify-center rounded-lg text-white mb-6 font-bold text-lg">
                0{i + 1}
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-white">{area.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{area.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const OfferSection = () => {
  const benefits = [
    "Clareza total sobre os riscos legais envolvidos na sua especialidade",
    "Tranquilidade para focar no paciente enquanto sua prática está respaldada",
    "Modelos de termos e documentação médica devidamente adequados e personalizados",
    "Estratégia sob medida para responder a questionamentos éticos e CRM",
    "Assessoria jurídica sigilosa e de alto nível técnico"
  ];

  return (
    <section className="py-24 relative bg-[#0F172A] border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <div className="glass rounded-[2rem] p-10 md:p-16 border-2 border-[#30455E]/40 shadow-2xl relative overflow-hidden text-center flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#30455E] to-transparent opacity-50"></div>
          
          <Shield size={48} className="text-[#30455E]/60 mb-8" />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-10 max-w-2xl leading-tight text-white">
            Agende uma consulta jurídica especializada.
          </h2>
          
          <div className="space-y-5 mb-12 w-full max-w-lg mx-auto">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-4 text-left group">
                <CheckCircle2 className="text-[#10B981] group-hover:scale-110 transition-transform flex-shrink-0" size={24} />
                <span className="font-medium text-gray-200 text-base md:text-lg">{b}</span>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center">
            <Button variant="green" className="py-5 px-10 text-base md:text-lg uppercase tracking-wider flex items-center gap-3 shadow-emerald-900/10" onClick={() => window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer')}>
              <Calendar size={20} />
              CONVERSAR NO WHATSAPP AGORA
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-gray-500 font-semibold tracking-widest uppercase">
            A segurança da sua carreira médica em mãos de quem entende do assunto.
          </p>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState("");
  
  const faqs: FAQItem[] = [
    { 
      question: "Consulta jurídica é só quando já existe processo?", 
      answer: "Não. A atuação jurídica preventiva permite identificar riscos antes que se transformem em reclamações, sindicâncias ou processos. A revisão adequada de documentos, contratos e rotinas fortalece a segurança jurídica do médico e da clínica." 
    },
    { 
      question: "Você atua em sindicâncias no CRM?", 
      answer: "Sim. Atuo na orientação e representação de médicos em sindicâncias e Processos Ético-Profissionais perante os Conselhos de Medicina, com análise técnica dos fatos, organização documental e definição da estratégia jurídica aplicável ao caso." 
    },
    { 
      question: "O que muda na prática com uma consultoria preventiva?", 
      answer: "O médico passa a exercer sua atividade com documentos mais consistentes, rotinas juridicamente estruturadas e maior clareza para enfrentar situações sensíveis da prática profissional. A consultoria reduz vulnerabilidades e fortalece a posição jurídica do profissional." 
    },
    { 
      question: "Como funciona a análise de prontuário e consentimento?", 
      answer: "Analisamos a documentação utilizada pelo médico, identificamos fragilidades e promovemos as adequações jurídicas necessárias. O objetivo é tornar prontuários, termos de consentimento e demais registros mais claros, completos e compatíveis com as exigências éticas e legais, sempre respeitando o sigilo e a ética profissional." 
    },
    { 
      question: "Atende médicos de qualquer especialidade e região?", 
      answer: "Sim. Atendemos médicos de diferentes especialidades em todo o Brasil, considerando as particularidades de cada área de atuação e as normas aplicáveis perante o respectivo Conselho Regional de Medicina." 
    },
    { 
      question: "Como é o formato: online ou presencial?", 
      answer: "O atendimento pode ser realizado presencialmente ou por videoconferência. Em ambas as modalidades, o médico recebe orientação individualizada, análise técnica e tratamento sigiloso das informações." 
    },
    { 
      question: "Posso buscar orientação mesmo sem ter recebido uma reclamação?", 
      answer: "Sim. A assessoria preventiva é indicada justamente para quem deseja organizar sua atuação antes do surgimento de um conflito. Quanto mais cedo os riscos forem identificados, maiores são as possibilidades de correção e estruturação adequada." 
    },
    { 
      question: "A consultoria preventiva impede que o médico seja processado?", 
      answer: "Nenhuma atuação profissional elimina integralmente a possibilidade de questionamentos. A consultoria preventiva, contudo, reduz fragilidades, aprimora a documentação e fortalece a capacidade de resposta do médico diante de eventuais reclamações." 
    },
    { 
      question: "Os documentos são personalizados?", 
      answer: "Sim. Os documentos são elaborados ou revisados conforme a especialidade, os procedimentos realizados, a estrutura da clínica e a realidade profissional do médico. Não trabalhamos com modelos genéricos aplicados indistintamente." 
    },
    { 
      question: "As informações compartilhadas são sigilosas?", 
      answer: "Absolutamente! Todas as informações, documentos e estratégias discutidos no atendimento são protegidos pelo sigilo profissional da advocacia." 
    }
  ];

  const filteredFaqs = faqs.filter(
    faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 bg-[#0F172A]/50 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle centered subtitle="DÚVIDAS FREQUENTES">PERGUNTAS E RESPOSTAS</SectionTitle>
        
        {/* Elegant FAQ search bar */}
        <div className="mb-8 max-w-xl mx-auto">
          <input 
            type="text"
            placeholder="Digite para buscar uma dúvida... (Ex: CRM, prontuário, sigilo)"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#30455E] focus:ring-1 focus:ring-[#30455E] transition-all text-sm md:text-base shadow-inner"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, i) => {
              const originalIndex = faqs.findIndex(item => item.question === faq.question);
              return (
                <div key={i} className="glass rounded-2xl overflow-hidden border-white/5 shadow-md">
                  <button 
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors text-white"
                    onClick={() => setOpenIndex(openIndex === originalIndex ? null : originalIndex)}
                  >
                    <span className="text-base md:text-lg font-bold pr-4">{faq.question}</span>
                    <ChevronDown className={`transition-transform duration-300 text-gray-400 flex-shrink-0 ${openIndex === originalIndex ? 'rotate-180 text-white' : ''}`} />
                  </button>
                  <div className={`transition-all duration-350 ease-in-out overflow-hidden ${openIndex === originalIndex ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed text-sm md:text-base border-t border-white/5 bg-[#0F172A]/40">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-10 italic">
              Nenhuma pergunta encontrada com o termo buscado. Tente termos como "CRM", "documentos", "online" ou "processo".
            </div>
          )}
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
      const apiKey = getApiKey();
      const ai = new GoogleGenAI({ apiKey });
      const result = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: input,
        config: {
          systemInstruction: `Você é o assistente virtual de inteligência artificial de elite do Dr. Jorge Alvim, advogado especializado em Direito Médico e da Saúde.
Responda de forma profissional, extremamente ética, técnica, acolhedora e sóbria.
Suas respostas devem ser baseadas nas informações oficiais do Dr. Jorge Alvim:

- Sobre o Dr. Jorge Alvim:
  * Especialista em Direito Civil, Médico, Odontológico e da Saúde pelo IPEBJ e pela prestigiada Faculdade de Medicina de Ribeirão Preto da Universidade de São Paulo (FMRP/USP).
  * Pós-graduado em Direito Processual Civil.
  * Foi Secretário-Geral da Comissão Estadual de Direito Médico da OAB Minas Gerais.
  * Presidente da Comissão de Direito Médico e da Saúde da 14ª Subseção da OAB/MG.
  * Atua como professor e palestrante nacional em ética médica, responsabilidade profissional e judicialização da saúde.

- Contatos e Informações Oficiais:
  * Telefone/WhatsApp: (34) 99771-2222 (O botão "Agendar Consulta" no site direciona para este contato).
  * E-mail: contato@jorgealvim.adv.br
  * OAB/MG 180.926

- Diretrizes de Resposta:
  * Nunca forneça aconselhamento jurídico final ou veredicto definitivo. Diga sempre que cada caso possui particularidades que exigem uma análise técnica minuciosa de documentos e contexto.
  * Destaque constantemente a importância extraordinária da assessoria jurídica preventiva para mitigar riscos, sindicâncias e processos perante os Conselhos de Medicina e os Tribunais Civis.
  * Oriente ativamente o usuário a agendar uma consulta personalizada com o Dr. Jorge Alvim para uma análise individualizada de documentos (termos de consentimento, contratos, prontuários, etc.) ou para estruturar sua defesa técnica de maneira adequada.
  * Use sempre português formal, polido e correto do Brasil.
  * Se o usuário fizer uma pergunta correspondente a uma das dúvidas frequentes (FAQ) do site, forneça uma resposta alinhada às informações apresentadas oficialmente no site.`,
          temperature: 0.7,
        }
      });
      setResponse(result.text || "Desculpe, não consegui processar sua dúvida agora.");
    } catch (e) {
      setResponse("Para dúvidas jurídicas específicas, por favor, agende uma consulta direta. O Dr. Jorge Alvim poderá analisar seu caso individualmente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!showChat ? (
        <button 
          onClick={() => setShowChat(true)}
          className="w-16 h-16 bg-[#30455E] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group relative border border-white/10"
        >
          <MessageSquare size={28} />
          <span className="absolute right-full mr-4 bg-[#1e293b] text-white px-4 py-2 rounded-lg text-xs font-bold shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/5 pointer-events-none">
            Tem alguma dúvida? Pergunte à nossa IA
          </span>
        </button>
      ) : (
        <div className="w-[350px] md:w-[400px] h-[500px] bg-[#1e293b] rounded-3xl shadow-2xl flex flex-col border border-white/10 overflow-hidden animate-in zoom-in-95 duration-200">
          <div className="bg-[#30455E] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-white" />
              <span className="font-bold text-white text-xs uppercase tracking-widest">Assistente IA Dr. Jorge Alvim</span>
            </div>
            <button onClick={() => setShowChat(false)} className="text-white/60 hover:text-white"><X size={20} /></button>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#0F172A]">
            {response ? (
              <div className="bg-white/5 p-4 rounded-2xl text-sm leading-relaxed text-gray-300 border border-white/5">
                {response}
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm italic mt-10">
                Olá, sou o assistente virtual do Dr. Jorge Alvim. Em que posso orientar sobre sua segurança documental ou ética médica hoje?
              </div>
            )}
            {loading && <div className="text-center text-[#10B981] animate-pulse text-xs">Analisando contexto jurídico-médico...</div>}
          </div>

          <div className="p-4 bg-[#0F172A] border-t border-white/5">
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: Qual o risco de um prontuário incompleto?"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#30455E] text-white"
                onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              />
              <button 
                onClick={handleAsk}
                disabled={loading}
                className="bg-[#30455E] p-2 rounded-xl text-white hover:bg-[#3d5776] disabled:opacity-50"
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
            <span className="font-bold text-2xl tracking-tighter text-white">JORGE ALVIM</span>
          </div>
          <p className="text-gray-400 max-w-sm mb-8 leading-relaxed text-sm">
            Advocacia premium e preventivo estratégico especializado em Direito Médico e da Saúde. Atuação ética, técnica e ágil para a proteção integral da carreira médica em todo o país.
          </p>
          <div className="flex gap-4">
            <a href="https://wa.me/5534997712222" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#30455E] transition-all text-white/60 hover:text-white"><Instagram size={20} /></a>
            <a href="https://wa.me/5534997712222" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#30455E] transition-all text-white/60 hover:text-white"><Linkedin size={20} /></a>
            <a href="mailto:contato@jorgealvim.adv.br" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#30455E] transition-all text-white/60 hover:text-white"><Mail size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-base mb-6 text-white uppercase tracking-wider">Links Úteis</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
            <li><a href="#sobre" className="hover:text-white transition-colors">Sobre o Dr. Jorge</a></li>
            <li><a href="#solucoes" className="hover:text-white transition-colors">Diferencial Preventivo</a></li>
            <li><a href="#areas" className="hover:text-white transition-colors">Áreas de Atuação</a></li>
            <li><a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-base mb-6 text-white uppercase tracking-wider">Contato Oficial</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center gap-3 hover:text-white transition-colors">
              <Phone size={16} className="text-[#30455E]" /> 
              <a href="https://wa.me/5534997712222" target="_blank" rel="noopener noreferrer">(34) 99771-2222</a>
            </li>
            <li className="flex items-center gap-3 hover:text-white transition-colors">
              <Mail size={16} className="text-[#30455E]" /> 
              <a href="mailto:contato@jorgealvim.adv.br">contato@jorgealvim.adv.br</a>
            </li>
            <li className="flex items-start gap-3">
              <FileText size={16} className="mt-1 text-[#30455E]" /> 
              <span>OAB/MG 180.926</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium tracking-widest uppercase text-center md:text-left">
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
    <div className="min-h-screen bg-[#0F172A] text-white">
      <Navbar />
      <main>
        <Hero />
        <ContextSection />
        <AboutSection />
        <PainPointsSection />
        <SolutionsSection />
        <PracticeAreas />
        <OfferSection />
        <FAQ />
      </main>
      <Footer />
      <AIConsultant />
      
      {/* Global Grainy Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
}
