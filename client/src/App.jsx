import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import HomePage from "./scenes/homePage"
import LoginPage from "./scenes/loginPage"
import ProfilePage from "./scenes/profilePage"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme"
import ProtectedRoute from "./scenes/protectedPage/Index"



function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector(s => s.token));
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute isAuth={isAuth} /> }>
              <Route path="/home" element={<HomePage />} />
              <Route path="/profile/:userId" element={<ProfilePage /> } />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
