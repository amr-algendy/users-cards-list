import './Users.css'
import {Col, Row} from 'antd';
import UserCard from './UserCard';
import NewUser from './NewUser';
import FormCard from './FormCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Users = (props) => {
    
    const [users, setUsers] = useState([]);
    const [userStatus, setUserStatus] = useState([]);

    const deleteUser = (index, id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => {
                let copyArray = users.concat();
                copyArray.splice(index, 1);
                setUsers(copyArray);
                let copyStatus = userStatus.concat();
                copyStatus.splice(index, 1);
                setUserStatus(copyStatus);
            });
    };

    const editEnable = (index) => {
        let copyArray = [...userStatus];
        copyArray[index] = 1;
        setUserStatus(copyArray);
    };

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setUsers(response.data);
                let arr = [];
                arr.length = response.data.length;
                setUserStatus(arr.fill(0));
            });
        return () =>    {
                            setUsers([]);
                            setUserStatus([]);
                        };
    }, []);

    return (
        <>
            <NewUser 
                users={users}
                setUsers={setUsers}
                userStatus={userStatus}
                setUserStatus={setUserStatus}
                formVisible={props.formVisible}
                handleFormHide={props.handleFormHide}
            />
            <Row gutter={[16, 16]} style={{paddingTop:"30px"}}>
                {users
                    .filter(elem => (
                        props.filterString === "" || RegExp(props.filterString.toLowerCase()).test(elem.name.toLowerCase()) 
                    ))
                    .map((user, idx) => {
                        return (<Col xs={24} sm={12} md={8} lg={6} xl={6} key={user.id} style={{minWidth:"230px"}}>
                            {
                                (userStatus[idx] === 0) && <UserCard
                                    user={user}
                                    idx={idx}
                                    deleteUser={deleteUser}
                                    editEnable={editEnable}
                                />
                            }
                            {
                                (userStatus[idx] === 1) && <FormCard 
                                    idx={idx}
                                    user={user}
                                    users={users}
                                    setUsers={setUsers}
                                    userStatus={userStatus}
                                    setUserStatus={setUserStatus}
                                />
                            }
                        </Col>);
                    })}
                    
            </Row>
        </>
    );
}

export default Users;
