import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import FilterGenre from "../components/FilterGenre";
import React from "react";
import Table from "../components/Table";

class HomePage extends React.Component<any> {

    render() {
        return (
            <>
                <FilterGenre movieList={this.props.movieList}></FilterGenre>
                <Table></Table>
            </>
        );
    }
}

export default (HomePage);
