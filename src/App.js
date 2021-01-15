import './App.css';
import Users from './Users.js';
import Header from './Header.js'
import Footer from './Footer.js'
import React, { useState } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

const App = () => {

    const [formVisible, setFormVisible] = useState(false);
    const [filterString, setFilterString] = useState("");

    const handleFilter = event => {
        setFilterString(event.target.value);
    };

    const handleFormShow = () => {
        setFormVisible(true);
    };
    
    const handleFormHide = () => {
        setFormVisible(false);
    };

    return (
        <Layout style={{ minHeight:"calc(100vh - 11px)" }}>
            <Header
                handleFilter={handleFilter}
                handleFormShow={handleFormShow}
            />
            <Layout.Content className="content">
                <Users
                    formVisible={formVisible}
                    filterString={filterString}
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
