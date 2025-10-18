import React, { useState, useEffect, useMemo } from 'react';
import { User } from '../types';
import { getUsers, promoteToAdmin, demoteAdmin } from '../services/authService';
import SpinnerIcon from './icons/SpinnerIcon';
import ShieldIcon from './icons/ShieldIcon';

const AdminManagementPanel: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null); // To show spinner on a specific user row

    const fetchUsers = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedUsers = await getUsers();
            setUsers(fetchedUsers);
        } catch (err) {
            console.error(err);
            setError('No se pudieron cargar los usuarios.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handlePromote = async (userId: string) => {
        setActionLoading(userId);
        try {
            await promoteToAdmin(userId);
            await fetchUsers(); // Refresh the list
        } catch (err: any) {
            alert(`Error al promover: ${err.message}`);
        } finally {
            setActionLoading(null);
        }
    };
    
    const handleDemote = async (userId: string) => {
         if (!window.confirm('¿Estás seguro de que quieres revocar los privilegios de este administrador? El usuario pasará a ser Premium.')) {
            return;
        }
        setActionLoading(userId);
        try {
            await demoteAdmin(userId);
            await fetchUsers(); // Refresh the list
        } catch (err: any) {
            alert(`Error al revocar: ${err.message}`);
        } finally {
            setActionLoading(null);
        }
    };
    
    const { admins, regularUsers } = useMemo(() => {
        const adminsList = users.filter(u => u.subscriptionStatus === 'admin');
        const regularsList = users.filter(u => u.subscriptionStatus !== 'admin');
        return { admins: adminsList, regularUsers: regularsList };
    }, [users]);
    
    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><SpinnerIcon className="w-10 h-10 text-indigo-400" /></div>;
    }
    
    if (error) {
        return <div className="text-center text-red-400 p-4">{error}</div>;
    }

    return (
        <div className="space-y-8">
            {/* Active Admins Section */}
            <section className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-white mb-4">Administradores Activos</h3>
                <div className="space-y-3">
                    {admins.map(admin => (
                        <div key={admin.id} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <ShieldIcon className="w-5 h-5 text-indigo-400" />
                                <div>
                                    <p className="font-medium text-gray-200">{admin.name}</p>
                                    <p className="text-sm text-gray-400">{admin.email}</p>
                                </div>
                            </div>
                            <div>
                                {admin.email === 'admin@test.com' ? (
                                    <span className="text-xs font-semibold text-gray-500">Principal</span>
                                ) : (
                                    <button 
                                        onClick={() => handleDemote(admin.id)}
                                        disabled={!!actionLoading}
                                        className="text-sm font-semibold text-red-400 hover:text-red-300 disabled:text-gray-500 transition-colors"
                                    >
                                        {actionLoading === admin.id ? <SpinnerIcon className="w-4 h-4" /> : 'Revocar'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            
             {/* Promote Users Section */}
            <section className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-white mb-4">Promover a Administrador</h3>
                 <div className="space-y-3">
                    {regularUsers.map(user => (
                        <div key={user.id} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
                             <div>
                                <p className="font-medium text-gray-200">{user.name}</p>
                                <p className="text-sm text-gray-400">{user.email}</p>
                            </div>
                            <button 
                                onClick={() => handlePromote(user.id)}
                                disabled={!!actionLoading}
                                className="text-sm font-semibold text-green-400 hover:text-green-300 disabled:text-gray-500 transition-colors"
                            >
                                {actionLoading === user.id ? <SpinnerIcon className="w-4 h-4" /> : 'Promover'}
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AdminManagementPanel;