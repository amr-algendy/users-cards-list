import { PageHeader, Button, Input } from 'antd';
import "antd/dist/antd.css"

const Header = (props) => {
    return (
        <PageHeader
            className="site-page-header"
            backIcon="false"
            title={<h4 style={{color:"#f5f5f5"}}>Users list</h4>}
            style={{background:"#262626"}}
            extra={[<Input placeholder="Filter" style={{width:"20ch"}} onChange={props.handleFilter} />,
                <Button key="1" onClick={props.handleFormShow}>Add user</Button>]}
        />
    )
}

export default Header;