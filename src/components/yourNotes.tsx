import { Box, Paper, Typography, IconButton, InputBase } from '@mui/material';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogBox from './dialog';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './Redux/store';
import { addNote, editNote, deleteNote, type Note } from './Redux/notesSlice';
import { setNotes } from './Redux/notesSlice';

const YourNotes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.notes);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const sampleNotes = [
    { id: crypto.randomUUID(), title: 'Wake Up', description: 'Daily Wake up at 6:00 AM' },
    { id: crypto.randomUUID(), title: 'Buy Groceries', description: 'Milk, Bread, Butter' },
  ];
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

  const handleEditClick = (note: Note) => {
    setSelectedNote(note);
    setIsEdit(true);
    setDialogOpen(true);
  };

  const handleAddOrEditNote = (note: { title: string; description: string }) => {
    if (isEdit && selectedNote) {
      dispatch(editNote({ ...note, id: selectedNote.id }));
    } else {
      dispatch(addNote({ ...note, id: crypto.randomUUID() }));
    }
    handleCloseDialog();
  };


  const handleDelete = (id: string) => {
    dispatch(deleteNote(id));
  };


  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect( () => {
    dispatch(setNotes(sampleNotes));
  }, [dispatch]);

  return (
    <>
      <Box sx={{ position: 'absolute', top: 8, left: 500, width: '300px' }}>
        <InputBase placeholder="Search notes..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ bgcolor: '#fff', padding: '6px 12px', borderRadius: 1, width: '100%', border: '1px solid #ccc' }}
        />
      </Box>
      <Box sx={{ borderRadius: '10px', bgcolor: '#EAC29E', padding: '10px', height: 'fit-content', width: 'fit-content', display: 'flex', alignItems: 'center', position: 'absolute', bottom: '20px', right: '30px', gap: '6px', cursor: 'pointer' }} onClick={handleNotesClick}>
        <MessageOutlinedIcon style={{ fontSize: '30px' }} />
        <Typography variant='h6' fontWeight='bold'>Add Task</Typography>
      </Box>

      <Box sx={{ position: 'absolute', top: 120, left: 60, display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <Paper key={index} style={{ height: '240px', width: '320px', borderRadius: '8px', border: '2px solid #5C453D', position: 'relative' }}>
              <Box sx={{ bgcolor: '#F5D0B3', borderRadius: '8px 8px 0px 0px', padding: '4px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #5C453D', alignItems: 'center' }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold', color: '#5C453D' }}>{note.title}</Typography>
                <Box>
                  <IconButton onClick={() => handleEditClick(note)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(note.id)}><DeleteIcon /></IconButton>
                </Box>
              </Box>
              <Box sx={{ padding: '10px' }}><Typography>{note.description}</Typography></Box>
              <Typography variant='body2' sx={{ position: 'absolute', bottom: 6, right: 8 }}>
                Last Modified: {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant='h4' fontWeight='bold' marginLeft={'400px'}>No notes found</Typography>
        )}
      </Box>

      {dialogOpen && (
        <DialogBox open={dialogOpen} handleClose={handleCloseDialog} isEdit={isEdit} title={selectedNote?.title || ''} description={selectedNote?.description || ''} onAddNote={handleAddOrEditNote} />
      )}
    </>
  );
};

export default YourNotes;
