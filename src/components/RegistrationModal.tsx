import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Helper for masking phone numbers (Brazilian format)
const maskPhone = (value: string) => {
    return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d)(\d{4})$/, '$1-$2');
};

const maskCpfCnpj = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');

    if (cleanValue.length <= 11) {
        return cleanValue
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    }

    return cleanValue
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
};

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTicketType?: 'adult' | 'kids' | 'combo';
}

const PRICES = {
    adult: 380,
    kids: 350,
    combo: 650
};

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, initialTicketType = 'adult' }) => {
    const [step, setStep] = useState(1);
    const [ticketType, setTicketType] = useState(initialTicketType);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        cpfCnpj: '',
        paymentMethod: 'pix',
        installments: 1,
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (initialTicketType) {
            setTicketType(initialTicketType);
        }
    }, [initialTicketType]);

    // Reset state when opening/closing
    useEffect(() => {
        if (!isOpen) {
            setSuccess(false);
            setError('');
            setLoading(false);
            setStep(1);
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            setFormData(prev => ({ ...prev, [name]: maskPhone(value) }));
        } else if (name === 'cpfCnpj') {
            setFormData(prev => ({ ...prev, [name]: maskCpfCnpj(value) }));
        } else if (name === 'installments') {
            setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Mock submission
            // Map form data to database columns (snake_case)
            const { error: submitError } = await supabase
                .from('workshop0126_registrations')
                .insert({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    cpf_cnpj: formData.cpfCnpj,
                    payment_method: formData.paymentMethod,
                    installments: formData.installments,
                    ticket_type: ticketType,
                    amount: getPrice().final,
                    created_at: new Date().toISOString()
                })
                .select()
                .single();

            if (submitError) throw submitError;

            setSuccess(true);
            // Clear form after success
            setFormData({ name: '', email: '', phone: '', cpfCnpj: '', paymentMethod: 'pix', installments: 1 });
            setStep(1);
        } catch (err: any) {
            console.error('Registration error:', err);
            // Show detailed error for debugging
            setError(`Erro técnico: ${err.message || err.error_description || JSON.stringify(err)}`);
        } finally {
            setLoading(false);
        }
    };

    const getPrice = () => {
        const basePrice = PRICES[ticketType as keyof typeof PRICES] || 0;
        if (formData.paymentMethod === 'pix') {
            return {
                base: basePrice,
                final: basePrice * 0.95,
                discount: true
            };
        }
        return {
            base: basePrice,
            final: basePrice,
            installmentValue: basePrice / formData.installments,
            discount: false
        };
    };

    const priceInfo = getPrice();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative bg-[#111827] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all animate-fade-in-up">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
                >
                    <span className="material-icons-round">close</span>
                </button>

                <div className="p-8">
                    {success ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-[#10B981]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-icons-round text-[#10B981] text-3xl">check</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Inscrição Recebida!</h3>
                            <p className="text-gray-400 mb-6">
                                Entraremos em contato via WhatsApp com os detalhes do pagamento.
                            </p>
                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl font-bold transition-all"
                            >
                                Fechar
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {step === 1 ? 'Seus Dados' : 'Pagamento'}
                                </h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-[#10B981]' : 'bg-white/10'}`}></div>
                                    <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-[#10B981]' : 'bg-white/10'}`}></div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
                                    <span className="material-icons-round text-base">error_outline</span>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="space-y-4">
                                {step === 1 ? (
                                    // STEP 1: PERSONAL DATA
                                    <div className="space-y-4 animate-fade-in">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Nome Completo</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#10B981] transition-colors"
                                                placeholder="Seu nome"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">CPF ou CNPJ</label>
                                            <input
                                                type="text"
                                                name="cpfCnpj"
                                                required
                                                value={formData.cpfCnpj}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#10B981] transition-colors"
                                                placeholder="000.000.000-00"
                                                maxLength={18}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#10B981] transition-colors"
                                                placeholder="seu@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">WhatsApp</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#10B981] transition-colors"
                                                placeholder="(XX) XXXXX-XXXX"
                                                maxLength={15}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Tipo de Ingresso</label>
                                            <div className="grid grid-cols-3 gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setTicketType('adult')}
                                                    className={`py-2 px-1 rounded-lg border text-sm font-medium transition-all ${ticketType === 'adult'
                                                        ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                                                        : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'
                                                        }`}
                                                >
                                                    Adulto
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setTicketType('kids')}
                                                    className={`py-2 px-1 rounded-lg border text-sm font-medium transition-all ${ticketType === 'kids'
                                                        ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500'
                                                        : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'
                                                        }`}
                                                >
                                                    Kids
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setTicketType('combo')}
                                                    className={`py-2 px-1 rounded-lg border text-sm font-medium transition-all ${ticketType === 'combo'
                                                        ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                                                        : 'bg-transparent border-white/10 text-gray-400 hover:border-white/30'
                                                        }`}
                                                >
                                                    Combo
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full py-3 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl font-bold shadow-lg shadow-[#10B981]/20 transition-all transform hover:-translate-y-1 mt-4 flex items-center justify-center gap-2"
                                        >
                                            Dados do Pagamento
                                            <span className="material-icons-round">arrow_forward</span>
                                        </button>
                                    </div>
                                ) : (
                                    // STEP 2: PAYMENT
                                    <div className="space-y-6 animate-fade-in">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Forma de Pagamento</label>
                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'pix' }))}
                                                    className={`py-3 px-2 rounded-xl border text-sm font-bold transition-all flex flex-col items-center gap-1 ${formData.paymentMethod === 'pix'
                                                        ? 'bg-[#10B981]/20 border-[#10B981] text-[#10B981]'
                                                        : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/30'
                                                        }`}
                                                >
                                                    <span className="material-icons-round">qr_code_2</span>
                                                    Pix (5% OFF)
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'credit_card' }))}
                                                    className={`py-3 px-2 rounded-xl border text-sm font-bold transition-all flex flex-col items-center gap-1 ${formData.paymentMethod === 'credit_card'
                                                        ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                                                        : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/30'
                                                        }`}
                                                >
                                                    <span className="material-icons-round">credit_card</span>
                                                    Cartão de Crédito
                                                </button>
                                            </div>

                                            {formData.paymentMethod === 'credit_card' && (
                                                <div className="animate-fade-in-up">
                                                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Parcelas</label>
                                                    <select
                                                        name="installments"
                                                        value={formData.installments}
                                                        onChange={handleChange}
                                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#10B981] transition-colors appearance-none"
                                                    >
                                                        <option value={1} className="bg-[#111827]">1x de R$ {priceInfo.base.toFixed(2)} (sem juros)</option>
                                                        <option value={2} className="bg-[#111827]">2x de R$ {(priceInfo.base / 2).toFixed(2)} (sem juros)</option>
                                                        <option value={3} className="bg-[#111827]">3x de R$ {(priceInfo.base / 3).toFixed(2)} (sem juros)</option>
                                                    </select>
                                                </div>
                                            )}
                                        </div>

                                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-gray-400 text-sm">Ingresso ({ticketType === 'adult' ? 'Adulto' : ticketType === 'kids' ? 'Kids' : 'Combo'})</span>
                                                <span className="text-white font-medium">R$ {priceInfo.base.toFixed(2)}</span>
                                            </div>
                                            {priceInfo.discount && (
                                                <div className="flex justify-between items-center mb-2 text-[#10B981]">
                                                    <span className="text-xs font-bold uppercase">Desconto Pix (5%)</span>
                                                    <span className="font-bold">- R$ {(priceInfo.base - priceInfo.final).toFixed(2)}</span>
                                                </div>
                                            )}
                                            <div className="border-t border-white/10 my-3"></div>
                                            <div className="flex justify-between items-end">
                                                <span className="text-gray-300 text-sm">Total a pagar:</span>
                                                <div className="text-right">
                                                    <span className="block text-2xl font-bold text-white">R$ {priceInfo.final.toFixed(2)}</span>
                                                    {formData.paymentMethod === 'credit_card' && formData.installments > 1 && (
                                                        <span className="text-xs text-gray-400">
                                                            em {formData.installments}x de R$ {priceInfo.installmentValue?.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="px-4 py-3 border border-white/10 hover:bg-white/5 text-gray-300 rounded-xl font-bold transition-colors"
                                            >
                                                Voltar
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="flex-1 py-3 bg-[#10B981] hover:bg-[#059669] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-lg shadow-[#10B981]/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                                            >
                                                {loading ? (
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                                ) : (
                                                    <>
                                                        Confirmar Inscrição
                                                        <span className="material-icons-round text-lg">check_circle</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegistrationModal;
