// Arguments given
const args = process.argv.slice(2);

// Checking given arguments to call corresponding function.
if (args?.length > 0) {
    let result;
    if (args[0].startsWith('--filter=')) {
        result = filter(args[0].substr(9));
    } else if (args[0] == '--count') {
        result = count();
    } 
    if (result) {
        console.log(JSON.stringify(result, null, 2));
    } else {
        console.error('No valid argument given.');
    }
}

/**
 * Filters animals that don't match the given pattern.
 * Countries and peoples with no matching animal are also filtered.
 *
 * @param {String} pattern The pattern that animals name must match
 * @returns {JSON} Countries containing peoples wich contain at least one animal matching the pattern
 */
function filter (pattern) {
    const result = JSON.parse(JSON.stringify(require('./data').data));
    return result.map((country) => {
        country.people = country.people
            .map((person) => {
                person.animals = person.animals.filter((animal) => animal.name.includes(pattern))
                return person;
            })
            .filter((person) => person.animals.length > 0);
        return country;
    })
    .filter((country) => country.people.length > 0);
}

/**
 * Counts children of each element and appends the count to its name.
 * 
 * @returns {JSON} Countries, peoples and animals with their counts
 */
function count () {
    const result = JSON.parse(JSON.stringify(require('./data').data));
    return result.map((country) => {
        country.name += ' [' + country.people.length + ']';
        country.people.map((person) => {
            person.name += ' [' + person.animals.length + ']';
        });
        return country;
    });
}

module.exports = {
    filter,
    count
};
