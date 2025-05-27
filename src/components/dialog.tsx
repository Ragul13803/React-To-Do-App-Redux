import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useEffect, useState } from 'react';
import { textField } from '../common.style';

interface DialogBoxProps { 
  open: boolean;
  handleClose: () => void;
  isEdit: boolean;
  title?: string;
  description?: string;
  onAddNote?: (note: { title: string; description: string }) => void;
}

export default function DialogBox({ open, handleClose, isEdit, title = '', description = '', onAddNote }: DialogBoxProps) {
  const [dialogData, setDialogData] = useState({ title: '', description: '' });

  useEffect(() => {
    if (isEdit) {
      setDialogData({ title, description });
      console.log('isEdit && setDialogData', setDialogData);
      
    } else {
      setDialogData({ title: '', description: '' });
    }
  }, [open, isEdit, title, description]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDialogData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    console.log('Add clicked:', dialogData);
    onAddNote?.(dialogData); 
    handleClose();
  };

  const handleSave = () => {
    console.log('Save clicked:', dialogData);
    onAddNote?.(dialogData); 
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ bgcolor: '#F5D0B3', color: '#5C453D', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 20px' }}>
        {isEdit ? title: 'Add Notes'}
        <IconButton onClick={handleClose} size="small" sx={{ outline: 'none' }}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ bgcolor: '#F4F1DE' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px', mt: 1 }}>
          {!isEdit && <TextField size="small" fullWidth sx={textField} placeholder="Title" name="title" value={dialogData.title} onChange={handleInputChange} />}
          <TextField size="small" fullWidth placeholder="Description" name="description" value={dialogData.description} onChange={handleInputChange} rows={6} multiline sx={textField} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', mt: '20px' }}>
          <Button variant="contained" sx={{ backgroundColor: '#4ADE80', color: 'white', fontWeight: 'bold', textTransform: 'none', padding: '2px 30px', boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} onClick={isEdit ? handleSave : handleAdd}>
            {isEdit ? 'Save' : 'Add'}
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#EE4444', color: 'white', fontWeight: 'bold', textTransform: 'none', padding: '2px 30px', boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
