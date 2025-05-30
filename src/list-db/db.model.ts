export interface IList {
    Title: string;
    AlternateTitles: Array<string>;
    Descriptions: Array<string>;
    Episodes: number;
    Aired: string;
    Studios: Array<string>;
    Genre: Array<string>;
    Theme: Array<string>;
    Cover: string;
    ScreenShots?: Array<string>;
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