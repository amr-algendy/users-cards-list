import { PageHeader, Input } from 'antd';

const Header = (props) => {
    return (
        <PageHeader
            backIcon="false"
            title={<h4 style={{color:"#f5f5f5", marginLeft:'10px'}}>Users list</h4>}
            style={{background:"#262626", position:'fixed', top:'0px', width:'100%', zIndex:'2'}}
            extra={<Input placeholder="Filter" key="2" style={{width:"25ch", marginRight:'10px'}} onChange={props.handleFilter} />}
        />
    )
}

export default Header;
