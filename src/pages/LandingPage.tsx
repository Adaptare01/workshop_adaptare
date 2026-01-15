import React, { useState } from 'react';
import RegistrationModal from '../components/RegistrationModal';
import mentorImage from '../assets/maykol_ouriques.jpg';
import adaptareLogo from '../assets/adaptare_logo.png';

// --- Components ---

const Navbar = ({ onOpenModal }: { onOpenModal: () => void }) => (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-black/5 bg-white/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                    <img src={adaptareLogo} alt="Adaptare Software" className="h-12 w-auto" />
                </div>
                <div className="hidden md:block">
                    <a href="#precos" className="bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-lg shadow-[#10B981]/20">
                        Garantir Vaga
                    </a>
                </div>
            </div>
        </div>
    </nav>
);

const Hero = ({ onOpenModal }: { onOpenModal: () => void }) => (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0B1120]">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
            <div className="grid-bg w-full h-full absolute"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981] rounded-full filter blur-[128px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B82F6] rounded-full filter blur-[128px] opacity-20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-fade-in-up">
                <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                </span>
                <span className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Vagas Limitadas • Joaçaba</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-white">
                Pare de usar IA somente como um buscador e aplique ela em seu <span className="text-[#10B981] text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#3B82F6]">negócio</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                Workshop prático de 8 horas para transformar tecnologia em dinheiro no bolso.
                Saia com seu <strong>Consultor Digital pronto</strong> e pare de perder tempo com tarefas repetitivas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#precos" className="w-full sm:w-auto px-8 py-4 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#10B981]/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
                    Quero minha vaga agora
                    <span className="material-icons-round text-xl">arrow_forward</span>
                </a>
                <a href="#kids" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:border-[#3B82F6] text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group">
                    <span className="material-icons-round text-[#3B82F6] group-hover:scale-110 transition-transform">child_care</span>
                    Ver Módulo Kids
                </a>
            </div>

            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg">
                    <span className="material-icons-round text-[#10B981]">calendar_month</span>
                    <span>22/01 e 29/01 (Noite)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg">
                    <span className="material-icons-round text-[#10B981]">location_on</span>
                    <span>Joaçaba, SC</span>
                </div>
            </div>
        </div>
    </section>
);

const Pain = () => (
    <section className="py-20 bg-[#0B1120] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 rounded-full filter blur-[80px]"></div>

                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white flex items-center gap-3">
                    <span className="bg-red-500/20 text-red-500 p-2 rounded-lg material-icons-round">psychology_alt</span>
                    A IA ainda é um "Bicho de Sete Cabeças"?
                </h2>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    Você ouve falar o dia todo, mas na hora de aplicar no seu caixa, trava? O tempo está passando e sua concorrência já está usando ferramentas que você nem sabe o nome.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                        <span className="material-icons-round text-red-400 mt-1">block</span>
                        <div>
                            <h3 className="font-bold text-white">Curiosidade Paralisante</h3>
                            <p className="text-sm text-gray-400">Você sabe que precisa usar, mas fica perdido em tutoriais técnicos que não falam a língua do seu negócio.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                        <span className="material-icons-round text-red-400 mt-1">smart_toy</span>
                        <div>
                            <h3 className="font-bold text-white">Medo de parecer Robô</h3>
                            <p className="text-sm text-gray-400">Seus clientes não querem falar com máquinas burras. Ensinamos a IA a ter a SUA personalidade.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const Curriculum = () => (
    <section className="py-20 bg-[#0B1120] border-t border-white/5" id="conteudo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <span className="text-[#10B981] font-bold tracking-wider uppercase text-sm">Método Adaptare</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-white">Do Zero ao Automático</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">5 Módulos para sair com a empresa rodando no automático.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {/* Module 1 */}
                <div className="bg-[#111827] border border-white/10 p-6 rounded-2xl hover:border-[#10B981]/50 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-[#10B981]/20 rounded-lg flex items-center justify-center mb-4 text-[#10B981] font-bold text-lg group-hover:bg-[#10B981] group-hover:text-white transition-colors">1</div>
                    <h3 className="text-xl font-bold mb-2 text-white">A Arte de Conversar</h3>
                    <p className="text-gray-400 text-sm mb-4">Como dar ordens que geram lucro.</p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> As Ferramentas Certas (Comparativo)</li>
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Estrutura de Comandos (Prompts)</li>
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Eliminando respostas ruins</li>
                    </ul>
                </div>

                {/* Module 2 */}
                <div className="bg-[#111827] border border-white/10 p-6 rounded-2xl hover:border-[#10B981]/50 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-[#10B981]/20 rounded-lg flex items-center justify-center mb-4 text-[#10B981] font-bold text-lg group-hover:bg-[#10B981] group-hover:text-white transition-colors">2</div>
                    <h3 className="text-xl font-bold mb-2 text-white">Seu Consultor Digital</h3>
                    <p className="text-gray-400 text-sm mb-4">O "Sócio" que não dorme (NotebookLM).</p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Colocando sua empresa na IA</li>
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Analisando PDFs e Contratos</li>
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Criando Estratégias de Venda</li>
                    </ul>
                </div>

                {/* Module 3 */}
                <div className="bg-[#111827] border border-white/10 p-6 rounded-2xl hover:border-[#10B981]/50 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-[#10B981]/20 rounded-lg flex items-center justify-center mb-4 text-[#10B981] font-bold text-lg group-hover:bg-[#10B981] group-hover:text-white transition-colors">3</div>
                    <h3 className="text-xl font-bold mb-2 text-white">Assistentes 24h</h3>
                    <p className="text-gray-400 text-sm mb-4">Funcionários digitais para rotinas.</p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Criando Assistentes Especialistas</li>
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Automação de WhatsApp/Agenda</li>
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Triagem de Clientes no Automático</li>
                    </ul>
                </div>

                {/* Module 4 */}
                <div className="bg-[#111827] border border-white/10 p-6 rounded-2xl hover:border-[#10B981]/50 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-[#10B981]/20 rounded-lg flex items-center justify-center mb-4 text-[#10B981] font-bold text-lg group-hover:bg-[#10B981] group-hover:text-white transition-colors">4</div>
                    <h3 className="text-xl font-bold mb-2 text-white">Marketing Profissional</h3>
                    <p className="text-gray-400 text-sm mb-4">Design de ponta sem Designer.</p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Dominando o Grok (xAI)</li>
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Imagens que Vendem</li>
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Anúncios Prontos em minutos</li>
                    </ul>
                </div>

                {/* Module 5 */}
                <div className="bg-[#111827] border border-white/10 p-6 rounded-2xl hover:border-[#10B981]/50 transition-all duration-300 group">
                    <div className="w-10 h-10 bg-[#10B981]/20 rounded-lg flex items-center justify-center mb-4 text-[#10B981] font-bold text-lg group-hover:bg-[#10B981] group-hover:text-white transition-colors">5</div>
                    <h3 className="text-xl font-bold mb-2 text-white">Liderança com IA</h3>
                    <p className="text-gray-400 text-sm mb-4">Você no comando, não a máquina.</p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Supervisão (Human-in-the-loop)</li>
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Segurança dos seus Dados</li>
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Plano de Ação de 30 dias</li>
                    </ul>
                </div>

                {/* Bonus */}
                <div className="bg-gradient-to-br from-[#10B981]/10 to-[#111827] border border-[#10B981]/30 p-6 rounded-2xl shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/10 rounded-full filter blur-3xl"></div>
                    <div className="w-10 h-10 bg-[#10B981] text-white rounded-lg flex items-center justify-center mb-4 font-bold text-lg shadow-lg shadow-[#10B981]/20">
                        <span className="material-icons-round">star</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">Kit de Implementação</h3>
                    <p className="text-gray-400 text-sm mb-4">Não comece do zero.</p>
                    <ul className="space-y-2 text-gray-300 text-sm relative z-10">
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Ferramentas já configuradas</li>
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Biblioteca de Comandos Prontos</li>
                        <li className="flex items-start gap-2"><span className="material-icons-round text-[#10B981] text-xs mt-1">check</span> Suporte no WhatsApp (7 dias)</li>
                    </ul>
                </div>
            </div>

            {/* Support Block */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#111827] border border-white/10 rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#10B981]/10 rounded-full filter blur-3xl"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-[#10B981]/10 rounded-2xl flex items-center justify-center mb-6 text-[#10B981]">
                            <span className="material-icons-round text-4xl">support_agent</span>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">7 Dias de Suporte</h3>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Acompanhamento via WhatsApp em grupo <strong>entre os encontros</strong> para tirar dúvidas.
                            Você não vai travar na hora de executar.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </section>
);

const FamilyBridge = () => (
    <section className="relative py-12 md:py-20 bg-[#0B1120] overflow-hidden">
        {/* Connection Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-white/5 to-purple-500/50"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="bg-gradient-to-r from-[#111827] to-[#161E2E] border border-purple-500/30 rounded-3xl p-8 md:p-12 text-center relative shadow-2xl">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-[64px] pointer-events-none"></div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold uppercase tracking-wider mb-8 shadow-sm">
                    <span className="material-icons-round text-base">diversity_3</span>
                    Aprenda em Família
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                    Enquanto Você Aprende a Lucrar Mais...
                </h2>
                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
                    Seu filho pode aprender a estudar melhor. <span className="text-white font-semibold">Na mesma semana</span>, antes das aulas começarem.
                </p>

                <div className="grid md:grid-cols-3 gap-4 text-left mb-10 max-w-4xl mx-auto">
                    {/* Checklist Items */}
                    <div className="bg-black/20 p-5 rounded-xl border border-white/5 flex items-center gap-4 hover:border-[#10B981]/30 transition-colors">
                        <span className="material-icons-round text-[#10B981] text-2xl">check_circle</span>
                        <span className="text-sm text-gray-300 leading-snug">Você domina IA para <strong className="text-white block text-base">negócios (noite)</strong></span>
                    </div>
                    <div className="bg-black/20 p-5 rounded-xl border border-white/5 flex items-center gap-4 hover:border-yellow-500/30 transition-colors">
                        <span className="material-icons-round text-yellow-500 text-2xl">check_circle</span>
                        <span className="text-sm text-gray-300 leading-snug">Ele domina IA para <strong className="text-white block text-base">estudos (tarde)</strong></span>
                    </div>
                    <div className="bg-black/20 p-5 rounded-xl border border-white/5 flex items-center gap-4 hover:border-purple-500/30 transition-colors">
                        <span className="material-icons-round text-purple-500 text-2xl">check_circle</span>
                        <span className="text-sm text-gray-300 leading-snug">Vocês falam a <strong className="text-white block text-base">mesma língua</strong></span>
                    </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-8 relative max-w-3xl mx-auto border border-white/5">
                    <span className="material-icons-round text-gray-600 absolute top-6 left-6 text-4xl opacity-20">format_quote</span>
                    <p className="text-gray-300 italic relative z-10 leading-relaxed text-lg mb-6">
                        "O resultado? Quando chegar em casa, vocês vão trocar: ele mostra o que criou, você mostra o que automatizou. Finalmente você consegue ajudar ele nos estudos usando as mesmas ferramentas."
                    </p>
                    <div className="inline-block bg-purple-500/20 text-purple-300 px-4 py-2 rounded-lg font-bold text-sm tracking-wide uppercase border border-purple-500/20">
                        🚀 Comece 2026 com a família inteira preparada
                    </div>
                </div>
            </div>
        </div>

        {/* Connection Line Bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-purple-500/50 to-transparent"></div>
    </section>
);

const KidsSection = () => (
    <section className="py-20 bg-[#0F1419] relative overflow-hidden" id="kids">
        {/* Decor */}
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-float">🦖</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🌋</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-block px-4 py-1 rounded-full bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 text-xs font-bold uppercase tracking-wider mb-4">
                        Mestre da IA KIDS
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        O Fim do Dever de Casa <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Chato</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Enquanto você aprende a lucrar mais, seu filho descobre como transformar o estudo em uma aventura épica.
                        Não é só "usar IA", é desenvolver raciocínio lógico e criatividade gamificada.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <span className="text-yellow-500 text-2xl material-icons-round mb-2">style</span>
                            <h4 className="font-bold text-white">Cartas de Prompt</h4>
                            <p className="text-xs text-gray-400">Aprenda a "programar" jogando cartas.</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <span className="text-orange-500 text-2xl material-icons-round mb-2">menu_book</span>
                            <h4 className="font-bold text-white">HQ de Sobrevivência</h4>
                            <p className="text-xs text-gray-400">Criando quadrinhos profissionais.</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <span className="text-green-500 text-2xl material-icons-round mb-2">school</span>
                            <h4 className="font-bold text-white">Estudo Gamificado</h4>
                            <p className="text-xs text-gray-400">Nunca mais brigue para ele estudar.</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <span className="text-blue-500 text-2xl material-icons-round mb-2">security</span>
                            <h4 className="font-bold text-white">Ambiente Seguro</h4>
                            <p className="text-xs text-gray-400">Foco total em educação.</p>
                        </div>
                    </div>

                    <div className="p-6 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-2xl flex flex-col sm:flex-row gap-6 items-center justify-between">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                                    <span className="material-icons-round">calendar_today</span>
                                </span>
                                <div>
                                    <p className="text-yellow-400 font-bold text-sm">DATA</p>
                                    <p className="text-gray-300 text-sm">27/01 e 28/01 (Tarde)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                                    <span className="material-icons-round">restaurant</span>
                                </span>
                                <div>
                                    <p className="text-yellow-400 font-bold text-sm">INCLUSO</p>
                                    <p className="text-gray-300 text-sm">Lanche para os alunos</p>
                                </div>
                            </div>
                        </div>

                        {/* Age Highlight */}
                        <div className="bg-yellow-500 text-[#0B1120] px-6 py-4 rounded-xl text-center shadow-lg shadow-yellow-500/10 min-w-[140px] transform hover:scale-105 transition-transform">
                            <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Idade</p>
                            <p className="text-3xl font-extrabold leading-none">10-13</p>
                            <p className="text-xs font-bold uppercase tracking-wider mt-1">Anos</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center lg:items-center">
                    {/* Phone Frame Video Container */}
                    <div className="relative w-full max-w-[300px] aspect-[9/16] bg-gray-900 rounded-[2.5rem] border-[12px] border-gray-800 shadow-2xl overflow-hidden group mb-6">
                        {/* Phone Notch/Details */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-20"></div>

                        <iframe
                            src="https://www.youtube.com/embed/eIkmb0Vf8qU?rel=0&modestbranding=1&playsinline=1&controls=1"
                            title="Mestres da IA Kids Video"
                            className="absolute inset-0 w-full h-full object-cover"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Fallback Button */}
                    <a
                        href="https://www.youtube.com/watch?v=eIkmb0Vf8qU"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mb-6 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-2 border border-white/5"
                    >
                        <span className="material-icons-round text-sm">open_in_new</span>
                        Assistir diretamente no YouTube
                    </a>

                    <div className="flex items-center justify-center gap-2 text-red-400 bg-red-500/10 py-3 rounded-lg border border-red-500/20 animate-pulse w-full max-w-[300px]">
                        <span className="material-icons-round text-sm">timer</span>
                        <span className="text-sm font-bold uppercase tracking-wide">Apenas 10 vagas Kids</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
);



const Mentor = () => (
    <section className="py-20 bg-[#0B1120]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative">
                    <div className="absolute inset-0 bg-[#10B981] rounded-full blur-xl opacity-20"></div>
                    <img
                        src={mentorImage}
                        alt="Maykol Ouriques"
                        className="w-full h-full object-cover rounded-full border-4 border-white/10 shadow-2xl relative z-10 transition-all duration-500"
                    />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Maykol Ouriques</h2>
                    <p className="text-[#10B981] font-medium mb-4">CEO da Adaptare & Estrategista</p>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        Especialista em transformar tecnologia complexa em lucro real para PMEs. Sua missão é ser o "braço direito" do empresário que quer automatizar, tirando o tecnês da frente e colocando dinheiro no bolso.
                    </p>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/5 text-sm text-gray-300">
                            +10 Anos de XP
                        </div>
                        <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/5 text-sm text-gray-300">
                            Foco em Resultado
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const Pricing = ({ onOpenModal }: { onOpenModal: (type: 'adult' | 'kids' | 'combo') => void }) => (
    <section className="py-20 bg-[#0F1419]" id="precos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Invista na Família Inteira</h2>
                <p className="text-gray-400">Você no negócio. Seu filho nos estudos.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

                {/* Kids */}
                <div className="bg-[#111827] rounded-2xl p-8 border border-white/10 hover:border-yellow-500/50 transition-colors shadow-lg flex flex-col">
                    <div className="mb-4">
                        <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase">10 a 13 anos</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Mestres da IA Kids</h3>
                    <p className="text-gray-400 text-xs mb-4">27/01 e 28/01 (Tarde)</p>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-sm text-gray-500">R$</span>
                        <span className="text-4xl font-extrabold text-white">350</span>
                        <span className="text-sm text-gray-500">/pessoa</span>
                    </div>
                    <ul className="space-y-4 mb-8 text-gray-400 flex-grow">
                        <li className="flex items-center gap-3"><span className="material-icons-round text-yellow-500 text-sm">check</span> Missão Ilha Nublar</li>
                        <li className="flex items-center gap-3"><span className="material-icons-round text-yellow-500 text-sm">check</span> Material Gamificado</li>
                        <li className="flex items-center gap-3"><span className="material-icons-round text-yellow-500 text-sm">check</span> Lanche Incluso</li>
                    </ul>
                    <p className="text-xs text-center text-[#10B981] mb-3 font-medium">5% de desconto no PIX</p>
                    <button onClick={() => onOpenModal('kids')} className="w-full py-3 border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 rounded-xl font-bold transition-colors">
                        Inscrever Kids
                    </button>
                </div>

                {/* Adult */}
                <div className="bg-[#111827] rounded-2xl p-8 border-2 border-[#10B981] shadow-2xl relative flex flex-col transform md:-translate-y-4">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#10B981] text-white px-4 py-1 rounded-full text-xs font-bold uppercase shadow-lg">Recomendado</div>
                    <div className="mb-4 mt-2">
                        <span className="text-[#10B981] text-xs font-bold px-3 py-1 rounded-full uppercase bg-[#10B981]/10">Empreendedores</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Workshop Adulto</h3>
                    <p className="text-gray-400 text-xs mb-4">22/01 e 29/01 (Noite)</p>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-sm text-gray-400">R$</span>
                        <span className="text-4xl font-extrabold text-white">380</span>
                        <span className="text-sm text-gray-400">/pessoa</span>
                    </div>
                    <ul className="space-y-4 mb-8 text-gray-300 flex-grow">
                        <li className="flex items-center gap-3"><span className="material-icons-round text-[#10B981] text-sm">check</span> 8 Horas Práticas</li>
                        <li className="flex items-center gap-3"><span className="material-icons-round text-[#10B981] text-sm">check</span> Consultor Digital Pronto</li>
                        <li className="flex items-center gap-3"><span className="material-icons-round text-[#10B981] text-sm">check</span> Assistentes 24h Configurados</li>
                        <li className="flex items-center gap-3"><span className="material-icons-round text-[#10B981] text-sm">check</span> Suporte WhatsApp (7 Dias)</li>
                    </ul>
                    <p className="text-xs text-center text-[#10B981] mb-3 font-medium">5% de desconto no PIX</p>
                    <button onClick={() => onOpenModal('adult')} className="w-full py-4 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl font-bold shadow-lg shadow-[#10B981]/20 transition-colors">
                        Garantir Minha Vaga
                    </button>
                </div>

                {/* Combo */}
                <div className="bg-gradient-to-b from-purple-900/20 to-[#111827] rounded-2xl p-8 border border-purple-500/30 shadow-lg flex flex-col">
                    <div className="mb-4">
                        <span className="bg-purple-500/20 text-purple-400 border border-purple-500/20 text-xs font-bold px-3 py-1 rounded-full uppercase">Combo Família</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Pais + Filhos</h3>
                    <p className="text-gray-400 text-xs mb-4">Adulto + Kids</p>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-sm text-gray-500">R$</span>
                        <span className="text-4xl font-extrabold text-white">650</span>
                        <span className="text-sm text-gray-500">/total</span>
                    </div>
                    <p className="text-xs text-green-400 font-bold mb-4 bg-green-900/20 inline-block px-2 py-1 rounded">Economia de R$ 80,00</p>
                    <ul className="space-y-4 mb-8 text-gray-400 flex-grow">
                        <li className="flex items-center gap-3"><span className="material-icons-round text-purple-400 text-sm">check</span> 1 Ingresso Adulto</li>
                        <li className="flex items-center gap-3"><span className="material-icons-round text-purple-400 text-sm">check</span> 1 Ingresso Kids (Sai por R$ 300)</li>
                        <li className="flex items-center gap-3"><span className="material-icons-round text-purple-400 text-sm">check</span> Suporte Completo</li>
                    </ul>
                    <p className="text-xs text-center text-[#10B981] mb-3 font-medium">5% de desconto no PIX</p>
                    <button onClick={() => onOpenModal('combo')} className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/20 transition-colors">
                        Garantir Combo Família
                    </button>
                </div>

            </div>
        </div>
    </section>
);

const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ticketType, setTicketType] = useState<'adult' | 'kids' | 'combo'>('adult');

    const openModal = (type: 'adult' | 'kids' | 'combo' = 'adult') => {
        setTicketType(type);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-[#0B1120] min-h-screen text-slate-200 selection:bg-[#10B981] selection:text-white font-sans">
            <Navbar onOpenModal={() => openModal('adult')} />
            <Hero onOpenModal={() => openModal('adult')} />
            <Pain />
            <Curriculum />
            <FamilyBridge />
            <KidsSection />
            <Mentor />
            <Pricing onOpenModal={openModal} />
            <footer className="py-10 text-center text-gray-600 text-sm border-t border-white/5 bg-[#0B1120]">
                <p>© {new Date().getFullYear()} Adaptare Software. Todos os direitos reservados.</p>
            </footer>
            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialTicketType={ticketType}
            />
        </div>
    );
};

export default LandingPage;
