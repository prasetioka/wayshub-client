import React from "react";
import { Container, Row, Col, Stack, Image, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { API } from "../config/api"
import { useQuery } from "react-query"

// import Thumbnail1 from "../img/Thumbnail1.png"
// import Thumbnail2 from "../img/Thumbnail2.png"
// import Thumbnail3 from "../img/Thumbnail3.png"
// import Thumbnail4 from "../img/Thumbnail4.png"
// import Thumbnail5 from "../img/Thumbnail5.png"
// import Thumbnail6 from "../img/Thumbnail6.png"
// import Thumbnail7 from "../img/Thumbnail7.png"
// import Thumbnail8 from "../img/Thumbnail8.png"

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
                                </Col>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}

                    {/* <Col>
                        <Stack direction="vertical">
                            <Image src={Thumbnail3} className="mb-2" />
                            <Card.Text className="text-white mb-3" style={{ fontSize: '15px' }}>Keraton Yogyakarta : Ibu  Ratu & Tari Bedhaya</Card.Text>
                            <Card.Text className="fs-6 mb-2" style={{ color: '#555555' }}>Kisah Tanah Jawa</Card.Text>
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
                    </Col>

                    <Col>
                        <Stack direction="vertical">
                            <Image src={Thumbnail4} className="btn mb-2 p-0" onClick={() => navigate("/DetailVideoPage")} />
                            <Card.Text className="text-white mb-3" style={{ fontSize: '15px' }}>BBQ Montain Boys Episode 5 : A Day in The Life of Farmer</Card.Text>
                            <Card.Text className="fs-6 mb-2" style={{ color: '#555555' }}>BBQ Montain Boys</Card.Text>
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
                    </Col>

                    <Col>
                        <Stack direction="vertical">
                            <Image src={Thumbnail5} className="mb-2" />
                            <Card.Text className="text-white mb-3" style={{ fontSize: '15px' }}>GIMANS KABS NYA NICH ? #qgbacotsantuy</Card.Text>
                            <Card.Text className="fs-6 mb-2" style={{ color: '#555555' }}>qorygore</Card.Text>
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
                    </Col>

                    <Col>
                        <Stack direction="vertical">
                            <Image src={Thumbnail6} className="mb-2" />
                            <Card.Text className="text-white mb-3" style={{ fontSize: '15px' }}>MALIH, PESAN PEDAS TUK ADE LONDOK - Deddy Corbuzier ...</Card.Text>
                            <Card.Text className="fs-6 mb-2" style={{ color: '#555555' }}>Deddy Corbuzier</Card.Text>
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
                    </Col>

                    <Col>
                        <Stack direction="vertical">
                            <Image src={Thumbnail7} className="mb-2" />
                            <Card.Text className="text-white mb-3" style={{ fontSize: '15px' }}>Keraton Yogyakarta : Ibu  Ratu & Tari Bedhaya</Card.Text>
                            <Card.Text className="fs-6 mb-2" style={{ color: '#555555' }}>Kisah Tanah Jawa</Card.Text>
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
                    </Col>

                    <Col>
                        <Stack direction="vertical">
                            <Image src={Thumbnail8} className="mb-2" />
                            <Card.Text className="text-white mb-3" style={{ fontSize: '15px' }}>BBQ Montain Boys Episode 5 : A Day in The Life of Farmer</Card.Text>
                            <Card.Text className="fs-6 mb-2" style={{ color: '#555555' }}>BBQ Montain Boys</Card.Text>
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
                    </Col> */}

                </Row>
            </Container>
        </>
    )
}

export default VideoList