import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';
import { showSnackbar } from '../../slices/uiSlice';

const Toast = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector(s => s.ui.snackbar);
  return (
    <Snackbar open={Boolean(snackbar)} autoHideDuration={2800}
      onClose={() => dispatch(showSnackbar(null))} anchorOrigin={{ vertical:'bottom', horizontal:'center' }}>
      {snackbar ? (
        <Alert severity={snackbar.severity || 'success'} onClose={() => dispatch(showSnackbar(null))}
          sx={{ borderRadius:'14px', fontWeight:600, fontFamily:'"DM Sans",sans-serif', fontSize:'0.875rem',
            boxShadow:'0 12px 40px rgba(14,12,10,0.2)', border:'1px solid',
            borderColor: snackbar.severity==='error' ? 'rgba(211,47,47,0.2)' : 'rgba(201,169,110,0.25)',
          }}>
          {snackbar.message}
        </Alert>
      ) : <span />}
    </Snackbar>
  );
};
export default Toast;
