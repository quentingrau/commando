import { Stats } from "./Stats";

export interface Pokemon {
    id: number;
    image: string;
    name: string;
    stats: Stats;
    favorite?: boolean;
}