function countryColours(region) {
    switch (region) {
        case 'Africa':
            return 'africa';
        case 'Americas':
            return 'americas';
        case 'Asia':
            return 'asia';
        case 'Europe':
            return 'europe';
        case 'Oceania':
            return 'oceania';
            default:
                return 'black';
    }
}

export default countryColours;