import { Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { textField } from '../../common.style';

const login = () => {
  const navigate = useNavigate();
  const [ data, setData ] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [ isLogin, setIsLogin ] = useState(true);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }));
  }

  const handleLogin = () => {
    // setIsLogin(true);
    navigate('/yourNotes')
    console.log('Logging in with:', data);
  }

  const handleLoginRoute = () => {
    setIsLogin(true);
    navigate('/loginPage')
    console.log('Logging in with:', data);
  }

  const handleRegister = () => {
    setIsLogin(false);
    navigate('/signupPage')
  }

  const handleRegisterBtn = () => {
    console.log('green reister clicked');
    
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Box sx={{ border: '2px solid #5C453D', borderRadius: '8px', width: '300px' }}>
        <Box sx={{ bgcolor: '#F5D0B3', borderRadius: '8px 8px 0px 0px', padding: '4px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #5C453D'}}>
          <Typography variant='h6' sx={{ fontWeight: 'bold', color:'#5C453D'  }}>{ isLogin ? 'Login': 'Signup'}</Typography>
          <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center'}}>
            <Box sx={{ height: '10px', width: '10px', borderRadius: '50%', bgcolor: '#5AD984',}}></Box>
            <Box sx={{ height: '10px', width: '10px', borderRadius: '50%', bgcolor: '#57A7F5',}}></Box>
            <Box sx={{ height: '10px', width: '10px', borderRadius: '50%', bgcolor: '#FF7A80',}}></Box>
          </Box>
        </Box>
        <Box sx={{ padding: '20px'}}>
          <Typography variant='h4' fontWeight={'bold'} textAlign={'center'} color='#5C453D'>{ isLogin ? 'Login': 'Sign Up'}</Typography>
          
          {!isLogin && <> <Typography variant='h6' color='#5C453D'>Username</Typography>
          <TextField size='small' sx={textField} fullWidth placeholder='Username' name='email' value={data.username} onChange={handleInputChange} /> </>} 

          <Typography variant='h6' color='#5C453D'>Email</Typography>
          <TextField size='small' sx={textField} fullWidth placeholder='Email' name='email' value={data.email} onChange={handleInputChange} />
          
          <Typography variant='h6' color='#5C453D'>Password</Typography>
          <TextField size='small' sx={textField} fullWidth placeholder='Password' name='password' type='password' value={data.password} onChange={handleInputChange} />

          {!isLogin && <> 
            <Typography variant='h6' color='#5C453D'>Confirm Password</Typography>
            <TextField size='small' sx={textField} fullWidth placeholder='Confirm Password' name='password' type='password' value={data.confirmPassword} onChange={handleInputChange} />
            </>
          }
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px'}}>
            <Button style={{ backgroundColor: !isLogin ? '#4ADE80': '#EBB384', color: !isLogin ? '#365C2F': '#6B421C', textTransform: 'none', fontWeight: 'bold', padding: '4px 30px', borderRadius: '10px'}} onClick={!isLogin ? handleRegisterBtn : handleLogin}>{!isLogin ? 'Register': 'Login'}</Button>
            <Button style={{ backgroundColor: !isLogin ? '#EBB384': '#A1CCD2', color: !isLogin ? '#6B421C': '#3B717B', textTransform: 'none', fontWeight: 'bold', padding: '4px 30px', borderRadius: '10px'}} onClick={!isLogin ? handleLoginRoute : handleRegister}>{!isLogin ? 'Login': 'Register'}</Button>
          </Box>
                    
        </Box>
      </Box>
    </Box>

  )
}

export default login