const findInteraction = require('./janusConvertor').findInteraction

describe('findInteractions', () => {
    it('correctly gets accounts on level 1', () => {
        const edges = [
            {
                from: 'id_1',
                to: 'id_2'
            },
            {
                from: 'id_2',
                to: 'id_1'
            },
            {
                from: 'id_1',
                to: 'id_3'
            },
            {
                from: 'id_3',
                to: 'id_4'
            }
        ]
        const maxIndex = 1
        const uniqueAccounts = findInteraction('id_2', edges, [], 0, maxIndex)
        expect(uniqueAccounts).toEqual(['id_1', 'id_2'])
    })
    it('correctly gets accounts on level 2', () => {
        const edges = [
            {
                from: 'id_1',
                to: 'id_2'
            },
            {
                from: 'id_2',
                to: 'id_1'
            },
            {
                from: 'id_1',
                to: 'id_3'
            },
            {
                from: 'id_3',
                to: 'id_4'
            }
        ]
        const maxIndex = 2
        const uniqueAccounts = findInteraction('id_2', edges, [], 0, maxIndex)
        expect(uniqueAccounts).toEqual(['id_1', 'id_2', 'id_3'])
    })
    it('correctly gets accounts on level 3', () => {
        const edges = [
            {
                from: 'id_1',
                to: 'id_2'
            },
            {
                from: 'id_2',
                to: 'id_1'
            },
            {
                from: 'id_1',
                to: 'id_3'
            },
            {
                from: 'id_3',
                to: 'id_4'
            }
        ]
        const maxIndex = 3
        const uniqueAccounts = findInteraction('id_2', edges, [], 0, maxIndex)
        expect(uniqueAccounts).toEqual(['id_1', 'id_2', 'id_3', 'id_4'])
    })
})