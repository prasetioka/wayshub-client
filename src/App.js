import React, { useEffect, useContext } from "react";
import { UserContext } from "./context/userContext"
import { Routes, Route, useNavigate } from "react-router-dom"
import { API, setAuthToken } from "./config/api"
import { Container, Row, Col } from "react-bootstrap"

import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"

import SideNavbar from "./components/SideNavbar";
import TopNavbar from "./components/TopNavbar";

import VideoList from "./components/VideoList";

import FormAddVideo from "./components/FormAddVideo";
import FormEditVideo from "./components/FormEditVideo"

import Creator from "./components/Creator";

import MyChannel from "./components/MyChannel"
import FormEditChannel from "./components/FormEditChannel"

import VideoDetail from "./components/VideoDetail"

function App() {

  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  console.log(state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      navigate('/SignInPage');
    } else {
      navigate('/');
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      let payload = response.data.data;

      payload.token = localStorage.token;

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      checkUser();
  }, []);

  return (
    <>
      {state.isLogin ? (
        <Container className="p-0 m-0" style={{ maxWidth: '100%', height: '100vh' }}>
          <Row lg={2} className="p-0 m-0">

            <Col lg={3} className="p-0 m-0">
              <SideNavbar />
            </Col>

            <Col lg={9} className="p-0 m-0">
              <TopNavbar />
              <div style={{marginTop:'15vh'}}>
              <Routes>
                <Route exact path='/' element={<VideoList />} />
                <Route exact path='/AddVideo' element={<FormAddVideo />} />
                <Route exact path='/EditVideo/:id' element={<FormEditVideo />} />
                <Route exact path='/CreatorPage/:id' element={<Creator />} />
                <Route exact path='/MyChannelPage/:id' element={<MyChannel />} />
                <Route exact path='/EditChannel/:id' element={<FormEditChannel />} />
                <Route exact path='/DetailVideoPage/:id' element={<VideoDetail />} />
              </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Routes>
          <Route exact path='/SignUpPage' element={<SignUpPage />} />
          <Route exact path='/SignInPage' element={<SignInPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
