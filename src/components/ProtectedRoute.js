// components/ProtectedRoute.js
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return null; // Kullanıcı login değilse hiçbir şey render edilmez
    }

    return children;
};

export default ProtectedRoute;
