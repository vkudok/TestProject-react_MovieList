import React from "react";
import {State} from "../store/Store";
import {connect} from "react-redux";
import {Button} from 'devextreme-react/button';
import {setFavouritesMovieList} from "../store/MovieStateSlice";
import styled from "styled-components";
import notFoundImg from '../images/not_found.png';

const Card = styled.div`
    display: flex;
    margin: 10px;
    padding: 10px;
    background-color: lightgray;
    border: 1px solid black;
    font-size: 17px;
`;

const ContainerInfoVisual = styled.div`
    display: flex;
    flex-direction: column
`;

const ContainerInfoText = styled.div`
    margin-left: 20px;
    display: flex;
    flex-direction: column
`;

const Image = styled.img`
    border: 1px solid black;
    margin: 10px 0px;
    width: 200px;
`;

const MainInfoParam = styled.span`
    font-weight: bold;
    margin: 10px 0;
`;

const MainInfoText = styled.p`
    margin: 0;
`;

class MovieCard extends React.Component<any, { defaultImage: string }> {

    constructor(props: any) {
        super(props);

        this.state = {
            defaultImage: notFoundImg
        };

        this.onClick = this.onClick.bind(this);
        this.replaceImg = this.replaceImg.bind(this);
    }

    replaceImg(error: any) {
        error.target.src = this.state.defaultImage;
    }

    onClick() {
        let favouritesMovieList: any[] = [];
        for (let i = 0; i < this.props.favouritesMovieList.length; i++) {
            favouritesMovieList[i] = this.props.favouritesMovieList[i];
        }

        const checkExist = favouritesMovieList.find((obj: any) => {
            return obj === this.props.chooseMovie;
        });

        if (!!checkExist) {
            const index = favouritesMovieList.indexOf(this.props.chooseMovie);
            if (index !== -1) {
                favouritesMovieList.splice(index, 1);
            }
        } else {
            favouritesMovieList.push(this.props.chooseMovie);
        }

        this.props.dispatch(setFavouritesMovieList(favouritesMovieList));
    }

    render() {
        let concatUrl = "http://image.tmdb.org/t/p/w200" + this.props.chooseMovie.poster_path;

        let checkMovieExist = this.props.favouritesMovieList.find((obj: any) => {
            return obj === this.props.chooseMovie;
        });
        return (
            <>
                <Card>
                    <ContainerInfoVisual>
                        <Image src={concatUrl}
                               onError={this.replaceImg}/>
                        <Button
                            width={200}
                            text={(!checkMovieExist) ? "Add to favorites" : "Remove from favorites"}
                            type="success"
                            stylingMode="contained"
                            onClick={this.onClick}
                        />
                    </ContainerInfoVisual>
                    <ContainerInfoText>
                        <MainInfoParam>
                            Name:
                        </MainInfoParam>
                        <MainInfoText>
                            {this.props.chooseMovie.original_title}
                        </MainInfoText>
                        <MainInfoParam>
                            Overview:
                        </MainInfoParam>
                        <MainInfoText>
                            {this.props.chooseMovie.overview}
                        </MainInfoText>
                        <MainInfoParam>
                            Release Date:
                        </MainInfoParam>
                        <MainInfoText>
                            {this.props.chooseMovie.release_date}
                        </MainInfoText>
                        <MainInfoParam>
                            Vote:
                        </MainInfoParam>
                        <MainInfoText>
                            {this.props.chooseMovie.vote_average}
                        </MainInfoText>
                    </ContainerInfoText>
                </Card>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    chooseMovie: state.movies.chooseMovie,
    favouritesMovieList: state.movies.favouritesMovieList,
    statusButton: state.favourites.statusButton,
});

export default connect(mapStateToProps)(MovieCard);
