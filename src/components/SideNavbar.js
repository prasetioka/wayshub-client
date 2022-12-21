import React from "react";
import { Container, Stack, Image, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
// import { UserContext } from "../context/userContext"
import { useQuery } from "react-query";
import { API } from "../config/api";

import WaysHubIcon from "../img/WaysHubIcon.png"
import HomeIcon from "../img/HomeIcon.svg"
import SubscriptionIcon from "../img/SubscriptionIcon.svg"

function SideNavbar() {

    const navigate = useNavigate()

    // const [state] = useContext(UserContext)

    let { data: subscription } = useQuery('subscriptionCache', async () => {
        const response = await API.get('/subscribes');
        return response.data.data;
    });

    return (
        <>
            <Container className="p-5 m-0" style={{ position: 'fixed', height: '100vh', width: '25%', backgroundColor: '#161616' }}>
                <Stack direction="vertical">
                    <Image src={WaysHubIcon} className="w-75 mb-4" />

                    <Stack direction="horizontal" className="mb-4 btn ps-0" onClick={() => navigate("/")}>
                        <div className="d-flex flex-column justify-content-center me-3">
                            <Image src={HomeIcon} />
                        </div>
                        <Card.Text className="text-white">Home</Card.Text>
                    </Stack>

                    <Stack direction="horizontal" className="mb-5 btn ps-0" onClick={() => navigate("/Subscription")}>
                        <div className="d-flex flex-column justify-content-center me-3">
                            <Image src={SubscriptionIcon} />
                        </div>
                        <Card.Text className="text-white">Subscription</Card.Text>
                    </Stack>

                    <Card.Text className="text-white fs-4">Channel</Card.Text>
                    {subscription?.length !== 0 ? (
                        <>
                        {subscription?.map((item) => (
                        <Stack direction="horizontal" className="mb-3 btn ps-0" onClick={() => navigate("/CreatorPage/" + item.other_id)}>
                            <div className="d-flex flex-column justify-content-center me-3" style={{width:'45px'}}>
                                <Image src={item.otherPhoto} className="rounded-4" />
                            </div>
                            <Card.Text className="text-white">{item.otherName}</Card.Text>
                        </Stack>
                        ))}
                        </>
                    ) : (
                    <></>)}
                </Stack>
            </Container>
        </>
    )
}

export default SideNavbar