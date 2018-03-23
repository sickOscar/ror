const PopulationTable = [

    {
        val: 0
    },
    {
        val: 1
    },
    {
        val: 2
    },
    {
        val: 3
    },
    {
        val: 4
    },
    {
        val: 5
    },
    {
        val: 6
    },
    {
        val: 7
    },
    {
        val: 8
    },
    {
        val: 9
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
        val: 11
    },
    {
        val: 12
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
        val: 14
    },
    {
        val: 15
    },
    {
        val: 16
    },
    {
        val: 17
    },

]

export default PopulationTable;