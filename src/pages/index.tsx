import { NextPage } from 'next';
import Dashboard from 'src/components/dashboards/dashboards';

const HomePage: NextPage = () => {
  return (
   <Dashboard/>
  );
};

HomePage.guestGuard = true; // Cho phép guest truy cập
HomePage.authGuard = false; // Không yêu cầu xác thực

export default HomePage;