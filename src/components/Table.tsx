import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import axios from "axios";
import DataGrid, {Column, Paging, Selection} from 'devextreme-react/data-grid';
import {connect} from "react-redux";
import React from "react";
import MovieCard from "../components/MovieCard";
import {State} from "../store/Store";
import {setMovieList, setMovieInfo, setChooseMovie, setCacheMovieList} from "../store/MovieStateSlice"

class Table extends React.Component<any> {
    constructor(props: any) {
        super(props);
        this.onSelectionChanged = this.onSelectionChanged.bind(this);
        this.onContentReady = this.onContentReady.bind(this);
    }

    componentDidMount() {
        this.movieResponse();
    }

    movieResponse = async () => {
        const response = await axios.get(
            'https://api.themoviedb.org/3/trending/all/day?api_key=181911a338d5119b3964f38af18175e7'
        )
        this.props.dispatch(setMovieList(response.data.results))
        this.props.dispatch(setCacheMovieList(response.data.results))
    };

    render() {
        return (
            <>
                <DataGrid
                    dataSource={this.props.movieList}
                    showBorders={true}
                    hoverStateEnabled={true}
                    onSelectionChanged={this.onSelectionChanged}
                    onContentReady={this.onContentReady}
                >
                    <Selection mode="single"/>
                    <Column dataField="original_title" caption="Name" width={180}/>
                    <Column dataField="overview" caption="Description"/>
                    <Column dataField="original_language" caption="Language" width={70}/>
                    <Column dataField="vote_average" caption="Vote" width={70}/>

                    <Paging defaultPageSize={10}/>
                </DataGrid>
                {
                    this.props.showMovieInfo && <MovieCard></MovieCard>
                }
            </>
        );
    }

    onSelectionChanged({selectedRowsData}: any) {
        const data = selectedRowsData[0];
        this.props.dispatch(setMovieInfo(!!data));
        this.props.dispatch(setChooseMovie(data));
    }

    onContentReady(e: any) {
        let grid = e.component;
        let selectedKeys = grid.getSelectedRowKeys();
        if (grid.getRowIndexByKey(selectedKeys) < 0) {
            grid.deselectRows(selectedKeys);
        }
    }
}

const mapStateToProps = (state: State) => ({
    movieList: state.movies.movieList,
    chooseMovie: state.movies.chooseMovie,
    showMovieInfo: state.movies.showMovieInfo
});

export default connect(mapStateToProps)(Table);
