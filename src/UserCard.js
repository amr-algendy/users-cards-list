import { Card, Button, Typography} from 'antd';
import { DeleteFilled, EditOutlined } from '@ant-design/icons';

const UserCard = (props) => {
    const { Title } = Typography;
    return (<Card
        title={<Title level={5}>{props.user.name}</Title>}
        bordered='false'
        size="small"
        style={{minHeight:"100%"}}
    >
        <div style={{paddingBottom:"23px"}}>
            <p style={{wordWrap:'break-word'}}>{props.user.email}</p>
            <p style={{wordWrap:'break-word'}}>{props.user.address.street}{(props.user.address.suite !== undefined)?(`, ${props.user.address.suite}`):''}</p>
            <p>{props.user.phone}</p>
            <div style={{position:'absolute', bottom:'10px', right:'10px'}}>
                <Button
                    type="primary"
                    shape="circle"
                    onClick={() => (props.editEnable(props.idx))}
                    icon = {<EditOutlined style={{ fontSize: 18 }} />}
                    style = {{marginRight: '3px', backgroundColor:'#ffc107', borderColor: '#ffc107'}}
                />
                <Button
                    type="primary"
                    danger shape="circle"
                    onClick={() => (props.deleteUser(props.idx, props.user.id))}
                    icon = {<DeleteFilled style={{ fontSize: 18 }} />}
                    />
            </div>
        </div>
    </Card>);
}

export default UserCard;
