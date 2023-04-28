export const posts = [
    {
        id: 1,
        title: 'hello',
        body: 'fsdjkhfjklshafdlkhsakdjlfhkljsdafh',
        images: [
            'url1',
            'url2',
            'url3',
        ],
        publishedOn: '01/02/2022',
        author: {
            id: 1,
            name: 'Emma J',
        },
        category: 'Bathroom',
        tags: [
            'carpet',
            'couch',
        ],
        comments: [
            {
                text: 'gsdfagfsadfsadf',
                author: 'John K',
                authorId: 2,
                likes: 12,
                saves: 10,
                publishedOn: '01/02/2022',
            },
            {
                text: 'dfasfsdaf',
                author: 'John T',
                authorId: 3,
                likes: 12,
                saves: 10,
                publishedOn: '01/02/2022',

            },
            {
                text: 'gsfhdghdfgh',
                author: 'John R',
                authorId: 4,
                likes: 12,
                saves: 10,
                publishedOn: '01/02/2022',

            },
        ],
        likes: 20,
        saves: 30,
    },
];

export const users = [{
    id: 1,
    firstName: 'Ivan',
    lastName: 'Ivanov',
    email: 'odisfn@abv.bg',
    userName: 'IvanIvan',
    posts: [],
    comments: [],
},
{
    id: 2,
    firstName: 'Petkan',
    lastName: 'Petkanov',
    email: 'pefj@abv.bg',
    userName: 'PetkanPetkan',
    posts: [],
    comments: [],
}];

export const categories = [
    'Bathrooms',
    'Building a Home',
    'Landscape Design',
    'Flooring',
    'Furniture',
    'Home Decorating',
    'Kitchens',
    'Living Room',
    'Paint',
    'DYI',
    'Windows',
    'Other',
];
