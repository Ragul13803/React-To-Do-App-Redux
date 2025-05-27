import { Box, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
const header = () => {
  const location = useLocation()
  const path = location.pathname;

  return (
   <>
      <Box style={{ background: '#A1CCD2', width: '97%', padding: '10px', position: 'absolute', top: 0, display: 'flex', justifyContent: 'space-between', }}>
        <Box sx={{ ml: '120px'}}>
           <Typography variant="h4" sx={{ cursor: 'pointer', fontWeight: 'bold' }} >Keep notes</Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center', mr: '120px' }}>
           <Typography variant="body1" sx={{ cursor: 'pointer', fontWeight: 'bold' }} >About</Typography>
           <Typography variant="body1" sx={{ cursor: 'pointer', fontWeight: 'bold' }} >Notes</Typography>
           <Typography variant="body1" sx={{ cursor: 'pointer', fontWeight: 'bold' }} >Account</Typography>
           <Typography variant="body1" sx={{ cursor: 'pointer', fontWeight: 'bold' }} >Login</Typography>
        </Box>
      </Box>
      <Box sx={{ position: 'absolute', top: 70, left: 146, display: 'flex', gap: '4px' }}>
         <Typography sx={{  color: '#938771' }}>HomePage /</Typography>
            {path === "/loginPage" && ( <Typography sx={{ color: '#938771', fontWeight: 'bold' }}>Login Page</Typography> )}
            {path === "/signupPage" && ( <Typography sx={{ color: '#938771', fontWeight: 'bold' }}>Sign up Page</Typography> )}
            {path === "/About" && ( <Typography sx={{ color: '#938771', fontWeight: 'bold' }}>About</Typography> )}
            {path === "/yourNotes" && ( <Typography sx={{ color: '#938771', fontWeight: 'bold' }}>Your Notes</Typography> )}
            {/* Add more routes as needed */}    
      </Box>
   </>
)

}

export default header