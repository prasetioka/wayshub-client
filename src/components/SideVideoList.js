import React from "react";
import { Stack, Image, Col, Row, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

import ViewsIcon from "../img/ViewsIcon.svg"
import DateIcon from "../img/DateIcon.svg"

function SideVideoList() {

    const navigate = useNavigate()

    let { data: videos } = useQuery('videosCache', async () => {
        const response = await API.get('/videos');
        return response.data.data;
    });

    return (
        <>
            <Stack direction="Vertical" gap={4} className="ms-4 pe-5 mb-3">
                {videos?.length !== 0 ? (
                    <>
                        {videos?.map((item) => (
                            <Stack direction="vertical" >
                                <Image src={item.thumbnail} className="mb-2" />
                                <Card.Text className="text-white mb-3" style={{ fontSize: '15px' }}>{item.title}</Card.Text>
                                <Card.Text className="fs-6 mb-2" style={{ color: '#555555' }}>{item.channelName}</Card.Text>
                                <Row>
                                    <Col md={4}>
                                        <Stack direction="horizontal">
                                            <div className="d-flex flex-column justify-content-center me-2">
                                                <Image src={ViewsIcon} />
                                            </div>
                                            <Card.Text className="fs-6" style={{ color: '#555555' }}>284K</Card.Text>
                                        </Stack>
                                    </Col>
                                    <Col>
                                        <Stack direction="horizontal">
                                            <div className="d-flex flex-column justify-content-center me-2">
                                                <Image src={DateIcon} />
                                            </div>
                                            <Card.Text className="fs-6" style={{ color: '#555555' }}>06 Sep 2020</Card.Text>
                                        </Stack>
                                    </Col>
                                </Row>
                            </Stack>
                        ))}
                    </>
                ) : (
                    <></>
                )}
            </Stack>
        </>
    )
}

export default SideVideoList