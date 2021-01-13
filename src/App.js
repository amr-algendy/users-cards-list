import './App.css';
import Content from './Content.js';
import Header from './Header.js'
import Footer from './Footer.js'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout } from 'antd';

const App = () => {

    const [users, setUsers] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [filterString, setFilterString] = useState("");

    const deleteUser = (index, id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => {
                let copyArray = users.concat();
                copyArray.splice(index, 1);
                setUsers(copyArray);
            })
    };

    const handleFilter = event => {
        setFilterString(event.target.value);
    };

    const handleAddUser = values => {
    const newUser = {
    "name":     values.userName,
    "email":    values.userEmail,
    "address":{
        "street":   values.userStreetName,
        "suite":    values.userSuiteNo,
        "city":     values.userCity
    },
    "phone":    values.userPhoneNumber};

    axios.post(`https://jsonplaceholder.typicode.com/users/`, newUser)
    .then(res => {
        let copyArray = users.concat();
        copyArray.push(res.data);
        setUsers(copyArray);
    });
    handleFormHide();
    };

    const handleFormShow = () => {
        setFormVisible(true);
    };
    
    const handleFormHide = () => {
        setFormVisible(false);
    };


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setUsers(response.data);
            })
        return () => setUsers([]);
    }, []);

    return (
        <Layout style={{ minHeight:"100vh" }}>
            <Header
                handleFilter={handleFilter}
                handleFormShow={handleFormShow}
            />
            <Layout.Content style={{ padding: '0px 30px', maxWidth:'1200px',  margin:'0 auto'}}>
                <Content
                    users={users}
                    formVisible={formVisible}
                    filterString={filterString}
                    deleteUser={deleteUser}
                    handleAddUser={handleAddUser}
                    handleFormHide={handleFormHide}
                />
            </Layout.Content>
            <Layout.Footer>
                <Footer />
            </Layout.Footer>
        </Layout>
    );
}

export default App;
