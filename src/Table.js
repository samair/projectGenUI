import React from 'react';
import { Table } from 'reactstrap';

export default class ReactTable extends React.Component {
  render() {
    return (

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Path</th>
            <th>Response Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         {this.props.updateRows()}
          
        </tbody>
      </Table>
    );
  }
}