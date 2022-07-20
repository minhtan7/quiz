import './App.css';
import { GlobalStyle } from './App.style';
import { Route, Routes } from 'react-router-dom';
import Layout from './routes/Layout';
import { QuizProvider } from './context/quizContext/questionContext';
import { HomePage } from './pages/Homepage/HomePage';
import { Animepage } from './pages/Anime/AnimePage';
import { UserProvider } from './context/userContext/userContext';




const App = () => {
  return (
    <UserProvider>
      <QuizProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/anime" element={<Animepage />} />
          </Route>
        </Routes>
      </QuizProvider>
    </UserProvider>
  );
}

export default App;
