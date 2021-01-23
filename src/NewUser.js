import axios from 'axios';
import { Form, Input, Button, Drawer } from 'antd';


const NewUser = (props) => {

    const [form] = Form.useForm();

    const handleAddUser = values => {
        axios.post(`https://jsonplaceholder.typicode.com/users/`, values)
        .then(res => {
            let copyArray = props.users.concat();
            copyArray.push(res.data);
            props.setUsers(copyArray);
            let copyStatus = props.userStatus.concat(0);
            props.setUserStatus(copyStatus);
            form.resetFields();
            props.handleFormHide();
        });
    };

    return (
        <Drawer
        title="New User"
        placement="right"
        closable={true}
        onClose={props.handleFormHide}
        visible={props.formVisible}
        width={520}
        >
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                layout='horizontal'
                onFinish={handleAddUser}
                labelAlign="left"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    style={{ marginBottom: "10px" }}
                >
                    <Input placeholder="Enter full name" />
                </Form.Item>
                <Form.Item
                    label="E-mail"
                    name="email"
                    style={{ marginBottom: "10px" }}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>
                <Form.Item 
                    label="Street name" 
                    name={['address', 'street']}
                    style={{ marginBottom: "10px" }} 
                >
                    <Input placeholder="Enter street name" />
                </Form.Item>
                <Form.Item 
                    label="Suite no." 
                    name={['address', 'suite']}
                    style={{ marginBottom: "10px" }}
                >
                    <Input placeholder="Enter suite number" />
                </Form.Item>
                <Form.Item 
                    label="City" 
                    name={['address', 'city']}
                    style={{ marginBottom: "10px" }}
                >
                    <Input placeholder="Enter city name" />
                </Form.Item>
                <Form.Item 
                    label="Phone number" 
                    name="phone" 
                    style={{ marginBottom: "10px" }}
                >
                    <Input placeholder="Enter phone number" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 14, offset: 0 }} name="submit-button">
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};


export default NewUser;
