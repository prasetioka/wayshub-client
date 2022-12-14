import React, { useContext } from "react";
import { Container, Image, Stack, Card, Button, Row, Col } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext"
import { useMutation } from "react-query";

import ViewsIcon from "../img/ViewsIcon.svg"
import DateIcon from "../img/DateIcon.svg"

function Creator() {

    const { id } = useParams();

    const navigate = useNavigate()

    const [state] = useContext(UserContext)

    let { data: creator } = useQuery('creatorCache', async () => {
        const response = await API.get('/channel/' + id);
        return response.data.data;
    });

    let { data: sub } = useQuery('subCache', async () => {
        const response = await API.get('/subscribeByOther/' + id);
        return response.data.data;
    });

    const handleUnsubscribe = useMutation(async (e) => {
        try {
            e.preventDefault()
            const response = await API.delete('/subscribe/' + id)
            console.log("ini response unsubscribe", response)
            // navigate("/CreatorPage/" + id)
        } catch (error) {
            console.log(error)
        }
    })

    const handleSubscribe = useMutation(async (e) => {
        try {
            e.preventDefault()
            const response = await API.post('/subscribe/' + id)
            console.log("ini response subscribe", response)
            // navigate("/")
        } catch (error) {
            console.log(error)
        }
    })

    return (
        <>
            <div>
                <Image src={creator?.cover} style={{ height: '18vh', width: '100%' }} />
            </div>
            <Container className="px-5 m-0 mt-4">
                <Stack direction="horizontal" className="mb-4">
                    <Image src={creator?.photo} className="me-4" style={{ width: '70px' }} />
                    <Stack direction="vertical">
                        <Card.Text className="text-white fs-3 mb-0">{creator?.channelName}</Card.Text>
                        <Card.Text style={{ color: '#F0F0F0' }}>15K Subscriber</Card.Text>
                    </Stack>
                    {state?.user.id == id ? (
                        <></>
                    ) : (
                        <>

                            {sub?.other_id != id ? (
                                <>
                                    <Button onClick={(e) => handleSubscribe.mutate(e)} className="py-2" style={{ backgroundColor: '#FF7A00', border: 'none', width: '15%' }}>
                                        Subscribe
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={(e) => handleUnsubscribe.mutate(e)} className="py-2 bg-secondary" style={{ border: 'none', width: '15%' }}>
                                        Unsubscribe
                                    </Button>
                                </>
                            )}
                        </>
                    )}

                </Stack>
                <hr style={{ borderTop: '3px solid #C2C2C2' }} />
                <Row lg={4} >
                    {creator?.video.length !== 0 ? (
                        <Col className="mb-1">
                            {creator?.video.map((item) => (
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
                                </Stack>
                            ))}
                        </Col>
                    ) : (<></>)}
                </Row>
            </Container>
        </>
    )
}

export default Creator