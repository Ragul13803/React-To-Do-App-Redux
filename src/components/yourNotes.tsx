import { Box, Paper, Typography } from '@mui/material';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import DialogBox from './dialog';
import { useEffect, useState } from 'react';
import archery from '../assets/archery.png';

const YourNotes = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [notes, setNotes] = useState<{ title: string; description: string }[]>([]);
  const [selectedNote, setSelectedNote] = useState<{ title: string; description: string } | null>(null);

  const handleNotesClick = () => {
    setIsEdit(false);
    setSelectedNote(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setIsEdit(false);
    setSelectedNote(null);
  };

  const handleEditClick = (note: { title: string; description: string }) => {
    setSelectedNote(note);
    setIsEdit(true);
    setDialogOpen(true);
  };

  const handleAddOrEditNote = (note: { title: string; description: string }) => {
    if (isEdit && selectedNote) {
      setNotes(prev => prev.map(n => n.title === selectedNote.title && n.description === selectedNote.description ? note : n));
    } else {
      setNotes(prev => [...prev, note]);
    }
    handleCloseDialog();
  };

  useEffect(() => {
    setNotes([{ title : 'Wake Up', description: 'Daily Wake up at 6:00 AM'}]);
    console.log('isEdit && setDialogData', setNotes);
  }, []);

  return (
    <>
      <Box sx={{ position: 'absolute', top: 100, left: 160 }}>
        <Typography variant='h3' color='#5C453D' fontWeight={'bold'}>Good Morning Deva!</Typography>
      </Box>

      <Box sx={{ borderRadius: '50%', bgcolor: '#EAC29E', padding: '10px', height: 'fit-content', width: 'fit-content', display: 'flex', alignItems: 'center', position: 'absolute', bottom: '20px', right: '30px'}}>
        <MessageOutlinedIcon style={{ fontSize: '30px' }} onClick={handleNotesClick} />
      </Box>

      <Box sx={{ padding: '0 160px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <Paper key={index} style={{ height: '240px', width: '320px', borderRadius: '8px', border: '2px solid #5C453D', position: 'relative'}}>
              <Box sx={{ bgcolor: '#F5D0B3', borderRadius: '8px 8px 0px 0px', padding: '4px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #5C453D', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#5C453D' }}>{note.title}</Typography>
                <img src={archery} alt="edit" style={{ height: '24px', width: '24px', cursor: 'pointer' }} onClick={() => handleEditClick(note)} />
              </Box>

              <Box sx={{ padding: '10px' }}><Typography>{note.description}</Typography></Box>

              <Typography variant='body2' sx={{ position: 'absolute', bottom: 6, right: 8 }}>
                Last Modified: {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'})}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant='h4' fontWeight='bold' marginLeft={'400px'}>No notes found</Typography>
        )}
      </Box>

      {dialogOpen && ( <DialogBox open={dialogOpen} handleClose={handleCloseDialog} isEdit={isEdit} title={selectedNote?.title || ''} description={selectedNote?.description || ''} onAddNote={handleAddOrEditNote} />
      )}
    </>
  );
};

export default YourNotes;
