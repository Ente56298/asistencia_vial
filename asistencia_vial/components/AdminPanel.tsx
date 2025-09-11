import React, { useState } from 'react';
import UsersIcon from './icons/UsersIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import BuildingIcon from './icons/BuildingIcon';
import LandmarkIcon from './icons/LandmarkIcon';
import GiroManagementPanel from './GiroManagementPanel';
import PublicManagementPanel from './PublicManagementPanel';
import PublicAreaManagementPanel from './PublicAreaManagementPanel';
import { User } from '../types';
import { getUsers } from '../services/authService';

interface AdminPanelProps {
    onClose: () => void;
}

type AdminTab = 'users' | 'giros' | 'public' | 'areas';

const UserManagementPanel: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
            setLoading(false);
        };
        fetchUsers();
    }, []);

    if (loading) return <div className="text-center text-gray-400">Cargando usuarios...</div>;

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-4">Administrar Usuarios</h3>
            <div className="space-y-3">
                {users.map(user => (
                    <div key={user.id} className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
                        <div>
                            <p className="font-medium text-gray-200">{user.name}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            user.subscriptionStatus === 'premium' ? 'bg-amber-500 text-black' : 
                            user.subscriptionStatus === 'admin' ? 'bg-indigo-500 text-white' : 'bg-gray-500 text-white'
                        }`}>
                            {user.subscriptionStatus}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('users');

    const TabButton: React.FC<{ tab: AdminTab; label: string; icon: React.ReactNode }> = ({ tab, label, icon }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items