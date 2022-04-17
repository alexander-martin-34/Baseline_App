import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import AppHeader from './components/header';
import AppHero from './components/Home';
import AppInfo from './components/About';
import AppLogin from './components/UserAuth/login';
import AppLogout from './components/UserAuth/logout';
import DoctorDashboard from './components/Dashboard/Doctor/doctors-dashboard';
import AddPatient from './components/PatientCreation/addPatient';
import PatientChangePassword from './components/PatientCreation/changePassword';
import PatientDashboard from './components/Dashboard/Patient/patient-dashboard';

import { Layout } from 'antd';
const { Header, Content } = Layout;

function App() {
  return (
<Router>
    <Layout className="mainLayout">
      <Header>
      <AppHeader/>
      </Header>
      <Content>
      <Switch>
          <Route exact path="/" component={AppHero} />
          <Route exact path="/About" component={AppInfo} />
          <Route exact path="/login" component={AppLogin} />
          <Route exact path="/logout" component={AppLogout} />
          <Route exact path="/dashboard/doctor" component={DoctorDashboard} />
          <Route exact path="/dashboard/patient" component={PatientDashboard} />
          <Route exact path="/dashboard/doctor/add" component={AddPatient} />
          <Route exact path="/dashboard/patient/change-password" component={PatientChangePassword} /> 
        </Switch>
      </Content> 
    </Layout>
    </Router>
  );
}

export default App;
