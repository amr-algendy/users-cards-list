import { Form, Input, Button, Drawer } from 'antd';


const NewUser = (props) => {

    const [form] = Form.useForm();

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
                onFinish={props.handleAddUser}
                labelAlign="left"
            >
                <Form.Item
                    label="Name"
                    name="userName"
                    style={{ marginBottom: "10px" }}
                >
                    <Input placeholder="Enter full name" />
                </Form.Item>
                <Form.Item
                    label="E-mail"
                    name="userEmail"
                    style={{ marginBottom: "10px" }}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>
                <Form.Item 
                    label="Street name" 
                    name="userStreetName" 
                    style={{ marginBottom: "10px" }} 
                >
                    <Input placeholder="Enter street name" />
                </Form.Item>
                <Form.Item 
                    label="Suite no." 
                    name="userSuiteNo" 
                    style={{ marginBottom: "10px" }}
                >
                    <Input placeholder="Enter suite number" />
                </Form.Item>
                <Form.Item 
                    label="City" 
                    name="userCity" 
                    style={{ marginBottom: "10px" }}
                >
                    <Input placeholder="Enter city name" />
                </Form.Item>
                <Form.Item 
                    label="Phone number" 
                    name="userPhoneNumber" 
                    style={{ marginBottom: "10px" }}
                >
                    <Input placeholder="Enter phone number" />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 14, offset: 0 }} name="submit-button">
                    <Button type="primary" htmlType="submit" onClick={form.resetFields()}>Submit</Button>
                </Form.Item>
            </Form>
        </Drawer>
    );
};


export default NewUser;