import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import './AccordionStack.scss';

const AccordionStackContext = createContext(null);

export function useAccordionStack() {
  return useContext(AccordionStackContext);
}

function AccordionStack({ children, className = '' }) {
  const [openId, setOpenId] = useState(null);

  const register = useCallback((id, initialOpen) => {
    if (!initialOpen) return;
    setOpenId((prev) => prev ?? id);
  }, []);

  const setOpen = useCallback((id, open) => {
    if (open) {
      setOpenId((current) => (current === id ? current : id));
      return;
    }
    setOpenId((current) => (current === id ? null : current));
  }, []);

  const isPrimary = useCallback(
    (id) => openId === id,
    [openId],
  );

  const value = useMemo(() => ({
    openId,
    register,
    setOpen,
    isPrimary,
  }), [isPrimary, openId, register, setOpen]);

  return (
    <AccordionStackContext.Provider value={value}>
      <div className={`accordion-stack ${className}`.trim()}>
        {children}
      </div>
    </AccordionStackContext.Provider>
  );
}

export default AccordionStack;
