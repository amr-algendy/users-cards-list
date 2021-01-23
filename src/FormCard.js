import { Card, Button, Form, Input} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axios from "axios";
import {useEffect} from 'react';

const FormCard = props => {

    const [form] = Form.useForm();

    const handleAddUser = (values) => {
        axios.post(`https://jsonplaceholder.typicode.com/users/`, values)
        .then(res => {
            let copyArray = props.users.concat();
            copyArray.push(res.data);
            props.setUsers(copyArray);
            let copyStatus = props.userStatus.concat(0);
            props.setUserStatus(copyStatus);
            form.resetFields();
            props.setNewUser(0);
        });
    };

    const handleConfirmEdit = (values, idx, id) => {
        if(props.user === 'new')
        {
            handleAddUser(values);
        }
        else
        {
            let copyArr = values;
            let copyUsers = [...props.users];
            axios.patch(`https://jsonplaceholder.typicode.com/users/${id}`, copyArr)
            .then( res => {
                copyUsers[idx] = res.data;
                props.setUsers(copyUsers);
                handleCancelEdit();
            });
        }
    };

    const handleCancelEdit = () => {
        if(props.user === 'new')
        {
            props.setNewUser(0);
        }
        else
        {
            let copyArr = [...props.userStatus];
            copyArr[props.idx] = 0;
            props.setUserStatus(copyArr);
        }
    };

    useEffect (() => {
       form.setFieldsValue(props.user);
    },[props.user, form])

    return(
        <Card bordered='false'
        size="small"
        style={{minHeight:"100%"}}>
            <Form
                form={form}
                wrapperCol={{ span: 24 }}
                layout='horizontal'
                onFinish={(values) => {handleConfirmEdit(values, props.idx, props.user.id)}}
                labelAlign="left"
                style={{paddingBottom:"35px"}}
            >
                <Form.Item
                    name="name"
                    style={{ marginBottom: "2px" }}
                >
                    <Input placeholder="Enter full name"/>
                </Form.Item>
                <Form.Item
                    name="email"
                    style={{ marginBottom: "2px" }}
                >
                    <Input placeholder="Enter e-mail"/>
                </Form.Item>
                <Form.Item 
                    style={{ marginBottom: "2px" }} 
                >
                    <Input.Group compact>
                        <Form.Item 
                            name={['address', 'street']}
                            noStyle
                        >
                            <Input style={{ width: '50%'}} placeholder="Enter st. name"/>
                        </Form.Item>
                        <Form.Item name={['address', 'suite']}
                            noStyle
                        >
                            <Input style={{ width: '50%'}} placeholder="Enter suite no."/>
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item
                    name="phone" 
                    style={{ marginBottom: "1px"}}
                >
                    <Input placeholder="Enter phone number"/>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24, offset: 0 }}
                    style={{position:'absolute', bottom:'6px', right:'7px', marginBottom: "4px" }}>
                    <Button 
                        type="primary" 
                        shape="circle"
                        htmlType="submit" 
                        icon = {<CheckOutlined style={{ fontSize: 18 }} />}
                        style= {{marginRight: '3px', backgroundColor:'#28a745', borderColor: '#28a745'}}
                    />
                    <Button
                        type="primary"
                        danger shape="circle"
                        onClick={handleCancelEdit}
                        icon = {<CloseOutlined style={{ fontSize: 18 }} />}
                        style = {{marginRight: '3px'}}
                    />
                </Form.Item>
            </Form>
        </Card>
    );
};

export default FormCard;