import { Alert, Snackbar } from '@mui/material';
import { createContext, useCallback, useContext, useState } from 'react';
import { AlertCheckIcon, AlertErrorIcon, AlertInfoIcon, AlertWarningIcon } from 'packages/front/src/components/icons/index.js';

const SnackbarContext = createContext(null);

const SEVERITY_ICONS = {
  success: <AlertCheckIcon />,
  warning: <AlertWarningIcon />,
  error: <AlertErrorIcon />,
  info: <AlertInfoIcon />,
};

export const SnackbarProvider = ({ children }) => {
  const [state, setState] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = useCallback((message, severity = 'success') => {
    setState({ open: true, message, severity });
  }, []);

  const handleClose = () => setState((prev) => ({ ...prev, open: false }));

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={state.severity} variant="standard" icon={SEVERITY_ICONS[state.severity]}>
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
