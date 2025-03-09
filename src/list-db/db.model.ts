export interface IAnimeList {
    Title: string;
    AlternateTitles: Array<string>;
    Descriptions: Array<string>;
    Episodes: number;
    Aired: string;
    Studios: Array<string>;
    Genre: Array<string>;
    Theme: Array<string>;
    Cover: string;
    IsAdultRated?: boolean;
    OnDvd?: boolean;
    Related: Array<IRelatedAnime>;
}

export interface IEpisodeList {
    Episode: string;
    Title: string;
    Aired: string;
}

export interface IRelatedAnime {
    Type: string;
    Title: string;
}