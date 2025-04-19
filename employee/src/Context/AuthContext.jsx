import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("userToken");

        if (token) {
            console.log("Token from localStorage:", token);

            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, []);
    const fetchUser = async (token) => {
        try {
            if (!token) {
                logout();
                return;
            }

            const response = await fetch("http://localhost:5000/auth/validUser", {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Sent Headers:", response.headers);
            const data = await response.json();

            if (response.ok) {
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
            } else {
                logout();
            }
        } catch (error) {
            logout();
        } finally {
            setLoading(false);
        }
    };

    const register = async (formData, role) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                ...formData,
                role
            });

            if (response.data.success) {
                setUser(response.data.storeData);
                return { success: true, message: response.data.message };
            } else {
                return { success: false, message: response.data.error || 'Registration failed' };
            }
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                'Something went wrong';



            return { success: false, message };
        }
    };
    const login = async (formData, role) => {
        try {
            const response = await axios.post("http://localhost:5000/auth/login", {
                ...formData,
                role,
            });

            if (response.data.success) {
                const { result } = response.data;

                if (!result?.token) {
                    return { success: false, message: "No token received" };
                }

                localStorage.setItem("userToken", result.token);
                localStorage.setItem("user", JSON.stringify(result.userValid));
                setUser(result.userValid);

                return { success: true, message: response.data.message };
            } else {
                return { success: false, message: response.data.error || "Login failed" };
            }
        } catch (error) {

            const message = error?.response?.data?.message || "Something went wrong";

            return { success: false, message };

        }
    };


    const logout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        setUser(null);

    };
    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
