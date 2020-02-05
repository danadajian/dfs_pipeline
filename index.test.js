const { getFanduelPlayersFromSport } = require('./index');
const { fanduelData } = require('./fanduelData');
const { projectionsData } = require('./nbaProjectionsData');

describe('merge data tests', () => {
    test('can get dfs player array from fanduel data', () => {
        expect(getFanduelPlayersFromSport('nhl', fanduelData).toString()).toBe([
                {
                    "name": "Auston Matthews",
                    "team": "TOR",
                    "position": "C",
                    "salary": 8600,
                    "playerId": 920210
                },
                {
                    "name": "Ben Bishop",
                    "team": "DAL",
                    "position": "G",
                    "salary": 8600,
                    "playerId": 446721
                },
                {
                    "name": "Frederik Andersen",
                    "team": "TOR",
                    "position": "G",
                    "salary": 8400,
                    "playerId": 556379
                },
                {
                    "name": "Anton Khudobin",
                    "team": "DAL",
                    "position": "G",
                    "salary": 8300,
                    "playerId": 395751
                },
                {
                    "name": "Artemi Panarin",
                    "team": "NYR",
                    "position": "W",
                    "salary": 8200,
                    "playerId": 870153
                },
                {
                    "name": "Sergei Bobrovsky",
                    "team": "FLA",
                    "position": "G",
                    "salary": 8200,
                    "playerId": 545448
                },
                {
                    "name": "Brian Elliott",
                    "team": "PHI",
                    "position": "G",
                    "salary": 8000,
                    "playerId": 379958
                },
                {
                    "name": "Mika Zibanejad",
                    "team": "NYR",
                    "position": "C",
                    "salary": 8000,
                    "playerId": 600082
                },
                {
                    "name": "Igor Shesterkin",
                    "team": "NYR",
                    "position": "G",
                    "salary": 7900,
                    "playerId": 831472
                },
                {
                    "name": "Mitchell Marner",
                    "team": "TOR",
                    "position": "W",
                    "salary": 7700,
                    "playerId": 878035
                },
                {
                    "name": "Alex Lyon",
                    "team": "PHI",
                    "position": "G",
                    "salary": 7700,
                    "playerId": 914101
                },
                {
                    "name": "Henrik Lundqvist",
                    "team": "NYR",
                    "position": "G",
                    "salary": 7600,
                    "playerId": 184061
                },
                {
                    "name": "Tyler Seguin",
                    "team": "DAL",
                    "position": "C",
                    "salary": 7500,
                    "playerId": 550752
                },
                {
                    "name": "Carter Hart",
                    "team": "PHI",
                    "position": "G",
                    "salary": 7500,
                    "playerId": 920353
                },
                {
                    "name": "Aleksander Barkov",
                    "team": "FLA",
                    "position": "C",
                    "salary": 7400,
                    "playerId": 741405
                },
                {
                    "name": "Claude Giroux",
                    "team": "PHI",
                    "position": "W",
                    "salary": 7400,
                    "playerId": 329656
                },
                {
                    "name": "Michael Hutchinson",
                    "team": "TOR",
                    "position": "G",
                    "salary": 7400,
                    "playerId": 543477
                },
                {
                    "name": "Alexander Georgiev",
                    "team": "NYR",
                    "position": "G",
                    "salary": 7300,
                    "playerId": 1062184
                },
                {
                    "name": "Jonathan Huberdeau",
                    "team": "FLA",
                    "position": "W",
                    "salary": 7200,
                    "playerId": 600077
                },
                {
                    "name": "Samuel Montembeault",
                    "team": "FLA",
                    "position": "G",
                    "salary": 7200,
                    "playerId": 878198
                },
                {
                    "name": "John Tavares",
                    "team": "TOR",
                    "position": "C",
                    "salary": 7200,
                    "playerId": 504244
                },
                {
                    "name": "Jimmy Howard",
                    "team": "DET",
                    "position": "G",
                    "salary": 7100,
                    "playerId": 298149
                },
                {
                    "name": "Chris Driedger",
                    "team": "FLA",
                    "position": "G",
                    "salary": 7000,
                    "playerId": 680662
                },
                {
                    "name": "Calvin Pickard",
                    "team": "DET",
                    "position": "G",
                    "salary": 7000,
                    "playerId": 554496
                },
                {
                    "name": "Kasimir Kaskisuo",
                    "team": "TOR",
                    "position": "G",
                    "salary": 7000,
                    "playerId": 913654
                },
                {
                    "name": "Jonathan Bernier",
                    "team": "DET",
                    "position": "G",
                    "salary": 7000,
                    "playerId": 329644
                },
                {
                    "name": "William Nylander",
                    "team": "TOR",
                    "position": "W",
                    "salary": 7000,
                    "playerId": 831073
                },
                {
                    "name": "Michal Neuvirth",
                    "team": "TOR",
                    "position": "G",
                    "salary": 7000,
                    "playerId": 386814
                },
                {
                    "name": "Dylan Larkin",
                    "team": "DET",
                    "position": "C",
                    "salary": 6800,
                    "playerId": 831080
                },
                {
                    "name": "Evgeni Dadonov",
                    "team": "FLA",
                    "position": "W",
                    "salary": 6800,
                    "playerId": 519786
                },
                {
                    "name": "Sean Couturier",
                    "team": "PHI",
                    "position": "C",
                    "salary": 6600,
                    "playerId": 600101
                },
                {
                    "name": "Jakub Voracek",
                    "team": "PHI",
                    "position": "W",
                    "salary": 6600,
                    "playerId": 392948
                },
                {
                    "name": "Jamie Benn",
                    "team": "DAL",
                    "position": "W",
                    "salary": 6500,
                    "playerId": 458860
                },
                {
                    "name": "Chris Kreider",
                    "team": "NYR",
                    "position": "W",
                    "salary": 6400,
                    "playerId": 504299
                },
                {
                    "name": "Anthony Mantha",
                    "team": "DET",
                    "position": "W",
                    "salary": 6300,
                    "playerId": 741457
                },
                {
                    "name": "Alexander Radulov",
                    "team": "DAL",
                    "position": "W",
                    "salary": 6300,
                    "playerId": 269229
                },
                {
                    "name": "Mike Hoffman",
                    "team": "FLA",
                    "position": "W",
                    "salary": 6200,
                    "playerId": 522606
                },
                {
                    "name": "Travis Konecny",
                    "team": "PHI",
                    "position": "W",
                    "salary": 5900,
                    "playerId": 878055
                },
                {
                    "name": "Vincent Trocheck",
                    "team": "FLA",
                    "position": "C",
                    "salary": 5600,
                    "playerId": 607956
                },
                {
                    "name": "Keith Yandle",
                    "team": "FLA",
                    "position": "D",
                    "salary": 5500,
                    "playerId": 325006
                },
                {
                    "name": "Kevin Hayes",
                    "team": "PHI",
                    "position": "C",
                    "salary": 5400,
                    "playerId": 550774
                },
                {
                    "name": "Tyson Barrie",
                    "team": "TOR",
                    "position": "D",
                    "salary": 5400,
                    "playerId": 593095
                },
                {
                    "name": "Zach Hyman",
                    "team": "TOR",
                    "position": "W",
                    "salary": 5400,
                    "playerId": 555393
                },
                {
                    "name": "Jacob Trouba",
                    "team": "NYR",
                    "position": "D",
                    "salary": 5300,
                    "playerId": 659853
                },
                {
                    "name": "Roope Hintz",
                    "team": "DAL",
                    "position": "C",
                    "salary": 5300,
                    "playerId": 878170
                },
                {
                    "name": "James van Riemsdyk",
                    "team": "PHI",
                    "position": "W",
                    "salary": 5200,
                    "playerId": 392943
                },
                {
                    "name": "John Klingberg",
                    "team": "DAL",
                    "position": "D",
                    "salary": 5200,
                    "playerId": 555748
                },
                {
                    "name": "Ryan Strome",
                    "team": "NYR",
                    "position": "C",
                    "salary": 5100,
                    "playerId": 600079
                },
                {
                    "name": "Aaron Ekblad",
                    "team": "FLA",
                    "position": "D",
                    "salary": 5000,
                    "playerId": 831066
                },
                {
                    "name": "Anthony Deangelo",
                    "team": "NYR",
                    "position": "D",
                    "salary": 4900,
                    "playerId": 831084
                },
                {
                    "name": "Joe Pavelski",
                    "team": "DAL",
                    "position": "W",
                    "salary": 4900,
                    "playerId": 329570
                },
                {
                    "name": "Morgan Rielly",
                    "team": "TOR",
                    "position": "D",
                    "salary": 4800,
                    "playerId": 659812
                },
                {
                    "name": "Tyler Bertuzzi",
                    "team": "DET",
                    "position": "W",
                    "salary": 4800,
                    "playerId": 743067
                },
                {
                    "name": "Matt Niskanen",
                    "team": "PHI",
                    "position": "D",
                    "salary": 4700,
                    "playerId": 300809
                },
                {
                    "name": "Ivan Provorov",
                    "team": "PHI",
                    "position": "D",
                    "salary": 4600,
                    "playerId": 878038
                },
                {
                    "name": "Andreas Athanasiou",
                    "team": "DET",
                    "position": "W",
                    "salary": 4600,
                    "playerId": 681424
                },
                {
                    "name": "Pavel Buchnevich",
                    "team": "NYR",
                    "position": "W",
                    "salary": 4500,
                    "playerId": 743252
                },
                {
                    "name": "Miro Heiskanen",
                    "team": "DAL",
                    "position": "D",
                    "salary": 4400,
                    "playerId": 1057101
                },
                {
                    "name": "Andreas Johnson",
                    "team": "TOR",
                    "position": "W",
                    "salary": 4300,
                    "playerId": 745352
                },
                {
                    "name": "Pierre Engvall",
                    "team": "TOR",
                    "position": "C",
                    "salary": 4300,
                    "playerId": 831554
                },
                {
                    "name": "Brett Connolly",
                    "team": "FLA",
                    "position": "W",
                    "salary": 4300,
                    "playerId": 550756
                },
                {
                    "name": "Brady Skjei",
                    "team": "NYR",
                    "position": "D",
                    "salary": 4200,
                    "playerId": 659874
                },
                {
                    "name": "Robby Fabbri",
                    "team": "DET",
                    "position": "W",
                    "salary": 4200,
                    "playerId": 831086
                },
                {
                    "name": "Jacob Muzzin",
                    "team": "TOR",
                    "position": "D",
                    "salary": 4100,
                    "playerId": 536508
                },
                {
                    "name": "Noel Acciari",
                    "team": "FLA",
                    "position": "W",
                    "salary": 4100,
                    "playerId": 873205
                },
                {
                    "name": "Esa Lindell",
                    "team": "DAL",
                    "position": "D",
                    "salary": 4100,
                    "playerId": 680652
                },
                {
                    "name": "Filip Hronek",
                    "team": "DET",
                    "position": "D",
                    "salary": 4000,
                    "playerId": 920361
                },
                {
                    "name": "Filip Chytil",
                    "team": "NYR",
                    "position": "C",
                    "salary": 4000,
                    "playerId": 1057130
                },
                {
                    "name": "Filip Zadina",
                    "team": "DET",
                    "position": "W",
                    "salary": 4000,
                    "playerId": 1121435
                },
                {
                    "name": "Kasperi Kapanen",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3900,
                    "playerId": 831087
                },
                {
                    "name": "Adam Fox",
                    "team": "NYR",
                    "position": "D",
                    "salary": 3900,
                    "playerId": 920374
                },
                {
                    "name": "Travis Sanheim",
                    "team": "PHI",
                    "position": "D",
                    "salary": 3900,
                    "playerId": 831082
                },
                {
                    "name": "Michael Matheson",
                    "team": "FLA",
                    "position": "D",
                    "salary": 3900,
                    "playerId": 659869
                },
                {
                    "name": "Alexander Kerfoot",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3800,
                    "playerId": 681488
                },
                {
                    "name": "Jesper Fast",
                    "team": "NYR",
                    "position": "W",
                    "salary": 3800,
                    "playerId": 555872
                },
                {
                    "name": "Cody Ceci",
                    "team": "TOR",
                    "position": "D",
                    "salary": 3700,
                    "playerId": 659859
                },
                {
                    "name": "Kaapo Kakko",
                    "team": "NYR",
                    "position": "W",
                    "salary": 3700,
                    "playerId": 1166551
                },
                {
                    "name": "Rasmus Sandin",
                    "team": "TOR",
                    "position": "D",
                    "salary": 3700,
                    "playerId": 1121477
                },
                {
                    "name": "Denis Gurianov",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3700,
                    "playerId": 878043
                },
                {
                    "name": "Dennis Cholowski",
                    "team": "DET",
                    "position": "D",
                    "salary": 3600,
                    "playerId": 920229
                },
                {
                    "name": "Anton Stralman",
                    "team": "FLA",
                    "position": "D",
                    "salary": 3600,
                    "playerId": 383710
                },
                {
                    "name": "Scott Laughton",
                    "team": "PHI",
                    "position": "W",
                    "salary": 3600,
                    "playerId": 659866
                },
                {
                    "name": "Roman Polak",
                    "team": "DAL",
                    "position": "D",
                    "salary": 3600,
                    "playerId": 326129
                },
                {
                    "name": "Brian Boyle",
                    "team": "FLA",
                    "position": "C",
                    "salary": 3600,
                    "playerId": 229389
                },
                {
                    "name": "Blake Comeau",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3600,
                    "playerId": 303078
                },
                {
                    "name": "Justin Holl",
                    "team": "TOR",
                    "position": "D",
                    "salary": 3600,
                    "playerId": 554502
                },
                {
                    "name": "Andrej Sekera",
                    "team": "DAL",
                    "position": "D",
                    "salary": 3600,
                    "playerId": 329579
                },
                {
                    "name": "Colton Sceviour",
                    "team": "FLA",
                    "position": "W",
                    "salary": 3600,
                    "playerId": 490373
                },
                {
                    "name": "Brett Howden",
                    "team": "NYR",
                    "position": "W",
                    "salary": 3600,
                    "playerId": 920237
                },
                {
                    "name": "Justin Braun",
                    "team": "PHI",
                    "position": "D",
                    "salary": 3600,
                    "playerId": 544480
                },
                {
                    "name": "Riley Stillman",
                    "team": "FLA",
                    "position": "D",
                    "salary": 3600,
                    "playerId": 920436
                },
                {
                    "name": "Madison Bowey",
                    "team": "DET",
                    "position": "D",
                    "salary": 3600,
                    "playerId": 743062
                },
                {
                    "name": "Thomas Harley",
                    "team": "DAL",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 1172200
                },
                {
                    "name": "Matthew Robertson",
                    "team": "NYR",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 1172241
                },
                {
                    "name": "Robert Michel",
                    "team": "PHI",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 1190394
                },
                {
                    "name": "Charle-Edouard D'Astous",
                    "team": "DET",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 1190640
                },
                {
                    "name": "Yegor Rykov",
                    "team": "NYR",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 950285
                },
                {
                    "name": "Joe Hicketts",
                    "team": "DET",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 849429
                },
                {
                    "name": "Robert Hagg",
                    "team": "PHI",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 743047
                },
                {
                    "name": "Alec McCrea",
                    "team": "DET",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 1190638
                },
                {
                    "name": "Nicolas Aube-Kubel",
                    "team": "PHI",
                    "position": "W",
                    "salary": 3500,
                    "playerId": 831276
                },
                {
                    "name": "Kevin Gravel",
                    "team": "TOR",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 555810
                },
                {
                    "name": "Travis Dermott",
                    "team": "TOR",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 878153
                },
                {
                    "name": "Andy Welinski",
                    "team": "PHI",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 607975
                },
                {
                    "name": "Rob O'Gara",
                    "team": "FLA",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 610901
                },
                {
                    "name": "Ryan Lindgren",
                    "team": "NYR",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 920354
                },
                {
                    "name": "Mark Friedman",
                    "team": "PHI",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 831392
                },
                {
                    "name": "Libor Hajek",
                    "team": "NYR",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 920335
                },
                {
                    "name": "Gavin Bayreuther",
                    "team": "DAL",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 975496
                },
                {
                    "name": "Joel Hanley",
                    "team": "DAL",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 827586
                },
                {
                    "name": "Brady Keeper",
                    "team": "FLA",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 1162598
                },
                {
                    "name": "Teemu Kivihalme",
                    "team": "TOR",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 744951
                },
                {
                    "name": "Jordan Schmaltz",
                    "team": "TOR",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 659871
                },
                {
                    "name": "Ilya Mikheyev",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3500,
                    "playerId": 905606
                },
                {
                    "name": "Phil Myers",
                    "team": "PHI",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 892768
                },
                {
                    "name": "Joel Farabee",
                    "team": "PHI",
                    "position": "W",
                    "salary": 3500,
                    "playerId": 1121445
                },
                {
                    "name": "Tarmo Reunanen",
                    "team": "NYR",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 920419
                },
                {
                    "name": "Julius Honka",
                    "team": "DAL",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 831079
                },
                {
                    "name": "Patrik Nemeth",
                    "team": "DET",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 554488
                },
                {
                    "name": "Martin Marincin",
                    "team": "TOR",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 554493
                },
                {
                    "name": "Dylan McIlrath",
                    "team": "DET",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 550760
                },
                {
                    "name": "Jamie Oleksiak",
                    "team": "DAL",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 600110
                },
                {
                    "name": "Radek Faksa",
                    "team": "DAL",
                    "position": "C",
                    "salary": 3500,
                    "playerId": 659857
                },
                {
                    "name": "Samuel Morin",
                    "team": "PHI",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 741441
                },
                {
                    "name": "Ben Harpur",
                    "team": "TOR",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 744815
                },
                {
                    "name": "Dan DeKeyser",
                    "team": "DET",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 729484
                },
                {
                    "name": "Mark Pysyk",
                    "team": "FLA",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 550773
                },
                {
                    "name": "Brian Lashoff",
                    "team": "DET",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 479737
                },
                {
                    "name": "Frans Nielsen",
                    "team": "DET",
                    "position": "C",
                    "salary": 3500,
                    "playerId": 326033
                },
                {
                    "name": "Jonathan Ericsson",
                    "team": "DET",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 326026
                },
                {
                    "name": "Trevor Daley",
                    "team": "DET",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 172243
                },
                {
                    "name": "Marc Staal",
                    "team": "NYR",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 300790
                },
                {
                    "name": "Mike Green",
                    "team": "DET",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 269519
                },
                {
                    "name": "Brendan Smith",
                    "team": "NYR",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 392971
                },
                {
                    "name": "Alex Biega",
                    "team": "DET",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 547269
                },
                {
                    "name": "Nate Prosser",
                    "team": "PHI",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 541897
                },
                {
                    "name": "Joshua Brown",
                    "team": "FLA",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 745261
                },
                {
                    "name": "Taylor Fedun",
                    "team": "DAL",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 591028
                },
                {
                    "name": "Stephen Johns",
                    "team": "DAL",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 554510
                },
                {
                    "name": "MacKenzie Weegar",
                    "team": "FLA",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 745370
                },
                {
                    "name": "Shayne Gostisbehere",
                    "team": "PHI",
                    "position": "D",
                    "salary": 3500,
                    "playerId": 680770
                },
                {
                    "name": "Denis Malgin",
                    "team": "FLA",
                    "position": "C",
                    "salary": 3400,
                    "playerId": 878243
                },
                {
                    "name": "Darren Helm",
                    "team": "DET",
                    "position": "W",
                    "salary": 3400,
                    "playerId": 339752
                },
                {
                    "name": "Mattias Janmark",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3300,
                    "playerId": 743257
                },
                {
                    "name": "Frank Vatrano",
                    "team": "FLA",
                    "position": "W",
                    "salary": 3300,
                    "playerId": 866948
                },
                {
                    "name": "Dominic Toninato",
                    "team": "FLA",
                    "position": "C",
                    "salary": 3300,
                    "playerId": 681443
                },
                {
                    "name": "Jason Spezza",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3300,
                    "playerId": 174942
                },
                {
                    "name": "Valtteri Filppula",
                    "team": "DET",
                    "position": "C",
                    "salary": 3300,
                    "playerId": 297132
                },
                {
                    "name": "Luke Glendening",
                    "team": "DET",
                    "position": "W",
                    "salary": 3300,
                    "playerId": 656728
                },
                {
                    "name": "Brendan Lemieux",
                    "team": "NYR",
                    "position": "W",
                    "salary": 3200,
                    "playerId": 831258
                },
                {
                    "name": "Corey Perry",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3200,
                    "playerId": 229391
                },
                {
                    "name": "Jason Dickinson",
                    "team": "DAL",
                    "position": "C",
                    "salary": 3200,
                    "playerId": 741469
                },
                {
                    "name": "Morgan Frost",
                    "team": "PHI",
                    "position": "C",
                    "salary": 3200,
                    "playerId": 1057136
                },
                {
                    "name": "Frederik Gauthier",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3200,
                    "playerId": 741459
                },
                {
                    "name": "Justin Dowling",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3200,
                    "playerId": 594352
                },
                {
                    "name": "Michael Raffl",
                    "team": "PHI",
                    "position": "W",
                    "salary": 3200,
                    "playerId": 736539
                },
                {
                    "name": "Dmytro Timashov",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3100,
                    "playerId": 878281
                },
                {
                    "name": "Christoffer Ehn",
                    "team": "DET",
                    "position": "C",
                    "salary": 3100,
                    "playerId": 831458
                },
                {
                    "name": "Andrew Cogliano",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3100,
                    "playerId": 300806
                },
                {
                    "name": "David Kase",
                    "team": "PHI",
                    "position": "W",
                    "salary": 3100,
                    "playerId": 878284
                },
                {
                    "name": "Eric Tangradi",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 409629
                },
                {
                    "name": "Vitali Kravtsov",
                    "team": "NYR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 948024
                },
                {
                    "name": "Martin Hanzal",
                    "team": "DAL",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 300797
                },
                {
                    "name": "Scottie Upshall",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 172191
                },
                {
                    "name": "Rhett Gardner",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 920438
                },
                {
                    "name": "Taro Hirose",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1162142
                },
                {
                    "name": "Mason Marchment",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 895218
                },
                {
                    "name": "Ville Meskanen",
                    "team": "NYR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1115614
                },
                {
                    "name": "Pontus Aberg",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 660786
                },
                {
                    "name": "Micheal Haley",
                    "team": "NYR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 451625
                },
                {
                    "name": "Joel L'Esperance",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1116838
                },
                {
                    "name": "Ryan Kuffner",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1162132
                },
                {
                    "name": "Cal O'Reilly",
                    "team": "PHI",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 340441
                },
                {
                    "name": "Kurtis Gabriel",
                    "team": "PHI",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 743261
                },
                {
                    "name": "Nicolas Petan",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 743049
                },
                {
                    "name": "Tyler Spezia",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1190633
                },
                {
                    "name": "Jarid Lukosevicius",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1190628
                },
                {
                    "name": "Troy Loggins",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1190627
                },
                {
                    "name": "Evgeny Svechnikov",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 878050
                },
                {
                    "name": "Jayce Hawryluk",
                    "team": "FLA",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 831259
                },
                {
                    "name": "Chris Stewart",
                    "team": "PHI",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 329652
                },
                {
                    "name": "Colt Conrad",
                    "team": "TOR",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 1191225
                },
                {
                    "name": "Liam Pecararo",
                    "team": "FLA",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1191002
                },
                {
                    "name": "Josh Kestner",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1116851
                },
                {
                    "name": "Justin Abdelkader",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 447451
                },
                {
                    "name": "Diego Cuglietta",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1189244
                },
                {
                    "name": "Chase Pearson",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 878305
                },
                {
                    "name": "Joel Kiviranta",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1166552
                },
                {
                    "name": "Parker MacKay",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1189247
                },
                {
                    "name": "Brad McClure",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1189248
                },
                {
                    "name": "Dominic Turgeon",
                    "team": "DET",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 831367
                },
                {
                    "name": "Anthony Nellis",
                    "team": "DAL",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 1189249
                },
                {
                    "name": "Jack Rodewald",
                    "team": "FLA",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 847505
                },
                {
                    "name": "Dryden Hunt",
                    "team": "FLA",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 910765
                },
                {
                    "name": "Anthony Greco",
                    "team": "FLA",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 917555
                },
                {
                    "name": "Kalle Kossila",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 913808
                },
                {
                    "name": "Carsen Twarynski",
                    "team": "PHI",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 920395
                },
                {
                    "name": "Tanner Kero",
                    "team": "DAL",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 868759
                },
                {
                    "name": "Givani Smith",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 920350
                },
                {
                    "name": "Trevor Moore",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 925180
                },
                {
                    "name": "Timothy Gettinger",
                    "team": "NYR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 920468
                },
                {
                    "name": "Matt Read",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 593010
                },
                {
                    "name": "Connor Bunnaman",
                    "team": "PHI",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 920432
                },
                {
                    "name": "Garrett Wilson",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 597360
                },
                {
                    "name": "Andy Andreoff",
                    "team": "PHI",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 607972
                },
                {
                    "name": "Tyler Gaudet",
                    "team": "TOR",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 798720
                },
                {
                    "name": "Kenneth Agostino",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 555791
                },
                {
                    "name": "Phil Di Giuseppe",
                    "team": "NYR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 660787
                },
                {
                    "name": "Matt Puempel",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 600126
                },
                {
                    "name": "Henrik Borgstrom",
                    "team": "FLA",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 920233
                },
                {
                    "name": "German Rubtsov",
                    "team": "PHI",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 920232
                },
                {
                    "name": "Adam Brooks",
                    "team": "TOR",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 920414
                },
                {
                    "name": "Brendan Perlini",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 831077
                },
                {
                    "name": "Tyler Pitlick",
                    "team": "PHI",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 554475
                },
                {
                    "name": "Lias Andersson",
                    "team": "NYR",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 1057105
                },
                {
                    "name": "Michael Rasmussen",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1057107
                },
                {
                    "name": "Boo Nieves",
                    "team": "NYR",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 660809
                },
                {
                    "name": "Jason Robertson",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1057147
                },
                {
                    "name": "Adam Erne",
                    "team": "DET",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 743038
                },
                {
                    "name": "Greg McKegg",
                    "team": "NYR",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 554515
                },
                {
                    "name": "Owen Tippett",
                    "team": "FLA",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 1057108
                },
                {
                    "name": "Nolan Patrick",
                    "team": "PHI",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 1057100
                },
                {
                    "name": "Vinni Lettieri",
                    "team": "NYR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 976670
                },
                {
                    "name": "Steven Fogarty",
                    "team": "NYR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 607963
                },
                {
                    "name": "Darren Archibald",
                    "team": "TOR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 582350
                },
                {
                    "name": "Nicholas Caamano",
                    "team": "DAL",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 920472
                },
                {
                    "name": "Mikhail Vorobyov",
                    "team": "PHI",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 878246
                },
                {
                    "name": "Oskar Lindblom",
                    "team": "PHI",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 831501
                },
                {
                    "name": "Connor Brickley",
                    "team": "NYR",
                    "position": "W",
                    "salary": 3000,
                    "playerId": 554497
                },
                {
                    "name": "Aleksi Saarela",
                    "team": "FLA",
                    "position": "C",
                    "salary": 3000,
                    "playerId": 878210
                }
            ].toString())
    })

    // test('converts array to set', () => {
    //     expect(mergeData(fanduelData, projectionsData)).toBe([
    //         {
    //             "name":"LeSean McCoy",
    //             "team":"KC",
    //             "projection": 0.7579393092959834,
    //             "position":"RB",
    //             "salary":4900,
    //             "playerId":397945
    //         }
    //     ]);
    // });
});