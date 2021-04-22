const app = require('../app');

describe('filter function', () => {
    test('filter pattern ry to return two countries with only one people and animal for each', () => {
        const result = app.filter('ry');
        expect(result).toHaveLength(2);
        expect(result[0]).toHaveProperty('name', 'Uzuzozne');
        expect(result[0].people).toHaveLength(1);
        expect(result[0].people[0]).toHaveProperty('name', 'Lillie Abbott');
        expect(result[0].people[0].animals).toHaveLength(1);
        expect(result[0].people[0].animals[0]).toHaveProperty('name', 'John Dory');
        expect(result[1].people).toHaveLength(1);
        expect(result[1].people[0].animals).toHaveLength(1);
    });
    test('filter pattern zz to return one country, one people and one animal', () => {
        const result = app.filter('zz');
        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('name', 'Dillauti');
        expect(result[0].people).toHaveLength(1);
        expect(result[0].people[0]).toHaveProperty('name', 'Philip Murray');
        expect(result[0].people[0].animals).toHaveLength(1);
        expect(result[0].people[0].animals[0]).toHaveProperty('name', 'Buzzard');
    
    });
    test('no filter pattern to return the whole list', () => {
        const result = app.filter('');
        expect(result).toHaveLength(5);
        expect(result[4].people).toHaveLength(5);
        expect(result[4].people[0].animals).toHaveLength(7);    
    });
    test('filter pattern aaaaa to return nothing', () => {
        const result = app.filter('aaaaa');
        expect(result).toHaveLength(0);
    });
    test('filter pattern Snakes to return many countries and peoples in correct order', () => {
        const result = app.filter('Snakes');
        expect(result).toHaveLength(3);
        expect(result[0]).toHaveProperty('name', 'Dillauti');
        expect(result[2]).toHaveProperty('name', 'Satanwi');
        expect(result[2].people).toHaveLength(2);
        expect(result[2].people[0]).toHaveProperty('name', 'Elmer Kinoshita');
        expect(result[2].people[0].animals).toHaveLength(1);
        expect(result[2].people[0].animals[0]).toHaveProperty('name', 'Snakes');
        expect(result[2].people[1]).toHaveProperty('name', 'Cora Howell');
    });
});

describe('count function', () => {
    // All the tests rely on the same result
    const countResult = app.count();
    test('count to return the whole list', () => {
        expect(countResult).toHaveLength(5);
        expect(countResult[4].people).toHaveLength(5);
        expect(countResult[4].people[0].animals).toHaveLength(7);
    })
    test('Dillauti to have 5 people', () => {
        expect(countResult[0]).toHaveProperty('name', 'Dillauti [5]');
    });
    test('Essie Bennett to have 7 animals', () => {
        expect(countResult[1].people[1]).toHaveProperty('name', 'Essie Bennett [7]');
    });
});
