import React, {Component} from 'react';
import './EventDetail.css';
import Container from "react-bootstrap/Container";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {withTranslation} from "react-i18next";
import 'video-react/dist/video-react.css';
import {Player} from 'video-react';
import {events} from "../events/eventsData";

const markdown = require("markdown").markdown;

class EventDetail extends Component {
    render() {


        let index = 0;
        if(this.props.match.params) {
            index = this.props.match.params.index;
        }

        let detail = events.past[index];
        return (
            <Container style={{padding: 0}} className="EventDetail">
                <Row style={{background: '#29292f'}}>
                    <Col md={2}></Col>
                    <Col md={8} style={{marginTop: '2em', background: '#29292f', color: '#fff'}}>
                        <Container style={{textAlign: "left", padding: 0, paddingTop: '1em', paddingBottom: '2em'}}>
                            <Player
                                playsInline
                                poster={detail.img}
                                src={detail.videoUrl}
                            />
                            <h3 style={{color: 'hsla(0,0%,100%,.8)', marginTop: '1em'}}>{detail.title}</h3>
                            <p style={{color: 'hsla(0,0%,100%,.6)'}}>{detail.author}</p>
                            <p style={{color: '#666'}}>{detail.authorDesc}</p>
                        </Container>
                    </Col>
                </Row>
                <Row style={{background: '#fff', paddingBottom: '2em'}}>
                    <Col md={2}></Col>
                    <Col md={5} style={{marginTop: '2em', textAlign: 'left'}}>
                        <h3>内容介绍</h3>
                        <Container style={{padding: 0}} dangerouslySetInnerHTML={{__html: markdown.toHTML(detail.content)}}>
                        </Container>
                    </Col>
                    <Col md={3} style={{marginTop: '2em', textAlign: 'left'}}>
                        <h3>资源</h3>
                        <Container style={{paddingLeft: '1em'}}>
                            {
                                detail.resources.map((item, index) => {
                                    return <Row><a href={item.url}>{item.name}</a></Row>
                                })
                            }
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    };

    componentWillMount() {
    }

    componentDidMount() {
        window.scrollBy(0,-8000);
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(EventDetail));
