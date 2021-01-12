import './Content.css'
import "antd/dist/antd.css"
import {Col, Row} from 'antd';
import UserCard from './UserCard';
import NewUser from './NewUser';

const Content = (props) => {
    return (
        <>
            <NewUser 
                formVisible={props.formVisible}
                handleAddUser={props.handleAddUser}
                handleFormHide={props.handleFormHide}
            />
            <Row gutter={[16, 16]} style={{paddingTop:"30px"}}>
                {props.users
                    .filter(elem => (
                        props.filterString === "" || RegExp(props.filterString.toLowerCase()).test(elem.name.toLowerCase()) 
                    ))
                    .map((user, idx) => (
                        <Col xs={24} sm={12} md={8} lg={6} xl={6} key={user.id} style={{minWidth:"230px"}}>
                            <UserCard 
                                user={user}
                                idx={idx}
                                deleteUser={props.deleteUser}
                                />
                        </Col>
                    ))}
            </Row>
        </>
    );
}

export default Content;