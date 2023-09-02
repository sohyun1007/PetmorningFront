import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import Main from './pages/Main/Main/Main';
import Login from './pages/Login/Login';
import MyPage from './pages/MyPage/MyPage';
import UnAuthorized from './pages/Unauthorized/Unauthorized';
import SignUp from './pages/SignUp/SignUp/Singup';
import ActivationFirst from './pages/SignUp/ActivationFirst/ActivationFirst';
import ActivationSecond from './pages/SignUp/ActivationSecond/ActivationSecond';
import ActivationThird from './pages/SignUp/ActivationThird/ActivationThird';
import CalendarList from './pages/Letter/CalendarList/CalendarList';
import Create from './pages/Letter/Create/Create';
import DetailView from './pages/Letter/DetailView/DetailView';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main */}
        <Route path="/" element={<Main />} />
        <Route path="/:username" element={<Main />} />
        <Route path="/login" element={<Login />} />

        {/* SignUp */}
        <Route path="/signup" element={<SignUp />}>
          <Route path="activationFirst" element={<ActivationFirst />} />
          <Route path="activationSecond" element={<ActivationSecond />} />
          <Route path="activationThird" element={<ActivationThird />} />
        </Route>

        {/* Letter */}
        <Route path="/letter" element={<SignUp />}>
          <Route path="create" element={<Create />} />
          <Route path="calendarList" element={<CalendarList />} />
          <Route path="calendarList/:id" element={<DetailView />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Profile */}
        <Route path="/mypage" element={<MyPage />} />

        {/* Error-Handling */}
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="notFound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
