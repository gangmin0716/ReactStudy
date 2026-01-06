import { useState } from 'react';
import { AuthContext } from './AuthContext';

export default function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

return (
<AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
{children}
</AuthContext.Provider>
);
}