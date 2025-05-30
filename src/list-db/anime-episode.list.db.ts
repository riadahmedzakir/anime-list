import { AnimeEpisodeList_Part_1 } from "./anime-episode.list-1.db";
import { AnimeEpisodeList_Part_2 } from "./anime-episode.list-2.db";
import { AnimeEpisodeList_Part_3 } from "./anime-episode.list-3.db";
import { AnimeEpisodeList_Part_4 } from "./anime-episode.list-4.db";
import { AnimeEpisodeList_Part_5 } from "./anime-episode.list-5.db";
import { IEpisodeList } from "./db.model";

export const AnimeEpisodeList: { [key: string]: Array<IEpisodeList> } = {
    ...AnimeEpisodeList_Part_1,
    ...AnimeEpisodeList_Part_2,
    ...AnimeEpisodeList_Part_3,
    ...AnimeEpisodeList_Part_4,
    ...AnimeEpisodeList_Part_5
}