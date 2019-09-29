export interface ITeam {
    id: number;
    name: string;
    url: string;
    abbrev: string;
}

// prob should deep freeze this
export const TEAMS: ITeam[] = [
    {
        id: 1,
        name: 'Arizona Cardinals',
        url: 'https://www.espn.com/nfl/team/roster/_/name/ari/arizona-cardinals',
        abbrev: 'ARI'
    },
    {
        id: 2,
        name: 'Atlanta Falcons',
        url: 'https://www.espn.com/nfl/team/roster/_/name/atl/atlanta-falcons',
        abbrev: 'ATL'
    },
    {
        id: 3,
        name: 'Baltimore Ravens',
        url: 'https://www.espn.com/nfl/team/roster/_/name/bal/baltimore-ravens',
        abbrev: 'BAL'
    },
    {
        id: 4,
        name: 'Buffalo Bills',
        url: 'https://www.espn.com/nfl/team/roster/_/name/buf/buffalo-bills',
        abbrev: 'BUF'
    },
    {
        id: 5,
        name: 'Carolina Panthers',
        url: 'https://www.espn.com/nfl/team/roster/_/name/car/carolina-panthers',
        abbrev: 'CAR'
    },
    {
        id: 6,
        name: 'Chicago Bears',
        url: 'https://www.espn.com/nfl/team/roster/_/name/chi/chicago-bears',
        abbrev: 'CHI'
    },
    {
        id: 7,
        name: 'Cincinnati Bengals',
        url: 'https://www.espn.com/nfl/team/roster/_/name/cin/cincinnati-bengals',
        abbrev: 'CIN'
    },
    {
        id: 8,
        name: 'Cleveland Browns',
        url: 'https://www.espn.com/nfl/team/roster/_/name/cle/cleveland-browns',
        abbrev: 'CLE'
    },
    {
        id: 9,
        name: 'Dallas Cowboys',
        url: 'https://www.espn.com/nfl/team/roster/_/name/dal',
        abbrev: 'DAL'
    },
    {
        id: 10,
        name: 'Denver Broncos',
        url: 'https://www.espn.com/nfl/team/roster/_/name/den/denver-broncos',
        abbrev: 'DEN'
    },
    {
        id: 11,
        name: 'Detriot Lions',
        url: 'https://www.espn.com/nfl/team/roster/_/name/det/detroit-lions',
        abbrev: 'DET'
    },
    {
        id: 12,
        name: 'Green Bay Packers',
        url: 'https://www.espn.com/nfl/team/roster/_/name/gb/green-bay-packers',
        abbrev: 'GB'
    },
    {
        id: 13,
        name: 'Houston Texans',
        url: 'https://www.espn.com/nfl/team/roster/_/name/hou/houston-texans',
        abbrev: 'HOU'
    },
    {
        id: 14,
        name: 'Indianapolis Colts',
        url: 'https://www.espn.com/nfl/team/roster/_/name/ind/indianapolis-colts',
        abbrev: 'IND'
    },
    {
        id: 15,
        name: 'Jacksonville Jaguars',
        url: 'https://www.espn.com/nfl/team/roster/_/name/jax/jacksonville-jaguars',
        abbrev: 'JAX'
    },
    {
        id: 16,
        name: 'Kansas City Chiefs',
        url: 'https://www.espn.com/nfl/team/roster/_/name/kc/kansas-city-chiefs',
        abbrev: 'KC'
    },
    {
        id: 17,
        name: 'Los Angeles Chargers',
        url: 'https://www.espn.com/nfl/team/roster/_/name/lac/los-angeles-chargers',
        abbrev: 'LAC'
    },
    {
        id: 18,
        name: 'Los Angeles Rams',
        url: 'https://www.espn.com/nfl/team/roster/_/name/lar/los-angeles-rams',
        abbrev: 'LA'
    },
    {
        id: 19,
        name: 'Miami Dolphins',
        url: 'https://www.espn.com/nfl/team/roster/_/name/mia',
        abbrev: 'MIA'
    },
    {
        id: 20,
        name: 'Minnesota Vikings',
        url: 'https://www.espn.com/nfl/team/roster/_/name/min/minnesota-vikings',
        abbrev: 'MIN'
    },
    {
        id: 21,
        name: 'New England Patriots',
        url: 'https://www.espn.com/nfl/team/roster/_/name/ne',
        abbrev: 'NE'
    },
    {
        id: 22,
        name: 'New Orleans Saints',
        url: 'https://www.espn.com/nfl/team/roster/_/name/no/new-orleans-saints',
        abbrev: 'NO'
    },
    {
        id: 23,
        name: 'New York Giants',
        url: 'https://www.espn.com/nfl/team/roster/_/name/nyg',
        abbrev: 'NYG'
    },
    {
        id: 24,
        name: 'New York Jets',
        url: 'https://www.espn.com/nfl/team/roster/_/name/nyj',
        abbrev: 'NYJ'
    },
    {
        id: 25,
        name: 'Oakland Raiders',
        url: 'https://www.espn.com/nfl/team/roster/_/name/oak/oakland-raiders',
        abbrev: 'OAK'
    },
    {
        id: 26,
        name: 'Philadelphia Eagles',
        url: 'https://www.espn.com/nfl/team/roster/_/name/phi',
        abbrev: 'PHI'
    },
    {
        id: 27,
        name: 'Pittsburgh Steelers',
        url: 'https://www.espn.com/nfl/team/roster/_/name/pit/pittsburgh-steelers',
        abbrev: 'PIT'
    },
    {
        id: 28,
        name: 'San Francisco 49ers',
        url: 'https://www.espn.com/nfl/team/roster/_/name/sf/san-francisco-49ers',
        abbrev: 'SF'
    },
    {
        id: 29,
        name: 'Seattle Seahawks',
        url: 'https://www.espn.com/nfl/team/roster/_/name/sea/seattle-seahawks',
        abbrev: 'SEA'
    },
    {
        id: 30,
        name: 'Tampa Bay Buccaneers',
        url: 'https://www.espn.com/nfl/team/roster/_/name/tb/tampa-bay-buccaneers',
        abbrev: 'TB'
    },
    {
        id: 31,
        name: 'Tennessee Titans',
        url: 'https://www.espn.com/nfl/team/roster/_/name/ten/tennessee-titans',
        abbrev: 'TEN'
    },
    {
        id: 32,
        name: 'Washington Redskins',
        url: 'https://www.espn.com/nfl/team/roster/_/name/wsh',
        abbrev: 'WAS'
    }
];
