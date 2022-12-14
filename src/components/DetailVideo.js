import React, { useContext, useState, useEffect } from "react";
import { Container, Stack, Image, Card, Form, Button } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query"

// import VideoDetail from "../img/bbqDetail.png"
import ViewsIcon from "../img/ViewsIcon.svg"
import DateIcon from "../img/DateIcon.svg"
// import PhotoProfile from "../img/MyChannel.png"
import Foto from "../img/profile.jpg"

function DetailVideo() {

    const { id } = useParams();

    const [state] = useContext(UserContext)

    const LinkPhoto = "http://localhost:5000/uploads/"

    let { data: video, refetch } = useQuery('videoCache', async () => {
        const response = await API.get('/video/' + id);
        return response.data.data;
    });

    let { data: channel } = useQuery('channelCache', async () => {
        const response = await API.get('/channel/' + state.user.id);
        return response.data.data;
    });

    const [form, setForm] = useState({
        comment: "",
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };

            const formData = new FormData();
            formData.set('comment', form.comment);

            // console.log(form);

            const response = await API.post('/comment/' + id, formData, config);
            console.log("ini response add video", response);
            refetch()

        } catch (error) {
            console.log(error);
        }
    });

    // const ViewsCount = async () => {
    //     try {
    //         const response = await API.post('/views/' + id);
    //         console.log("ini response viewCount", response)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     ViewsCount()
    // }, [])

    return (
        <>
            <Container className="ps-5 pe-0 mb-4">
                <Stack direction="vertical">
                    <video src={video?.video} type="video/mp4" controls autoPlay />
                    <Card.Text className="fs-5 fw-bold text-white mt-3 mb-3">{video?.title}</Card.Text>
                    <Stack direction="horizontal" gap={4}>
                        <Stack direction="horizontal">
                            <div className="d-flex flex-column justify-content-center me-2">
                                <Image src={ViewsIcon} />
                            </div>
                            <Card.Text className="fs-6" style={{ color: '#555555' }}>{video?.viewCount}</Card.Text>
                        </Stack>

                        <Stack direction="horizontal">
                            <div className="d-flex flex-column justify-content-center me-2">
                                <Image src={DateIcon} />
                            </div>
                            <Card.Text className="fs-6" style={{ color: '#555555' }}>06 Sep 2020</Card.Text>
                        </Stack>
                    </Stack>
                    <hr style={{ borderTop: '3px solid #C2C2C2' }} />

                    <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <Stack direction="horizontal">
                            <div className="d-flex flex-column justify-content-center me-3">
                                <Image src={channel?.photo === "http://localhost:5000/uploads/" ? Foto : channel?.photo} style={{ width: '60px' }} />
                            </div>
                            <Form.Control
                                className="py-1 fs-5"
                                style={{ borderColor: '#BCBCBC', borderWidth: '3px', backgroundColor: '#555555', color: 'rgb(210,210,210,0.25)' }}
                                name="comment"
                                onChange={handleChange}
                                type="text"
                                placeholder="Comment" />
                        </Stack>
                        <Button variant="primary" type="submit" style={{ backgroundColor: '#FF7A00', border: 'none' }} className="py-1 fw-bold fs-6 w-25 text-white float-end">
                            Add
                        </Button>
                    </Form>

                    <hr style={{ borderTop: '3px solid #C2C2C2' }} />
                    {video?.comments.length !== 0 ? (
                        <>
                            {video?.comments.map((item) => (
                                <Stack direction="horizontal" className="mb-4">
                                    <div className="d-flex flex-column justify-content-center me-3">
                                        <Image src={LinkPhoto + item.channel.photo} style={{ width: '60px' }} />
                                    </div>
                                    <Card className="w-100 border-0 p-2" style={{ backgroundColor: '#555555' }}>
                                        <Card.Text className="fs-5 fw-light text-light">{item.comment}</Card.Text>
                                    </Card>
                                </Stack>
                            ))}
                        </>
                    ) : (
                        <></>
                    )}
                </Stack>
            </Container>
        </>
    )
}

export default DetailVideo