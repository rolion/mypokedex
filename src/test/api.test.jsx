import React from "react";
import axios from "axios";
import { getPokemonList, searchPokemonByName, getPokemonInfo } from '../assets/libs/http'
jest.mock('axios');

const fakePokemonList = [
    {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
        "name": "charmander",
        "url": "https://pokeapi.co/api/v2/pokemon/4/"
    }
];
const pokemonInfo =[
    {
        species:{
            name:'bulbasaur',
            url:'https://pokeapi.co/api/v2/pokemon-species/1/',
        },
        id:1,
        weight:69,
        height:7,
        name:"bulbasaur",
        "is_default": true,
        types:[
            {
                "slot": 1,
                "type": {
                    "name": "grass",
                    "url": "https://pokeapi.co/api/v2/type/12/"
                }
            },
            {
                "slot": 2,
                "type": {
                    "name": "poison",
                    "url": "https://pokeapi.co/api/v2/type/4/"
                }
            }
        ],
        sprites: {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "other": {
                "official-artwork": {
                    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                }
            },
        },
        stats:[
            {
                "base_stat": 45,
                "effort": 0,
                "stat": {
                    "name": "hp",
                    "url": "https://pokeapi.co/api/v2/stat/1/"
                }
            },
            {
                "base_stat": 49,
                "effort": 0,
                "stat": {
                    "name": "attack",
                    "url": "https://pokeapi.co/api/v2/stat/2/"
                }
            },
        ]
    },
    {
        species:{
            name:'charmander',
            url:'https://pokeapi.co/api/v2/pokemon-species/4/',
        },
        id:4,
        weight:85,
        height:6,
        name:'charmander',
        "is_default": true,
        types:[
            {
                "slot": 1,
                "type": {
                    "name": "fire",
                    "url": "https://pokeapi.co/api/v2/type/10/"
                }
            }
        ],
        sprites: {
            "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            "other": {
                "official-artwork": {
                    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
                }
            },
        },
        stats:[
            {
                "base_stat": 39,
                "effort": 0,
                "stat": {
                    "name": "hp",
                    "url": "https://pokeapi.co/api/v2/stat/1/"
                }
            },
            {
                "base_stat": 52,
                "effort": 0,
                "stat": {
                    "name": "attack",
                    "url": "https://pokeapi.co/api/v2/stat/2/"
                }
            },
        ]
    }
];
it('should return the pokemon list', async function () {
    axios.get.mockResolvedValueOnce({data:
            {
                count: 60,
                next:null,
                previus:null,
                results: [
                    {
                        name:'test-pokemon',
                        url:'https://pokeapi.co/api/v2/pokemon/1/'
                    }
                ]
            }
    })
    let result = await getPokemonList(10, 0).then(data => data.data.results);
    expect(result.length).toEqual(1)
});
it('should get Pokemon list that have substring', async () =>{
    axios.get.mockResolvedValueOnce({data: pokemonInfo[0]
    });//.mockResolvedValueOnce({data: pokemonInfo[1]})
    let result = await searchPokemonByName('saur', fakePokemonList);
    expect(result).toStrictEqual([
        {
            "heigth": 0.7000000000000001,
            "id": 1,
            "images": {
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
                "other": {
                    "official-artwork": {
                        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                    }
                }
            },
            "is_default": true,
            name:"bulbasaur",
            "specieUrl": "https://pokeapi.co/api/v2/pokemon-species/1/",
            "stats": [
                {
                    "base_stat": 45,
                    "effort": 0,
                    "stat": {
                        "name": "hp",
                        "url": "https://pokeapi.co/api/v2/stat/1/"
                    }
                },
                {
                    "base_stat": 49,
                    "effort": 0,
                    "stat": {
                        "name": "attack",
                        "url": "https://pokeapi.co/api/v2/stat/2/"
                    }
                }
            ],
            "types": [
                {
                    "slot": 1,
                    "type": {
                        "name": "grass",
                        "url": "https://pokeapi.co/api/v2/type/12/"
                    }
                },
                {
                    "slot": 2,
                    "type": {
                        "name": "poison",
                        "url": "https://pokeapi.co/api/v2/type/4/"
                    }
                }
            ],
            "weight": 6.9
        },
        ]
    )
})
it('should get Pokemon that have exact match', async () =>{
    axios.get.mockResolvedValue({data: pokemonInfo[1]});
    let result = await searchPokemonByName('charmander', fakePokemonList);
    expect(result).toStrictEqual([
        {
            "heigth": 0.6000000000000001,
            "id": 4,
            "images": {
                "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
                "other": {
                    "official-artwork": {
                        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
                    }
                }
            },
            "is_default": true,
            name:'charmander',
            "specieUrl": "https://pokeapi.co/api/v2/pokemon-species/4/",
            "stats": [
                {
                    "base_stat": 39,
                    "effort": 0,
                    "stat": {
                        "name": "hp",
                        "url": "https://pokeapi.co/api/v2/stat/1/"
                    }
                },
                {
                    "base_stat": 52,
                    "effort": 0,
                    "stat": {
                        "name": "attack",
                        "url": "https://pokeapi.co/api/v2/stat/2/"
                    }
                }
            ],
            "types": [
                {
                    "slot": 1,
                    "type": {
                        "name": "fire",
                        "url": "https://pokeapi.co/api/v2/type/10/"
                    }
                }
            ],
            "weight": 8.5
        }
        ]
    )
})
it('should return pokemon info', async function () {
    // let axiosPokemoBaseInfo = {
    //     species:{
    //         name:'charmander',
    //         url:'https://pokeapi.co/api/v2/pokemon-species/4/',
    //     },
    //     id:4,
    //     weight:85,
    //     height:6,
    //     types:[
    //         {
    //             "slot": 1,
    //             "type": {
    //                 "name": "fire",
    //                 "url": "https://pokeapi.co/api/v2/type/10/"
    //             }
    //         }
    //     ],
    //     sprites: {
    //         "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    //         "other": {
    //             "official-artwork": {
    //                 "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
    //             }
    //         },
    //     },
    //     stats:[
    //         {
    //             "base_stat": 39,
    //             "effort": 0,
    //             "stat": {
    //                 "name": "hp",
    //                 "url": "https://pokeapi.co/api/v2/stat/1/"
    //             }
    //         },
    //         {
    //             "base_stat": 52,
    //             "effort": 0,
    //             "stat": {
    //                 "name": "attack",
    //                 "url": "https://pokeapi.co/api/v2/stat/2/"
    //             }
    //         },
    //     ]
    // };
    axios.get.mockResolvedValueOnce({data:pokemonInfo[1]

            }
    ).mockResolvedValueOnce({
        data:{
            "base_happiness": 70,
            "capture_rate": 45,
            "color": {
                "name": "red",
                "url": "https://pokeapi.co/api/v2/pokemon-color/8/"
            },
            "egg_groups": [
                {
                    "name": "monster",
                    "url": "https://pokeapi.co/api/v2/egg-group/1/"
                },
                {
                    "name": "dragon",
                    "url": "https://pokeapi.co/api/v2/egg-group/14/"
                }
            ],
            "evolution_chain": {
                "url": "https://pokeapi.co/api/v2/evolution-chain/2/"
            },
            "evolves_from_species": null,
            "flavor_text_entries": [
                {
                    "flavor_text": "Obviously prefers\nhot places. When\nit rains, steam\fis said to spout\nfrom the tip of\nits tail.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "red",
                        "url": "https://pokeapi.co/api/v2/version/1/"
                    }
                },
                {
                    "flavor_text": "Obviously prefers\nhot places. When\nit rains, steam\fis said to spout\nfrom the tip of\nits tail.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "blue",
                        "url": "https://pokeapi.co/api/v2/version/2/"
                    }
                },
                {
                    "flavor_text": "The flame at the\ntip of its tail\nmakes a sound as\fit burns. You can\nonly hear it in\nquiet places.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "yellow",
                        "url": "https://pokeapi.co/api/v2/version/3/"
                    }
                },
                {
                    "flavor_text": "The flame on its\ntail shows the\nstrength of its\flife force. If it\nis weak, the flame\nalso burns weakly.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "gold",
                        "url": "https://pokeapi.co/api/v2/version/4/"
                    }
                },
                {
                    "flavor_text": "The flame on its\ntail indicates\nCHARMANDER's life\fforce. If it is\nhealthy, the flame\nburns brightly.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "silver",
                        "url": "https://pokeapi.co/api/v2/version/5/"
                    }
                },
                {
                    "flavor_text": "If it's healthy,\nthe flame on the\ntip of its tail\fwill burn vigor­\nously, even if it\ngets a bit wet.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "crystal",
                        "url": "https://pokeapi.co/api/v2/version/6/"
                    }
                },
                {
                    "flavor_text": "The flame that burns at the tip of its\ntail is an indication of its emotions.\nThe flame wavers when CHARMANDER is\fenjoying itself. If the POKéMON becomes\nenraged, the flame burns fiercely.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "ruby",
                        "url": "https://pokeapi.co/api/v2/version/7/"
                    }
                },
                {
                    "flavor_text": "The flame that burns at the tip of its\ntail is an indication of its emotions.\nThe flame wavers when CHARMANDER is\fenjoying itself. If the POKéMON becomes\nenraged, the flame burns fiercely.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "sapphire",
                        "url": "https://pokeapi.co/api/v2/version/8/"
                    }
                },
                {
                    "flavor_text": "The flame that burns at the tip of its\ntail is an indication of its emotions.\nThe flame wavers when CHARMANDER is\nhappy, and blazes when it is enraged.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "emerald",
                        "url": "https://pokeapi.co/api/v2/version/9/"
                    }
                },
                {
                    "flavor_text": "From the time it is born, a flame burns\nat the tip of its tail. Its life would end\nif the flame were to go out.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "firered",
                        "url": "https://pokeapi.co/api/v2/version/10/"
                    }
                },
                {
                    "flavor_text": "It has a preference for hot things.\nWhen it rains, steam is said to spout from\nthe tip of its tail.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "leafgreen",
                        "url": "https://pokeapi.co/api/v2/version/11/"
                    }
                },
                {
                    "flavor_text": "The fire on the tip of its tail is a\nmeasure of its life. If healthy,\nits tail burns intensely.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "diamond",
                        "url": "https://pokeapi.co/api/v2/version/12/"
                    }
                },
                {
                    "flavor_text": "The fire on the tip of its tail is a\nmeasure of its life. If healthy,\nits tail burns intensely.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "pearl",
                        "url": "https://pokeapi.co/api/v2/version/13/"
                    }
                },
                {
                    "flavor_text": "The fire on the tip of its tail is a\nmeasure of its life. If healthy,\nits tail burns intensely.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "platinum",
                        "url": "https://pokeapi.co/api/v2/version/14/"
                    }
                },
                {
                    "flavor_text": "The flame on its tail shows the\nstrength of its life force. If it is weak,\nthe flame also burns weakly.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "heartgold",
                        "url": "https://pokeapi.co/api/v2/version/15/"
                    }
                },
                {
                    "flavor_text": "The flame on its tail indicates\nCHARMANDER’s life force. If it is\nhealthy, the flame burns brightly.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "soulsilver",
                        "url": "https://pokeapi.co/api/v2/version/16/"
                    }
                },
                {
                    "flavor_text": "La flamme de sa queue symbolise sa\nvitalité. Elle est intense quand il\nest en bonne santé.",
                    "language": {
                        "name": "fr",
                        "url": "https://pokeapi.co/api/v2/language/5/"
                    },
                    "version": {
                        "name": "black",
                        "url": "https://pokeapi.co/api/v2/version/17/"
                    }
                },
                {
                    "flavor_text": "The fire on the tip of its tail is a\nmeasure of its life. If healthy,\nits tail burns intensely.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "black",
                        "url": "https://pokeapi.co/api/v2/version/17/"
                    }
                },
                {
                    "flavor_text": "La flamme de sa queue symbolise sa\nvitalité. Elle est intense quand il\nest en bonne santé.",
                    "language": {
                        "name": "fr",
                        "url": "https://pokeapi.co/api/v2/language/5/"
                    },
                    "version": {
                        "name": "white",
                        "url": "https://pokeapi.co/api/v2/version/18/"
                    }
                },
                {
                    "flavor_text": "The fire on the tip of its tail is a\nmeasure of its life. If healthy,\nits tail burns intensely.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "white",
                        "url": "https://pokeapi.co/api/v2/version/18/"
                    }
                },
                {
                    "flavor_text": "The fire on the tip of its tail is a\nmeasure of its life. If healthy,\nits tail burns intensely.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "black-2",
                        "url": "https://pokeapi.co/api/v2/version/21/"
                    }
                },
                {
                    "flavor_text": "The fire on the tip of its tail is a\nmeasure of its life. If healthy,\nits tail burns intensely.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "white-2",
                        "url": "https://pokeapi.co/api/v2/version/22/"
                    }
                },
                {
                    "flavor_text": "しっぽの　ほのおは　ヒトカゲの\nせいめいりょくの　あかし。\nげんきだと　さかんに　もえさかる。",
                    "language": {
                        "name": "ja-Hrkt",
                        "url": "https://pokeapi.co/api/v2/language/1/"
                    },
                    "version": {
                        "name": "x",
                        "url": "https://pokeapi.co/api/v2/version/23/"
                    }
                },
                {
                    "flavor_text": "꼬리의 불꽃은 파이리의\n생명력의 상징이다.\n건강할 때 왕성하게 불타오른다.",
                    "language": {
                        "name": "ko",
                        "url": "https://pokeapi.co/api/v2/language/3/"
                    },
                    "version": {
                        "name": "x",
                        "url": "https://pokeapi.co/api/v2/version/23/"
                    }
                },
                {
                    "flavor_text": "La flamme sur sa queue représente l’énergie vitale\nde Salamèche. Quand il est vigoureux, elle brûle plus\nfort.",
                    "language": {
                        "name": "fr",
                        "url": "https://pokeapi.co/api/v2/language/5/"
                    },
                    "version": {
                        "name": "x",
                        "url": "https://pokeapi.co/api/v2/version/23/"
                    }
                },
                {
                    "flavor_text": "Die Flamme auf seiner Schweifspitze zeigt die\nLebensenergie an. Ist es gesund, leuchtet sie hell.",
                    "language": {
                        "name": "de",
                        "url": "https://pokeapi.co/api/v2/language/6/"
                    },
                    "version": {
                        "name": "x",
                        "url": "https://pokeapi.co/api/v2/version/23/"
                    }
                },
                {
                    "flavor_text": "La llama de su cola indica la fuerza vital de\nCharmander. Será brillante si está sano.",
                    "language": {
                        "name": "es",
                        "url": "https://pokeapi.co/api/v2/language/7/"
                    },
                    "version": {
                        "name": "x",
                        "url": "https://pokeapi.co/api/v2/version/23/"
                    }
                },
                {
                    "flavor_text": "La fiamma che Charmander ha sulla coda indica la\nsua forza vitale. Se è in forma, la fiamma è vivace.",
                    "language": {
                        "name": "it",
                        "url": "https://pokeapi.co/api/v2/language/8/"
                    },
                    "version": {
                        "name": "x",
                        "url": "https://pokeapi.co/api/v2/version/23/"
                    }
                },
                {
                    "flavor_text": "The flame on its tail indicates Charmander’s life\nforce. If it is healthy, the flame burns brightly.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "x",
                        "url": "https://pokeapi.co/api/v2/version/23/"
                    }
                },
                {
                    "flavor_text": "尻尾の　炎は\nヒトカゲの　生命力の　証。\n元気だと　さかんに　燃えさかる。",
                    "language": {
                        "name": "ja",
                        "url": "https://pokeapi.co/api/v2/language/11/"
                    },
                    "version": {
                        "name": "x",
                        "url": "https://pokeapi.co/api/v2/version/23/"
                    }
                },
                {
                    "flavor_text": "うまれたときから　しっぽに　ほのおが\nともっている。ほのおが　きえたとき\nその　いのちは　おわって　しまう。",
                    "language": {
                        "name": "ja-Hrkt",
                        "url": "https://pokeapi.co/api/v2/language/1/"
                    },
                    "version": {
                        "name": "y",
                        "url": "https://pokeapi.co/api/v2/version/24/"
                    }
                },
                {
                    "flavor_text": "태어날 때부터 꼬리의 불꽃이\n타오르고 있다. 불꽃이 꺼지면\n그 생명이 다하고 만다.",
                    "language": {
                        "name": "ko",
                        "url": "https://pokeapi.co/api/v2/language/3/"
                    },
                    "version": {
                        "name": "y",
                        "url": "https://pokeapi.co/api/v2/version/24/"
                    }
                },
                {
                    "flavor_text": "Depuis sa naissance, une petite flamme brûle au bout\nde sa queue. Si cette flamme s’éteint, la vie de ce\nPokémon s’éteindra elle aussi.",
                    "language": {
                        "name": "fr",
                        "url": "https://pokeapi.co/api/v2/language/5/"
                    },
                    "version": {
                        "name": "y",
                        "url": "https://pokeapi.co/api/v2/version/24/"
                    }
                },
                {
                    "flavor_text": "Von Geburt an brennt die Flamme auf seiner\nSchwanzspitze. Sobald sie erlischt, erlischt auch\nsein Lebenslicht.",
                    "language": {
                        "name": "de",
                        "url": "https://pokeapi.co/api/v2/language/6/"
                    },
                    "version": {
                        "name": "y",
                        "url": "https://pokeapi.co/api/v2/version/24/"
                    }
                },
                {
                    "flavor_text": "Este Pokémon nace con una llama en la punta de la\ncola. Si la llama se apagara, el Pokémon se debilitaría.",
                    "language": {
                        "name": "es",
                        "url": "https://pokeapi.co/api/v2/language/7/"
                    },
                    "version": {
                        "name": "y",
                        "url": "https://pokeapi.co/api/v2/version/24/"
                    }
                },
                {
                    "flavor_text": "Dalla nascita una fiamma gli arde sulla punta della\ncoda. Se si spegnesse, per lui sarebbe la fine.",
                    "language": {
                        "name": "it",
                        "url": "https://pokeapi.co/api/v2/language/8/"
                    },
                    "version": {
                        "name": "y",
                        "url": "https://pokeapi.co/api/v2/version/24/"
                    }
                },
                {
                    "flavor_text": "From the time it is born, a flame burns at the tip of\nits tail. Its life would end if the flame were to\ngo out.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "y",
                        "url": "https://pokeapi.co/api/v2/version/24/"
                    }
                },
                {
                    "flavor_text": "生まれたときから　尻尾に　炎が\n点っている。炎が　消えたとき\nその　命は　終わってしまう。",
                    "language": {
                        "name": "ja",
                        "url": "https://pokeapi.co/api/v2/language/11/"
                    },
                    "version": {
                        "name": "y",
                        "url": "https://pokeapi.co/api/v2/version/24/"
                    }
                },
                {
                    "flavor_text": "しっぽの　ほのおは　きぶんを　ひょうげん。\nたのしい　ときには　ゆらゆら　ほのおが　ゆれて\nおこった　ときには　めらめら　さかんに　もえる。",
                    "language": {
                        "name": "ja-Hrkt",
                        "url": "https://pokeapi.co/api/v2/language/1/"
                    },
                    "version": {
                        "name": "omega-ruby",
                        "url": "https://pokeapi.co/api/v2/version/25/"
                    }
                },
                {
                    "flavor_text": "꼬리의 불꽃은 기분을 표현한다.\n즐거울 때는 흔들흔들 불꽃이 흔들리고\n화가 났을 때는 활활 맹렬히 불타오른다.",
                    "language": {
                        "name": "ko",
                        "url": "https://pokeapi.co/api/v2/language/3/"
                    },
                    "version": {
                        "name": "omega-ruby",
                        "url": "https://pokeapi.co/api/v2/version/25/"
                    }
                },
                {
                    "flavor_text": "La flamme qui brûle au bout de sa queue indique l’humeur\nde ce Pokémon. Elle vacille lorsque Salamèche est content.\nEn revanche, lorsqu’il s’énerve, la flamme prend\nde l’importance et brûle plus ardemment.",
                    "language": {
                        "name": "fr",
                        "url": "https://pokeapi.co/api/v2/language/5/"
                    },
                    "version": {
                        "name": "omega-ruby",
                        "url": "https://pokeapi.co/api/v2/version/25/"
                    }
                },
                {
                    "flavor_text": "Die Flamme auf seiner Schweifspitze zeigt seine\nGefühlslage an. Sie flackert, wenn Glumanda\nzufrieden ist. Wenn dieses Pokémon wütend wird,\nlodert die Flamme gewaltig.",
                    "language": {
                        "name": "de",
                        "url": "https://pokeapi.co/api/v2/language/6/"
                    },
                    "version": {
                        "name": "omega-ruby",
                        "url": "https://pokeapi.co/api/v2/version/25/"
                    }
                },
                {
                    "flavor_text": "La llama que tiene en la punta de la cola arde según sus\nsentimientos. Llamea levemente cuando está alegre y arde\nvigorosamente cuando está enfadado.",
                    "language": {
                        "name": "es",
                        "url": "https://pokeapi.co/api/v2/language/7/"
                    },
                    "version": {
                        "name": "omega-ruby",
                        "url": "https://pokeapi.co/api/v2/version/25/"
                    }
                },
                {
                    "flavor_text": "La fiamma sulla punta della coda indica il suo stato emotivo.\nSe la fiamma ondeggia significa che Charmander si sta\ndivertendo. Quando il Pokémon si infuria, la fiamma arde\nviolentemente.",
                    "language": {
                        "name": "it",
                        "url": "https://pokeapi.co/api/v2/language/8/"
                    },
                    "version": {
                        "name": "omega-ruby",
                        "url": "https://pokeapi.co/api/v2/version/25/"
                    }
                },
                {
                    "flavor_text": "The flame that burns at the tip of its tail is an indication\nof its emotions. The flame wavers when Charmander\nis enjoying itself. If the Pokémon becomes enraged,\nthe flame burns fiercely.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "omega-ruby",
                        "url": "https://pokeapi.co/api/v2/version/25/"
                    }
                },
                {
                    "flavor_text": "尻尾の　炎は　気分を　表現。\n楽しい　ときには　ゆらゆら　炎が　ゆれて\n怒った　ときには　めらめら　盛んに　燃える。",
                    "language": {
                        "name": "ja",
                        "url": "https://pokeapi.co/api/v2/language/11/"
                    },
                    "version": {
                        "name": "omega-ruby",
                        "url": "https://pokeapi.co/api/v2/version/25/"
                    }
                },
                {
                    "flavor_text": "しっぽの　ほのおは　きぶんを　ひょうげん。\nたのしい　ときには　ゆらゆら　ほのおが　ゆれて\nおこった　ときには　めらめら　さかんに　もえる。",
                    "language": {
                        "name": "ja-Hrkt",
                        "url": "https://pokeapi.co/api/v2/language/1/"
                    },
                    "version": {
                        "name": "alpha-sapphire",
                        "url": "https://pokeapi.co/api/v2/version/26/"
                    }
                },
                {
                    "flavor_text": "꼬리의 불꽃은 기분을 표현한다.\n즐거울 때는 흔들흔들 불꽃이 흔들리고\n화가 났을 때는 활활 맹렬히 불타오른다.",
                    "language": {
                        "name": "ko",
                        "url": "https://pokeapi.co/api/v2/language/3/"
                    },
                    "version": {
                        "name": "alpha-sapphire",
                        "url": "https://pokeapi.co/api/v2/version/26/"
                    }
                },
                {
                    "flavor_text": "La flamme qui brûle au bout de sa queue indique l’humeur\nde ce Pokémon. Elle vacille lorsque Salamèche est content.\nEn revanche, lorsqu’il s’énerve, la flamme prend\nde l’importance et brûle plus ardemment.",
                    "language": {
                        "name": "fr",
                        "url": "https://pokeapi.co/api/v2/language/5/"
                    },
                    "version": {
                        "name": "alpha-sapphire",
                        "url": "https://pokeapi.co/api/v2/version/26/"
                    }
                },
                {
                    "flavor_text": "Die Flamme auf seiner Schweifspitze zeigt seine\nGefühlslage an. Sie flackert, wenn Glumanda\nzufrieden ist. Wenn dieses Pokémon wütend wird,\nlodert die Flamme sehr stark.",
                    "language": {
                        "name": "de",
                        "url": "https://pokeapi.co/api/v2/language/6/"
                    },
                    "version": {
                        "name": "alpha-sapphire",
                        "url": "https://pokeapi.co/api/v2/version/26/"
                    }
                },
                {
                    "flavor_text": "La llama que tiene en la punta de la cola arde según sus\nsentimientos. Llamea levemente cuando está alegre y arde\nvigorosamente cuando está enfadado.",
                    "language": {
                        "name": "es",
                        "url": "https://pokeapi.co/api/v2/language/7/"
                    },
                    "version": {
                        "name": "alpha-sapphire",
                        "url": "https://pokeapi.co/api/v2/version/26/"
                    }
                },
                {
                    "flavor_text": "La fiamma sulla punta della coda indica il suo stato emotivo.\nSe la fiamma ondeggia significa che Charmander si sta\ndivertendo. Quando il Pokémon si infuria, la fiamma arde\nviolentemente.",
                    "language": {
                        "name": "it",
                        "url": "https://pokeapi.co/api/v2/language/8/"
                    },
                    "version": {
                        "name": "alpha-sapphire",
                        "url": "https://pokeapi.co/api/v2/version/26/"
                    }
                },
                {
                    "flavor_text": "The flame that burns at the tip of its tail is an indication\nof its emotions. The flame wavers when Charmander\nis enjoying itself. If the Pokémon becomes enraged,\nthe flame burns fiercely.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "alpha-sapphire",
                        "url": "https://pokeapi.co/api/v2/version/26/"
                    }
                },
                {
                    "flavor_text": "尻尾の　炎は　気分を　表現。\n楽しい　ときには　ゆらゆら　炎が　ゆれて\n怒った　ときには　めらめら　盛んに　燃える。",
                    "language": {
                        "name": "ja",
                        "url": "https://pokeapi.co/api/v2/language/11/"
                    },
                    "version": {
                        "name": "alpha-sapphire",
                        "url": "https://pokeapi.co/api/v2/version/26/"
                    }
                },
                {
                    "flavor_text": "しずかな　ところに　つれていくと\nシッポが　もえてる　ちいさな　おとが\nきこえてくるよ。",
                    "language": {
                        "name": "ja-Hrkt",
                        "url": "https://pokeapi.co/api/v2/language/1/"
                    },
                    "version": {
                        "name": "lets-go-pikachu",
                        "url": "https://pokeapi.co/api/v2/version/31/"
                    }
                },
                {
                    "flavor_text": "조용한 곳에 데려가면\n꼬리가 타고 있는\n작은 소리가 들린다.",
                    "language": {
                        "name": "ko",
                        "url": "https://pokeapi.co/api/v2/language/3/"
                    },
                    "version": {
                        "name": "lets-go-pikachu",
                        "url": "https://pokeapi.co/api/v2/version/31/"
                    }
                },
                {
                    "flavor_text": "要是把牠帶到安靜的地方，\n就能聽見牠的尾巴燃燒時\n發出的微小聲音。",
                    "language": {
                        "name": "zh-Hant",
                        "url": "https://pokeapi.co/api/v2/language/4/"
                    },
                    "version": {
                        "name": "lets-go-pikachu",
                        "url": "https://pokeapi.co/api/v2/version/31/"
                    }
                },
                {
                    "flavor_text": "La flammèche au bout de sa queue émet\nun crépitement audible seulement dans\nles endroits calmes.",
                    "language": {
                        "name": "fr",
                        "url": "https://pokeapi.co/api/v2/language/5/"
                    },
                    "version": {
                        "name": "lets-go-pikachu",
                        "url": "https://pokeapi.co/api/v2/version/31/"
                    }
                },
                {
                    "flavor_text": "An sehr stillen Orten kann man seine brennende\nSchwanzspitze ganz leise lodern hören.",
                    "language": {
                        "name": "de",
                        "url": "https://pokeapi.co/api/v2/language/6/"
                    },
                    "version": {
                        "name": "lets-go-pikachu",
                        "url": "https://pokeapi.co/api/v2/version/31/"
                    }
                },
                {
                    "flavor_text": "En lugares silenciosos se puede oír el débil\nchisporroteo de la llama que le arde en la\npunta de la cola.",
                    "language": {
                        "name": "es",
                        "url": "https://pokeapi.co/api/v2/language/7/"
                    },
                    "version": {
                        "name": "lets-go-pikachu",
                        "url": "https://pokeapi.co/api/v2/version/31/"
                    }
                },
                {
                    "flavor_text": "Nel silenzio più assoluto si può udire la fiamma\nin cima alla sua coda scoppiettare bruciando.",
                    "language": {
                        "name": "it",
                        "url": "https://pokeapi.co/api/v2/language/8/"
                    },
                    "version": {
                        "name": "lets-go-pikachu",
                        "url": "https://pokeapi.co/api/v2/version/31/"
                    }
                },
                {
                    "flavor_text": "The flame at the tip of its tail makes a sound as\nit burns. You can only hear it in quiet places.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "lets-go-pikachu",
                        "url": "https://pokeapi.co/api/v2/version/31/"
                    }
                },
                {
                    "flavor_text": "静かな　ところに　連れていくと\nシッポが　燃えてる　小さな　音が\n聞こえてくるよ。",
                    "language": {
                        "name": "ja",
                        "url": "https://pokeapi.co/api/v2/language/11/"
                    },
                    "version": {
                        "name": "lets-go-pikachu",
                        "url": "https://pokeapi.co/api/v2/version/31/"
                    }
                },
                {
                    "flavor_text": "要是把它带到安静的地方，\n就能听到它的尾巴燃烧时\n发出的微小的声音。",
                    "language": {
                        "name": "zh-Hans",
                        "url": "https://pokeapi.co/api/v2/language/12/"
                    },
                    "version": {
                        "name": "lets-go-pikachu",
                        "url": "https://pokeapi.co/api/v2/version/31/"
                    }
                },
                {
                    "flavor_text": "しずかな　ところに　つれていくと\nシッポが　もえてる　ちいさな　おとが\nきこえてくるよ。",
                    "language": {
                        "name": "ja-Hrkt",
                        "url": "https://pokeapi.co/api/v2/language/1/"
                    },
                    "version": {
                        "name": "lets-go-eevee",
                        "url": "https://pokeapi.co/api/v2/version/32/"
                    }
                },
                {
                    "flavor_text": "조용한 곳에 데려가면\n꼬리가 타고 있는\n작은 소리가 들린다.",
                    "language": {
                        "name": "ko",
                        "url": "https://pokeapi.co/api/v2/language/3/"
                    },
                    "version": {
                        "name": "lets-go-eevee",
                        "url": "https://pokeapi.co/api/v2/version/32/"
                    }
                },
                {
                    "flavor_text": "要是把牠帶到安靜的地方，\n就能聽見牠的尾巴燃燒時\n發出的微小聲音。",
                    "language": {
                        "name": "zh-Hant",
                        "url": "https://pokeapi.co/api/v2/language/4/"
                    },
                    "version": {
                        "name": "lets-go-eevee",
                        "url": "https://pokeapi.co/api/v2/version/32/"
                    }
                },
                {
                    "flavor_text": "La flammèche au bout de sa queue émet\nun crépitement audible seulement dans\nles endroits calmes.",
                    "language": {
                        "name": "fr",
                        "url": "https://pokeapi.co/api/v2/language/5/"
                    },
                    "version": {
                        "name": "lets-go-eevee",
                        "url": "https://pokeapi.co/api/v2/version/32/"
                    }
                },
                {
                    "flavor_text": "An sehr stillen Orten kann man seine brennende\nSchwanzspitze ganz leise lodern hören.",
                    "language": {
                        "name": "de",
                        "url": "https://pokeapi.co/api/v2/language/6/"
                    },
                    "version": {
                        "name": "lets-go-eevee",
                        "url": "https://pokeapi.co/api/v2/version/32/"
                    }
                },
                {
                    "flavor_text": "En lugares silenciosos se puede oír el débil\nchisporroteo de la llama que le arde en la\npunta de la cola.",
                    "language": {
                        "name": "es",
                        "url": "https://pokeapi.co/api/v2/language/7/"
                    },
                    "version": {
                        "name": "lets-go-eevee",
                        "url": "https://pokeapi.co/api/v2/version/32/"
                    }
                },
                {
                    "flavor_text": "Nel silenzio più assoluto si può udire la fiamma\nin cima alla sua coda scoppiettare bruciando.",
                    "language": {
                        "name": "it",
                        "url": "https://pokeapi.co/api/v2/language/8/"
                    },
                    "version": {
                        "name": "lets-go-eevee",
                        "url": "https://pokeapi.co/api/v2/version/32/"
                    }
                },
                {
                    "flavor_text": "The flame at the tip of its tail makes a sound as\nit burns. You can only hear it in quiet places.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "lets-go-eevee",
                        "url": "https://pokeapi.co/api/v2/version/32/"
                    }
                },
                {
                    "flavor_text": "静かな　ところに　連れていくと\nシッポが　燃えてる　小さな　音が\n聞こえてくるよ。",
                    "language": {
                        "name": "ja",
                        "url": "https://pokeapi.co/api/v2/language/11/"
                    },
                    "version": {
                        "name": "lets-go-eevee",
                        "url": "https://pokeapi.co/api/v2/version/32/"
                    }
                },
                {
                    "flavor_text": "要是把它带到安静的地方，\n就能听到它的尾巴燃烧时\n发出的微小的声音。",
                    "language": {
                        "name": "zh-Hans",
                        "url": "https://pokeapi.co/api/v2/language/12/"
                    },
                    "version": {
                        "name": "lets-go-eevee",
                        "url": "https://pokeapi.co/api/v2/version/32/"
                    }
                },
                {
                    "flavor_text": "あついものを　このむ　せいかく。\nあめにぬれると　しっぽの　さきから\nけむりが　でるという。",
                    "language": {
                        "name": "ja-Hrkt",
                        "url": "https://pokeapi.co/api/v2/language/1/"
                    },
                    "version": {
                        "name": "sword",
                        "url": "https://pokeapi.co/api/v2/version/33/"
                    }
                },
                {
                    "flavor_text": "뜨거운 것을 좋아하는 성격이다.\n비에 젖으면 꼬리 끝에서\n연기가 난다고 한다.",
                    "language": {
                        "name": "ko",
                        "url": "https://pokeapi.co/api/v2/language/3/"
                    },
                    "version": {
                        "name": "sword",
                        "url": "https://pokeapi.co/api/v2/version/33/"
                    }
                },
                {
                    "flavor_text": "天生喜歡熱熱的東西。\n據說當牠被雨淋濕的時候，\n尾巴的末端會冒出煙來。",
                    "language": {
                        "name": "zh-Hant",
                        "url": "https://pokeapi.co/api/v2/language/4/"
                    },
                    "version": {
                        "name": "sword",
                        "url": "https://pokeapi.co/api/v2/version/33/"
                    }
                },
                {
                    "flavor_text": "Il préfère ce qui est chaud.\nEn cas de pluie, de la vapeur se forme autour\nde sa queue.",
                    "language": {
                        "name": "fr",
                        "url": "https://pokeapi.co/api/v2/language/5/"
                    },
                    "version": {
                        "name": "sword",
                        "url": "https://pokeapi.co/api/v2/version/33/"
                    }
                },
                {
                    "flavor_text": "Dieses Pokémon bevorzugt heiße Dinge.\nBei Regen soll seine Schwanzspitze dampfen.",
                    "language": {
                        "name": "de",
                        "url": "https://pokeapi.co/api/v2/language/6/"
                    },
                    "version": {
                        "name": "sword",
                        "url": "https://pokeapi.co/api/v2/version/33/"
                    }
                },
                {
                    "flavor_text": "Prefiere las cosas calientes. Dicen que cuando\nllueve le sale vapor de la punta de la cola.",
                    "language": {
                        "name": "es",
                        "url": "https://pokeapi.co/api/v2/language/7/"
                    },
                    "version": {
                        "name": "sword",
                        "url": "https://pokeapi.co/api/v2/version/33/"
                    }
                },
                {
                    "flavor_text": "Ama le cose calde. Si dice che quando piove\ngli esca vapore dalla punta della coda.",
                    "language": {
                        "name": "it",
                        "url": "https://pokeapi.co/api/v2/language/8/"
                    },
                    "version": {
                        "name": "sword",
                        "url": "https://pokeapi.co/api/v2/version/33/"
                    }
                },
                {
                    "flavor_text": "It has a preference for hot things. When it rains,\nsteam is said to spout from the tip of its tail.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "sword",
                        "url": "https://pokeapi.co/api/v2/version/33/"
                    }
                },
                {
                    "flavor_text": "熱いものを　好む　性格。\n雨に濡れると　しっぽの　先から\n煙が　出るという。",
                    "language": {
                        "name": "ja",
                        "url": "https://pokeapi.co/api/v2/language/11/"
                    },
                    "version": {
                        "name": "sword",
                        "url": "https://pokeapi.co/api/v2/version/33/"
                    }
                },
                {
                    "flavor_text": "天生喜欢热热的东西。\n据说当它被雨淋湿的时候，\n尾巴的末端会冒出烟来。",
                    "language": {
                        "name": "zh-Hans",
                        "url": "https://pokeapi.co/api/v2/language/12/"
                    },
                    "version": {
                        "name": "sword",
                        "url": "https://pokeapi.co/api/v2/version/33/"
                    }
                },
                {
                    "flavor_text": "うまれたときから　しっぽに　ほのおが\nともっている。　ほのおが　きえたとき\nその　いのちは　おわって　しまう。",
                    "language": {
                        "name": "ja-Hrkt",
                        "url": "https://pokeapi.co/api/v2/language/1/"
                    },
                    "version": {
                        "name": "shield",
                        "url": "https://pokeapi.co/api/v2/version/34/"
                    }
                },
                {
                    "flavor_text": "태어날 때부터 꼬리에 불꽃이\n타오르고 있다. 불꽃이 꺼지면\n생명도 다하고 만다.",
                    "language": {
                        "name": "ko",
                        "url": "https://pokeapi.co/api/v2/language/3/"
                    },
                    "version": {
                        "name": "shield",
                        "url": "https://pokeapi.co/api/v2/version/34/"
                    }
                },
                {
                    "flavor_text": "從出生時開始尾巴上\n就有火焰在燃燒。\n火焰熄滅時，生命也會結束。",
                    "language": {
                        "name": "zh-Hant",
                        "url": "https://pokeapi.co/api/v2/language/4/"
                    },
                    "version": {
                        "name": "shield",
                        "url": "https://pokeapi.co/api/v2/version/34/"
                    }
                },
                {
                    "flavor_text": "Depuis sa naissance, une petite flamme brûle\nau bout de sa queue. Si cette flamme s’éteint,\nla vie de ce Pokémon s’éteindra elle aussi.",
                    "language": {
                        "name": "fr",
                        "url": "https://pokeapi.co/api/v2/language/5/"
                    },
                    "version": {
                        "name": "shield",
                        "url": "https://pokeapi.co/api/v2/version/34/"
                    }
                },
                {
                    "flavor_text": "Von Geburt an brennt die Flamme auf seiner\nSchwanzspitze. Sobald sie verglimmt, erlischt\nauch sein Lebenslicht.",
                    "language": {
                        "name": "de",
                        "url": "https://pokeapi.co/api/v2/language/6/"
                    },
                    "version": {
                        "name": "shield",
                        "url": "https://pokeapi.co/api/v2/version/34/"
                    }
                },
                {
                    "flavor_text": "Este Pokémon nace con una llama en la punta de\nla cola. Si se le apagara, fallecería.",
                    "language": {
                        "name": "es",
                        "url": "https://pokeapi.co/api/v2/language/7/"
                    },
                    "version": {
                        "name": "shield",
                        "url": "https://pokeapi.co/api/v2/version/34/"
                    }
                },
                {
                    "flavor_text": "Una fiamma gli arde sulla punta della coda\nfin dalla nascita. Se si spegnesse, per lui\nsarebbe la fine.",
                    "language": {
                        "name": "it",
                        "url": "https://pokeapi.co/api/v2/language/8/"
                    },
                    "version": {
                        "name": "shield",
                        "url": "https://pokeapi.co/api/v2/version/34/"
                    }
                },
                {
                    "flavor_text": "From the time it is born, a flame burns at the tip\nof its tail. Its life would end if the flame were to\ngo out.",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "version": {
                        "name": "shield",
                        "url": "https://pokeapi.co/api/v2/version/34/"
                    }
                },
                {
                    "flavor_text": "生まれたときから　しっぽに　炎が\nともっている。　炎が　消えたとき\nその　命は　終わって　しまう。",
                    "language": {
                        "name": "ja",
                        "url": "https://pokeapi.co/api/v2/language/11/"
                    },
                    "version": {
                        "name": "shield",
                        "url": "https://pokeapi.co/api/v2/version/34/"
                    }
                },
                {
                    "flavor_text": "生下来的时候，\n尾巴上就有火焰在燃烧。\n火焰熄灭时，它的生命也会结束。",
                    "language": {
                        "name": "zh-Hans",
                        "url": "https://pokeapi.co/api/v2/language/12/"
                    },
                    "version": {
                        "name": "shield",
                        "url": "https://pokeapi.co/api/v2/version/34/"
                    }
                }
            ],
            "form_descriptions": [],
            "forms_switchable": false,
            "gender_rate": 1,
            "genera": [
                {
                    "genus": "とかげポケモン",
                    "language": {
                        "name": "ja-Hrkt",
                        "url": "https://pokeapi.co/api/v2/language/1/"
                    }
                },
                {
                    "genus": "도롱뇽포켓몬",
                    "language": {
                        "name": "ko",
                        "url": "https://pokeapi.co/api/v2/language/3/"
                    }
                },
                {
                    "genus": "蜥蜴寶可夢",
                    "language": {
                        "name": "zh-Hant",
                        "url": "https://pokeapi.co/api/v2/language/4/"
                    }
                },
                {
                    "genus": "Pokémon Lézard",
                    "language": {
                        "name": "fr",
                        "url": "https://pokeapi.co/api/v2/language/5/"
                    }
                },
                {
                    "genus": "Echse",
                    "language": {
                        "name": "de",
                        "url": "https://pokeapi.co/api/v2/language/6/"
                    }
                },
                {
                    "genus": "Pokémon Lagartija",
                    "language": {
                        "name": "es",
                        "url": "https://pokeapi.co/api/v2/language/7/"
                    }
                },
                {
                    "genus": "Pokémon Lucertola",
                    "language": {
                        "name": "it",
                        "url": "https://pokeapi.co/api/v2/language/8/"
                    }
                },
                {
                    "genus": "Lizard Pokémon",
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    }
                },
                {
                    "genus": "とかげポケモン",
                    "language": {
                        "name": "ja",
                        "url": "https://pokeapi.co/api/v2/language/11/"
                    }
                },
                {
                    "genus": "蜥蜴宝可梦",
                    "language": {
                        "name": "zh-Hans",
                        "url": "https://pokeapi.co/api/v2/language/12/"
                    }
                }
            ],
            "generation": {
                "name": "generation-i",
                "url": "https://pokeapi.co/api/v2/generation/1/"
            },
            "growth_rate": {
                "name": "medium-slow",
                "url": "https://pokeapi.co/api/v2/growth-rate/4/"
            },
            "habitat": {
                "name": "mountain",
                "url": "https://pokeapi.co/api/v2/pokemon-habitat/4/"
            },
            "has_gender_differences": false,
            "hatch_counter": 20,
            "id": 4,
            "is_baby": false,
            "is_legendary": false,
            "is_mythical": false,
            "name": "charmander",
            "names": [
                {
                    "language": {
                        "name": "ja-Hrkt",
                        "url": "https://pokeapi.co/api/v2/language/1/"
                    },
                    "name": "ヒトカゲ"
                },
                {
                    "language": {
                        "name": "roomaji",
                        "url": "https://pokeapi.co/api/v2/language/2/"
                    },
                    "name": "Hitokage"
                },
                {
                    "language": {
                        "name": "ko",
                        "url": "https://pokeapi.co/api/v2/language/3/"
                    },
                    "name": "파이리"
                },
                {
                    "language": {
                        "name": "zh-Hant",
                        "url": "https://pokeapi.co/api/v2/language/4/"
                    },
                    "name": "小火龍"
                },
                {
                    "language": {
                        "name": "fr",
                        "url": "https://pokeapi.co/api/v2/language/5/"
                    },
                    "name": "Salamèche"
                },
                {
                    "language": {
                        "name": "de",
                        "url": "https://pokeapi.co/api/v2/language/6/"
                    },
                    "name": "Glumanda"
                },
                {
                    "language": {
                        "name": "es",
                        "url": "https://pokeapi.co/api/v2/language/7/"
                    },
                    "name": "Charmander"
                },
                {
                    "language": {
                        "name": "it",
                        "url": "https://pokeapi.co/api/v2/language/8/"
                    },
                    "name": "Charmander"
                },
                {
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "name": "Charmander"
                },
                {
                    "language": {
                        "name": "ja",
                        "url": "https://pokeapi.co/api/v2/language/11/"
                    },
                    "name": "ヒトカゲ"
                },
                {
                    "language": {
                        "name": "zh-Hans",
                        "url": "https://pokeapi.co/api/v2/language/12/"
                    },
                    "name": "小火龙"
                }
            ],
            "order": 4,
            "pal_park_encounters": [
                {
                    "area": {
                        "name": "field",
                        "url": "https://pokeapi.co/api/v2/pal-park-area/2/"
                    },
                    "base_score": 50,
                    "rate": 30
                }
            ],
            "pokedex_numbers": [
                {
                    "entry_number": 4,
                    "pokedex": {
                        "name": "national",
                        "url": "https://pokeapi.co/api/v2/pokedex/1/"
                    }
                },
                {
                    "entry_number": 4,
                    "pokedex": {
                        "name": "kanto",
                        "url": "https://pokeapi.co/api/v2/pokedex/2/"
                    }
                },
                {
                    "entry_number": 229,
                    "pokedex": {
                        "name": "original-johto",
                        "url": "https://pokeapi.co/api/v2/pokedex/3/"
                    }
                },
                {
                    "entry_number": 234,
                    "pokedex": {
                        "name": "updated-johto",
                        "url": "https://pokeapi.co/api/v2/pokedex/7/"
                    }
                },
                {
                    "entry_number": 109,
                    "pokedex": {
                        "name": "conquest-gallery",
                        "url": "https://pokeapi.co/api/v2/pokedex/11/"
                    }
                },
                {
                    "entry_number": 83,
                    "pokedex": {
                        "name": "kalos-central",
                        "url": "https://pokeapi.co/api/v2/pokedex/12/"
                    }
                },
                {
                    "entry_number": 378,
                    "pokedex": {
                        "name": "galar",
                        "url": "https://pokeapi.co/api/v2/pokedex/27/"
                    }
                },
                {
                    "entry_number": 4,
                    "pokedex": {
                        "name": "updated-kanto",
                        "url": "https://pokeapi.co/api/v2/pokedex/26/"
                    }
                }
            ],
            "shape": {
                "name": "upright",
                "url": "https://pokeapi.co/api/v2/pokemon-shape/6/"
            },
            "varieties": [
                {
                    "is_default": true,
                    "pokemon": {
                        "name": "charmander",
                        "url": "https://pokeapi.co/api/v2/pokemon/4/"
                    }
                }
            ]
        }
    }).mockResolvedValueOnce({
        data:{
            "damage_relations": {
                "double_damage_from": [
                    {
                        "name": "ground",
                        "url": "https://pokeapi.co/api/v2/type/5/"
                    },
                    {
                        "name": "rock",
                        "url": "https://pokeapi.co/api/v2/type/6/"
                    },
                    {
                        "name": "water",
                        "url": "https://pokeapi.co/api/v2/type/11/"
                    }
                ],
                "double_damage_to": [
                    {
                        "name": "bug",
                        "url": "https://pokeapi.co/api/v2/type/7/"
                    },
                    {
                        "name": "steel",
                        "url": "https://pokeapi.co/api/v2/type/9/"
                    },
                    {
                        "name": "grass",
                        "url": "https://pokeapi.co/api/v2/type/12/"
                    },
                    {
                        "name": "ice",
                        "url": "https://pokeapi.co/api/v2/type/15/"
                    }
                ],
                "half_damage_from": [
                    {
                        "name": "bug",
                        "url": "https://pokeapi.co/api/v2/type/7/"
                    },
                    {
                        "name": "steel",
                        "url": "https://pokeapi.co/api/v2/type/9/"
                    },
                    {
                        "name": "fire",
                        "url": "https://pokeapi.co/api/v2/type/10/"
                    },
                    {
                        "name": "grass",
                        "url": "https://pokeapi.co/api/v2/type/12/"
                    },
                    {
                        "name": "ice",
                        "url": "https://pokeapi.co/api/v2/type/15/"
                    },
                    {
                        "name": "fairy",
                        "url": "https://pokeapi.co/api/v2/type/18/"
                    }
                ],
                "half_damage_to": [
                    {
                        "name": "rock",
                        "url": "https://pokeapi.co/api/v2/type/6/"
                    },
                    {
                        "name": "fire",
                        "url": "https://pokeapi.co/api/v2/type/10/"
                    },
                    {
                        "name": "water",
                        "url": "https://pokeapi.co/api/v2/type/11/"
                    },
                    {
                        "name": "dragon",
                        "url": "https://pokeapi.co/api/v2/type/16/"
                    }
                ],
                "no_damage_from": [],
                "no_damage_to": []
            },
            "game_indices": [
                {
                    "game_index": 20,
                    "generation": {
                        "name": "generation-i",
                        "url": "https://pokeapi.co/api/v2/generation/1/"
                    }
                },
                {
                    "game_index": 20,
                    "generation": {
                        "name": "generation-ii",
                        "url": "https://pokeapi.co/api/v2/generation/2/"
                    }
                },
                {
                    "game_index": 10,
                    "generation": {
                        "name": "generation-iii",
                        "url": "https://pokeapi.co/api/v2/generation/3/"
                    }
                },
                {
                    "game_index": 10,
                    "generation": {
                        "name": "generation-iv",
                        "url": "https://pokeapi.co/api/v2/generation/4/"
                    }
                },
                {
                    "game_index": 9,
                    "generation": {
                        "name": "generation-v",
                        "url": "https://pokeapi.co/api/v2/generation/5/"
                    }
                },
                {
                    "game_index": 9,
                    "generation": {
                        "name": "generation-vi",
                        "url": "https://pokeapi.co/api/v2/generation/6/"
                    }
                }
            ],
            "generation": {
                "name": "generation-i",
                "url": "https://pokeapi.co/api/v2/generation/1/"
            },
            "id": 10,
            "move_damage_class": {
                "name": "special",
                "url": "https://pokeapi.co/api/v2/move-damage-class/3/"
            },
            "moves": [
                {
                    "name": "fire-punch",
                    "url": "https://pokeapi.co/api/v2/move/7/"
                },
                {
                    "name": "ember",
                    "url": "https://pokeapi.co/api/v2/move/52/"
                },
                {
                    "name": "flamethrower",
                    "url": "https://pokeapi.co/api/v2/move/53/"
                },
                {
                    "name": "fire-spin",
                    "url": "https://pokeapi.co/api/v2/move/83/"
                },
                {
                    "name": "fire-blast",
                    "url": "https://pokeapi.co/api/v2/move/126/"
                },
                {
                    "name": "flame-wheel",
                    "url": "https://pokeapi.co/api/v2/move/172/"
                },
                {
                    "name": "sacred-fire",
                    "url": "https://pokeapi.co/api/v2/move/221/"
                },
                {
                    "name": "sunny-day",
                    "url": "https://pokeapi.co/api/v2/move/241/"
                },
                {
                    "name": "heat-wave",
                    "url": "https://pokeapi.co/api/v2/move/257/"
                },
                {
                    "name": "will-o-wisp",
                    "url": "https://pokeapi.co/api/v2/move/261/"
                },
                {
                    "name": "eruption",
                    "url": "https://pokeapi.co/api/v2/move/284/"
                },
                {
                    "name": "blaze-kick",
                    "url": "https://pokeapi.co/api/v2/move/299/"
                },
                {
                    "name": "blast-burn",
                    "url": "https://pokeapi.co/api/v2/move/307/"
                },
                {
                    "name": "overheat",
                    "url": "https://pokeapi.co/api/v2/move/315/"
                },
                {
                    "name": "flare-blitz",
                    "url": "https://pokeapi.co/api/v2/move/394/"
                },
                {
                    "name": "fire-fang",
                    "url": "https://pokeapi.co/api/v2/move/424/"
                },
                {
                    "name": "lava-plume",
                    "url": "https://pokeapi.co/api/v2/move/436/"
                },
                {
                    "name": "magma-storm",
                    "url": "https://pokeapi.co/api/v2/move/463/"
                },
                {
                    "name": "flame-burst",
                    "url": "https://pokeapi.co/api/v2/move/481/"
                },
                {
                    "name": "flame-charge",
                    "url": "https://pokeapi.co/api/v2/move/488/"
                },
                {
                    "name": "incinerate",
                    "url": "https://pokeapi.co/api/v2/move/510/"
                },
                {
                    "name": "inferno",
                    "url": "https://pokeapi.co/api/v2/move/517/"
                },
                {
                    "name": "fire-pledge",
                    "url": "https://pokeapi.co/api/v2/move/519/"
                },
                {
                    "name": "heat-crash",
                    "url": "https://pokeapi.co/api/v2/move/535/"
                },
                {
                    "name": "searing-shot",
                    "url": "https://pokeapi.co/api/v2/move/545/"
                },
                {
                    "name": "blue-flare",
                    "url": "https://pokeapi.co/api/v2/move/551/"
                },
                {
                    "name": "fiery-dance",
                    "url": "https://pokeapi.co/api/v2/move/552/"
                },
                {
                    "name": "v-create",
                    "url": "https://pokeapi.co/api/v2/move/557/"
                },
                {
                    "name": "fusion-flare",
                    "url": "https://pokeapi.co/api/v2/move/558/"
                },
                {
                    "name": "mystical-fire",
                    "url": "https://pokeapi.co/api/v2/move/595/"
                },
                {
                    "name": "inferno-overdrive--physical",
                    "url": "https://pokeapi.co/api/v2/move/640/"
                },
                {
                    "name": "inferno-overdrive--special",
                    "url": "https://pokeapi.co/api/v2/move/641/"
                },
                {
                    "name": "fire-lash",
                    "url": "https://pokeapi.co/api/v2/move/680/"
                },
                {
                    "name": "burn-up",
                    "url": "https://pokeapi.co/api/v2/move/682/"
                },
                {
                    "name": "shell-trap",
                    "url": "https://pokeapi.co/api/v2/move/704/"
                },
                {
                    "name": "mind-blown",
                    "url": "https://pokeapi.co/api/v2/move/720/"
                },
                {
                    "name": "sizzly-slide",
                    "url": "https://pokeapi.co/api/v2/move/735/"
                },
                {
                    "name": "max-flare",
                    "url": "https://pokeapi.co/api/v2/move/757/"
                },
                {
                    "name": "pyro-ball",
                    "url": "https://pokeapi.co/api/v2/move/780/"
                },
                {
                    "name": "burning-jealousy",
                    "url": "https://pokeapi.co/api/v2/move/807/"
                }
            ],
            "name": "fire",
            "names": [
                {
                    "language": {
                        "name": "ja-Hrkt",
                        "url": "https://pokeapi.co/api/v2/language/1/"
                    },
                    "name": "ほのお"
                },
                {
                    "language": {
                        "name": "ko",
                        "url": "https://pokeapi.co/api/v2/language/3/"
                    },
                    "name": "불꽃"
                },
                {
                    "language": {
                        "name": "fr",
                        "url": "https://pokeapi.co/api/v2/language/5/"
                    },
                    "name": "Feu"
                },
                {
                    "language": {
                        "name": "de",
                        "url": "https://pokeapi.co/api/v2/language/6/"
                    },
                    "name": "Feuer"
                },
                {
                    "language": {
                        "name": "es",
                        "url": "https://pokeapi.co/api/v2/language/7/"
                    },
                    "name": "Fuego"
                },
                {
                    "language": {
                        "name": "it",
                        "url": "https://pokeapi.co/api/v2/language/8/"
                    },
                    "name": "Fuoco"
                },
                {
                    "language": {
                        "name": "en",
                        "url": "https://pokeapi.co/api/v2/language/9/"
                    },
                    "name": "Fire"
                }
            ],
            "pokemon": [
                {
                    "pokemon": {
                        "name": "charmander",
                        "url": "https://pokeapi.co/api/v2/pokemon/4/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "charmeleon",
                        "url": "https://pokeapi.co/api/v2/pokemon/5/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "charizard",
                        "url": "https://pokeapi.co/api/v2/pokemon/6/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "vulpix",
                        "url": "https://pokeapi.co/api/v2/pokemon/37/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "ninetales",
                        "url": "https://pokeapi.co/api/v2/pokemon/38/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "growlithe",
                        "url": "https://pokeapi.co/api/v2/pokemon/58/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "arcanine",
                        "url": "https://pokeapi.co/api/v2/pokemon/59/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "ponyta",
                        "url": "https://pokeapi.co/api/v2/pokemon/77/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "rapidash",
                        "url": "https://pokeapi.co/api/v2/pokemon/78/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "magmar",
                        "url": "https://pokeapi.co/api/v2/pokemon/126/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "flareon",
                        "url": "https://pokeapi.co/api/v2/pokemon/136/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "moltres",
                        "url": "https://pokeapi.co/api/v2/pokemon/146/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "cyndaquil",
                        "url": "https://pokeapi.co/api/v2/pokemon/155/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "quilava",
                        "url": "https://pokeapi.co/api/v2/pokemon/156/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "typhlosion",
                        "url": "https://pokeapi.co/api/v2/pokemon/157/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "slugma",
                        "url": "https://pokeapi.co/api/v2/pokemon/218/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "magcargo",
                        "url": "https://pokeapi.co/api/v2/pokemon/219/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "houndour",
                        "url": "https://pokeapi.co/api/v2/pokemon/228/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "houndoom",
                        "url": "https://pokeapi.co/api/v2/pokemon/229/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "magby",
                        "url": "https://pokeapi.co/api/v2/pokemon/240/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "entei",
                        "url": "https://pokeapi.co/api/v2/pokemon/244/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "ho-oh",
                        "url": "https://pokeapi.co/api/v2/pokemon/250/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "torchic",
                        "url": "https://pokeapi.co/api/v2/pokemon/255/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "combusken",
                        "url": "https://pokeapi.co/api/v2/pokemon/256/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "blaziken",
                        "url": "https://pokeapi.co/api/v2/pokemon/257/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "numel",
                        "url": "https://pokeapi.co/api/v2/pokemon/322/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "camerupt",
                        "url": "https://pokeapi.co/api/v2/pokemon/323/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "torkoal",
                        "url": "https://pokeapi.co/api/v2/pokemon/324/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "chimchar",
                        "url": "https://pokeapi.co/api/v2/pokemon/390/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "monferno",
                        "url": "https://pokeapi.co/api/v2/pokemon/391/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "infernape",
                        "url": "https://pokeapi.co/api/v2/pokemon/392/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "magmortar",
                        "url": "https://pokeapi.co/api/v2/pokemon/467/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "heatran",
                        "url": "https://pokeapi.co/api/v2/pokemon/485/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "victini",
                        "url": "https://pokeapi.co/api/v2/pokemon/494/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "tepig",
                        "url": "https://pokeapi.co/api/v2/pokemon/498/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "pignite",
                        "url": "https://pokeapi.co/api/v2/pokemon/499/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "emboar",
                        "url": "https://pokeapi.co/api/v2/pokemon/500/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "pansear",
                        "url": "https://pokeapi.co/api/v2/pokemon/513/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "simisear",
                        "url": "https://pokeapi.co/api/v2/pokemon/514/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "darumaka",
                        "url": "https://pokeapi.co/api/v2/pokemon/554/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "darmanitan-standard",
                        "url": "https://pokeapi.co/api/v2/pokemon/555/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "litwick",
                        "url": "https://pokeapi.co/api/v2/pokemon/607/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "lampent",
                        "url": "https://pokeapi.co/api/v2/pokemon/608/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "chandelure",
                        "url": "https://pokeapi.co/api/v2/pokemon/609/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "heatmor",
                        "url": "https://pokeapi.co/api/v2/pokemon/631/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "larvesta",
                        "url": "https://pokeapi.co/api/v2/pokemon/636/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "volcarona",
                        "url": "https://pokeapi.co/api/v2/pokemon/637/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "reshiram",
                        "url": "https://pokeapi.co/api/v2/pokemon/643/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "fennekin",
                        "url": "https://pokeapi.co/api/v2/pokemon/653/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "braixen",
                        "url": "https://pokeapi.co/api/v2/pokemon/654/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "delphox",
                        "url": "https://pokeapi.co/api/v2/pokemon/655/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "fletchinder",
                        "url": "https://pokeapi.co/api/v2/pokemon/662/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "talonflame",
                        "url": "https://pokeapi.co/api/v2/pokemon/663/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "litleo",
                        "url": "https://pokeapi.co/api/v2/pokemon/667/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "pyroar",
                        "url": "https://pokeapi.co/api/v2/pokemon/668/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "volcanion",
                        "url": "https://pokeapi.co/api/v2/pokemon/721/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "litten",
                        "url": "https://pokeapi.co/api/v2/pokemon/725/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "torracat",
                        "url": "https://pokeapi.co/api/v2/pokemon/726/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "incineroar",
                        "url": "https://pokeapi.co/api/v2/pokemon/727/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "oricorio-baile",
                        "url": "https://pokeapi.co/api/v2/pokemon/741/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "salandit",
                        "url": "https://pokeapi.co/api/v2/pokemon/757/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "salazzle",
                        "url": "https://pokeapi.co/api/v2/pokemon/758/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "turtonator",
                        "url": "https://pokeapi.co/api/v2/pokemon/776/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "blacephalon",
                        "url": "https://pokeapi.co/api/v2/pokemon/806/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "scorbunny",
                        "url": "https://pokeapi.co/api/v2/pokemon/813/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "raboot",
                        "url": "https://pokeapi.co/api/v2/pokemon/814/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "cinderace",
                        "url": "https://pokeapi.co/api/v2/pokemon/815/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "carkol",
                        "url": "https://pokeapi.co/api/v2/pokemon/838/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "coalossal",
                        "url": "https://pokeapi.co/api/v2/pokemon/839/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "sizzlipede",
                        "url": "https://pokeapi.co/api/v2/pokemon/850/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "centiskorch",
                        "url": "https://pokeapi.co/api/v2/pokemon/851/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "rotom-heat",
                        "url": "https://pokeapi.co/api/v2/pokemon/10008/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "castform-sunny",
                        "url": "https://pokeapi.co/api/v2/pokemon/10013/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "darmanitan-zen",
                        "url": "https://pokeapi.co/api/v2/pokemon/10017/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "charizard-mega-x",
                        "url": "https://pokeapi.co/api/v2/pokemon/10034/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "charizard-mega-y",
                        "url": "https://pokeapi.co/api/v2/pokemon/10035/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "houndoom-mega",
                        "url": "https://pokeapi.co/api/v2/pokemon/10048/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "blaziken-mega",
                        "url": "https://pokeapi.co/api/v2/pokemon/10050/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "groudon-primal",
                        "url": "https://pokeapi.co/api/v2/pokemon/10078/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "camerupt-mega",
                        "url": "https://pokeapi.co/api/v2/pokemon/10087/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "marowak-alola",
                        "url": "https://pokeapi.co/api/v2/pokemon/10115/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "salazzle-totem",
                        "url": "https://pokeapi.co/api/v2/pokemon/10129/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "marowak-totem",
                        "url": "https://pokeapi.co/api/v2/pokemon/10149/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "darmanitan-zen-galar",
                        "url": "https://pokeapi.co/api/v2/pokemon/10175/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "charizard-gmax",
                        "url": "https://pokeapi.co/api/v2/pokemon/10187/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "cinderace-gmax",
                        "url": "https://pokeapi.co/api/v2/pokemon/10201/"
                    },
                    "slot": 1
                },
                {
                    "pokemon": {
                        "name": "coalossal-gmax",
                        "url": "https://pokeapi.co/api/v2/pokemon/10206/"
                    },
                    "slot": 2
                },
                {
                    "pokemon": {
                        "name": "centiskorch-gmax",
                        "url": "https://pokeapi.co/api/v2/pokemon/10211/"
                    },
                    "slot": 1
                }
            ]
        }
    }).mockResolvedValueOnce({
        data:{
            "baby_trigger_item": null,
            "chain": {
                "evolution_details": [],
                "evolves_to": [
                    {
                        "evolution_details": [
                            {
                                "gender": null,
                                "held_item": null,
                                "item": null,
                                "known_move": null,
                                "known_move_type": null,
                                "location": null,
                                "min_affection": null,
                                "min_beauty": null,
                                "min_happiness": null,
                                "min_level": 16,
                                "needs_overworld_rain": false,
                                "party_species": null,
                                "party_type": null,
                                "relative_physical_stats": null,
                                "time_of_day": "",
                                "trade_species": null,
                                "trigger": {
                                    "name": "level-up",
                                    "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
                                },
                                "turn_upside_down": false
                            }
                        ],
                        "evolves_to": [
                            {
                                "evolution_details": [
                                    {
                                        "gender": null,
                                        "held_item": null,
                                        "item": null,
                                        "known_move": null,
                                        "known_move_type": null,
                                        "location": null,
                                        "min_affection": null,
                                        "min_beauty": null,
                                        "min_happiness": null,
                                        "min_level": 36,
                                        "needs_overworld_rain": false,
                                        "party_species": null,
                                        "party_type": null,
                                        "relative_physical_stats": null,
                                        "time_of_day": "",
                                        "trade_species": null,
                                        "trigger": {
                                            "name": "level-up",
                                            "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
                                        },
                                        "turn_upside_down": false
                                    }
                                ],
                                "evolves_to": [],
                                "is_baby": false,
                                "species": {
                                    "name": "charizard",
                                    "url": "https://pokeapi.co/api/v2/pokemon-species/6/"
                                }
                            }
                        ],
                        "is_baby": false,
                        "species": {
                            "name": "charmeleon",
                            "url": "https://pokeapi.co/api/v2/pokemon-species/5/"
                        }
                    }
                ],
                "is_baby": false,
                "species": {
                    "name": "charmander",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/4/"
                }
            },
            "id": 2
        }
    }).mockResolvedValueOnce({
        data: pokemonInfo[1]
    }).mockResolvedValueOnce({
        data: pokemonInfo[1]
    }).mockResolvedValueOnce({
        data: pokemonInfo[1]
    })
    let result = await getPokemonInfo('charmander');
    let expectedResult =  {
        name: 'charmander',
        id: 4,
        weight: 8.5,
        heigth: 0.6000000000000001,
        "is_default": true,
        specieUrl: 'https://pokeapi.co/api/v2/pokemon-species/4/',
        types: [ { slot: 1, type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' } } ],
        images: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
            other: { 'official-artwork': {
                    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
                }
            }
        },
        stats: [
            {
                "base_stat": 39,
                "effort": 0,
                "stat": {
                    "name": "hp",
                    "url": "https://pokeapi.co/api/v2/stat/1/"
                }
            },
            {
                "base_stat": 52,
                "effort": 0,
                "stat": {
                    "name": "attack",
                    "url": "https://pokeapi.co/api/v2/stat/2/"
                }
            },
        ],
        description: 'Obviously prefers\n' +
            'hot places. When\n' +
            'it rains, steam is said to spout\n' +
            'from the tip of\n' +
            'its tail.',
        categorie: 'Lizard Pokémon',
        evolutionChainUrl: 'https://pokeapi.co/api/v2/evolution-chain/2/',
        typesInfo: [ { name: 'fire', weakness:  [ 'ground', 'rock', 'water' ], strength: [] } ],
        evolutionChain: {
            evolution_details: [],
            evolves_to: [
                {
                    "evolution_details": [
                        {
                            "gender": null,
                            "held_item": null,
                            "item": null,
                            "known_move": null,
                            "known_move_type": null,
                            "location": null,
                            "min_affection": null,
                            "min_beauty": null,
                            "min_happiness": null,
                            "min_level": 16,
                            "needs_overworld_rain": false,
                            "party_species": null,
                            "party_type": null,
                            "relative_physical_stats": null,
                            "time_of_day": "",
                            "trade_species": null,
                            "trigger": {
                                "name": "level-up",
                                "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
                            },
                            "turn_upside_down": false
                        }
                    ],
                    "evolves_to": [
                        {
                            "evolution_details": [
                                {
                                    "gender": null,
                                    "held_item": null,
                                    "item": null,
                                    "known_move": null,
                                    "known_move_type": null,
                                    "location": null,
                                    "min_affection": null,
                                    "min_beauty": null,
                                    "min_happiness": null,
                                    "min_level": 36,
                                    "needs_overworld_rain": false,
                                    "party_species": null,
                                    "party_type": null,
                                    "relative_physical_stats": null,
                                    "time_of_day": "",
                                    "trade_species": null,
                                    "trigger": {
                                        "name": "level-up",
                                        "url": "https://pokeapi.co/api/v2/evolution-trigger/1/"
                                    },
                                    "turn_upside_down": false
                                }
                            ],
                            "evolves_to": [],
                            "is_baby": false,
                            "species": {
                                "name": "charizard",
                                "url": "https://pokeapi.co/api/v2/pokemon-species/6/",
                                "img": 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
                            }
                        }
                    ],
                    "is_baby": false,
                    "species": {
                        "name": "charmeleon",
                        "url": "https://pokeapi.co/api/v2/pokemon-species/5/",
                        "img": 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'

                    }
                }
            ],
        is_baby: false,
        species: {
            name: 'charmander',
            url: 'https://pokeapi.co/api/v2/pokemon-species/4/',
            img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png'
        }
    }
}
    expect(result).toStrictEqual(expectedResult);
});
