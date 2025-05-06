import { createContext, ReactNode, useContext, useState } from 'react';

interface LockContextType {
    locked: boolean;
    setLocked: (value: boolean) => void;
}

const LockContext = createContext<LockContextType | undefined>(undefined);

export const useLock = (): LockContextType => {
    const context = useContext(LockContext);

    if (!context) {
        throw new Error('useLock must be used within a LockProvider');
    }

    return context;
};

export const LockProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [locked, setLocked] = useState<boolean>(true);

    return (
        <LockContext.Provider value={{ locked, setLocked }}>
            {children}
        </LockContext.Provider>
    );
};