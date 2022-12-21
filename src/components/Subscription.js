import React from "react";
import { Container, Row, Col, Stack, Image, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { API } from "../config/api"
import { useQuery } from "react-query"

import ViewsIcon from "../img/ViewsIcon.svg"
import DateIcon from "../img/DateIcon.svg"

function SubscriptionVideo() {

    const navigate = useNavigate()

    let { data: subscriptionvid } = useQuery('subscriptionvidCache', async () => {
        const response = await API.get('/subscription')
        return response.data.data
    })

    // let { data: videosub } = useQuery('videosubCache', async () => {
    //     const response = await API.get('/video/' + subscriptionvid?.other_id);
    //     return response.data.data; 
    // });

    return (
        <>
            <Container className="py-0 px-5 m-0">

                <Row lg={4} >
                    {subscriptionvid?.length !== 0 ? (
                        <>
                            {subscriptionvid?.map((item) => (
                                <>
                                {item?.otherVideo.map((element) => (
                                <Col className="mb-4">
                                    <Stack direction="vertical">
                                        <Image src={element.thumbnail} className="mb-2 btn p-0" onClick={() => navigate('/DetailVideoPage/' + element.id)} />
                                        <Card.Text className="text-white mb-3" style={{ fontSize: '15px' }}>{element.title}</Card.Text>
                                        <Card.Text className="fs-6 mb-2 btn p-0 text-start" onClick={() => navigate('/CreatorPage/' + element.channel.id)} style={{ color: '#555555' }}>{element.channel.channelName}</Card.Text>
                                        <Row>
                                            <Col md={4}>
                                                <Stack direction="horizontal">
                                                    <div className="d-flex flex-column justify-content-center me-2">
                                                        <Image src={ViewsIcon} />
                                                    </div>
                                                    <Card.Text className="fs-6" style={{ color: '#555555' }}>{element.viewCount}</Card.Text>
                                                </Stack>
                                            </Col>
                                            <Col>
                                                <Stack direction="horizontal">
                                                    <div className="d-flex flex-column justify-content-center me-1">
                                                        <Image src={DateIcon} />
                                                    </div>
                                                    <Card.Text className="fs-6" style={{ color: '#555555' }}>{element.formatTime}</Card.Text>
                                                </Stack>
                                            </Col>
                                        </Row>
                                    </Stack>
                                </Col>
                                ))}
                                </>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}
                </Row>
            </Container>
        </>
    )
}

export default SubscriptionVideo