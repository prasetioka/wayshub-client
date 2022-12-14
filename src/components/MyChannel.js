import React from "react";
import { Container, Row, Col, Image, Card, Stack, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
// import { UserContext } from "../context/userContext";

// import ChannelHeader from "../img/ChannelHeader.png"
// import CreatorPhoto from "../img/MyChannel.png"

// import Thumbnail1 from "../img/bbq1.png"
// import Thumbnail2 from "../img/bbq2.png"
// import Thumbnail3 from "../img/bbq3.png"
// import Thumbnail4 from "../img/bbq4.png"

import ViewsIcon from "../img/ViewsIcon.svg"
import DateIcon from "../img/DateIcon.svg"
import Foto from "../img/profile.jpg"

function MyChannel() {

    const navigate = useNavigate()

    const { id } = useParams();

    let { data: channel } = useQuery('channelCache', async () => {
        const response = await API.get('/channel/' + id);
        return response.data.data;
    });

    // let { data: myvideo } = useQuery('myvideoCache', async () => {
    //     const response = await API.get('/myvideo');
    //     return response.data.data;
    // });

    let { data: myvideos, refetch } = useQuery('myvideosCache', async () => {
        const response = await API.get('/FindMyVideos');
        return response.data.data;
    });

    const handleDelete = useMutation(async () => {
        try {
            await API.delete(`/channel/` + channel?.id);
            navigate("/SignInPage")
        } catch (error) {
            console.log(error);
        }
    });

    const handleDeleteVideo = useMutation(async () => {
        try {
            await API.delete(`/video`);
            refetch()
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <>
            {channel?.cover === "http://localhost:5000/uploads/" ? (
                <>
                    <Container className="p-0 d-flex flex-column justify-content-center" style={{ height: '15vh', backgroundColor:'#161616' }}>
                        <Card.Text className="text-center text-white" style={{letterSpacing:'3px'}}>EDIT CHANNEL TO INSERT COVER . . .</Card.Text>
                    </Container>
                </>
            ) : (
                <>
                    <Image src={channel?.cover} style={{ height: '18vh', width: '100%' }} />
                </>)}
            <Container className="px-5 mt-4">
                <Stack direction="horizontal" className="mb-1">
                    <Image src={channel?.photo === "http://localhost:5000/uploads/" ? Foto : channel?.photo} className="me-4" style={{ width: '70px' }} />
                    <Stack direction="vertical">
                        <Card.Text className="text-white fs-3 mb-0">{channel?.channelName}</Card.Text>
                        <Card.Text style={{ color: '#F0F0F0' }}>120K Subscriber</Card.Text>
                    </Stack>
                    <Button onClick={() => navigate('/EditChannel/' + channel?.id)} className="py-2" style={{ backgroundColor: '#FF7A00', border: 'none', width: '15%' }}>
                        Edit Channel
                    </Button>
                    <Button onClick={() => handleDelete.mutate()} className="py-2 bg-dark ms-3" style={{ border: 'none', width: '15%' }}>
                        Delete Channel
                    </Button>
                </Stack>
                <Stack direction="horizontal" gap={5}>
                    <div>
                        <Card.Text className="text-white btn p-0 m-0">Video</Card.Text>
                    </div>
                    <div>
                        <Card.Text className="text-white btn p-0 m-0">Channel Description</Card.Text>
                    </div>
                </Stack>
                <hr style={{ borderTop: '3px solid #C2C2C2', marginTop: '0' }} />

                <Row lg={4} >
                    {myvideos?.length !== 0 ? (
                        <Col className="mb-1">
                            {myvideos?.map((item) => (
                                <Stack direction="vertical">
                                    <Image src={item?.thumbnail} className="mb-2 btn p-0" onClick={() => navigate('/DetailVideoPage/' + item?.id)} />
                                    <Card.Text className="text-white mb-3" style={{ fontSize: '15px' }}>{item?.title}</Card.Text>
                                    <Card.Text className="fs-6 mb-2" style={{ color: '#555555' }}>{item?.channel.channelName}</Card.Text>
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
                                    <Stack direction="horizontal" gap={2}>
                                        <Button onClick={() => navigate('/EditVideo/' + item?.id)} className="btn-dark w-100">Update</Button>
                                        <Button onClick={() => handleDeleteVideo.mutate()} className="btn-danger w-100">Delete</Button>
                                    </Stack>
                                </Stack>
                            ))}
                        </Col>
                    ) : (<></>)}
                    {/* <Col>
                        <Stack direction="vertical">
                            <Image src={Thumbnail2} className="mb-2" />
                            <Card.Text className="text-white mb-3" style={{ fontSize: '15px' }}>Dirumah menanam episode 1 : Tauge</Card.Text>
                            <Card.Text className="fs-6 mb-2" style={{ color: '#555555' }}>BBQ Mountain Boys</Card.Text>
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
                            <Image src={Thumbnail3} className="mb-2" />
                            <Card.Text className="text-white mb-3" style={{ fontSize: '15px' }}>Go Outside and Make French Coffee</Card.Text>
                            <Card.Text className="fs-6 mb-2" style={{ color: '#555555' }}>BBQ Mountain Boys</Card.Text>
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
                            <Image src={Thumbnail4} className="mb-2" />
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

export default MyChannel