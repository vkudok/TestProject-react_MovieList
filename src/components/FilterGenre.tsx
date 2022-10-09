import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import axios from "axios";
import {connect} from "react-redux";
import {SelectBox} from "devextreme-react";
import React from "react";
import {setMovieList} from "../store/MovieStateSlice";
import {setGenreList} from "../store/GenreStateSlice";
import {setFavStatus} from "../store/FavouritesStateSlice";
import {State} from "../store/Store";
import {Button} from "devextreme-react/button";
import styled from "styled-components";

const Filter = styled.div`
    display: flex;
    margin: 10px 0;
    gap: 10px;
`;

class FilterGenre extends React.Component<any,  { status: string , name: any[]}> {

    constructor(props: any) {
        super(props);

        this.state = {
            status: "",
            name: []
        };

        this.onValueChanged = this.onValueChanged.bind(this);
        this.onClick = this.onClick.bind(this)
    }

    componentDidMount() {
        this.genreResponse();
    }

    onClick() {
        if (!this.props.statusButton) {
            this.props.dispatch(setMovieList(this.props.favouritesMovieList));
            this.setState({
                status: "All"
            });
        } else {
            this.props.dispatch(setMovieList(this.props.cacheMovieList));
            this.setState({
                status: "All"
            });
        }

        this.props.dispatch(setFavStatus(!this.props.statusButton));
    }

    genreResponse = async () => {
        const response = await axios.get(
            'https://api.themoviedb.org/3//genre/movie/list?api_key=181911a338d5119b3964f38af18175e7&language=en-US'
        )
        let nameArray = [];
        nameArray.push('All');
        for (let i = 0; i < response.data.genres.length; i++) {
            nameArray.push(response.data.genres[i].name)
        }
        this.props.dispatch(setGenreList(response.data.genres));
        this.setState({
            name: nameArray
        });

    };

    render() {
        return (
            <>
                <Filter>
                    <SelectBox
                        width={180}
                        items={this.state.name}
                        value={this.state.status}
                        placeholder="Genre"
                        onValueChanged={this.onValueChanged}
                    />
                    <Button
                        width={180}
                        text={(!this.props.statusButton) ? "Open favourites" : "Close favourites"}
                        type="success"
                        stylingMode="contained"
                        onClick={this.onClick}
                    />
                </Filter>
            </>
        );
    }

    onValueChanged({value}: any) {
        const dataGrid = (this.props.statusButton) ? this.props.favouritesMovieList : this.props.cacheMovieList;

        if (value === 'All') {
            this.props.dispatch(setMovieList(dataGrid))
        } else {
            const genreInfo = this.props.genreList.find((obj: any) => {
                return obj.name === value;
            });

            const newDataGrid = dataGrid.filter((item: any) => {
                let genreItemList = item.genre_ids
                let checkGenre;
                for (let j = 0; j < genreItemList.length; j++) {
                    if (genreItemList[j] === genreInfo?.id) {
                        checkGenre = true;
                        break;
                    } else {
                        checkGenre = false
                    }
                }
                return checkGenre
            });
            console.log(newDataGrid);
            this.props.dispatch(setMovieList(newDataGrid));
        }
        this.setState({
            status: value
        });
    }
}

const mapStateToProps = (state: State) => ({
    cacheMovieList: state.movies.cacheMovieList,
    genreList: state.genres.genreList,
    statusButton: state.favourites.statusButton,
    favouritesMovieList: state.movies.favouritesMovieList
});

export default connect(mapStateToProps)(FilterGenre);
