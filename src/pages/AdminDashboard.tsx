import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Registration {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone: string;
    ticket_type: string;
    cpf_cnpj: string;
    payment_method: string;
    installments: number;
    amount: number;
    is_sent: boolean;
    is_paid: boolean;
}

const AdminDashboard = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState<'all' | 'not_sent' | 'not_paid'>('all');

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('workshop0126_registrations')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setRegistrations(data || []);
        } catch (err: any) {
            console.error('Error fetching data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id: string, field: 'is_sent' | 'is_paid', currentValue: boolean) => {
        // Optimistic update (update local state immediately for better UX)
        setRegistrations(prev => prev.map(reg =>
            reg.id === id ? { ...reg, [field]: !currentValue } : reg
        ));

        try {
            const { error } = await supabase
                .from('workshop0126_registrations')
                .update({ [field]: !currentValue })
                .eq('id', id);

            if (error) throw error;
        } catch (err: any) {
            console.error('Error updating status:', err);
            alert('Falha ao atualizar status. Recarregando dados...');
            fetchRegistrations(); // Revert on error
        }
    };

    // Filter Logic
    const filteredRegistrations = registrations.filter(reg => {
        if (filter === 'not_sent') return !reg.is_sent;
        if (filter === 'not_paid') return !reg.is_paid;
        return true;
    });

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('pt-BR');
    };

    const translatePayment = (method: string) => {
        return method === 'pix' ? 'Pix' : 'Cartão de Crédito';
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-gray-200 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                        <span className="material-icons-round text-[#10B981]">admin_panel_settings</span>
                        Gestão de Inscrições
                    </h1>

                    {/* Filters */}
                    <div className="flex gap-2 bg-black/20 p-1 rounded-lg border border-white/5 overflow-x-auto">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${filter === 'all'
                                    ? 'bg-white/10 text-white shadow-sm'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setFilter('not_sent')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${filter === 'not_sent'
                                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20 shadow-sm'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Não Enviados
                        </button>
                        <button
                            onClick={() => setFilter('not_paid')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${filter === 'not_paid'
                                    ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/20 shadow-sm'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Não Pagos
                        </button>
                    </div>

                    <button
                        onClick={fetchRegistrations}
                        className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2 transition-colors shrink-0"
                    >
                        <span className="material-icons-round text-sm">refresh</span>
                        Atualizar
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10B981] mx-auto mb-4"></div>
                        <p className="text-gray-400">Carregando inscrições...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 mb-8">
                        Erro ao carregar: {error}
                    </div>
                ) : (
                    <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="bg-black/20 text-gray-200 uppercase font-bold text-xs">
                                    <tr>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Data</th>
                                        <th className="px-6 py-4">Nome</th>
                                        <th className="px-6 py-4">Contato</th>
                                        <th className="px-6 py-4">Ingresso</th>
                                        <th className="px-6 py-4">Pagamento</th>
                                        <th className="px-6 py-4 text-right">Valor</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredRegistrations.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-8 text-center text-gray-500 italic">
                                                Nenhum registro encontrado para este filtro.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredRegistrations.map((reg) => (
                                            <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-2">
                                                        <button
                                                            onClick={() => toggleStatus(reg.id, 'is_sent', reg.is_sent)}
                                                            className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs font-bold border transition-colors ${reg.is_sent
                                                                    ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                                                    : 'bg-white/5 text-gray-500 border-white/5 hover:border-gray-500'
                                                                }`}
                                                        >
                                                            <span className="material-icons-round text-sm">
                                                                {reg.is_sent ? 'check_box' : 'check_box_outline_blank'}
                                                            </span>
                                                            Enviado
                                                        </button>
                                                        <button
                                                            onClick={() => toggleStatus(reg.id, 'is_paid', reg.is_paid)}
                                                            className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs font-bold border transition-colors ${reg.is_paid
                                                                    ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30'
                                                                    : 'bg-white/5 text-gray-500 border-white/5 hover:border-gray-500'
                                                                }`}
                                                        >
                                                            <span className="material-icons-round text-sm">
                                                                {reg.is_paid ? 'check_box' : 'check_box_outline_blank'}
                                                            </span>
                                                            Pago
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs">
                                                    {formatDate(reg.created_at)}
                                                </td>
                                                <td className="px-6 py-4 font-medium text-white">
                                                    <div className="flex flex-col">
                                                        <span>{reg.name}</span>
                                                        <span className="text-xs text-gray-500">{reg.cpf_cnpj}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span>{reg.email}</span>
                                                        <span className="text-xs text-[#10B981]">{reg.phone}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-bold uppercase ${reg.ticket_type === 'adult' ? 'bg-[#10B981]/10 text-[#10B981]' :
                                                            reg.ticket_type === 'kids' ? 'bg-yellow-500/10 text-yellow-500' :
                                                                'bg-purple-500/10 text-purple-500'
                                                        }`}>
                                                        {reg.ticket_type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span>{translatePayment(reg.payment_method)}</span>
                                                        {reg.installments > 1 && (
                                                            <span className="text-xs text-gray-500">{reg.installments}x</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-white">
                                                    {formatCurrency(reg.amount)}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
