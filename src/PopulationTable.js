const PopulationTable = [
    {
        val: -1,
        label: "People revole, all players lose",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest += 100;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 0,
        label: "+6 to Unrest Level, NR, Mob",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest += 6;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 1,
        label: "+5 to Unrest Level, NR, Mob",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest += 5;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 2,
        label: "+5 to Unrest Level, NR",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest += 5;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 3,
        label: "+5 to Unrest Level, MS",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest += 5;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 4,
        label: "+5 to Unrest Level",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest += 5;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 5,
        label: "+4 to Unrest Level, MS",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest += 4;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 6,
        label: "+4 to Unrest Level",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest += 4;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 7,
        label: "+3 to Unrest Level, MS",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest += 3;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 8,
        label: "+3 to Unrest Level",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest += 3;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 9,
        label: "+2 to Unrest Level",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest += 2;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 10,
        label: "+1 to Unrest Level",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest += 1;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 11,
        label: "No Change",
        apply: (G, ctx) => {
            return {...G}
        },
        destroy: (G,ctx) => {
            return {...G}
        }
    },
    {
        val: 12,
        label: "No Change",
        apply: (G, ctx) => {
            return {...G}
        },
        destroy: (G,ctx) => {
            return {...G}
        }
    },
    {
        val: 13,
        label: "No Change",
        apply: (G, ctx) => {
            return {...G}
        },
        destroy: (G,ctx) => {
            return {...G}
        }
    },
    {
        val: 14,
        label: "No Change",
        apply: (G, ctx) => {
            return {...G}
        },
        destroy: (G,ctx) => {
            return {...G}
        }
    },
    {
        val: 15,
        label: "No Change",
        apply: (G, ctx) => {
            return {...G}
        },
        destroy: (G,ctx) => {
            return {...G}
        }
    },
    {
        val: 16,
        label: "-1 to Unrest Level",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest -= 1;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 17,
        label: "-2 to Unrest Level",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest -= 2;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
    {
        val: 18,
        label: "-3 to Unrest Level",
        apply: (G, ctx) => {
            const game = {...G};
            game.republic.unrest -= 3;
            return {...game}
        },
        destroy: (G, ctx) => {
            return {...G}
        }
    },
]

export default PopulationTable;