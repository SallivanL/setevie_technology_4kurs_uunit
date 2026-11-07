import { ruRU } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { DialogsContainer, DialogsProvider } from 'react-dialogs-container';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '@/api/query-client.js';
import { SnackbarProvider } from '@/hooks/use-snackbar.hook.jsx';
import { App } from './App.jsx';
import './index.css';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1D2229' },
      secondary: { main: '#FDF3F4', contrastText: '#B10E1C' },
      default: { main: '#F2F5FA' },
      success: { main: '#22C55E', contrastText: '#fff' },
      background: {
        default: '#F9FAFB',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#000',
        secondary: '#1A1E24',
      },
    },
    typography: {
      fontFamily: '"Raleway", sans-serif',
      allVariants: {
        textTransform: 'none',
      },
      Body2Strong: {
        color: 'red !important',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '12px',
            fontWeight: 600,
          },
          containedPrimary: {
            backgroundColor: '#1F2937',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#111827',
            },
          },
          containedSecondary: {
            backgroundColor: '#FF6C3C',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#E55A2B',
            },
          },
          containedDanger: {
            backgroundColor: '#FDF3F4',
            color: '#B10E1C',
            '&:hover': {
              backgroundColor: 'rgb(249, 221, 224)',
            },
          },
        },
      },
      // MuiCheckbox: {
      //   styleOverrides: {
      //     root: {
      //       color: "#BAC4D1",
      //       borderRadius: 100,
      //       width: 24,
      //       height: 24,
      //       border: '2px solid #BAC4D1',
      //       backgroundColor: "#BAC4D1",
      //       "&.Mui-checked": {
      //         backgroundColor: "#0CC44D",
      //         color: "#0CC44D",
      //         border: '2px solid #0CC44D',
      //         width: 24,
      //         height: 24,
      //       },
      //       "& .MuiSvgIcon-root": {
      //         borderRadius: 100,
      //         width: 16,
      //         height: 16,
      //       },
      //     },
      //   },
      // },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: '32px!important',
            fontFamily: '"Raleway", sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            padding: '16px 24px 16px 16px!important',
            alignItems: 'center',
            boxShadow: '0px 16px 56px -20px #00000026',
            '& .MuiAlert-action': {
              display: 'none',
            },
          },
          standardSuccess: {
            backgroundColor: '#F1FAF1',
            border: '1px solid var(--Status-Success-Stroke-1-Rest, #9FD89F)',
            color: '#0E700E',
            '& .MuiAlert-icon': { color: '#0E700E', fontSize: '24px' },
          },
          standardWarning: {
            backgroundColor: '#FFF9F5',
            border: '1px solid var(--Status-Warning-Stroke-1-Rest, #FDCFB4)',
            color: '#BC4B09',
            '& .MuiAlert-icon': { color: '#BC4B09', fontSize: '24px' },
          },
          standardError: {
            backgroundColor: '#FDF3F4',
            border: '1px solid var(--Status-Danger-Stroke-1-Rest, #EEACB2)',
            color: '#B10E1C',
            '& .MuiAlert-icon': { color: '#B10E1C', fontSize: '24px' },
          },
          standardInfo: {
            backgroundColor: '#EFF4F9',
            border: '1px solid #A8BFD3',
            color: '#004377',
            '& .MuiAlert-icon': { color: '#004377', fontSize: '24px' },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: '4px',
            '& .MuiTouchRipple-root': {
              display: 'none',
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
      MuiFormGroup: {
        styleOverrides: {
          root: {
            alignItems: 'flex-start',
          },
        },
      },
      MuiSkeleton: {
        variants: [
          {
            props: { variant: 'rounded' },
            style: {
              borderRadius: '12px',
            },
          },
        ],
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            marginLeft: '0px',

            ...(ownerState.error && {
              position: 'absolute',
              maxWidth: '93%',
              top: '100%',
              left: 9,
              lineHeight: '1',
              margin: 0,
              marginTop: '-3px',
              padding: '2px 6px',
              backgroundColor: '#d32f2f',
              borderRadius: '16px',
              color: '#fff !important',
              overflowY: 'auto',
              maxHeight: 40,
              zIndex: 1,
            }),
          }),
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: 'Raleway',
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          root: {
            '& .MuiDialog-paper': {
              borderRadius: '28px',
              padding: '8px',
              backgroundColor: '#FFFFFF',
              color: '#1A1E24',
            },
            '& .MuiDialogTitle-root': {
              fontWeight: 700,
              fontSize: '20px',
            },
            '& .MuiDialogContent-root': {
              padding: '24px',
              fontSize: '14px',
              color: '#000',
            },
            '& .MuiDialogActions-root': {
              padding: '24px',
              gap: '12px',
            },
          },
          paperWidthXs: {
            maxWidth: '370px',
          },
          paperWidthSm: {
            maxWidth: '378px',
          },
          paperWidthMd: {
            maxWidth: '700px',
          },
        },
      },
      MuiPaper: {
        variants: [
          {
            props: { variant: 'default' },
            style: {
              boxShadow: 'none',
              borderRadius: '32px',
              border: '1px solid #D1D5DB',
            },
          },
          {
            props: { variant: 'block' },
            style: {
              boxShadow: 'none',
              borderRadius: '32px',
              // border: '1px solid #D1D5DB'
            },
          },
          {
            props: { variant: 'section' },
            style: {
              boxShadow: 'none',
              borderRadius: '16px',
              padding: '16px',
              // border: '1px solid #D1D5DB'
            },
          },
        ],
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-head': {
              fontWeight: 700,
              fontSize: '16px',
              color: '#1A1E24',
            },
            backgroundColor: '#F2F5FA',
            borderRadius: 24,
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: '#0094FF0D',
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid var(--color-neutral-stroke-2-rest) !important',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: '#E5E7EB',
            color: '#1F2937',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 500,
          },
        },
      },
    },
  },
  ruRU
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <DialogsProvider>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <BrowserRouter>
              <App />
              <DialogsContainer />
            </BrowserRouter>
          </SnackbarProvider>
        </QueryClientProvider>
      </DialogsProvider>
    </ThemeProvider>
  </StrictMode>
);
