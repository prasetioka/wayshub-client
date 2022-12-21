import React from "react";
import { Container, Row, Col, Stack, Image, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { API } from "../config/api"
import { useQuery } from "react-query"

import ViewsIcon from "../img/ViewsIcon.svg"
import DateIcon from "../img/DateIcon.svg"

function VideoList() {

    const navigate = useNavigate()

    let { data: videos } = useQuery('videosCache', async () => {
        const response = await API.get('/videos');
        return response.data.data;
    });

    return (
        <>
            <Container className="py-0 px-5 m-0">

                <Row lg={4} >
                    {videos?.length !== 0 ? (
                        <>
                            {videos?.map((item) => (
                                <Col className="mb-4">
                                    <Stack direction="vertical">
                                        <Image src={item.thumbnail} className="mb-2 btn p-0" onClick={() => navigate('/DetailVideoPage/' + item.id)} />
                                        <Card.Text className="text-white mb-3" style={{ fontSize: '15px' }}>{item.title}</Card.Text>
                                        <Card.Text className="fs-6 mb-2 btn p-0 text-start" onClick={() => navigate('/CreatorPage/' + item.channel.id)} style={{ color: '#555555' }}>{item.channel.channelName}</Card.Text>
                                        <Row>
                                            <Col md={4}>
                                                <Stack direction="horizontal">
                                                    <div className="d-flex flex-column justify-content-center me-2">
                                                        <Image src={ViewsIcon} />
                                                    </div>
                                                    <Card.Text className="fs-6" style={{ color: '#555555' }}>{item.viewCount}</Card.Text>
                                                </Stack>
                                            </Col>
                                            <Col>
                                                <Stack direction="horizontal">
                                                    <div className="d-flex flex-column justify-content-center me-1">
                                                        <Image src={DateIcon} />
                                                    </div>
                                                    <Card.Text className="fs-6" style={{ color: '#555555' }}>{item.formatTime}</Card.Text>
                                                </Stack>
                                            </Col>
                                        </Row>
                                    </Stack>
                                </Col>
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

export default VideoList