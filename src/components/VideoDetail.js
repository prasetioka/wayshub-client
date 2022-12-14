import React from "react"
import { Container, Row, Col } from "react-bootstrap"

import SideVideoList from "../components/SideVideoList"
import DetailVideo from "../components/DetailVideo"


function VideoDetail() {

    return (
        <Container direction="vertical" className="p-0 m-0">
            <Row lg={2} className="m-0 p-0">
                <Col lg={8} className="m-0 p-0">
                    <DetailVideo />
                </Col>
                <Col lg={4} className="m-0 p-0">
                    <SideVideoList />
                </Col>
            </Row>
        </Container>
    )
}

export default VideoDetail