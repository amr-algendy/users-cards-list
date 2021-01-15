import './Users.css'
import {Col, Row} from 'antd';
import UserCard from './UserCard';
import NewUser from './NewUser';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Users = (props) => {
    
    const [users, setUsers] = useState([]);

    const deleteUser = (index, id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => {
                let copyArray = users.concat();
                copyArray.splice(index, 1);
                setUsers(copyArray);
            });
    };

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setUsers(response.data);
            });
        return () => setUsers([]);
    }, [setUsers]);

    return (
        <>
            <NewUser 
                users={users}
                setUsers={setUsers}
                formVisible={props.formVisible}
                handleFormHide={props.handleFormHide}
            />
            <Row gutter={[16, 16]} style={{paddingTop:"30px"}}>
                {users
                    .filter(elem => (
                        props.filterString === "" || RegExp(props.filterString.toLowerCase()).test(elem.name.toLowerCase()) 
                    ))
                    .map((user, idx) => (
                        <Col xs={24} sm={12} md={8} lg={6} xl={6} key={user.id} style={{minWidth:"230px"}}>
                            <UserCard 
                                user={user}
                                idx={idx}
                                deleteUser={deleteUser}
                                />
                        </Col>
                    ))}
            </Row>
        </>
    );
}

export default Users;
