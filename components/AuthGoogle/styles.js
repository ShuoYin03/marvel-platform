const styles = {
    googleAuthGridProps: {
      container: true,
      direction: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      spacing: 2,
      sx: { mt: 3 },
    },
    googleAuthButtonProps: {
      variant: 'contained',
      color: 'primary',
      fullWidth: true,
      sx: { backgroundColor: '#4285F4', '&:hover': { backgroundColor: '#357ae8' } },
    },
    googleAuthDisclaimerProps: {
      variant: 'body2',
      color: 'textSecondary',
      align: 'center',
      sx: { mt: 1, fontSize: '0.85rem' },
    },
  };
  
export default styles;
  