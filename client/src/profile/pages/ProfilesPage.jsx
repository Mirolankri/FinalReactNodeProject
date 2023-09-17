import { useEffect } from "react"
import PageHeader from "../../components/PageHeader"
import { Col, Container, Image, Row } from "react-bootstrap"

const ProfilesPage = () => {
    const profiles = [
        {
            "_id": {
              "$oid": "64ba9187dd4da0b1f57d8861"
            },
            "name": {
              "first": "בן",
              "last": "קרקובסקי",
              "_id": {
                "$oid": "64e858276b01851909668768"
              }
            },
            "birth": {
              "$date": "1991-05-23T00:00:00.000Z"
            },
            "address": {
              "city": "תל אביב",
              "street": "אחוזת בית",
              "_id": {
                "$oid": "64e858276b01851909668769"
              }
            },
            "phone": "0502299004",
            "gender": "male",
            "user_id": {
              "$oid": "64a305306a87ab8237080706"
            },
            "__v": 0,
            "dogWalker": {
              "dogCount": 2,
              "payBy": "Cash",
              "mobile": "yes",
              "experience": "base",
              "bigDogs": "yes",
              "about": "ואוווו ואוווו ואוווו ואוווו ואוווו ואוווו ואוווו ואוווו ואוווו ואוווו ואוווו ואוווו ואוווו ואוווו",
              "createdAt": {
                "$date": "2023-07-25T19:33:32.044Z"
              },
              "_id": {
                "$oid": "64c02391775335a4ff230762"
              },
              "rate": []
            },
            "dogOwner": {
              "payBy": "Bit",
              "mobile": "yes",
              "about": "כמה מילים חמות על עצמי",
              "createdAt": {
                "$date": "2023-08-25T07:20:07.398Z"
              },
              "dogs": [],
              "_id": {
                "$oid": "64e858276b0185190966876a"
              },
              "rate": []
            }
          }
    ]
    return (
        <>
            <PageHeader _title='בחר דוגוקר' />

            <Container className="profiles-container">
                <Row>
                    <Col xs={12} lg={4}>
                        <Container fluid>
                            <Row>
                                <Col xs={2} lg={3}>
                                    <Col className='profile-image'>
                                        <div className="circle-profile">
                                            <div className="profile-image-container">
                                            <Image src='/assets/images/dog/persons/male.png' />
                                            </div>
                                        </div>
                                    </Col>
                                </Col>
                                <Col xs={10} lg={9}>
                                    <Container fluid>
                                        <Row className="align-items-end">
                                            <Col as='p' className="p-0 profile-name">{`${profiles[0].name.first} ${profiles[0].name.last}`}</Col>
                                            <Col xs={3} as="p" className="p-0 profile-city">{`${profiles[0].address.city}`}</Col>
                                        </Row>
                                    </Container>
                                    <p>{`${profiles[0].dogWalker.about}`}</p>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default ProfilesPage