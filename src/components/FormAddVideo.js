import React, { useState, useContext } from "react";
import { Container, Form, Stack, Image, Card, Button } from "react-bootstrap"
import { UserContext } from "../context/userContext"
import { useMutation } from "react-query"
import { API } from "../config/api"
import { useNavigate } from "react-router-dom";


import AttachIcon from "../img/AttachIcon.png"
import UploadVideoIcon from "../img/UploadVideoIcon.png"

function FormAddVideo() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: "",
        thumbnail: "",
        description: "",
        video: "",
    })

    const [state] = useContext(UserContext)
    console.log("Sign In State", state)

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
            formData.set('title', form.title);
            formData.set('thumbnail', form.thumbnail[0], form.thumbnail[0].name);
            formData.set('description', form.description);
            formData.set('video', form.video[0], form.video[0].name);

            console.log(form);

            const response = await API.post('/video', formData, config);
            console.log("ini response add video", response);

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <Container className="py-3 px-5 m-0">
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Label className="text-white fs-4 fw-bold mb-4">Add Video</Form.Label>

                <Stack direction="horizontal">
                    <Form.Label className="me-auto w-100">
                        <Form.Control
                            className="mb-3 py-1 fs-5"
                            style={{ borderColor: '#BCBCBC', borderWidth: '3px', backgroundColor: '#555555', color: 'rgb(210,210,210,0.25)' }}
                            type="text"
                            name="title"
                            onChange={handleChange}
                            placeholder="Video Title" />
                    </Form.Label>

                    <Form.Label className="ms-3 px-2 py-1 mb-4 text-secondary fw-normal rounded-2" style={{ width: '30%', border: 'solid', borderWidth: '3px', borderColor: '#BCBCBC', backgroundColor: '#555555', color: 'rgb(210,210,210,0.25)', cursor: 'pointer' }}>
                        <Stack direction="horizontal">
                            <Card.Text className="d-flex flex-column justify-content-center m-0 fs-5">Attach Thumbnail</Card.Text>
                            <Image src={AttachIcon} className="ms-auto" />
                        </Stack>
                        <Form.Control
                            name="thumbnail"
                            onChange={handleChange}
                            type="file"
                            style={{ width: '100%' }}
                            hidden />
                    </Form.Label>
                </Stack>

                <Form.Label className="me-auto w-100">
                    <Form.Control
                        className="mb-3 py-1 fs-5"
                        name="description"
                        onChange={handleChange}
                        style={{ borderColor: '#BCBCBC', borderWidth: '3px', backgroundColor: '#555555', color: 'rgb(210,210,210,0.25)' }}
                        as="textarea"
                        rows="6"
                        placeholder="Video Description" />
                </Form.Label>

                <Form.Label className="px-2 py-1 mb-4 text-secondary fw-normal rounded-2" style={{ width: '20%', border: 'solid', borderWidth: '3px', borderColor: '#BCBCBC', backgroundColor: '#555555', color: 'rgb(210,210,210,0.25)', cursor: 'pointer' }}>
                    <Stack direction="horizontal">
                        <Card.Text className="d-flex flex-column justify-content-center m-0 fs-5">Upload Video</Card.Text>
                        <Image src={UploadVideoIcon} className="ms-auto" />
                    </Stack>
                    <Form.Control
                        type="file"
                        style={{ width: '100%' }}
                        hidden
                        name="video"
                        onChange={handleChange}
                    />
                </Form.Label>

                <Button variant="primary" type="submit" style={{ backgroundColor: '#FF7A00', border: 'none' }} className="py-2 fw-bold fs-5 w-100 text-white">
                    Add
                </Button>
            </Form>
        </Container>
    )
}

export default FormAddVideo