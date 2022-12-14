import React, { useState } from "react";
import { Container, Col, Row, Form, Card, Button, Stack, Image } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";

import UploadVideoIcon from "../img/UploadImgIcon.png"

function FormEditChannel() {

    const { id } = useParams();

    const navigate = useNavigate()

    const [form, setForm] = useState({
        channelName: "",
        cover: "",
        description: "",
        photo: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === 'file' ? e.target.files : e.target.value,
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
            formData.set('channelName', form.channelName);
            formData.set('cover', form.cover[0], form.cover[0].name);
            formData.set('description', form.description);
            formData.set('photo', form.photo[0], form.photo[0].name);

            const response = await API.patch('/channel/' + id, formData, config);
            console.log("ini response add video", response);

            navigate('/MyChannelPage/' + id);
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <>
            <Container className="py-0 px-5 m-0">
                <Row >
                    <Col className="mb-4">
                        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <Form.Label className="text-white fs-4 fw-bold mb-4">Edit Channel</Form.Label>

                            <Stack direction="horizontal">
                                <Form.Label className="me-auto w-100">
                                    <Form.Control
                                        className="mb-3 py-1 fs-5"
                                        style={{ borderColor: '#BCBCBC', borderWidth: '3px', backgroundColor: '#555555', color: 'rgb(210,210,210,0.25)' }}
                                        type="text"
                                        name="channelName"
                                        onChange={handleChange}
                                        placeholder="Channel Name"
                                    />
                                </Form.Label>

                                <Form.Label className="ms-3 px-2 py-1 mb-4 text-secondary fw-normal rounded-2" style={{ width: '30%', border: 'solid', borderWidth: '3px', borderColor: '#BCBCBC', backgroundColor: '#555555', color: 'rgb(210,210,210,0.25)', cursor: 'pointer' }}>
                                    <Stack direction="horizontal">
                                        <Card.Text className="d-flex flex-column justify-content-center m-0 fs-5">Upload Cover</Card.Text>
                                        <Image src={UploadVideoIcon} className="ms-auto" />
                                    </Stack>
                                    <Form.Control
                                        name="cover"
                                        onChange={handleChange}
                                        type="file"
                                        style={{ width: '100%' }}
                                        hidden
                                    />
                                </Form.Label>
                            </Stack>

                            <Form.Label className="me-auto w-100">
                                <Form.Control
                                    className="mb-3 py-1 fs-5"
                                    style={{ borderColor: '#BCBCBC', borderWidth: '3px', backgroundColor: '#555555', color: 'rgb(210,210,210,0.25)' }}
                                    as="textarea"
                                    rows="6"
                                    name="description"
                                    onChange={handleChange}
                                    placeholder="Description"
                                />
                            </Form.Label>

                            <Form.Label className="px-2 py-1 mb-4 text-secondary fw-normal rounded-2" style={{ width: '20%', border: 'solid', borderWidth: '3px', borderColor: '#BCBCBC', backgroundColor: '#555555', color: 'rgb(210,210,210,0.25)', cursor: 'pointer' }}>
                                <Stack direction="horizontal">
                                    <Card.Text className="d-flex flex-column justify-content-center m-0 fs-5">Upload Photo</Card.Text>
                                    <Image src={UploadVideoIcon} className="ms-auto" />
                                </Stack>
                                <Form.Control
                                    name="photo"
                                    onChange={handleChange}
                                    type="file"
                                    style={{ width: '100%' }}
                                    hidden
                                />
                            </Form.Label>

                            <Button variant="primary" type="submit" style={{ backgroundColor: '#FF7A00', border: 'none' }} className="py-2 fw-bold fs-5 w-100 text-white">
                                Save
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default FormEditChannel