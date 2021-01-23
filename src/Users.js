import './Users.css'
import {Button, Col, Row, Card} from 'antd';
import UserCard from './UserCard';
import FormCard from './FormCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const Users = (props) => {
    
    const [users, setUsers] = useState([]);
    const [userStatus, setUserStatus] = useState([]);
    const [newUser, setNewUser] = useState(0);

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
        return () => {
            setUsers([]);
            setUserStatus([]);
        };
    }, []);

    return (
        <Row gutter={[16, 16]} style={{paddingTop:"112px"}}>
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
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key="new-user-card" style={{minWidth:"230px"}}>
            {
                (newUser === 0 && props.filterString == "") && <Card 
                    bordered={false}
                    size="small"
                    style={{minHeight:"100%", display:'flex', alignItems:'center', justifyContent:'center'}}
                >
                    <Button
                        shape = 'circle'
                        type = 'dashed'
                        style = {{height:'150px', width:'150px' }}
                        onClick = {() => {setNewUser(1);}}
                    >
                        <PlusOutlined style={{fontSize : '40px', color : '#e8e8e8'}}/>
                    </Button>
                </Card>
            }
            {
                (newUser === 1 && props.filterString == "") && <FormCard 
                    idx={users.length}
                    user='new'
                    users={users}
                    setUsers={setUsers}
                    userStatus={userStatus}
                    setNewUser={setNewUser}
                    setUserStatus={setUserStatus}
                />
            }
            </Col>
        </Row>
    );
}

export default Users;
