import "antd/dist/antd.css"
import { Card, Button, Typography} from 'antd';
import { DeleteFilled } from '@ant-design/icons';

const UserCard = (props) => {
    const { Title } = Typography;
    return (<Card
        title={<Title level={5}>{props.user.name}</Title>}
        bordered={false}
        size="small"
    >
        <p style={{wordWrap:'break-word'}}>{props.user.email}</p>
        <p style={{wordWrap:'break-word'}}>{props.user.address.street}, {props.user.address.suite}</p>
        <p style={{float: 'left'}}>{props.user.phone}</p>
        <Button
            type="primary"
            danger shape="circle"
            onClick={() => (props.deleteUser(props.idx, props.user.id))}
            icon = {<DeleteFilled style={{ fontSize: 18 }} />}
            style={{float: 'right'}}
            />
    </Card>);
}

export default UserCard;