export type AppDTO = {
  appid: number;
  name: string;
};

export type App = {
  name: string;
  steam_appid: number;
  developers: string[];
  header_image: string;
  is_free: boolean;
  release_date: {
    coming_soon: boolean;
    date: string;
  };
  website: string;
  platforms: {
    windows: boolean;
    linux: boolean;
    mac: boolean;
  };
  metacritic: {
    score: number;
    url: string;
  };
  price_overview: {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
    initial_formatted: string;
    final_formatted: string;
  };
};
