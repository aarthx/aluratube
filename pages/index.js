import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    const estiloDaHomePage = {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    };
    const [valorDoFiltro, setValorDoFiltro] = React.useState("")

    return (
        <>
            <CSSReset />
            <div style={estiloDaHomePage}>
                <Menu
                    valorDoFiltro={valorDoFiltro}
                    setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline
                    searchValue={valorDoFiltro}
                    playlists={config.playlists}
                    favorites={config.favorites} />
            </div>
        </>
    );
}

export default HomePage;

const StyleHeader = styled.div`
    
    section img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .banner {
        width: 100vw;
        height: 230px;
        object-fit: cover;
    }

    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0px 32px;
        gap: 16px;
        padding: 20px;
    }
`;

const StyledBanner = styled.div`
    background-image: url(${({ bg }) => bg});
    height: 230px;      
`
function Header(props) {
    return (
        <StyleHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`}></img>
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section >
        </StyleHeader >
    );
}

function Timeline({ searchValue, ...props }) {
    const playlistsNames = Object.keys(props.playlists);
    const youtubers = props.favorites.youtubers

    // For --> Stetement
    // Retorno por expressao
    return (
        <StyledTimeline>
            {playlistsNames.map((playlistsName) => {
                const videos = props.playlists[playlistsName];
                return (
                    <section key={playlistsName}>
                        <h2>{playlistsName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase()
                                const searchValueNormalized = searchValue.toLowerCase()
                                return titleNormalized.includes(searchValueNormalized)
                            })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                )
            })}
            <h2>AluraTubes Favoritos</h2>
            <section className="user-favorites">
                {youtubers.map((youtubers) => {
                    return (
                        <div key={youtubers.url}>
                            <a href={youtubers.url}>
                                <img src={youtubers.thumb} />
                                <span>
                                    {youtubers.title}
                                </span>
                            </a>
                        </div>
                    )
                })}
            </section>
        </StyledTimeline>
    )
}
