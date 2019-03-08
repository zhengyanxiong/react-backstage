import React, {Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";

import {
    Form, Input, Tooltip, Icon, Cascader, Button, Table
} from 'antd';

const data = [];
for (let i = 0; i < 20; i++) {
    data.push({
        key: i,
        index: `${i}`,
        adminType: 1,
        adminName: `admin ${i}`,
    });
}
;
const columns = [{
    title: '序号',
    dataIndex: 'index',
}, {
    title: '管理员类型',
    dataIndex: 'adminType',
}, {
    title: '管理员',
    dataIndex: 'adminName',
}];


class AminManagement extends Component {

    state = {
        selectedRowKeys: [],
        loading: false
    };

    start = () => {
        this.setState({loading: true});
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    render() {
        const {loading, selectedRowKeys} = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div>
                <CustomBreadcrumb arr={["管理员信息管理"]}/>
                <div style={{padding: 24, background: '#fff', minHeight: 450}}>
                    <div>
                        <Button type="primary" icon="user-add" style={{marginLeft: 40, float: 'left'}}>添加</Button>
                        <Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}
                                icon="usergroup-delete" style={{marginLeft: 20, float: 'left'}}>批量删除</Button>
                        <Button type="primary" icon="search" style={{marginRight: 40, float: 'right'}}>查找</Button>
                        <Input style={{width: 250, marginRight: 20, float: 'right'}}/>
                    </div>
                    <div style={{height: 340, marginTop: 55}}>
                        <Table
                            rowSelection={rowSelection}
                            dataSource={data}
                            columns={columns}
                            scroll={{y:310}}>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default AminManagement;