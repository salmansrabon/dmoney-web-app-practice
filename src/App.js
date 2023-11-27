import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Login from './components/login/login.component';
import Dashboard from './components/login/dashboard.component';
import Deposit from './components/agent/deposit.component';
import AgentDashboard from './components/agent/agentdashboard.component';
import Payment from './components/agent/payment.component';
import CheckStatement from './components/statement.component';
import CheckBalance from './components/balance.component';
//import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from './components/admin/admin.component';
import UserList from './components/admin/userlist.component';
import CreateUser from './components/admin/createuser.component';
import UnAuthenticated from './components/403';
import EditUser from './components/admin/editUser.component';


function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/admin/*' element={<AdminDashboard />}>
            <Route path="list-user" element={<UserList />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="check-statement" element={<CheckStatement />} />
            <Route path="edit-user/:userId" element={<EditUser />} />
          </Route>
          <Route path="/agent/*" element={<AgentDashboard />}>
            <Route path="deposit" element={<Deposit />} />
            <Route path="payment" element={<Payment />} />
            <Route path="check-statement" element={<CheckStatement />} />
            <Route path="check-balance" element={<CheckBalance />} />
          </Route>
          <Route path="/unauthorized" element={<UnAuthenticated/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
