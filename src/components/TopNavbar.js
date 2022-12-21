import React, { useState, useRef, useContext } from "react";
import { UserContext } from "../context/userContext"
import { Container, Form, Stack, Image, Card, Overlay, Popover } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useQuery } from 'react-query';
import { API } from "../config/api"

import AddVideoIcon from "../img/AddVideoIcon.svg"
import Foto from "../img/profile.jpg"
import MyChannelLogo from "../img/MyChannelLogo.svg"
import LogoutIcon from "../img/LogoutIcon.svg"

function TopNavbar() {

    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    const [target, setTarget] = useState(null);

    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    }

    const [ state, dispatch ] = useContext(UserContext)

    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/SignInPage")
    }

    let { data: channel } = useQuery('channelCache', async () => {
        const response = await API.get('/channel/' + state.user.id);
        return response.data.data;
    });

    return (
        <>
            <Container className="px-5 py-4" style={{zIndex:'2', position:'fixed', width:'75%', backgroundColor:'#0B0B0B'}}>
                <Stack direction="horizontal">
                    <Form.Group className="d-flex flex-column justify-content-center me-auto w-50" controlId="formSearch">
                        <Form.Control className="py-1 fs-5" style={{ borderColor: '#BCBCBC', borderWidth: '3px', backgroundColor: '#555555', color: 'rgb(210,210,210,0.25)' }} type="search" placeholder="Search" />
                    </Form.Group>

                    <Stack direction="horizontal" className="btn me-3" onClick={() => navigate("/AddVideo")}>
                        <div className="d-flex flex-column justify-content-center me-3">
                            <Image src={AddVideoIcon} />
                        </div>
                        <Card.Text className="text-white">Add Video</Card.Text>
                    </Stack>

                    <div ref={ref} >
                        <Image src={channel?.photo === "" ? Foto : channel?.photo } className="btn p-0" onClick={handleClick} style={{width:'40px'}} />

                        <Overlay show={show} target={target} placement="bottom-end" container={ref}>
                            <Popover id="popover-contained" style={{backgroundColor:'#141414'}}>
                                <Popover.Body className="px-4">

                                    <Stack direction="horizontal" gap={3} className="mb-4 btn p-0" onClick={() => navigate("/MyChannelPage/" + channel?.id)}>
                                        <div className="d-flex flex-column justify-content-center">
                                            <Image src={MyChannelLogo} />
                                        </div>
                                        <Card.Text className="text-white">My Channel</Card.Text>
                                    </Stack>

                                    <Stack direction="horizontal" gap={3} className="btn p-0" onClick={logout}>
                                        <div className="d-flex flex-column justify-content-center">
                                            <Image src={LogoutIcon} />
                                        </div>
                                        <Card.Text className="text-white">Logout</Card.Text>
                                    </Stack>

                                </Popover.Body>
                            </Popover>
                        </Overlay>
                    </div>
                </Stack>
            </Container>
        </>
    )
}

export default TopNavbar